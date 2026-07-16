import rateLimit from "express-rate-limit";
import UpstashRateLimitStore from "./upstashRateLimitStore.js";

const WINDOW_MS = 60_000;

/**
 * Se UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN estiverem
 * configurados (crie um banco gratuito em https://upstash.com), o rate
 * limit passa a ser distribuído — funciona corretamente na Vercel, com
 * múltiplas instâncias de função vendo o mesmo contador.
 *
 * Sem essas variáveis, cai para o armazenamento padrão em memória do
 * express-rate-limit — funciona bem em desenvolvimento local, mas NÃO
 * é confiável em produção serverless (cada instância teria seu próprio
 * contador isolado). Por isso avisamos no log.
 */
let store;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const { Redis } = await import("@upstash/redis");
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  store = new UpstashRateLimitStore(redis, WINDOW_MS);
} else if (process.env.VERCEL) {
  console.warn(
    "⚠️  Rodando na Vercel sem UPSTASH_REDIS_REST_URL/TOKEN configurados — " +
    "o rate limit está usando memória local e NÃO protege de forma confiável " +
    "contra abuso distribuído entre instâncias de função. Configure o Upstash " +
    "antes de ir para produção de verdade."
  );
}

const baseOptions = {
  windowMs: WINDOW_MS,
  standardHeaders: true,
  legacyHeaders: false,
  store,
};

export const uploadLimiter = rateLimit({
  ...baseOptions,
  limit: 20, // 20 uploads de imagem por minuto por IP
  message: { error: "Muitas requisições. Tente novamente em 1 minuto." },
});

export const pdfLimiter = rateLimit({
  ...baseOptions,
  limit: 10, // 10 PDFs por minuto por IP
  message: { error: "Muitas requisições. Tente novamente em 1 minuto." },
});

export const paymentLimiter = rateLimit({
  ...baseOptions,
  limit: 15, // 15 tentativas de criar cobrança por minuto por IP
  message: { error: "Muitas tentativas. Aguarde 1 minuto." },
});