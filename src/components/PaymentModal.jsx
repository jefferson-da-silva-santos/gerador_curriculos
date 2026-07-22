// ARQUIVO: PaymentModal.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { showNotification } from "../utils/notyf";

const API_URL = "https://resume-generation-payment.vercel.app";
const POLL_INTERVAL_MS = 3000;

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

// Máscara simples de CPF/CNPJ para exibição - não valida dígito
// verificador (isso já é feito no backend); só melhora a legibilidade
// enquanto a pessoa digita.
function formatDocument(value) {
  const digits = onlyDigits(value).slice(0, 14);

  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

/**
 * Modal de cobrança Pix. Primeiro coleta nome e CPF/CNPJ do pagador
 * (exigidos pela API de pagamentos), depois cria a cobrança, mostra
 * QR Code + copia-e-cola, e faz polling do status até aprovar (ou expirar).
 *
 * Uso:
 *   <PaymentModal
 *     email={values.contact.email}
 *     onApproved={(paymentId) => { ... segue com a geração do PDF }}
 *     onClose={() => setShowPayment(false)}
 *   />
 */
const PaymentModal = ({ email, onApproved, onClose }) => {
  // step: "form" | "loading" | "pending" | "approved" | "expired" | "rejected" | "error"
  const [step, setStep] = useState("form");
  const [payment, setPayment] = useState(null); // { paymentId, pixCode, pixQrCodeBase64, amount }
  const [copied, setCopied] = useState(false);
  const pollRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [formError, setFormError] = useState(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => stopPolling, [stopPolling]);

  const startPolling = useCallback(
    (paymentId) => {
      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(`${API_URL}/pagamento/status/${paymentId}`);
          if (!statusRes.ok) return;
          const statusData = await statusRes.json();

          if (statusData.status === "approved") {
            stopPolling();
            setStep("approved");
            onApproved?.(paymentId);
          } else if (statusData.status === "expired" || statusData.status === "rejected") {
            stopPolling();
            setStep(statusData.status);
          }
        } catch {
          // Falha pontual de rede no polling não é crítica - tenta de novo no próximo tick
        }
      }, POLL_INTERVAL_MS);
    },
    [onApproved, stopPolling]
  );

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setFormError(null);

    const digits = onlyDigits(document);
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setFormError("Informe nome e sobrenome completos.");
      return;
    }
    if (digits.length !== 11 && digits.length !== 14) {
      setFormError("CPF deve ter 11 dígitos (ou CNPJ, 14 dígitos).");
      return;
    }

    setStep("loading");

    try {
      const res = await fetch(`${API_URL}/pagamento/criar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          document: digits,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error || "Falha ao gerar a cobrança.");
      }

      const data = await res.json();
      setPayment(data);

      if (data.status === "approved") {
        setStep("approved");
        onApproved?.(data.paymentId);
        return;
      }

      setStep("pending");
      startPolling(data.paymentId);
    } catch (err) {
      console.error("Erro ao criar pagamento:", err.message);
      setStep("error");
    }
  };

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

        {step === "form" && (
          <form className="payment-modal__form" onSubmit={handleSubmitForm}>
            <p className="payment-modal__hint">
              Precisamos do seu nome e CPF para emitir a cobrança Pix.
            </p>

            <label className="payment-modal__field">
              Nome
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ana"
                required
              />
            </label>

            <label className="payment-modal__field">
              Sobrenome
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Silva"
                required
              />
            </label>

            <label className="payment-modal__field">
              CPF ou CNPJ
              <input
                type="text"
                inputMode="numeric"
                value={formatDocument(document)}
                onChange={(e) => setDocument(onlyDigits(e.target.value))}
                placeholder="000.000.000-00"
                maxLength={18}
                required
              />
            </label>

            {formError && <p className="payment-modal__error">{formError}</p>}

            <button type="submit" className="btn-add">
              Gerar Pix
            </button>
          </form>
        )}

        {step === "loading" && (
          <div className="payment-modal__loading">
            <div className="loading-spinner" />
            <p>Gerando cobrança...</p>
          </div>
        )}

        {step === "error" && (
          <p className="payment-modal__error">
            Não foi possível gerar a cobrança. Tente novamente em instantes.
          </p>
        )}

        {step === "expired" && (
          <p className="payment-modal__error">
            O tempo para pagamento expirou. Feche e tente novamente.
          </p>
        )}

        {step === "rejected" && (
          <p className="payment-modal__error">
            O pagamento foi recusado. Tente novamente.
          </p>
        )}

        {step === "pending" && payment && (
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

        {step === "approved" && (
          <p className="payment-modal__success">
            <i className="bx bx-check-circle" /> Pagamento aprovado! Gerando seu PDF...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
