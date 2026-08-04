import { useMemo, useState, useEffect } from "react";
import "./paymentModal.css";
import { PaymentWidget } from "@payment-system-mp/react-widget";

const API_URL = "https://resume-generation-payment.vercel.app";
const PAYMENT_AMOUNT = 5.0;

// Tempo máximo esperando a publicKey chegar antes de assumir que algo
// deu errado e mostrar o estado de erro — evita spinner infinito caso
// o fetch de /config trave de um jeito que não caia no catch (ex: uma
// promise que nunca resolve nem rejeita).
const CONFIG_TIMEOUT_MS = 8000;

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
 *
 * onRetry (opcional): chamado quando o usuário clica em "Tentar novamente"
 * no estado de erro/timeout. O CurriculumEditor deve repassar aqui a mesma
 * função que dispara o fetch de /config, para permitir uma nova tentativa
 * manual sem precisar fechar e reabrir o modal.
 */
const PaymentModal = ({
  publicKey,
  email,
  configError,
  onApproved,
  onClose,
  onRetry,
}) => {
  // externalReference precisa ser gerado uma única vez por sessão de
  // pagamento, não a cada re-render - senão o widget acha que é uma nova
  // cobrança em todo re-render do formulário pai.
  const externalReference = useMemo(() => `curriculo-${Date.now()}`, []);

  const [timedOut, setTimedOut] = useState(false);

  // Watchdog: se depois de CONFIG_TIMEOUT_MS ainda não tivermos nem
  // publicKey nem configError, tratamos como falha e liberamos o botão
  // de retry — assim o usuário nunca fica travado num spinner eterno.
  useEffect(() => {
    if (publicKey || configError) {
      setTimedOut(false);
      return;
    }

    const timer = setTimeout(() => setTimedOut(true), CONFIG_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [publicKey, configError]);

  const hasError = Boolean(configError) || timedOut;

  const handleRetry = () => {
    setTimedOut(false);
    onRetry?.();
  };

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

        {hasError ? (
          <div className="payment-modal-panel__error">
            <i className="bx bx-error-circle" />
            <p>
              Não foi possível carregar o pagamento. Tente novamente em alguns
              instantes.
            </p>
            {onRetry && (
              <button type="button" className="btn-add" onClick={handleRetry}>
                <i className="bx bx-refresh" /> Tentar novamente
              </button>
            )}
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
