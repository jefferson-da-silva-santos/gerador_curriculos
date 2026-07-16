import express from "express";
import path from "path";
import puppeteer from "puppeteer";
import cors from "cors";
import crypto from "crypto";
import cloudinary, { assertCloudinaryConfigured } from "./config/cloudinary.js";
import { uploadImage } from "./middleware/uploadMiddleware.js";
import prisma from "./config/prisma.js";
import { paymentRouter } from "./routes/payment.js";

/* ─── Config ────────────────────────────────────────────── */
const PORT = Number(process.env.PORT) || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
const MAX_BODY_SIZE = "2mb";
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes — auto-expire stale entries

/* ─── App ───────────────────────────────────────────────── */
const app = express();

/* ── Security headers ── */
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

/* ── CORS — whitelist only the frontend origin ── */
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin / non-browser callers (Puppeteer, Mercado Pago webhook) and configured origin
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

/* ─── In-memory cache with TTL auto-cleanup ─────────────── */
const curriculumCache = new Map();

function cacheSet(key, value) {
  curriculumCache.set(key, value);
  // Auto-remove after TTL to prevent memory leaks
  setTimeout(() => curriculumCache.delete(key), CACHE_TTL_MS);
}

/* ─── Input validation ──────────────────────────────────── */
function validateHtml(html) {
  if (typeof html !== "string") return "htmlContent deve ser uma string.";
  const byteSize = Buffer.byteLength(html, "utf8");
  if (byteSize > 2 * 1024 * 1024) return "htmlContent excede o limite de 2 MB.";
  return null;
}

/* ─── Puppeteer launcher (singleton-ish) ────────────────── */
const launchBrowser = () =>
  puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

/* ─── Rate limiting (simple in-memory) ─────────────────── */
const rateMap = new Map(); // ip → { count, resetAt }
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_PDF = 10;    // 10 PDFs/minuto por IP
const RATE_LIMIT_UPLOAD = 20; // 20 uploads de imagem/minuto por IP

function checkRate(ip, bucket, limit) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = rateMap.get(key) ?? { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }
  entry.count++;
  rateMap.set(key, entry);
  return entry.count <= limit;
}

/* ─── Routes ────────────────────────────────────────────── */

/**
 * POST /upload-imagem
 */
app.post("/upload-imagem", uploadImage.single("imagem"), async (req, res) => {
  const clientIp = req.ip ?? "unknown";

  if (!checkRate(clientIp, "upload", RATE_LIMIT_UPLOAD)) {
    return res.status(429).json({ error: "Muitas requisições. Tente novamente em 1 minuto." });
  }

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
 * AGORA EXIGE um paymentId de um pagamento aprovado e ainda não utilizado.
 * Body: { htmlContent, paymentId }
 */
app.post("/gerar-curriculo", async (req, res) => {
  const clientIp = req.ip ?? "unknown";

  if (!checkRate(clientIp, "pdf", RATE_LIMIT_PDF)) {
    return res.status(429).json({ error: "Muitas requisições. Tente novamente em 1 minuto." });
  }

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

  // Generate a cryptographically random ID (not guessable)
  const curriculumId = crypto.randomBytes(16).toString("hex");
  cacheSet(curriculumId, htmlContent);

  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      const url = req.url();
      const ALLOWED_HOSTS = [
        "localhost",
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "unpkg.com",
        "res.cloudinary.com",
      ];
      const isAllowed =
        type === "document" ||
        ALLOWED_HOSTS.some((h) => url.includes(h));
      isAllowed ? req.continue() : req.abort();
    });

    const pageUrl = `http://localhost:${PORT}/curriculo/${curriculumId}`;
    await page.goto(pageUrl, { waitUntil: "networkidle0", timeout: 30_000 });

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
    await prisma.payment.update({ where: { id: paymentId }, data: { used: false } }).catch(() => {});
    return res.status(500).json({ error: "Falha interna ao gerar o PDF." });
  } finally {
    browser?.close();
    curriculumCache.delete(curriculumId);
  }
});

class PaymentError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * GET /curriculo/:id
 */
app.get("/curriculo/:id", (req, res) => {
  const { hostname } = req;
  if (hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "::1") {
    return res.status(403).send("Proibido.");
  }

  const { id } = req.params;
  if (!/^[0-9a-f]{32}$/.test(id)) {
    return res.status(400).send("ID inválido.");
  }

  const html = curriculumCache.get(id);
  if (!html) return res.status(404).send("Currículo não encontrado ou expirado.");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.send(html);
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
app.listen(PORT, () =>
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
);
