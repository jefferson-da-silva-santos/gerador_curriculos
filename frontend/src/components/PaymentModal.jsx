import { useState, useEffect, useRef, useCallback } from "react";
import { showNotification } from "../utils/notyf";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const POLL_INTERVAL_MS = 3000;

/**
 * Modal de cobrança Pix. Cria a cobrança ao montar, mostra QR Code +
 * copia-e-cola, e faz polling do status até aprovar (ou expirar).
 *
 * Uso:
 *   <PaymentModal
 *     email={values.contact.email}
 *     onApproved={(paymentId) => { ... segue com a geração do PDF }}
 *     onClose={() => setShowPayment(false)}
 *   />
 */
const PaymentModal = ({ email, onApproved, onClose }) => {
  const [payment, setPayment] = useState(null); // { paymentId, pixCode, pixQrCodeBase64, amount, status }
  const [status, setStatus] = useState("loading"); // loading | pending | approved | expired | error
  const [copied, setCopied] = useState(false);
  const pollRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function createPayment() {
      try {
        const res = await fetch(`${API_URL}/pagamento/criar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (cancelled) return;

        setPayment(data);
        setStatus(data.status === "approved" ? "approved" : "pending");

        if (data.status === "approved") {
          onApproved?.(data.paymentId);
          return;
        }

        pollRef.current = setInterval(async () => {
          try {
            const statusRes = await fetch(`${API_URL}/pagamento/status/${data.paymentId}`);
            if (!statusRes.ok) return;
            const statusData = await statusRes.json();

            if (statusData.status === "approved") {
              stopPolling();
              setStatus("approved");
              onApproved?.(data.paymentId);
            } else if (statusData.status === "expired" || statusData.status === "rejected") {
              stopPolling();
              setStatus(statusData.status);
            }
          } catch {
            // Falha pontual de rede no polling não é crítica — tenta de novo no próximo tick
          }
        }, POLL_INTERVAL_MS);
      } catch (err) {
        console.error("Erro ao criar pagamento:", err);
        if (!cancelled) setStatus("error");
      }
    }

    createPayment();
    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [email, onApproved, stopPolling]);

  const handleCopy = async () => {
    if (!payment?.pixCode) return;
    await navigator.clipboard.writeText(payment.pixCode);
    setCopied(true);
    showNotification("success", "Código Pix copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="payment-modal__close" onClick={onClose} title="Fechar" type="button">
          <i className="bx bx-x" />
        </button>

        <h2 className="payment-modal__title">
          <i className="bx bxl-pix" /> Pagamento via Pix
        </h2>

        {status === "loading" && (
          <div className="payment-modal__loading">
            <div className="loading-spinner" />
            <p>Gerando cobrança...</p>
          </div>
        )}

        {status === "error" && (
          <p className="payment-modal__error">
            Não foi possível gerar a cobrança. Tente novamente em instantes.
          </p>
        )}

        {status === "expired" && (
          <p className="payment-modal__error">
            O tempo para pagamento expirou. Feche e tente novamente.
          </p>
        )}

        {status === "rejected" && (
          <p className="payment-modal__error">
            O pagamento foi recusado. Tente novamente.
          </p>
        )}

        {status === "pending" && payment && (
          <>
            <p className="payment-modal__amount">
              R$ {Number(payment.amount).toFixed(2).replace(".", ",")}
            </p>

            {payment.pixQrCodeBase64 && (
              <img
                className="payment-modal__qrcode"
                src={`data:image/png;base64,${payment.pixQrCodeBase64}`}
                alt="QR Code Pix"
              />
            )}

            <p className="payment-modal__hint">
              Escaneie o QR Code no app do seu banco, ou copie o código abaixo:
            </p>

            <div className="payment-modal__pix-code">
              <code>{payment.pixCode}</code>
              <button type="button" className="btn-add" onClick={handleCopy}>
                <i className={`bx ${copied ? "bx-check" : "bx-copy"}`} />
                {copied ? "Copiado!" : "Copiar código"}
              </button>
            </div>

            <div className="payment-modal__waiting">
              <div className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Aguardando confirmação do pagamento...
            </div>
          </>
        )}

        {status === "approved" && (
          <p className="payment-modal__success">
            <i className="bx bx-check-circle" /> Pagamento aprovado! Gerando seu PDF...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
