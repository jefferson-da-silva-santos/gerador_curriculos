import { useState, useEffect } from "react";
import styles from "./GeneratingOverlay.module.css";

const MESSAGES = [
  "Organizando suas informações…",
  "Aplicando o modelo escolhido…",
  "Ajustando fontes e cores…",
  "Formatando para PDF…",
  "Quase lá…",
];

const MESSAGE_INTERVAL_MS = 1800;

/**
 * Overlay animado exibido enquanto o PDF é gerado no backend
 * (Puppeteer). Puramente decorativo/informativo - não representa
 * progresso real medido (a geração é uma única requisição), só dá a
 * sensação de que algo está acontecendo em etapas, o que reduz a
 * ansiedade de esperar uma barra de carregamento parada.
 */
export default function GeneratingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.blob} aria-hidden="true" />

      <div className={styles.card}>
        <div className={styles.docPage} aria-hidden="true">
          <div className={styles.docHeader}>
            <span className={styles.docAvatar} />
            <div className={styles.docHeaderLines}>
              <span className={`${styles.docLine} ${styles.docLineTitle}`} />
              <span className={`${styles.docLine} ${styles.docLineSub}`} />
            </div>
          </div>
          <div className={styles.docBody}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={styles.docLine} />
            ))}
          </div>
          <div className={styles.docCheck}>
            <i className="bx bx-check" />
          </div>
        </div>
      </div>

      <p className={styles.message} key={messageIndex}>
        {MESSAGES[messageIndex]}
      </p>

      <div className={styles.progressDots} aria-hidden="true">
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === messageIndex ? styles.dotActive : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
