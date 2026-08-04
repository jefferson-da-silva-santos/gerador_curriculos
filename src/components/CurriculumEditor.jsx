import { useState, useEffect, useCallback, useMemo } from "react";
import { Formik, Field, Form, FieldArray, useFormikContext } from "formik";
import CurriculumPreview from "./CurriculumPreview";
import CurriculumStyles from "./CurriculumStyles";
import ImageUploader from "./ImageUploader";
import PaymentWidgetSection from "./PaymentWidgetSection";
import FormikPersist from "./FormikPersist";
import {
  Autocomplete as MuiAutocomplete,
  TextField as MuiTextField,
  Slider as MuiSlider,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  FormControl as MuiFormControl,
} from "@mui/material";
import "./editorMui.css";
import useTheme from "../hooks/useTheme";
import useFont from "../hooks/useFont";
import { renderToString } from "react-dom/server";

/* ─── Constants ────────────────────────────────────────────── */
const ICON_OPTIONS = [
  { id: 1, name: "Link Padrão", class: "bx-link-alt" },
  { id: 2, name: "LinkedIn", class: "bxl-linkedin-square" },
  { id: 3, name: "GitHub", class: "bxl-github" },
  { id: 4, name: "Website/Portfólio", class: "bx-globe" },
  { id: 5, name: "Email", class: "bx-envelope" },
  { id: 6, name: "Telefone/WhatsApp", class: "bxl-whatsapp" },
  { id: 7, name: "Twitter/X", class: "bxl-twitter" },
  { id: 8, name: "Facebook", class: "bxl-facebook-square" },
  { id: 9, name: "Instagram", class: "bxl-instagram-alt" },
  { id: 10, name: "Stack Overflow", class: "bxl-stack-overflow" },
  { id: 11, name: "Medium", class: "bxl-medium-square" },
];

const SECTIONS = [
  { id: "labels", icon: "bx-text", tip: "Títulos" },
  { id: "personal", icon: "bx-user", tip: "Pessoal" },
  { id: "objective", icon: "bx-target-lock", tip: "Objetivo" },
  { id: "education", icon: "bx-book-open", tip: "Formação" },
  { id: "skills", icon: "bx-code-alt", tip: "Competências" },
  { id: "experience", icon: "bx-briefcase", tip: "Experiência" },
];

const THEMES = ["light", "dark-default", "dark-slate"];
const THEME_ICONS = {
  light: "bx-sun",
  "dark-default": "bx-moon",
  "dark-slate": "bxs-moon",
};
const THEME_LABELS = {
  light: "Claro",
  "dark-default": "Escuro",
  "dark-slate": "Escuro Slate",
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const MAX_HTML_SIZE = 2 * 1024 * 1024; // 2 MB safety limit

// Chave usada tanto aqui (carregar) quanto no <FormikPersist> (salvar).
const DRAFT_STORAGE_KEY = "curriculo-editor-draft";

// Chave para persistir o tema da INTERFACE do editor (claro/escuro/slate) -
// diferente do tema de cor do currículo em si (que já é salvo dentro do
// próprio rascunho do Formik, em themeObject/paletteId).
const UI_THEME_STORAGE_KEY = "curriculo-editor-ui-theme";

function loadInitialUiTheme() {
  try {
    const saved = localStorage.getItem(UI_THEME_STORAGE_KEY);
    return THEMES.includes(saved) ? saved : "light";
  } catch {
    return "light";
  }
}

/**
 * Recupera o rascunho salvo no localStorage, se existir e for válido.
 * Faz um merge raso com os valores padrão - assim, se novos campos
 * forem adicionados no futuro (ex: um novo campo em "personal"), um
 * rascunho antigo salvo antes dessa mudança não quebra o formulário
 * por faltar a chave.
 */
function loadInitialValues() {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return initialValues;

    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return initialValues;

    return { ...initialValues, ...saved };
  } catch (err) {
    console.warn(
      "Rascunho salvo estava corrompido - usando valores padrão:",
      err.message,
    );
    return initialValues;
  }
}

/* ─── Initial values ───────────────────────────────────────── */
const initialValues = {
  templateId: "sidebar", // "sidebar" | "modern" | "minimal" | "timeline" | "executive" | "compact" | "creative" | "corporate"
  personal: {
    name: "Ana Beatriz Lima",
    role: "Desenvolvedora Full Stack",
    fullName: "Ana Beatriz Lima Cavalcante",
    imageSrc:
      "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png",
  },
  contact: {
    email: "ana.lima.dev@exemplo.com",
    phone: "(11) 9 8765-4321",
    address: "Rua das Palmeiras, 123, São Paulo - SP",
    links: [
      {
        label: "Portfólio pessoal",
        url: "https://exemplo-portfolio.com",
        handle: "Portfólio",
        icon: "bx-link-alt",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/exemplo-usuario",
        handle: "ana-lima-dev",
        icon: "bxl-linkedin-square",
      },
      {
        label: "GitHub",
        url: "https://github.com/exemplo-usuario",
        handle: "ana-lima-dev",
        icon: "bxl-github",
      },
    ],
  },
  labels: {
    personalData: "Dados pessoais",
    skills: "Competências",
    objective: "Objetivo",
    education: "Formação",
    experience: "Experiência",
  },
  skills: [
    { name: "React", level: 4 },
    { name: "Next.js", level: 4 },
    { name: "Node.js", level: 4 },
    { name: "NestJS", level: 3 },
    { name: "Git / GitHub", level: 5 },
    { name: "Docker", level: 3 },
    { name: "TypeScript", level: 4 },
    { name: "SASS", level: 3 },
    { name: "MySQL", level: 4 },
    { name: "PostgreSQL", level: 4 },
    { name: "MongoDB", level: 3 },
    { name: "Redis", level: 2 },
    { name: "Java", level: 3 },
    { name: "Flutter", level: 2 },
    { name: "UI / UX", level: 3 },
    { name: "Figma", level: 3 },
  ],
  objective:
    "Atuar como desenvolvedora Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Experiência com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.",
  education: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      period: "2021 - 2023",
      institution: "Faculdade Exemplo de Tecnologia",
      description:
        "Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.",
    },
  ],
  experience: [
    {
      role: "Desenvolvedora Pleno",
      period: "Jan 2024 - Atual",
      company: "Empresa Exemplo Tecnologia Ltda.",
      location: "São Paulo, SP",
      responsibilities: [
        "Desenvolvimento full stack com React, Next.js e Node.js (Express, NestJS), integrando APIs RESTful e criando interfaces modernas.",
        "Uso de Git, Docker e CI/CD para versionamento, containerização e automação de processos.",
        "Manutenção, testes, documentação e evolução contínua de sistemas.",
        "Aplicação de boas práticas, Clean Code e Design Patterns, colaborando em equipes ágeis.",
      ],
    },
    {
      role: "Desenvolvedora Freelancer",
      period: "Mar 2023 - Dez 2023",
      company: "Studio Exemplo Design",
      location: "Remoto",
      responsibilities: [
        'Desenvolvimento do <a href="https://exemplo-site-institucional.com" target="_blank">site institucional</a> com React, focado em SEO, usabilidade e responsividade.',
        "Uso de boas práticas de código, versionamento com Git e otimização de performance.",
      ],
    },
    {
      role: "Estagiária de Desenvolvimento",
      period: "Jun 2022 - Fev 2023",
      company: "Empresa Fictícia Sistemas",
      location: "São Paulo, SP",
      responsibilities: [
        "Apoio no desenvolvimento de módulos internos em React, com foco em velocidade e qualidade de código.",
        "Arquitetura modular, boas práticas e versionamento com Git.",
      ],
    },
  ],
};

/* ─── Helpers ──────────────────────────────────────────────── */
const generateCurriculumHtml = (data, styles, fontLink) => {
  const body = renderToString(<CurriculumPreview data={data} isForExport />);
  return `<!DOCTYPE html><html lang="pt-BR"><head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data:; style-src 'unsafe-inline' https:; font-src https:; img-src https: data:;">
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="${fontLink}" rel="stylesheet"/>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/>
    <title>Currículo</title>
    <style>${styles}</style>
  </head><body>${body}</body></html>`;
};

/* ─── Toast system ─────────────────────────────────────────── */
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <i
            className={`bx ${t.type === "success" ? "bx-check-circle" : "bx-error-circle"}`}
          />
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ─── Auto-preview ─────────────────────────────────────────── */
const AutoPreview = () => {
  const { values } = useFormikContext();
  return <CurriculumPreview data={values} />;
};

/* ─── Field wrapper ────────────────────────────────────────── */
const F = ({
  label,
  name,
  as = "input",
  rows,
  type = "text",
  children,
  className = "",
}) => (
  <div className="field">
    {label && <label htmlFor={name}>{label}</label>}
    {children ?? (
      <Field
        id={name}
        name={name}
        as={as}
        rows={rows}
        type={type}
        className={className}
      />
    )}
  </div>
);

/* ─── Section: Labels ──────────────────────────────────────── */
const SectionLabels = () => (
  <div className="editor-section active" id="section-labels">
    <F label="Título — Objetivo" name="labels.objective" />
    <F label="Título — Formação" name="labels.education" />
    <F label="Título — Competências" name="labels.skills" />
    <F label="Título — Experiência" name="labels.experience" />
    <F label="Título — Dados Pessoais" name="labels.personalData" />
  </div>
);

/* ─── Section: Personal ────────────────────────────────────── */
const SectionPersonal = ({ values, setFieldValue }) => (
  <div className="editor-section" id="section-personal">
    <div className="section-block">
      <span className="section-block__title">Identidade</span>
      <F label="Nome exibido" name="personal.name" />
      <F label="Função / Cargo" name="personal.role" />
      <F label="Nome completo" name="personal.fullName" />
      <div className="field">
        <label>Foto</label>
        <ImageUploader
          currentUrl={values.personal.imageSrc}
          onUploaded={(url) => setFieldValue("personal.imageSrc", url)}
        />
      </div>
    </div>

    <div className="section-block">
      <span className="section-block__title">Contato</span>
      <F label="E-mail" name="contact.email" type="email" />
      <F label="Telefone" name="contact.phone" />
      <F label="Endereço" name="contact.address" />
    </div>

    <div className="section-block">
      <span className="section-block__title">Links</span>
      <FieldArray name="contact.links">
        {({ push, remove }) => (
          <>
            {values.contact.links.map((link, i) => (
              <div className="link-item" key={i}>
                <div className="link-item__top">
                  <span className="link-item__icon-badge">
                    <i className={`bx ${link.icon || "bx-link-alt"}`} />
                    Link {i + 1}
                  </span>
                  <button
                    type="button"
                    className="btn-icon danger"
                    onClick={() => remove(i)}
                    title="Remover"
                  >
                    <i className="bx bx-trash" />
                  </button>
                </div>
                <div className="field">
                  <label>Ícone</label>
                  <MuiFormControl
                    size="small"
                    fullWidth
                    className="mui-field-sm"
                  >
                    <MuiSelect
                      value={link.icon || "bx-link-alt"}
                      onChange={(e) =>
                        setFieldValue(`contact.links.${i}.icon`, e.target.value)
                      }
                    >
                      {ICON_OPTIONS.map((o) => (
                        <MuiMenuItem key={o.id} value={o.class}>
                          <i
                            className={`bx ${o.class}`}
                            style={{ marginRight: 8 }}
                          />
                          {o.name}
                        </MuiMenuItem>
                      ))}
                    </MuiSelect>
                  </MuiFormControl>
                </div>
                <div className="link-item__fields">
                  <F label="Rótulo" name={`contact.links.${i}.label`} />
                  <F label="Handle" name={`contact.links.${i}.handle`} />
                  <F label="URL" name={`contact.links.${i}.url`} type="url" />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-add"
              onClick={() =>
                push({
                  label: "",
                  url: "",
                  handle: "",
                  icon: ICON_OPTIONS[0].class,
                })
              }
            >
              <i className="bx bx-plus" /> Adicionar link
            </button>
          </>
        )}
      </FieldArray>
    </div>
  </div>
);

/* ─── Section: Objective ───────────────────────────────────── */
const SectionObjective = () => (
  <div className="editor-section" id="section-objective">
    <F label="Texto do objetivo" name="objective" as="textarea" rows={6} />
  </div>
);

/* ─── Section: Education ───────────────────────────────────── */
const SectionEducation = ({ values }) => (
  <div className="editor-section" id="section-education">
    <FieldArray name="education">
      {({ push, remove }) => (
        <>
          {values.education.map((_, i) => (
            <div className="item-card" key={i}>
              <div className="item-card__header">
                <span className="item-card__label">
                  <i className="bx bx-book-open" /> Formação {i + 1}
                </span>
                <button
                  type="button"
                  className="btn-icon danger"
                  onClick={() => remove(i)}
                >
                  <i className="bx bx-trash" />
                </button>
              </div>
              <F label="Curso" name={`education.${i}.course`} />
              <F label="Período" name={`education.${i}.period`} />
              <F label="Instituição" name={`education.${i}.institution`} />
              <F
                label="Descrição"
                name={`education.${i}.description`}
                as="textarea"
                rows={3}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() =>
              push({ course: "", period: "", institution: "", description: "" })
            }
          >
            <i className="bx bx-plus" /> Adicionar formação
          </button>
        </>
      )}
    </FieldArray>
  </div>
);

/* ─── Section: Skills ──────────────────────────────────────── */
// Lista curada de sugestões p/ o autocomplete de competências. O gerador
// nasceu pensado para devs, mas o campo aceita qualquer texto livre —
// isso é só uma lista de atalhos, não uma trava.
const SKILL_SUGGESTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Vue.js",
  "Node.js",
  "Express",
  "NestJS",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "PHP",
  "Laravel",
  "Ruby on Rails",
  "Go",
  "C#",
  ".NET",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Git",
  "CI/CD",
  "GraphQL",
  "Tailwind CSS",
  "Figma",
  "UI/UX",
  "Scrum",
  "Comunicação",
  "Liderança",
  "Gestão de projetos",
  "Excel",
];

const SectionSkills = ({ values, setFieldValue }) => {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDrop = (targetIndex) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const reordered = [...values.skills];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setFieldValue("skills", reordered);
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="editor-section" id="section-skills">
      <FieldArray name="skills">
        {({ push, remove }) => (
          <>
            <p className="field-hint skills-hint">
              <i className="bx bx-move" /> Arraste pelo ícone para reordenar
            </p>

            {values.skills.map((skill, i) => (
              <div
                className={`skill-row skill-row--draggable ${
                  overIndex === i ? "skill-row--drag-over" : ""
                } ${dragIndex === i ? "skill-row--dragging" : ""}`}
                key={i}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (overIndex !== i) setOverIndex(i);
                }}
                onDragLeave={() =>
                  setOverIndex((prev) => (prev === i ? null : prev))
                }
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(i);
                }}
              >
                <span
                  className="skill-row__handle"
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragEnd={() => {
                    setDragIndex(null);
                    setOverIndex(null);
                  }}
                  title="Arrastar para reordenar"
                >
                  <i className="bx bx-dots-vertical-rounded" />
                  <i className="bx bx-dots-vertical-rounded" />
                </span>

                <MuiAutocomplete
                  freeSolo
                  size="small"
                  options={SKILL_SUGGESTIONS}
                  value={skill.name}
                  inputValue={skill.name}
                  onInputChange={(_, newValue) =>
                    setFieldValue(`skills.${i}.name`, newValue)
                  }
                  className="skill-row__name mui-field-sm"
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      placeholder="Competência"
                      variant="outlined"
                    />
                  )}
                />

                <div className="skill-row__level">
                  <MuiSlider
                    size="small"
                    value={skill.level}
                    min={1}
                    max={5}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    onChange={(_, newValue) =>
                      setFieldValue(`skills.${i}.level`, newValue)
                    }
                  />
                </div>

                <button
                  type="button"
                  className="btn-icon danger"
                  onClick={() => remove(i)}
                  title="Remover"
                >
                  <i className="bx bx-trash" />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn-add"
              onClick={() => push({ name: "", level: 3 })}
            >
              <i className="bx bx-plus" /> Adicionar competência
            </button>
          </>
        )}
      </FieldArray>
    </div>
  );
};

/* ─── Section: Experience ──────────────────────────────────── */
const SectionExperience = ({ values }) => (
  <div className="editor-section" id="section-experience">
    <FieldArray name="experience">
      {({ push, remove }) => (
        <>
          {values.experience.map((exp, ei) => (
            <div className="item-card" key={ei}>
              <div className="item-card__header">
                <span className="item-card__label">
                  <i className="bx bx-briefcase" /> Experiência {ei + 1}
                </span>
                <button
                  type="button"
                  className="btn-icon danger"
                  onClick={() => remove(ei)}
                >
                  <i className="bx bx-trash" />
                </button>
              </div>
              <F label="Cargo" name={`experience.${ei}.role`} />
              <F label="Período" name={`experience.${ei}.period`} />
              <F label="Empresa" name={`experience.${ei}.company`} />
              <F label="Localização" name={`experience.${ei}.location`} />

              <div className="section-block">
                <span className="section-block__title">Responsabilidades</span>
                <FieldArray name={`experience.${ei}.responsibilities`}>
                  {({ push: pushR, remove: removeR }) => (
                    <>
                      {exp.responsibilities.map((_, ri) => (
                        <div className="resp-row" key={ri}>
                          <Field
                            name={`experience.${ei}.responsibilities.${ri}`}
                            as="textarea"
                            rows={2}
                            className="input-sm"
                            placeholder={`Responsabilidade ${ri + 1}`}
                          />
                          <button
                            type="button"
                            className="btn-icon danger"
                            onClick={() => removeR(ri)}
                          >
                            <i className="bx bx-minus" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-add"
                        onClick={() => pushR("")}
                      >
                        <i className="bx bx-plus" /> Responsabilidade
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn-add"
            onClick={() =>
              push({
                role: "",
                period: "",
                company: "",
                location: "",
                responsibilities: [""],
              })
            }
          >
            <i className="bx bx-plus" /> Adicionar experiência
          </button>
        </>
      )}
    </FieldArray>
  </div>
);

/* ─── Topbar controls (Fonte / Modelo / Tema do currículo) ──── */
/* Reaproveitado tanto na versão desktop (inline) quanto no menu mobile */
const TopbarSelectors = ({
  font,
  prevFont,
  nextFont,
  currentTemplate,
  prevTemplate,
  nextTemplate,
  currentPalette,
  prevTheme,
  nextTheme,
}) => (
  <>
    <div className="selector-group">
      <span className="selector-group__label">Fonte</span>
      <button
        type="button"
        className="selector-group__btn"
        onClick={prevFont}
        title="Fonte anterior"
      >
        <i className="bx bx-chevron-left" />
      </button>
      <span className="selector-group__value">{font?.font ?? "—"}</span>
      <button
        type="button"
        className="selector-group__btn"
        onClick={nextFont}
        title="Próxima fonte"
      >
        <i className="bx bx-chevron-right" />
      </button>
    </div>

    <div className="selector-group">
      <span className="selector-group__label">Modelo</span>
      <button
        type="button"
        className="selector-group__btn"
        onClick={prevTemplate}
        title="Modelo anterior"
      >
        <i className="bx bx-chevron-left" />
      </button>
      <span className="selector-group__value">
        {currentTemplate?.label ?? "—"}
      </span>
      <button
        type="button"
        className="selector-group__btn"
        onClick={nextTemplate}
        title="Próximo modelo"
      >
        <i className="bx bx-chevron-right" />
      </button>
    </div>

    <div className="selector-group">
      <span className="selector-group__label">Tema</span>
      <button
        type="button"
        className="selector-group__btn"
        onClick={prevTheme}
        title="Tema anterior"
      >
        <i className="bx bx-chevron-left" />
      </button>
      <span className="selector-group__value">
        {currentPalette?.name ?? "—"}
      </span>
      <button
        type="button"
        className="selector-group__btn"
        onClick={nextTheme}
        title="Próximo tema"
      >
        <i className="bx bx-chevron-right" />
      </button>
    </div>
  </>
);

/* ─── Main Editor ──────────────────────────────────────────── */
const CurriculumEditor = () => {
  const {
    themeObject,
    nextTheme,
    prevTheme,
    currentTemplate,
    nextTemplate,
    prevTemplate,
    currentPalette,
  } = useTheme();
  const { font, nextFont, prevFont } = useFont();

  const [activeSection, setActiveSection] = useState("labels");
  const [uiTheme, setUiTheme] = useState(loadInitialUiTheme);
  const [zoom, setZoom] = useState(75);
  const [toasts, setToasts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingExport, setPendingExport] = useState(null); // { html, email }

  // Busca a publicKey do pagamento assim que o EDITOR abre (não quando o
  // modal abre) - assim, quando o usuário clicar em "Exportar PDF", o
  // widget já nasce pronto pra montar, sem spinner de carregamento.
  const [paymentPublicKey, setPaymentPublicKey] = useState(null);
  const [paymentConfigError, setPaymentConfigError] = useState(null);

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
        setPaymentPublicKey(data.publicKey);
      })
      .catch((err) => {
        console.error("Erro ao pré-carregar configuração de pagamento:", err);
        if (!cancelled) setPaymentConfigError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Apply UI theme to document + salva a escolha para a próxima visita */
  useEffect(() => {
    if (uiTheme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", uiTheme);
    }
    try {
      localStorage.setItem(UI_THEME_STORAGE_KEY, uiTheme);
    } catch {
      // localStorage indisponível (modo privado, quota cheia etc.) - não é crítico
    }
  }, [uiTheme]);

  /* Cycle through UI themes */
  const cycleUiTheme = useCallback(() => {
    setUiTheme((prev) => {
      const idx = THEMES.indexOf(prev);
      return THEMES[(idx + 1) % THEMES.length];
    });
  }, []);

  /* Toast helper */
  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000,
    );
  }, []);

  /* Prepara o HTML e abre a cobrança Pix — a geração real só acontece
     depois que o pagamento for aprovado (ver handlePaymentApproved) */
  const handleSubmit = useCallback(
    (values) => {
      try {
        // renderToString (dentro de generateCurriculumHtml) roda fora do
        // ThemeProvider, então gravamos o modelo ativo nos dados para que
        // o dispatcher em CurriculumPreview saiba qual template desenhar.
        const exportData = { ...values, templateId: currentTemplate.id };
        const html = generateCurriculumHtml(
          exportData,
          themeObject.styles,
          font.link,
        );

        // Basic size guard
        if (new Blob([html]).size > MAX_HTML_SIZE) {
          throw new Error(
            "O conteúdo do currículo é muito grande para gerar o PDF.",
          );
        }

        setPendingExport({ html, email: values.contact?.email });
        setShowPaymentModal(true);
      } catch (err) {
        console.error(err);
        addToast(
          "error",
          err.message || "Não foi possível preparar o currículo.",
        );
      }
    },
    [themeObject, font, addToast, currentTemplate],
  );

  /* Chamada quando o PaymentModal confirma que o Pix foi aprovado */
  const handlePaymentApproved = useCallback(
    async (paymentId) => {
      if (!pendingExport) return;
      setShowPaymentModal(false);
      setIsGenerating(true);

      try {
        const res = await fetch(`${API_URL}/gerar-curriculo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ htmlContent: pendingExport.html, paymentId }),
          signal: AbortSignal.timeout(60_000),
        });

        if (!res.ok) {
          const msg = await res.text().catch(() => `HTTP ${res.status}`);
          throw new Error(msg);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "curriculo.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        addToast("success", "PDF gerado com sucesso!");
      } catch (err) {
        console.error(err);
        addToast("error", err.message || "Falha ao gerar o PDF.");
      } finally {
        setIsGenerating(false);
        setPendingExport(null);
      }
    },
    [pendingExport, addToast],
  );

  /* Section visibility toggle */
  useEffect(() => {
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      el.classList.toggle("active", id === activeSection);
    });
  }, [activeSection]);

  /* Fecha o menu mobile automaticamente se a tela for redimensionada
     para o breakpoint desktop enquanto ele estiver aberto */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const selectorProps = {
    font,
    prevFont,
    nextFont,
    currentTemplate,
    prevTemplate,
    nextTemplate,
    currentPalette,
    prevTheme,
    nextTheme,
  };

  // Lido apenas uma vez, na montagem - Formik ignora mudanças posteriores
  // na prop initialValues por padrão, o que já é o comportamento certo aqui.
  const startingValues = useMemo(() => loadInitialValues(), []);

  return (
    <Formik initialValues={startingValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <div className="app-shell">
          <FormikPersist name={DRAFT_STORAGE_KEY} />

          {/* ── Topbar ── */}
          <header className="topbar">
            <div className="topbar__brand">
              <div className="topbar__brand-icon">
                <i className="bx bx-file" />
              </div>
              <span>Gerador de Currículos</span>
            </div>

            <div className="topbar__divider" />

            {/* Controles inline — visíveis só a partir de ~700px */}
            <div className="topbar__controls topbar__controls--desktop">
              <TopbarSelectors {...selectorProps} />
            </div>

            <div className="topbar__right">
              <button
                type="button"
                className={`theme-toggle-btn topbar__controls--desktop-only${uiTheme !== "light" ? " active" : ""}`}
                onClick={cycleUiTheme}
                title={`Tema da interface: ${THEME_LABELS[uiTheme]}`}
              >
                <i className={`bx ${THEME_ICONS[uiTheme]}`} />
              </button>

              <button
                type="button"
                className="btn-generate"
                onClick={() => handleSubmit(values)}
              >
                <i className="bx bx-download"></i>
                <span>Exportar PDF</span>
              </button>

              {/* Botão hamburguer — só aparece em telas pequenas (ver CSS) */}
              <button
                type="button"
                className="topbar__menu-btn"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
              >
                <i className={menuOpen ? "bx bx-x" : "bx bx-menu"}></i>
              </button>
            </div>

            {/* Painel do menu mobile — mesmos controles, empilhados */}
            {menuOpen && (
              <div className="topbar__mobile-menu">
                <TopbarSelectors {...selectorProps} />
                <button
                  type="button"
                  className={`theme-toggle-btn${uiTheme !== "light" ? " active" : ""}`}
                  onClick={cycleUiTheme}
                >
                  <i className={`bx ${THEME_ICONS[uiTheme]}`} />
                </button>
              </div>
            )}
          </header>

          {/* ── Workspace ── */}
          <div className="workspace">
            {/* Sidebar nav */}
            <nav className="sidebar-nav">
              {SECTIONS.map(({ id, icon, tip }) => (
                <button
                  key={id}
                  type="button"
                  className={`sidebar-nav__btn${activeSection === id ? " active" : ""}`}
                  onClick={() => setActiveSection(id)}
                  data-tip={tip}
                  title={tip}
                >
                  <i className={`bx ${icon}`} />
                </button>
              ))}
              <div className="sidebar-nav__sep" />
            </nav>

            {/* Editor column */}
            <aside className="editor-col">
              <div className="editor-col__header">
                <p className="editor-col__title">
                  {SECTIONS.find((s) => s.id === activeSection)?.tip}
                </p>
                <p className="editor-col__subtitle">
                  Edite o conteúdo e veja na prévia ao lado
                </p>
              </div>
              <div className="editor-col__body">
                {/* Always rendered — CSS class controls visibility */}
                <SectionLabels />
                <SectionPersonal
                  values={values}
                  setFieldValue={setFieldValue}
                />
                <SectionObjective />
                <SectionEducation values={values} />
                <SectionSkills values={values} setFieldValue={setFieldValue} />
                <SectionExperience values={values} />
              </div>
            </aside>

            {/* Preview column */}
            <main className="preview-col">
              <div className="preview-col__bar">
                <div
                  className="preview-col__bar-dot"
                  style={{ background: "#ff5f57" }}
                />
                <div
                  className="preview-col__bar-dot"
                  style={{ background: "#ffbd2e" }}
                />
                <div
                  className="preview-col__bar-dot"
                  style={{ background: "#28c840" }}
                />
                <span className="preview-col__bar-title">
                  curriculo.pdf — prévia
                </span>
                <div className="preview-col__zoom-controls">
                  <button
                    type="button"
                    className="preview-col__zoom-btn"
                    onClick={() => setZoom((z) => Math.max(30, z - 10))}
                  >
                    <i className="bx bx-minus" />
                  </button>
                  <span className="preview-col__zoom-val">{zoom}%</span>
                  <button
                    type="button"
                    className="preview-col__zoom-btn"
                    onClick={() => setZoom((z) => Math.min(150, z + 10))}
                  >
                    <i className="bx bx-plus" />
                  </button>
                </div>
              </div>
              <div className="preview-col__body">
                <div
                  className="preview-page"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <CurriculumStyles />
                  <AutoPreview />
                </div>
              </div>
            </main>
          </div>

          {/* Loading overlay */}
          {isGenerating && (
            <div className="loading-overlay">
              <div className="loading-overlay__card">
                <div className="loading-spinner" />
                <p className="loading-overlay__text">Gerando PDF…</p>
              </div>
            </div>
          )}

          {/* Payment widget (Pix + Cartão), via @payment-system-mp/react-widget.
              publicKey já veio pré-carregada (ver useEffect acima), então o
              widget monta instantaneamente ao abrir, sem tela de loading. */}
          {showPaymentModal && (
            <PaymentWidgetSection
              publicKey={paymentPublicKey}
              configError={paymentConfigError}
              email={pendingExport?.email}
              onApproved={handlePaymentApproved}
              onClose={() => {
                setShowPaymentModal(false);
                setPendingExport(null);
              }}
            />
          )}

          {/* Toasts */}
          <ToastContainer toasts={toasts} />
        </div>
      )}
    </Formik>
  );
};

export default CurriculumEditor;
