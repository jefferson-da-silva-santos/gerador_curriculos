import { useState, useEffect } from "react";
import { PaymentWidget } from "@payment-system-mp/react-widget";
import { showNotification } from "../utils/notyf";
import "./paymentModal.css";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const PAYMENT_AMOUNT = Number(import.meta.env.VITE_PAYMENT_AMOUNT ?? 5.0);

/**
 * Modal que hospeda o <PaymentWidget> oficial. O widget fala apenas com
 * o NOSSO backend (nunca direto com o payment-system-mp) - por isso
 * buscamos a publicKey em {API_URL}/config antes de renderizar.
 *
 * onApproved recebe o id do pagamento no payment-system-mp, que é o
 * mesmo "paymentId" que o backend valida em /gerar-curriculo antes de
 * liberar o PDF.
 */
const PaymentWidgetSection = ({ email, onApproved, onClose }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [configError, setConfigError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/config`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!data?.publicKey) throw new Error("publicKey ausente na resposta.");
        setPublicKey(data.publicKey);
      })
      .catch((err) => {
        console.error("Erro ao buscar configuração de pagamento:", err);
        if (!cancelled) setConfigError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal payment-modal--widget">
        <button
          className="payment-modal__close"
          onClick={onClose}
          title="Fechar"
          type="button"
        >
          <i className="bx bx-x" />
        </button>

        {configError && (
          <p className="payment-modal__error">
            Não foi possível carregar o pagamento agora. Tente novamente em instantes.
          </p>
        )}

        {!configError && !publicKey && (
          <div className="payment-modal__loading">
            <div className="loading-spinner" />
            <p>Carregando pagamento...</p>
          </div>
        )}

        {publicKey && (
          <PaymentWidget
            apiBaseUrl={API_URL}
            publicKey={publicKey}
            amount={PAYMENT_AMOUNT}
            description="Geração de currículo em PDF"
            externalReference={`curriculo-${Date.now()}`}
            methods={["PIX", "CREDIT_CARD", "DEBIT_CARD"]}
            payer={email ? { email } : {}}
            theme="light"
            accentColor="var(--accent, #4f46e5)"
            onPaymentApproved={(payment) => {
              showNotification("success", "Pagamento aprovado!");
              onApproved?.(payment.id);
            }}
            onError={(err) => {
              console.error("Erro no pagamento:", err);
              showNotification("error", "Falha ao processar o pagamento. Tente novamente.");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentWidgetSection;
