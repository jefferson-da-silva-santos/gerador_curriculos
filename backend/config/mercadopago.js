import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { MercadoPagoConfig, Payment as MPPayment } from "mercadopago";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// MERCADOPAGO_ACCESS_TOKEN: Dashboard do Mercado Pago → Suas integrações →
// crie uma aplicação → "Credenciais de produção" (ou "de teste", pra
// desenvolver sem mexer com dinheiro real).
export function assertMercadoPagoConfigured() {
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error(
      "Mercado Pago não configurado. Falta a variável de ambiente MERCADOPAGO_ACCESS_TOKEN."
    );
  }
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
  options: { timeout: 10_000 },
});

export const mpPaymentClient = new MPPayment(client);
export default client;
