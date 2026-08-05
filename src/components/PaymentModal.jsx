import { useMemo, useState, useEffect } from "react";
import "./paymentModal.css";
import { PaymentWidget } from "@payment-system-mp/react-widget";

const API_URL = "https://resume-generation-payment.vercel.app";
const PAYMENT_AMOUNT = Number(import.meta.env.VITE_PAYMENT_AMOUNT ?? 5.0);

// Tempo máximo esperando a publicKey chegar antes de assumir que algo
// deu errado e mostrar o estado de erro — evita spinner infinito caso
// o fetch de /config trave de um jeito que não caia no catch.
const CONFIG_TIMEOUT_MS = 8000;

// Tempo que a mensagem "Pagamento aprovado!" fica visível antes de
// avisar o CurriculumEditor pra seguir com a geração do PDF - dá tempo
// da pessoa realmente ler a confirmação, em vez de sumir na hora.
const APPROVED_TRANSITION_MS = 1600;

const SUPPORT_PHONE_DISPLAY = "+55 81 9 9936-7426";
const SUPPORT_WHATSAPP_LINK = "https://wa.me/5581999367426";

/**
 * Página cheia de pagamento (não é mais um modal centralizado).
 *
 * Duas colunas: à esquerda, o resumo do pedido + conteúdo de confiança
 * (segurança, contato de suporte) pensado pra reduzir a ansiedade de
 * quem está prestes a digitar dados de pagamento. À direita, o widget
 * oficial de checkout, ou a tela de sucesso após a aprovação.
 *
 * A cor de destaque e o tema claro/escuro são lidos das variáveis CSS
 * do próprio app (--accent e o atributo data-theme), então a página
 * acompanha automaticamente o tema que a pessoa já escolheu no editor.
 *
 * onRetry (opcional): chamado quando o usuário clica em "Tentar novamente"
 * no estado de erro/timeout - deve refazer o fetch de /config.
 */
const PaymentModal = ({
  publicKey,
  email,
  configError,
  onApproved,
  onClose,
  onRetry,
}) => {
  const externalReference = useMemo(() => `curriculo-${Date.now()}`, []);

  const [timedOut, setTimedOut] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [accentColor, setAccentColor] = useState("#4f46e5");
  const [widgetTheme, setWidgetTheme] = useState("light");

  // Lê o tema ativo (claro/escuro) e a cor de destaque direto do CSS do
  // app, uma vez, ao montar - o widget precisa de valores concretos
  // (não entende "var(--accent)"), então resolvemos isso aqui.
  useEffect(() => {
    const dataTheme = document.documentElement.getAttribute("data-theme");
    setWidgetTheme(dataTheme && dataTheme.startsWith("dark") ? "dark" : "light");

    const computedAccent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    if (computedAccent) setAccentColor(computedAccent);
  }, []);

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

  const handleApproved = (payment) => {
    setIsApproved(true);
    setTimeout(() => onApproved?.(payment.id), APPROVED_TRANSITION_MS);
  };

  return (
    <div
      className="payment-page"
      role="dialog"
      aria-modal="true"
      aria-label="Pagamento para exportar currículo em PDF"
    >
      <header className="payment-page__topbar">
        <span className="payment-page__brand">
          <i className="bx bxs-file-doc" /> Gerador de Currículos
        </span>
        {!isApproved && (
          <button
            type="button"
            className="payment-page__back"
            onClick={onClose}
            title="Voltar para o editor"
          >
            <i className="bx bx-arrow-back" /> Voltar para o editor
          </button>
        )}
      </header>

      <div className="payment-page__body">
        {/* Coluna esquerda: contexto, resumo e confiança */}
        <div className="payment-page__info">
          <span className="payment-page__eyebrow">Exportar PDF</span>
          <h1 className="payment-page__title">Finalizar pagamento</h1>
          <p className="payment-page__lead">
            Fique à vontade pra conferir cada informação com calma antes de
            confirmar — não tem nenhuma pressa aqui.
          </p>

          <div className="payment-page__order">
            <div className="payment-page__order-row">
              <span>Geração de currículo em PDF</span>
              <strong>R$ {PAYMENT_AMOUNT.toFixed(2).replace(".", ",")}</strong>
            </div>
            <ul className="payment-page__order-list">
              <li>
                <i className="bx bx-check" /> PDF em alta qualidade, pronto
                para enviar
              </li>
              <li>
                <i className="bx bx-check" /> Modelo e paleta de cor que você
                escolheu
              </li>
              <li>
                <i className="bx bx-check" /> Liberado automaticamente após a
                aprovação
              </li>
            </ul>
          </div>

          <div className="payment-page__reassurance">
            <h2>
              <i className="bx bxs-shield-alt-2" /> Seus dados estão seguros
            </h2>
            <ul>
              <li>
                O pagamento é processado direto pelo Mercado Pago — a gente
                nunca vê nem guarda o número do seu cartão.
              </li>
              <li>
                Os dados do seu currículo continuam só no seu navegador; só o
                pagamento sai daqui.
              </li>
              <li>
                Sem assinatura, sem cobrança escondida: é só esse valor, uma
                única vez.
              </li>
            </ul>
          </div>

          <div className="payment-page__support">
            <i className="bx bxl-whatsapp" />
            <div>
              <strong>Prefere tirar dúvidas antes?</strong>
              <p>
                Chama a gente no WhatsApp — é o número real de quem mantém
                esse projeto:{" "}
                <a href={SUPPORT_WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Coluna direita: widget de checkout, erro, loading ou sucesso */}
        <div className="payment-page__widget">
          {isApproved ? (
            <div className="payment-page__success">
              <div className="payment-page__success-icon">
                <i className="bx bx-check" />
              </div>
              <h2>Pagamento aprovado!</h2>
              <p>
                Muito obrigado. Já estamos preparando o seu PDF — isso leva só
                alguns segundos.
              </p>
              <p className="payment-page__success-note">
                Se o download não começar sozinho, ou se alguma coisa parecer
                estranha, chama a gente no WhatsApp:{" "}
                <a href={SUPPORT_WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          ) : hasError ? (
            <div className="payment-page__error">
              <i className="bx bx-error-circle" />
              <p>
                Não foi possível carregar o pagamento. Tente novamente em
                alguns instantes.
              </p>
              {onRetry && (
                <button type="button" className="btn-add" onClick={handleRetry}>
                  <i className="bx bx-refresh" /> Tentar novamente
                </button>
              )}
              <p className="payment-page__error-support">
                Se o problema continuar, fala com a gente no WhatsApp:{" "}
                <a href={SUPPORT_WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          ) : !publicKey ? (
            <div className="payment-page__loading">
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
              theme={widgetTheme}
              accentColor={accentColor}
              onPaymentApproved={handleApproved}
              onError={(err) => console.error("Erro no pagamento:", err)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;