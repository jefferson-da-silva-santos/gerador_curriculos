import { useMemo } from "react";
import "./paymentModal.css";
import { PaymentWidget } from "@payment-system-mp/react-widget";

const API_URL = "https://resume-generation-payment.vercel.app";
const PAYMENT_AMOUNT = 5.0;

// Hex "de verdade" em vez de uma CSS var: o widget monta um tema do MUI
// internamente (cálculo de contraste, variações de tom etc.), e isso
// precisa de uma cor concreta - "var(--accent)" não resolve dentro do
// JS do widget, só dentro do CSS deste app.
const ACCENT_COLOR = "#818cf8";

/**
 * Painel de pagamento centralizado na tela.
 *
 * Substitui o antigo <PaymentWidgetSection>: em vez de um modal próprio
 * com sua própria lógica de carregamento, este componente já recebe a
 * publicKey pronta (pré-carregada no CurriculumEditor) e apenas monta o
 * <PaymentWidget> da lib @payment-system-mp/react-widget dentro de um
 * overlay que centraliza o conteúdo na tela.
 */
const PaymentModal = ({
  publicKey,
  email,
  configError,
  onApproved,
  onClose,
}) => {
  // externalReference precisa ser gerado uma única vez por sessão de
  // pagamento, não a cada re-render - senão o widget acha que é uma nova
  // cobrança em todo re-render do formulário pai.
  const externalReference = useMemo(() => `curriculo-${Date.now()}`, []);

  return (
    <div
      className="payment-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Pagamento para exportar currículo em PDF"
      onClick={onClose}
    >
      <div className="payment-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="payment-modal-panel__close"
          onClick={onClose}
          aria-label="Fechar"
          title="Fechar"
        >
          <i className="bx bx-x" />
        </button>

        <div className="payment-modal-panel__header">
          <span className="payment-modal-panel__eyebrow">Exportar PDF</span>
          <h2 className="payment-modal-panel__title">Finalizar pagamento</h2>
        </div>

        {configError ? (
          <div className="payment-modal-panel__error">
            <i className="bx bx-error-circle" />
            <p>
              Não foi possível carregar o pagamento. Tente novamente em alguns
              instantes.
            </p>
          </div>
        ) : !publicKey ? (
          <div className="payment-modal-panel__loading">
            <div className="loading-spinner" />
            <p>Carregando pagamento…</p>
          </div>
        ) : (
          <PaymentWidget
            apiBaseUrl={API_URL}
            publicKey={publicKey}
            amount={PAYMENT_AMOUNT}
            description="Geração de currículo em PDF"
            externalReference={externalReference}
            methods={["PIX", "CREDIT_CARD", "DEBIT_CARD"]}
            payer={email ? { email } : {}}
            theme="light"
            accentColor={ACCENT_COLOR}
            onPaymentApproved={(payment) => onApproved?.(payment.id)}
            onError={(err) => console.error("Erro no pagamento:", err)}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
