import "./paymentModal.css";
import { PaymentWidget } from "@payment-system-mp/react-widget";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const PAYMENT_AMOUNT = Number(import.meta.env.VITE_PAYMENT_AMOUNT ?? 5.0);

// Hex "de verdade" em vez de uma CSS var: o widget monta um tema do MUI
// internamente (cálculo de contraste, variações de tom etc.), e isso
// precisa de uma cor concreta - "var(--accent)" não resolve dentro do
// JS do widget, só dentro do CSS deste app.
const ACCENT_COLOR = "#4f46e5";

/**
 * Modal de pagamento em duas colunas — resumo do pedido + o widget
 * oficial de checkout (Pix, cartão de crédito/débito).
 *
 * O <PaymentWidget> é SEMPRE montado, sem condição - a publicKey é
 * recebida pronta via prop (buscada assim que o CurriculumEditor monta,
 * não quando este modal abre), então na prática ela já está disponível
 * quando o usuário chega até aqui. Os avisos de erro/carregando ficam
 * como informação complementar acima do widget, não como gate.
 *
 * Uso:
 *   <PaymentWidgetSection
 *     publicKey={paymentPublicKey}
 *     configError={paymentConfigError}
 *     email={pendingExport?.email}
 *     onApproved={(paymentId) => { ... segue com a geração do PDF }}
 *     onClose={() => setShowPaymentModal(false)}
 *   />
 */
const PaymentWidgetSection = ({
  publicKey,
  configError,
  email,
  onApproved,
  onClose,
}) => {
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal payment-modal--split">
        <button
          className="payment-modal__close"
          onClick={onClose}
          title="Fechar"
          type="button"
        >
          <i className="bx bx-x" />
        </button>

        <PaymentWidget
          apiBaseUrl={API_URL}
          publicKey={publicKey}
          amount={PAYMENT_AMOUNT}
          description="Geração de currículo em PDF"
          externalReference={`curriculo-${Date.now()}`}
          methods={["PIX", "CREDIT_CARD", "DEBIT_CARD"]}
          payer={email ? { email } : {}}
          theme="light"
          accentColor={ACCENT_COLOR}
          onPaymentApproved={(payment) => onApproved?.(payment.id)}
          onError={(err) => console.error("Erro no pagamento:", err)}
        />
      </div>
    </div>
  );
};

export default PaymentWidgetSection;
