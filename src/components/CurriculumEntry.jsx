import { useState } from "react";
import CurriculumEditor from "./CurriculumEditor";
import CurriculumWizard from "./CurriculumWizard";
import styles from "./CurriculumEntry.module.css";

// Precisa ser a MESMA chave usada em CurriculumEditor.jsx (DRAFT_STORAGE_KEY)
// e em FormikAutosave - é assim que sabemos se já existe progresso real
// salvo, pra pular a tela de escolha e ir direto pro editor.
const EDITOR_DRAFT_KEY = "curriculo-editor-draft";

function hasExistingDraft() {
  try {
    return Boolean(localStorage.getItem(EDITOR_DRAFT_KEY));
  } catch {
    return false;
  }
}

/**
 * Ponto de entrada do editor de currículo. Decide entre 3 telas:
 *   - "choice": tela de escolha (manual vs. perguntas) - só aparece
 *     pra quem ainda não tem NENHUM progresso salvo.
 *   - "wizard": o assistente de perguntas.
 *   - "editor": o editor manual (recebe os dados do wizard via prop
 *     `initialData`, ou carrega um rascunho salvo sozinho).
 *
 * Troque, no lugar onde hoje você renderiza <CurriculumEditor />
 * diretamente, para renderizar <CurriculumEntry /> no lugar.
 */
export default function CurriculumEntry() {
  const [mode, setMode] = useState(() => (hasExistingDraft() ? "editor" : "choice"));
  const [wizardResult, setWizardResult] = useState(null);

  function handleWizardComplete(resumeData) {
    setWizardResult(resumeData);
    setMode("editor");
  }

  if (mode === "editor") return <CurriculumEditor initialData={wizardResult ?? undefined} />;

  if (mode === "wizard") {
    return <CurriculumWizard onComplete={handleWizardComplete} onCancel={() => setMode("choice")} />;
  }

  return (
    <div className={styles.root}>
      <span className={styles.eyebrow}>CurriculoPro</span>
      <h1 className={styles.title}>Como você quer criar seu currículo?</h1>
      <p className={styles.subtitle}>
        Escolha o caminho que preferir - dá pra trocar de ideia e ajustar tudo depois, no editor.
      </p>

      <div className={styles.grid}>
        <button type="button" className={styles.optionCard} onClick={() => setMode("wizard")}>
          <span className={styles.badge}>Recomendado</span>
          <div className={styles.optionIcon}>
            <i className="bx bx-conversation" />
          </div>
          <span className={styles.optionTitle}>Responder perguntas</span>
          <span className={styles.optionDesc}>
            A gente te guia passo a passo com perguntas específicas e organiza tudo no currículo pra você.
          </span>
          <span className={styles.optionCta}>
            Começar <i className="bx bx-right-arrow-alt" />
          </span>
        </button>

        <button type="button" className={styles.optionCard} onClick={() => setMode("editor")}>
          <div className={styles.optionIcon}>
            <i className="bx bx-edit-alt" />
          </div>
          <span className={styles.optionTitle}>Preencher manualmente</span>
          <span className={styles.optionDesc}>
            Controle total sobre cada campo, direto no editor completo - ideal se você já sabe exatamente o que quer.
          </span>
          <span className={styles.optionCta}>
            Abrir editor <i className="bx bx-right-arrow-alt" />
          </span>
        </button>
      </div>
    </div>
  );
}