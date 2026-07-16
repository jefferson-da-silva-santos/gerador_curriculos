import "./config/env.js"; // valida as env vars antes de qualquer outra coisa
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cloudinary, { assertCloudinaryConfigured } from "./config/cloudinary.js";
import { uploadImage } from "./middleware/uploadMiddleware.js";
import { uploadLimiter, pdfLimiter } from "./middleware/rateLimit.js";
import { launchBrowser } from "./config/chromium.js";
import prisma from "./config/prisma.js";
import { paymentRouter } from "./routes/payment.js";

/* ─── Config ────────────────────────────────────────────── */
const PORT = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
const MAX_BODY_SIZE = "2mb";
const IS_SERVERLESS = Boolean(process.env.VERCEL);

/* ─── App ───────────────────────────────────────────────── */
const app = express();

// Necessário atrás do proxy da Vercel (e de qualquer proxy reverso em
// geral) para que req.ip reflita o IP real do cliente, não o do proxy —
// sem isso, o rate limiting por IP fica inútil (todo mundo cai no mesmo IP).
app.set("trust proxy", 1);

/* ── Security headers (helmet cobre bem mais casos que os headers manuais
     que existiam antes: CSP, HSTS, X-Content-Type-Options, etc.) ── */
app.use(
  helmet({
    // O JSON da nossa própria API não serve HTML, então a CSP padrão do
    // helmet não atrapalha aqui. O HTML do currículo em si é gerado à
    // parte (generateCurriculumHtml, no frontend) e tem sua própria CSP —
    // não passa por este servidor Express como página, só como string
    // dentro do body de /gerar-curriculo.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

/* ── CORS — whitelist only the frontend origin ── */
app.use(
  cors({
    origin: (origin, cb) => {
      // Permite chamadas sem Origin (server-to-server, ex: webhook do
      // Mercado Pago) e a origem configurada do frontend.
      if (!origin || origin === ALLOWED_ORIGIN) return cb(null, true);
      cb(new Error(`CORS: origem não permitida — ${origin}`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-signature", "x-request-id"],
  })
);

app.use(express.json({ limit: MAX_BODY_SIZE }));

/* ─── Rotas de pagamento (Pix / Mercado Pago) ───────────── */
app.use(paymentRouter);

/* ─── Input validation ──────────────────────────────────── */
function validateHtml(html) {
  if (typeof html !== "string") return "htmlContent deve ser uma string.";
  const byteSize = Buffer.byteLength(html, "utf8");
  if (byteSize > 2 * 1024 * 1024) return "htmlContent excede o limite de 2 MB.";
  return null;
}

class PaymentError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

/* ─── Routes ────────────────────────────────────────────── */

/**
 * POST /upload-imagem
 */
app.post("/upload-imagem", uploadLimiter, uploadImage.single("imagem"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhuma imagem enviada (campo 'imagem')." });
  }

  try {
    assertCloudinaryConfigured();

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "curriculos",
          resource_type: "image",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto", fetch_format: "auto" },
          ],
        },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    return res.json({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
  } catch (err) {
    console.error("Erro ao enviar imagem para o Cloudinary:", err.message);
    return res.status(500).json({ error: "Falha ao enviar a imagem." });
  }
});

/**
 * POST /gerar-curriculo
 * Exige um paymentId de um pagamento aprovado e ainda não utilizado.
 * Body: { htmlContent, paymentId }
 *
 * O HTML é injetado diretamente no Chromium via page.setContent() — não
 * navegamos mais para uma rota própria do servidor (isso só funcionava
 * localmente, com o Express e o Puppeteer no mesmo processo escutando em
 * localhost; em serverless não há garantia de que seja a mesma instância,
 * nem de porta acessível entre uma invocação e outra).
 */
app.post("/gerar-curriculo", pdfLimiter, async (req, res) => {
  const { htmlContent, paymentId } = req.body;

  const validationError = validateHtml(htmlContent);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  if (!paymentId || typeof paymentId !== "string") {
    return res.status(402).json({ error: "Pagamento obrigatório: informe paymentId." });
  }

  // ── Verifica e "consome" o pagamento numa transação, evitando reuso ──
  let payment;
  try {
    payment = await prisma.$transaction(async (tx) => {
      const p = await tx.payment.findUnique({ where: { id: paymentId } });

      if (!p) throw new PaymentError(404, "Pagamento não encontrado.");
      if (p.used) throw new PaymentError(409, "Este pagamento já foi utilizado.");
      if (p.status !== "approved") {
        throw new PaymentError(402, "Pagamento ainda não aprovado.");
      }

      return tx.payment.update({
        where: { id: paymentId },
        data: { used: true },
      });
    });
  } catch (err) {
    if (err instanceof PaymentError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Erro ao validar pagamento:", err.message);
    return res.status(500).json({ error: "Falha ao validar o pagamento." });
  }

  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Mantém a allowlist de recursos externos — o HTML vem do cliente
    // (é o próprio currículo dele), então mesmo executando dentro de um
    // Chromium controlado, restringimos a quais domínios externos a
    // página pode de fato buscar recursos (fontes, ícones, a foto do
    // Cloudinary), reduzindo a superfície de SSRF via HTML malicioso.
    await page.setRequestInterception(true);
    page.on("request", (interceptedReq) => {
      const type = interceptedReq.resourceType();
      const url = interceptedReq.url();
      const ALLOWED_HOSTS = [
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "unpkg.com",
        "res.cloudinary.com",
      ];
      const isAllowed = type === "document" || ALLOWED_HOSTS.some((h) => url.includes(h));
      isAllowed ? interceptedReq.continue() : interceptedReq.abort();
    });

    await page.setContent(htmlContent, { waitUntil: "networkidle0", timeout: 30_000 });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0cm", right: "0cm", bottom: "0cm", left: "0cm" },
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="curriculo.pdf"',
      "Content-Length": pdf.length,
    });

    return res.send(pdf);
  } catch (err) {
    console.error("Erro ao gerar PDF:", err.message);
    // Se falhou de fato ao gerar, devolve o "crédito" do pagamento
    await prisma.payment.update({ where: { id: paymentId }, data: { used: false } }).catch(() => { });
    return res.status(500).json({ error: "Falha interna ao gerar o PDF." });
  } finally {
    await browser?.close();
  }
});

/* ─── Error handler ─────────────────────────────────────── */
app.use((err, _req, res, _next) => {
  if (err.message?.startsWith("CORS:")) {
    return res.status(403).json({ error: err.message });
  }
  if (err.name === "MulterError" || err.message?.includes("não permitido")) {
    return res.status(400).json({ error: err.message });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Erro interno do servidor." });
});

/* ─── Start ─────────────────────────────────────────────── */
// Na Vercel, o runtime de Node importa `app` e chama ele mesmo como
// handler a cada requisição — chamar `.listen()` ali não é necessário
// (nem funcionaria da forma tradicional). Localmente, continua igual.
if (!IS_SERVERLESS) {
  app.listen(PORT, () =>
    console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
  );
}

export default app;