import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Este módulo é importado ANTES de qualquer outro em index.js (de propósito
// — queremos falhar rápido se faltar env var). Por isso ele mesmo precisa
// carregar o .env aqui, em vez de confiar que outro módulo (cloudinary.js,
// mercadopago.js etc.) já tenha feito isso — eles só rodam depois.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Valida as variáveis de ambiente uma única vez, na subida do processo.
 * Preferível a descobrir uma variável faltando só quando uma requisição
 * específica falha em produção — aqui o deploy falha rápido e com uma
 * mensagem clara de qual variável está faltando ou mal formatada.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  ALLOWED_ORIGIN: z.string().url(),

  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória"),
  DIRECT_URL: z.string().min(1).optional(), // só necessária pro CLI de migrations, não em runtime

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),

  MERCADOPAGO_ACCESS_TOKEN: z.string().min(1),
  MERCADOPAGO_WEBHOOK_URL: z.string().url(),
  // Em produção, a assinatura do webhook é OBRIGATÓRIA — sem ela, qualquer
  // um poderia forjar uma chamada de "pagamento aprovado" pro seu backend.
  MERCADOPAGO_WEBHOOK_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1, "MERCADOPAGO_WEBHOOK_SECRET é obrigatório em produção")
      : z.string().optional(),

  PAYMENT_AMOUNT: z.coerce.number().positive().default(5.0),

  // Opcionais — habilitam rate limit distribuído (recomendado em produção)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Obrigatória só fora da Vercel/serverless (ver config/chromium.js)
  PUPPETEER_EXECUTABLE_PATH: z.string().min(1).optional(),
});

function loadEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Variáveis de ambiente inválidas ou faltando:\n");
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    throw new Error("Configuração de ambiente inválida — corrija o .env (ou as env vars da Vercel) e reinicie.");
  }

  return result.data;
}

export const env = loadEnv();