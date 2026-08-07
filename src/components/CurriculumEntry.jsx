import { useState } from "react";
import CurriculumEditor from "./CurriculumEditor";
import CurriculumWizard from "./CurriculumWizard";
import styles from "./CurriculumEntry.module.css";

/**
 * Ponto de entrada do editor de currículo. Decide entre 3 telas:
 *   - "choice": tela de escolha (manual vs. perguntas).
 *   - "wizard": o assistente de perguntas (CurriculumWizard).
 *   - "editor": o editor manual de sempre (CurriculumEditor).
 *
 * O resultado do wizard chega no editor via prop `initialData`
 * (ver a pequena mudança em CurriculumEditor.jsx: agora aceita essa
 * prop opcional e usa ela no lugar do initialValues padrão, quando
 * presente).
 *
 * Troque, no lugar onde hoje você renderiza <CurriculumEditor />
 * diretamente, para renderizar <CurriculumEntry /> no lugar - é a
 * única mudança necessária fora daqui.
 */
export default function CurriculumEntry() {
  const [mode, setMode] = useState("choice");
  const [wizardResult, setWizardResult] = useState(null);

  function handleWizardComplete(resumeData) {
    setWizardResult(resumeData);
    setMode("editor");
  }

  if (mode === "editor")
    return <CurriculumEditor initialData={wizardResult ?? undefined} />;

  if (mode === "wizard") {
    return (
      <CurriculumWizard
        onComplete={handleWizardComplete}
        onCancel={() => setMode("choice")}
      />
    );
  }

  return (
    <div className={styles.root}>
      <span className={styles.eyebrow}>CurriculoPro</span>
      <h1 className={styles.title}>Como você quer criar seu currículo?</h1>
      <p className={styles.subtitle}>
        Escolha o caminho que preferir - dá pra trocar de ideia e ajustar tudo
        depois, no editor.
      </p>

      <div className={styles.grid}>
        <button
          type="button"
          className={styles.optionCard}
          onClick={() => setMode("wizard")}
        >
          <span className={styles.badge}>Recomendado</span>
          <div className={styles.optionIcon}>
            <i className="bx bx-conversation" />
          </div>
          <span className={styles.optionTitle}>Responder perguntas</span>
          <span className={styles.optionDesc}>
            A gente te guia passo a passo com perguntas específicas e organiza
            tudo no currículo pra você.
          </span>
          <span className={styles.optionCta}>
            Começar <i className="bx bx-right-arrow-alt" />
          </span>
        </button>

        <button
          type="button"
          className={styles.optionCard}
          onClick={() => setMode("editor")}
        >
          <div className={styles.optionIcon}>
            <i className="bx bx-edit-alt" />
          </div>
          <span className={styles.optionTitle}>Preencher manualmente</span>
          <span className={styles.optionDesc}>
            Controle total sobre cada campo, direto no editor completo - ideal
            se você já sabe exatamente o que quer.
          </span>
          <span className={styles.optionCta}>
            Abrir editor <i className="bx bx-right-arrow-alt" />
          </span>
        </button>
      </div>
    </div>
  );
}
