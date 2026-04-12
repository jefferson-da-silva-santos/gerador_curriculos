import express from "express";
import path from "path";
import puppeteer from "puppeteer";
import cors from "cors";
import crypto from "crypto";

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
      // Allow same-origin / non-browser callers (Puppeteer) and configured origin
      if (!origin || origin === ALLOWED_ORIGIN) return cb(null, true);
      cb(new Error(`CORS: origem não permitida — ${origin}`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: MAX_BODY_SIZE }));

/* ─── In-memory cache with TTL auto-cleanup ─────────────── */
const curriculumCache = new Map();

function cacheSet(key, value) {
  curriculumCache.set(key, value);
  // Auto-remove after TTL to prevent memory leaks
  setTimeout(() => curriculumCache.delete(key), CACHE_TTL_MS);
}

/* ─── Input validation ──────────────────────────────────── */
const ALLOWED_HTML_TAGS_RE = /<script\b/i; // rough guard — block unexpected script injection

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
const RATE_LIMIT = 10; // max 10 PDF requests/minute per IP

function checkRate(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }
  entry.count++;
  rateMap.set(ip, entry);
  return entry.count <= RATE_LIMIT;
}

/* ─── Routes ────────────────────────────────────────────── */

/**
 * POST /gerar-curriculo
 * Receives complete HTML, caches it, launches Puppeteer and returns a PDF.
 */
app.post("/gerar-curriculo", async (req, res) => {
  const clientIp = req.ip ?? "unknown";

  if (!checkRate(clientIp)) {
    return res.status(429).json({ error: "Muitas requisições. Tente novamente em 1 minuto." });
  }

  const { htmlContent } = req.body;
  const validationError = validateHtml(htmlContent);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Generate a cryptographically random ID (not guessable)
  const curriculumId = crypto.randomBytes(16).toString("hex");
  cacheSet(curriculumId, htmlContent);

  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Disable navigation to any external URL from within the page
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      const url = req.url();
      // Allow fonts, stylesheets, images from trusted CDNs; block everything else
      const ALLOWED_HOSTS = [
        "localhost",
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "unpkg.com",
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
    return res.status(500).json({ error: "Falha interna ao gerar o PDF." });
  } finally {
    browser?.close();
    curriculumCache.delete(curriculumId);
  }
});

/**
 * GET /curriculo/:id
 * Puppeteer-only route — serves the cached HTML by ID.
 * Only accessible from localhost.
 */
app.get("/curriculo/:id", (req, res) => {
  const { hostname } = req;
  if (hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "::1") {
    return res.status(403).send("Proibido.");
  }

  const { id } = req.params;
  // Validate ID format (hex, 32 chars)
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
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Erro interno do servidor." });
});

/* ─── Start ─────────────────────────────────────────────── */
app.listen(PORT, () =>
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
);
