import { useState, useEffect, useRef } from "react";
import ImageUploader from "./ImageUploader";
import { buildResumeFromAnswers } from "../utils/buildResumeFromAnswers";
import styles from "./CurriculumWizard.module.css";

const WIZARD_STORAGE_KEY = "curriculo-wizard-draft";
const SAVE_DEBOUNCE_MS = 400;

const LINK_PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", icon: "bxl-linkedin-square" },
  { id: "github", label: "GitHub", icon: "bxl-github" },
  { id: "portfolio", label: "Portfólio", icon: "bx-globe" },
];

/* ─── Áreas de atuação ─────────────────────────────────────── */
// Cada área ajusta só os EXEMPLOS mostrados (placeholders) — o dado
// salvo é sempre o texto que o usuário digitou, nunca o placeholder.
const AREA_OPTIONS = [
  {
    id: "dev",
    icon: "bx-code-alt",
    title: "Desenvolvedor(a)",
    desc: "Exemplos com stacks, repositórios e projetos técnicos.",
  },
  {
    id: "comercio",
    icon: "bx-store",
    title: "Comércio / Mercado",
    desc: "Exemplos para vendas, caixa, reposição, atacarejo.",
  },
  {
    id: "alimentacao",
    icon: "bx-food-menu",
    title: "Alimentação",
    desc: "Exemplos para lanchonete, restaurante, cozinha, atendimento.",
  },
  {
    id: "outra",
    icon: "bx-briefcase",
    title: "Outra área",
    desc: "Exemplos gerais, pra qualquer profissão.",
  },
];

const AREA_PLACEHOLDERS = {
  dev: {
    role: "Desenvolvedora Full Stack",
    objective:
      "Atuar como desenvolvedora Full Stack, criando soluções escaláveis e contribuindo em times ágeis...",
    course: "Análise e Desenvolvimento de Sistemas",
    skills: "React, Node.js, PostgreSQL...",
    expRole: "Desenvolvedora Jr",
    activities:
      "Desenvolvimento de features em React\nIntegração com APIs REST\nCorreção de bugs em produção",
  },
  comercio: {
    role: "Operador(a) de Caixa",
    objective:
      "Atuar na área de vendas e atendimento, contribuindo com organização, agilidade no caixa e bom relacionamento com o cliente...",
    course: "Ensino Médio Completo",
    skills:
      "Atendimento ao cliente, Operação de caixa, Reposição de estoque...",
    expRole: "Repositor(a)",
    activities:
      "Reposição e organização de produtos nas gôndolas\nConferência de validade e estoque\nAtendimento e orientação aos clientes",
  },
  alimentacao: {
    role: "Atendente de Lanchonete",
    objective:
      "Atuar na área de alimentação, com foco em atendimento rápido, boas práticas de higiene e trabalho em equipe...",
    course: "Ensino Médio Completo",
    skills:
      "Atendimento ao público, Preparo de alimentos, Higiene e segurança alimentar...",
    expRole: "Atendente de Balcão",
    activities:
      "Atendimento e montagem de pedidos\nOperação de caixa e controle de comandas\nLimpeza e organização da área de trabalho",
  },
  outra: {
    role: "Analista de Marketing",
    objective:
      "Atuar na área de marketing, aplicando análise de dados e criatividade para gerar resultados...",
    course: "Administração de Empresas",
    skills: "Excel avançado, Gestão de projetos...",
    expRole: "Analista",
    activities:
      "Atendimento a clientes\nOrganização de relatórios mensais\nSuporte à equipe de vendas",
  },
};

const EMPTY_EDUCATION = {
  course: "",
  institution: "",
  period: "",
  description: "",
};
const EMPTY_EXPERIENCE = {
  role: "",
  company: "",
  period: "",
  location: "",
  activitiesText: "",
};

const DEFAULT_ANSWERS = {
  area: "",
  photoUrl: "",
  displayName: "",
  fullName: "",
  role: "",
  email: "",
  phone: "",
  address: "",
  links: [],
  objective: "",
  education: [{ ...EMPTY_EDUCATION }],
  skills: [],
  experience: [{ ...EMPTY_EXPERIENCE }],
};

const STEP_COUNT = 10;

function loadWizardDraft() {
  try {
    const raw = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Assistente de perguntas e respostas - alternativa ao preenchimento
 * manual. Ao final, monta o currículo (buildResumeFromAnswers) e
 * entrega pro componente pai via onComplete(resumeData), que é quem
 * decide o que fazer com isso (ver CurriculumEntry.jsx - grava no
 * mesmo localStorage que o CurriculumEditor.jsx já lê sozinho).
 *
 * @param {(resumeData: object) => void} onComplete
 * @param {() => void} onCancel
 */
export default function CurriculumWizard({ onComplete, onCancel }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS);
  const [leaving, setLeaving] = useState(false);
  const [skillDraft, setSkillDraft] = useState("");
  const hasLoadedDraft = useRef(false);

  // Carrega o progresso salvo, uma vez só, no mount.
  useEffect(() => {
    const draft = loadWizardDraft();
    if (draft) {
      if (draft.answers) setAnswers({ ...DEFAULT_ANSWERS, ...draft.answers });
      if (typeof draft.step === "number") setStep(draft.step);
    }
    hasLoadedDraft.current = true;
  }, []);

  // Salva o progresso (debounced) a cada mudança - depois do load inicial,
  // pra não sobrescrever o rascunho salvo com o estado inicial vazio.
  useEffect(() => {
    if (!hasLoadedDraft.current) return;
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          WIZARD_STORAGE_KEY,
          JSON.stringify({ step, answers }),
        );
      } catch {
        /* localStorage indisponível - não é crítico */
      }
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [step, answers]);

  // Placeholders da área ativa - cai em "outra" se ainda não escolheu nada.
  const areaPlaceholders =
    AREA_PLACEHOLDERS[answers.area] ?? AREA_PLACEHOLDERS.outra;

  function update(field, value) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  function goNext() {
    if (!canGoNext()) return;
    setLeaving(true);
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
      setLeaving(false);
    }, 180);
  }

  function goBack() {
    if (step === 0) {
      onCancel?.();
      return;
    }
    setLeaving(true);
    setTimeout(() => {
      setStep((s) => Math.max(s - 1, 0));
      setLeaving(false);
    }, 180);
  }

  function canGoNext() {
    switch (step) {
      case 0:
        return Boolean(answers.area);
      case 2:
        return (
          answers.displayName.trim().length > 0 &&
          answers.role.trim().length > 0
        );
      case 3:
        return /\S+@\S+\.\S+/.test(answers.email);
      case 5:
        return answers.objective.trim().length >= 10;
      case 6:
        return answers.education.some((e) => e.course.trim().length > 0);
      default:
        return true;
    }
  }

  function handleFinish() {
    const resumeData = buildResumeFromAnswers(answers);
    try {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
    } catch {
      /* noop */
    }
    onComplete?.(resumeData);
  }

  // ---------- Formação (repetível) ----------
  function updateEducation(index, field, value) {
    setAnswers((prev) => {
      const next = [...prev.education];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, education: next };
    });
  }
  function addEducation() {
    setAnswers((prev) => ({
      ...prev,
      education: [...prev.education, { ...EMPTY_EDUCATION }],
    }));
  }
  function removeEducation(index) {
    setAnswers((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  // ---------- Experiência (repetível) ----------
  function updateExperience(index, field, value) {
    setAnswers((prev) => {
      const next = [...prev.experience];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, experience: next };
    });
  }
  function addExperience() {
    setAnswers((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...EMPTY_EXPERIENCE }],
    }));
  }
  function removeExperience(index) {
    setAnswers((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }

  // ---------- Links ----------
  function toggleLinkPlatform(platformId) {
    setAnswers((prev) => {
      const exists = prev.links.some((l) => l.platform === platformId);
      if (exists)
        return {
          ...prev,
          links: prev.links.filter((l) => l.platform !== platformId),
        };
      return {
        ...prev,
        links: [...prev.links, { platform: platformId, url: "" }],
      };
    });
  }
  function updateLinkUrl(platformId, url) {
    setAnswers((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.platform === platformId ? { ...l, url } : l,
      ),
    }));
  }

  // ---------- Skills ----------
  function addSkill() {
    const name = skillDraft.trim();
    if (!name || answers.skills.length >= 16) return;
    if (
      answers.skills.some((s) => s.name.toLowerCase() === name.toLowerCase())
    ) {
      setSkillDraft("");
      return;
    }
    setAnswers((prev) => ({
      ...prev,
      skills: [...prev.skills, { name, level: 3 }],
    }));
    setSkillDraft("");
  }
  function setSkillLevel(index, level) {
    setAnswers((prev) => {
      const next = [...prev.skills];
      next[index] = { ...next[index], level };
      return { ...prev, skills: next };
    });
  }
  function removeSkill(index) {
    setAnswers((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.stepLabel}>
            Passo {step + 1} de {STEP_COUNT}
          </span>
          <button type="button" className={styles.exitBtn} onClick={onCancel}>
            Sair
          </button>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
          />
        </div>
      </div>

      <div
        className={`${styles.card} ${leaving ? styles["card--leaving"] : ""}`}
      >
        {step === 0 && (
          <>
            <span className={styles.eyebrow}>Vamos começar</span>
            <h2 className={styles.title}>Qual é a sua área de atuação?</h2>
            <p className={styles.subtitle}>
              Isso só ajusta os exemplos que vamos te mostrar nas próximas
              perguntas.
            </p>
            <div className={styles.choiceGrid}>
              {AREA_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`${styles.choiceCard} ${answers.area === opt.id ? styles["choiceCard--active"] : ""}`}
                  onClick={() => update("area", opt.id)}
                >
                  <i className={`bx ${opt.icon} ${styles.choiceIcon}`} />
                  <span className={styles.choiceTitle}>{opt.title}</span>
                  <span className={styles.choiceDesc}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <span className={styles.eyebrow}>Sua foto</span>
            <h2 className={styles.title}>Quer adicionar uma foto?</h2>
            <p className={styles.subtitle}>
              Opcional - você pode pular e adicionar depois, direto no editor.
            </p>
            <div className={styles.photoUploadWrap}>
              <ImageUploader
                currentUrl={answers.photoUrl}
                onUploaded={(url) => update("photoUrl", url)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span className={styles.eyebrow}>Identificação</span>
            <h2 className={styles.title}>
              Como você quer ser identificado(a)?
            </h2>
            <p className={styles.subtitle}>
              O nome de exibição aparece em destaque no topo do currículo.
            </p>

            <div className={styles.field}>
              <label className={styles.label}>Nome completo</label>
              <input
                className={styles.input}
                value={answers.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Ana Clara Lima Souza"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                Nome de exibição (o que aparece em destaque)
              </label>
              <input
                className={styles.input}
                value={answers.displayName}
                onChange={(e) => update("displayName", e.target.value)}
                placeholder="Ana Clara Lima"
              />
              <span className={styles.hint}>
                Curto costuma ficar melhor visualmente - até 4 palavras.
              </span>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Cargo ou função desejada</label>
              <input
                className={styles.input}
                value={answers.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder={areaPlaceholders.role}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span className={styles.eyebrow}>Contato</span>
            <h2 className={styles.title}>
              Como recrutadores podem te encontrar?
            </h2>
            <p className={styles.subtitle}>Só o e-mail é obrigatório.</p>

            <div className={styles.field}>
              <label className={styles.label}>E-mail</label>
              <input
                className={styles.input}
                type="email"
                value={answers.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="voce@exemplo.com"
              />
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Telefone</label>
                <input
                  className={styles.input}
                  value={answers.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(11) 98765-4321"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Cidade / UF</label>
                <input
                  className={styles.input}
                  value={answers.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="São Paulo, SP"
                />
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <span className={styles.eyebrow}>Presença online</span>
            <h2 className={styles.title}>Tem algum link pra compartilhar?</h2>
            <p className={styles.subtitle}>
              Opcional - clique pra ativar cada um.
            </p>

            <div className={styles.linkToggleRow}>
              {LINK_PLATFORMS.map((platform) => {
                const active = answers.links.some(
                  (l) => l.platform === platform.id,
                );
                return (
                  <button
                    key={platform.id}
                    type="button"
                    className={`${styles.linkToggle} ${active ? styles["linkToggle--active"] : ""}`}
                    onClick={() => toggleLinkPlatform(platform.id)}
                  >
                    <i className={`bx ${platform.icon}`} />
                    {platform.label}
                  </button>
                );
              })}
            </div>

            {LINK_PLATFORMS.map((platform) => {
              const link = answers.links.find(
                (l) => l.platform === platform.id,
              );
              return (
                <div
                  key={platform.id}
                  className={`${styles.linkInputWrap} ${link ? styles["linkInputWrap--open"] : ""}`}
                >
                  <input
                    className={styles.input}
                    value={link?.url ?? ""}
                    onChange={(e) => updateLinkUrl(platform.id, e.target.value)}
                    placeholder={`URL do seu ${platform.label}`}
                  />
                </div>
              );
            })}
          </>
        )}

        {step === 5 && (
          <>
            <span className={styles.eyebrow}>Objetivo</span>
            <h2 className={styles.title}>
              O que você busca profissionalmente?
            </h2>
            <p className={styles.subtitle}>
              Em poucas frases - vamos ajustar o tamanho ideal pra caber bem no
              currículo.
            </p>
            <div className={styles.field}>
              <textarea
                className={styles.textarea}
                value={answers.objective}
                onChange={(e) =>
                  update("objective", e.target.value.slice(0, 500))
                }
                placeholder={areaPlaceholders.objective}
              />
              <span className={styles.charCount}>
                {answers.objective.length}/500
              </span>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <span className={styles.eyebrow}>Formação</span>
            <h2 className={styles.title}>Qual sua formação acadêmica?</h2>
            <p className={styles.subtitle}>
              Curso técnico, graduação, o que for mais relevante.
            </p>

            {answers.education.map((edu, index) => (
              <div key={index} className={styles.repeatBlock}>
                <div className={styles.repeatBlockHeader}>
                  <span className={styles.repeatBlockTitle}>
                    Formação {index + 1}
                  </span>
                  {answers.education.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeBlockBtn}
                      onClick={() => removeEducation(index)}
                      aria-label="Remover"
                    >
                      <i className="bx bx-trash" />
                    </button>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Curso</label>
                  <input
                    className={styles.input}
                    value={edu.course}
                    onChange={(e) =>
                      updateEducation(index, "course", e.target.value)
                    }
                    placeholder={areaPlaceholders.course}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Instituição</label>
                    <input
                      className={styles.input}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      placeholder="FATEC"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Período</label>
                    <input
                      className={styles.input}
                      value={edu.period}
                      onChange={(e) =>
                        updateEducation(index, "period", e.target.value)
                      }
                      placeholder="2021 - 2023"
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Descrição (opcional)</label>
                  <input
                    className={styles.input}
                    value={edu.description}
                    onChange={(e) =>
                      updateEducation(index, "description", e.target.value)
                    }
                    placeholder="Ênfase em desenvolvimento web"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className={styles.addBlockBtn}
              onClick={addEducation}
            >
              <i className="bx bx-plus" /> Adicionar outra formação
            </button>
          </>
        )}

        {step === 7 && (
          <>
            <span className={styles.eyebrow}>Competências</span>
            <h2 className={styles.title}>
              Quais são suas principais competências?
            </h2>
            <p className={styles.subtitle}>
              Adicione uma de cada vez e marque seu nível de domínio.
            </p>

            <div className={styles.skillAddRow}>
              <input
                className={styles.input}
                value={skillDraft}
                onChange={(e) => setSkillDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder={areaPlaceholders.skills}
              />
              <button
                type="button"
                className={`${styles.btn} ${styles["btn--primary"]}`}
                onClick={addSkill}
              >
                Adicionar
              </button>
            </div>

            <div className={styles.skillList}>
              {answers.skills.map((skill, index) => (
                <div key={skill.name} className={styles.skillItem}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={styles.skillDots}>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          type="button"
                          className={`${styles.skillDot} ${level <= skill.level ? styles["skillDot--filled"] : ""}`}
                          onClick={() => setSkillLevel(index, level)}
                          aria-label={`Nível ${level}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.skillRemove}
                      onClick={() => removeSkill(index)}
                      aria-label="Remover"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 8 && (
          <>
            <span className={styles.eyebrow}>Experiência</span>
            <h2 className={styles.title}>
              Conte sobre suas experiências profissionais
            </h2>
            <p className={styles.subtitle}>
              Se for seu primeiro emprego, pode deixar em branco e seguir em
              frente.
            </p>

            {answers.experience.map((exp, index) => (
              <div key={index} className={styles.repeatBlock}>
                <div className={styles.repeatBlockHeader}>
                  <span className={styles.repeatBlockTitle}>
                    Experiência {index + 1}
                  </span>
                  {answers.experience.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeBlockBtn}
                      onClick={() => removeExperience(index)}
                      aria-label="Remover"
                    >
                      <i className="bx bx-trash" />
                    </button>
                  )}
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Cargo</label>
                    <input
                      className={styles.input}
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(index, "role", e.target.value)
                      }
                      placeholder={areaPlaceholders.expRole}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Empresa</label>
                    <input
                      className={styles.input}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Período</label>
                    <input
                      className={styles.input}
                      value={exp.period}
                      onChange={(e) =>
                        updateExperience(index, "period", e.target.value)
                      }
                      placeholder="2023 - atual"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Local</label>
                    <input
                      className={styles.input}
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(index, "location", e.target.value)
                      }
                      placeholder="Remoto"
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Principais atividades - uma por linha
                  </label>
                  <textarea
                    className={styles.textarea}
                    value={exp.activitiesText}
                    onChange={(e) =>
                      updateExperience(index, "activitiesText", e.target.value)
                    }
                    placeholder={areaPlaceholders.activities}
                  />
                  <span className={styles.hint}>
                    Cada linha vira um item da sua experiência - no máximo 6
                    serão usados.
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              className={styles.addBlockBtn}
              onClick={addExperience}
            >
              <i className="bx bx-plus" /> Adicionar outra experiência
            </button>
          </>
        )}

        {step === 9 && (
          <>
            <div className={styles.successPulse}>
              <i className="bx bx-check" />
            </div>
            <h2 className={styles.title} style={{ textAlign: "center" }}>
              Tudo pronto, {answers.displayName || "tudo certo"}!
            </h2>
            <p className={styles.subtitle} style={{ textAlign: "center" }}>
              Confirme os dados abaixo - você ainda pode ajustar tudo no editor
              depois.
            </p>

            <div className={styles.reviewGrid}>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Nome</span>
                <span className={styles.reviewValue}>
                  {answers.displayName || "—"}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Cargo</span>
                <span className={styles.reviewValue}>
                  {answers.role || "—"}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>E-mail</span>
                <span className={styles.reviewValue}>
                  {answers.email || "—"}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Formações</span>
                <span className={styles.reviewValue}>
                  {answers.education.filter((e) => e.course).length}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Competências</span>
                <span className={styles.reviewValue}>
                  {answers.skills.length}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Experiências</span>
                <span className={styles.reviewValue}>
                  {answers.experience.filter((e) => e.role || e.company).length}
                </span>
              </div>
            </div>
          </>
        )}

        <div className={styles.navRow}>
          <button
            type="button"
            className={`${styles.btn} ${styles["btn--ghost"]}`}
            onClick={goBack}
          >
            {step === 0 ? "Cancelar" : "Voltar"}
          </button>

          {step === STEP_COUNT - 1 ? (
            <button
              type="button"
              className={`${styles.btn} ${styles["btn--primary"]}`}
              onClick={handleFinish}
            >
              Gerar currículo <i className="bx bx-right-arrow-alt" />
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles["btn--primary"]}`}
              onClick={goNext}
              disabled={!canGoNext()}
            >
              Continuar <i className="bx bx-right-arrow-alt" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
