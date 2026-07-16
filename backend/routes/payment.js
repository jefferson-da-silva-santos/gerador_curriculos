import { Router } from "express";
import crypto from "crypto";
import { z } from "zod";
import prisma from "../config/prisma.js";
import { mpPaymentClient, assertMercadoPagoConfigured } from "../config/mercadopago.js";
import { paymentLimiter } from "../middleware/rateLimit.js";

export const paymentRouter = Router();

const PAYMENT_AMOUNT = Number(process.env.PAYMENT_AMOUNT || 5.0);
const PIX_EXPIRATION_MINUTES = 30;

const createPaymentSchema = z.object({
  email: z.string().email().optional(),
});

/**
 * POST /pagamento/criar
 * Cria uma cobrança Pix no Mercado Pago e um registro "pending" no banco.
 * Body: { email?: string }
 */
paymentRouter.post("/pagamento/criar", paymentLimiter, async (req, res) => {
  const parsed = createPaymentSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: "E-mail inválido." });
  }

  try {
    assertMercadoPagoConfigured();

    const payerEmail = parsed.data.email ?? "cliente@geradorcurriculos.com"; // fallback exigido pela API do MP

    // 1) Cria o registro "pending" primeiro, para termos um ID interno
    //    que vai como external_reference na cobrança do Mercado Pago.
    const payment = await prisma.payment.create({
      data: {
        amount: PAYMENT_AMOUNT,
        payerEmail,
        status: "pending",
        expiresAt: new Date(Date.now() + PIX_EXPIRATION_MINUTES * 60_000),
      },
    });

    // 2) Cria a cobrança Pix de fato no Mercado Pago
    const mpResult = await mpPaymentClient.create({
      body: {
        transaction_amount: PAYMENT_AMOUNT,
        description: "Geração de currículo em PDF",
        payment_method_id: "pix",
        payer: { email: payerEmail },
        external_reference: payment.id,
        notification_url: process.env.MERCADOPAGO_WEBHOOK_URL,
        date_of_expiration: new Date(
          Date.now() + PIX_EXPIRATION_MINUTES * 60_000
        ).toISOString(),
      },
    });

    const txData = mpResult.point_of_interaction?.transaction_data;

    // 3) Atualiza o registro com os dados do Pix (QR Code + copia-e-cola)
    const updated = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        mpPaymentId: String(mpResult.id),
        pixCode: txData?.qr_code ?? null,
        pixQrCodeBase64: txData?.qr_code_base64 ?? null,
        status: mpResult.status === "approved" ? "approved" : "pending",
      },
    });

    return res.json({
      paymentId: updated.id,
      status: updated.status,
      amount: Number(updated.amount),
      pixCode: updated.pixCode,
      pixQrCodeBase64: updated.pixQrCodeBase64,
      expiresAt: updated.expiresAt,
    });
  } catch (err) {
    console.error("Erro ao criar cobrança Pix:", err.message);
    return res.status(500).json({ error: "Falha ao criar a cobrança Pix." });
  }
});

/**
 * GET /pagamento/status/:id
 * Usado pelo frontend para fazer polling até o pagamento ser aprovado.
 */
paymentRouter.get("/pagamento/status/:id", async (req, res) => {
  // cuid — evita consultas com IDs em formato claramente inválido
  if (!/^[a-z0-9]{20,32}$/i.test(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      select: { id: true, status: true, used: true, expiresAt: true },
    });

    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado." });
    }

    // Auto-expira localmente se passou do prazo e o MP não confirmou nada
    if (
      payment.status === "pending" &&
      payment.expiresAt &&
      new Date(payment.expiresAt) < new Date()
    ) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "expired" },
      });
      payment.status = "expired";
    }

    return res.json(payment);
  } catch (err) {
    console.error("Erro ao consultar pagamento:", err.message);
    return res.status(500).json({ error: "Falha ao consultar o pagamento." });
  }
});

/**
 * POST /pagamento/webhook
 * O Mercado Pago chama essa rota sozinho quando o status de um pagamento
 * muda. NUNCA confie apenas na resposta do frontend — é aqui que a
 * aprovação de verdade é confirmada, direto com a API do Mercado Pago.
 */
paymentRouter.post("/pagamento/webhook", async (req, res) => {
  try {
    verifyMercadoPagoSignature(req); // lança erro se a assinatura for inválida/ausente

    const paymentIdFromMP = req.body?.data?.id ?? req.query?.id;
    if (!paymentIdFromMP) {
      return res.status(400).send("Payload sem id de pagamento.");
    }

    // Consulta o status real diretamente na API do Mercado Pago
    // (nunca confiamos apenas no conteúdo do webhook em si)
    const mpPayment = await mpPaymentClient.get({ id: paymentIdFromMP });
    const externalReference = mpPayment.external_reference;
    if (!externalReference) {
      return res.status(200).send("OK"); // não é um pagamento nosso, ignora
    }

    const newStatus =
      mpPayment.status === "approved"
        ? "approved"
        : mpPayment.status === "rejected"
        ? "rejected"
        : "pending";

    await prisma.payment.updateMany({
      where: { id: externalReference },
      data: { status: newStatus, mpPaymentId: String(mpPayment.id) },
    });

    return res.status(200).send("OK");
  } catch (err) {
    // Assinatura inválida/ausente: rejeita de verdade (não é erro "nosso"
    // interno, é uma chamada que não conseguimos confirmar que veio do MP).
    if (err instanceof InvalidSignatureError) {
      console.warn("Webhook rejeitado — assinatura inválida ou ausente:", err.message);
      return res.status(401).send("Assinatura inválida.");
    }

    console.error("Erro no webhook do Mercado Pago:", err.message);
    // Para erros internos genuínos (não relacionados à autenticidade da
    // chamada), respondemos 200 para o MP não ficar reenviando indefinidamente
    // — o erro já ficou logado acima para investigação.
    return res.status(200).send("OK (com erro interno registrado)");
  }
});

class InvalidSignatureError extends Error {}

/**
 * Valida a assinatura do webhook (header x-signature), conforme a
 * documentação do Mercado Pago.
 *
 * Em produção, MERCADOPAGO_WEBHOOK_SECRET é obrigatório (isso já é
 * garantido no boot por config/env.js) — se por algum motivo a validação
 * chegar aqui sem secret configurado em produção, rejeitamos por padrão
 * seguro, em vez de deixar passar. Fora de produção (dev/test), se o
 * secret não estiver configurado, avisamos no log e pulamos a validação
 * — só para facilitar testar localmente sem precisar configurar tudo.
 */
function verifyMercadoPagoSignature(req) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new InvalidSignatureError("MERCADOPAGO_WEBHOOK_SECRET ausente em produção.");
    }
    console.warn(
      "⚠️  MERCADOPAGO_WEBHOOK_SECRET não configurado — pulando validação de " +
      "assinatura do webhook (aceitável em dev, NUNCA em produção)."
    );
    return;
  }

  const signatureHeader = req.headers["x-signature"];
  const requestId = req.headers["x-request-id"];
  const dataId = req.query?.["data.id"] ?? req.body?.data?.id;

  if (!signatureHeader || !requestId || !dataId) {
    throw new InvalidSignatureError("Cabeçalhos de assinatura ausentes no webhook.");
  }

  const parts = Object.fromEntries(
    String(signatureHeader).split(",").map((p) => p.trim().split("="))
  );
  const { ts, v1 } = parts;
  if (!ts || !v1) throw new InvalidSignatureError("Formato de x-signature inválido.");

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const expectedHash = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  // Comparação em tempo constante — evita vazar informação sobre o hash
  // esperado através do tempo de resposta (timing attack).
  const expectedBuf = Buffer.from(expectedHash, "hex");
  const receivedBuf = Buffer.from(String(v1), "hex");
  const isValid =
    expectedBuf.length === receivedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, receivedBuf);

  if (!isValid) {
    throw new InvalidSignatureError("Assinatura do webhook inválida.");
  }
}