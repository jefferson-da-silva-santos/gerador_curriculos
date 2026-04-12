import { useState, useEffect, useCallback } from "react";
import { Formik, Field, Form, FieldArray, useFormikContext } from "formik";
import CurriculumPreview from "./CurriculumPreview";
import CurriculumStyles from "./CurriculumStyles";
import useTheme from "../hooks/useTheme";
import useFont from "../hooks/useFont";
import { renderToString } from "react-dom/server";

/* ─── Constants ────────────────────────────────────────────── */
const ICON_OPTIONS = [
  { id: 1, name: "Link Padrão",         class: "bx-link-alt" },
  { id: 2, name: "LinkedIn",            class: "bxl-linkedin-square" },
  { id: 3, name: "GitHub",              class: "bxl-github" },
  { id: 4, name: "Website/Portfólio",   class: "bx-globe" },
  { id: 5, name: "Email",               class: "bx-envelope" },
  { id: 6, name: "Telefone/WhatsApp",   class: "bxl-whatsapp" },
  { id: 7, name: "Twitter/X",           class: "bxl-twitter" },
  { id: 8, name: "Facebook",            class: "bxl-facebook-square" },
  { id: 9, name: "Instagram",           class: "bxl-instagram-alt" },
  { id: 10, name: "Stack Overflow",     class: "bxl-stack-overflow" },
  { id: 11, name: "Medium",             class: "bxl-medium-square" },
];

const SECTIONS = [
  { id: "labels",     icon: "bx-text",        tip: "Títulos" },
  { id: "personal",   icon: "bx-user",         tip: "Pessoal" },
  { id: "objective",  icon: "bx-target-lock",  tip: "Objetivo" },
  { id: "education",  icon: "bx-book-open",    tip: "Formação" },
  { id: "skills",     icon: "bx-code-alt",     tip: "Competências" },
  { id: "experience", icon: "bx-briefcase",    tip: "Experiência" },
];

const THEMES = ["light", "dark-default", "dark-slate"];
const THEME_ICONS = { light: "bx-sun", "dark-default": "bx-moon", "dark-slate": "bxs-moon" };
const THEME_LABELS = { light: "Claro", "dark-default": "Escuro", "dark-slate": "Escuro Slate" };

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const MAX_HTML_SIZE = 2 * 1024 * 1024; // 2 MB safety limit

/* ─── Initial values ───────────────────────────────────────── */
const initialValues = {
  personal: {
    name: "Jefferson Santos",
    role: "Desenvolvedor Full Stack",
    fullName: "Jefferson da Silva Santos",
    imageSrc: "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/jefferson-image.jpeg",
  },
  contact: {
    email: "jeffrrwpg678@gmail.com",
    phone: "(81) 9 9936-7426",
    address: "Sítio Guabiraba, 64, Limoeiro - PE",
    links: [
      { label: "Portfólio pessoal", url: "https://jeffersondev.netlify.app", handle: "Portfólio", icon: "bx-link-alt" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jefferson-santos-a87b74277", handle: "jefferson-santos", icon: "bxl-linkedin-square" },
      { label: "GitHub", url: "https://github.com/jefferson-da-silva-santos", handle: "jefferson-da-silva-santos", icon: "bxl-github" },
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
    { name: "React", level: 4 }, { name: "Next.js", level: 4 }, { name: "Node.js", level: 4 },
    { name: "NestJS", level: 4 }, { name: "Git / GitHub", level: 4 }, { name: "Docker", level: 4 },
    { name: "n8n", level: 4 }, { name: "SASS", level: 4 }, { name: "MySQL", level: 4 },
    { name: "PostgreSQL", level: 4 }, { name: "Firebird", level: 4 }, { name: "Redis", level: 4 },
    { name: "Java", level: 4 }, { name: "Flutter", level: 4 }, { name: "UI / UX", level: 4 },
    { name: "Figma", level: 4 },
  ],
  objective: "Atuar como desenvolvedor Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Trabalho com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.",
  education: [
    {
      course: "Desenvolvimento de Sistemas",
      period: "2021 - 2023",
      institution: "Escola Técnica José Humberto de Moura Cavalcante",
      description: "Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.",
    },
  ],
  experience: [
    {
      role: "Desenvolvedor Junior",
      period: "Jun 2025 - Atual",
      company: "Ongold Tech",
      location: "Limoeiro, PE",
      responsibilities: [
        "Desenvolvimento full stack com React, Next.js e Node.js (Express, Adonis, Nest), integrando APIs RESTful e criando interfaces modernas.",
        "Uso de Git, Docker e n8n para versionamento, containerização e automação de processos.",
        "Manutenção, testes, documentação e evolução contínua de sistemas.",
        "Aplicação de boas práticas, Clean Code e Design Patterns, colaborando em equipes ágeis.",
      ],
    },
    {
      role: "Desenvolvedor Freelancer",
      period: "Set 2023 - Dez 2023",
      company: "Óticas Leal",
      location: "Limoeiro, PE",
      responsibilities: [
        'Desenvolvimento do <a href="https://oticasleal.netlify.app" target="_blank">site institucional</a> com React, focado em SEO, usabilidade e responsividade.',
        "Uso de boas práticas de código, versionamento com Git e otimização de performance.",
      ],
    },
    {
      role: "Desenvolvedor Freelancer",
      period: "Abr 2023 - Ago 2023",
      company: "Produtos Léo de Lita",
      location: "Limoeiro, PE",
      responsibilities: [
        '<a href="https://bolachasleodelita.com.br" target="_blank">Site institucional</a> desenvolvido em React, com foco em velocidade e SEO',
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
          <i className={`bx ${t.type === "success" ? "bx-check-circle" : "bx-error-circle"}`} />
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
const F = ({ label, name, as = "input", rows, type = "text", children, className = "" }) => (
  <div className="field">
    {label && <label htmlFor={name}>{label}</label>}
    {children ?? (
      <Field id={name} name={name} as={as} rows={rows} type={type} className={className} />
    )}
  </div>
);

/* ─── Section: Labels ──────────────────────────────────────── */
const SectionLabels = () => (
  <div className="editor-section active" id="section-labels">
    <F label="Título — Objetivo"     name="labels.objective" />
    <F label="Título — Formação"     name="labels.education" />
    <F label="Título — Competências" name="labels.skills" />
    <F label="Título — Experiência"  name="labels.experience" />
    <F label="Título — Dados Pessoais" name="labels.personalData" />
  </div>
);

/* ─── Section: Personal ────────────────────────────────────── */
const SectionPersonal = ({ values }) => (
  <div className="editor-section" id="section-personal">
    <div className="section-block">
      <span className="section-block__title">Identidade</span>
      <F label="Nome exibido"  name="personal.name" />
      <F label="Função / Cargo" name="personal.role" />
      <F label="Nome completo" name="personal.fullName" />
      <F label="URL da foto"   name="personal.imageSrc" />
    </div>

    <div className="section-block">
      <span className="section-block__title">Contato</span>
      <F label="E-mail"    name="contact.email"   type="email" />
      <F label="Telefone"  name="contact.phone" />
      <F label="Endereço"  name="contact.address" />
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
                  <button type="button" className="btn-icon danger" onClick={() => remove(i)} title="Remover">
                    <i className="bx bx-trash" />
                  </button>
                </div>
                <div className="field">
                  <label>Ícone</label>
                  <Field name={`contact.links.${i}.icon`} as="select">
                    {ICON_OPTIONS.map((o) => (
                      <option key={o.id} value={o.class}>{o.name}</option>
                    ))}
                  </Field>
                </div>
                <div className="link-item__fields">
                  <F label="Rótulo"  name={`contact.links.${i}.label`} />
                  <F label="Handle"  name={`contact.links.${i}.handle`} />
                  <F label="URL" name={`contact.links.${i}.url`} type="url" />
                </div>
              </div>
            ))}
            <button type="button" className="btn-add" onClick={() => push({ label: "", url: "", handle: "", icon: ICON_OPTIONS[0].class })}>
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
                <button type="button" className="btn-icon danger" onClick={() => remove(i)}>
                  <i className="bx bx-trash" />
                </button>
              </div>
              <F label="Curso"       name={`education.${i}.course`} />
              <F label="Período"     name={`education.${i}.period`} />
              <F label="Instituição" name={`education.${i}.institution`} />
              <F label="Descrição"   name={`education.${i}.description`} as="textarea" rows={3} />
            </div>
          ))}
          <button type="button" className="btn-add" onClick={() => push({ course: "", period: "", institution: "", description: "" })}>
            <i className="bx bx-plus" /> Adicionar formação
          </button>
        </>
      )}
    </FieldArray>
  </div>
);

/* ─── Section: Skills ──────────────────────────────────────── */
const SectionSkills = ({ values }) => (
  <div className="editor-section" id="section-skills">
    <FieldArray name="skills">
      {({ push, remove, swap }) => (
        <>
          {values.skills.map((_, i) => (
            <div className="skill-row" key={i}>
              <button type="button" className="btn-icon up-down" onClick={() => swap(i, i - 1)} disabled={i === 0} title="Subir">
                <i className="bx bx-chevron-up" />
              </button>
              <button type="button" className="btn-icon up-down" onClick={() => swap(i, i + 1)} disabled={i === values.skills.length - 1} title="Descer">
                <i className="bx bx-chevron-down" />
              </button>
              <Field name={`skills.${i}.name`} type="text" className="input-sm" placeholder="Competência" />
              <Field name={`skills.${i}.level`} as="select" className="input-sm">
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </Field>
              <button type="button" className="btn-icon danger" onClick={() => remove(i)} title="Remover">
                <i className="bx bx-trash" />
              </button>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={() => push({ name: "", level: 3 })}>
            <i className="bx bx-plus" /> Adicionar competência
          </button>
        </>
      )}
    </FieldArray>
  </div>
);

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
                <button type="button" className="btn-icon danger" onClick={() => remove(ei)}>
                  <i className="bx bx-trash" />
                </button>
              </div>
              <F label="Cargo"       name={`experience.${ei}.role`} />
              <F label="Período"     name={`experience.${ei}.period`} />
              <F label="Empresa"     name={`experience.${ei}.company`} />
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
                            as="textarea" rows={2}
                            className="input-sm"
                            placeholder={`Responsabilidade ${ri + 1}`}
                          />
                          <button type="button" className="btn-icon danger" onClick={() => removeR(ri)}>
                            <i className="bx bx-minus" />
                          </button>
                        </div>
                      ))}
                      <button type="button" className="btn-add" onClick={() => pushR("")}>
                        <i className="bx bx-plus" /> Responsabilidade
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={() => push({ role: "", period: "", company: "", location: "", responsibilities: [""] })}>
            <i className="bx bx-plus" /> Adicionar experiência
          </button>
        </>
      )}
    </FieldArray>
  </div>
);

/* ─── Main Editor ──────────────────────────────────────────── */
const CurriculumEditor = () => {
  const { themeObject, nextTheme, prevTheme } = useTheme();
  const { font, nextFont, prevFont } = useFont();

  const [activeSection, setActiveSection] = useState("labels");
  const [uiTheme, setUiTheme] = useState("light");
  const [zoom, setZoom] = useState(75);
  const [toasts, setToasts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  /* Apply UI theme to document */
  useEffect(() => {
    if (uiTheme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", uiTheme);
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
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  /* Generate PDF */
  const handleSubmit = useCallback(async (values) => {
    setIsGenerating(true);
    try {
      const html = generateCurriculumHtml(values, themeObject.styles, font.link);

      // Basic size guard
      if (new Blob([html]).size > MAX_HTML_SIZE) {
        throw new Error("O conteúdo do currículo é muito grande para gerar o PDF.");
      }

      const res = await fetch(`${API_URL}/gerar-curriculo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent: html }),
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
    }
  }, [themeObject, font, addToast]);

  /* Section visibility toggle */
  useEffect(() => {
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      el.classList.toggle("active", id === activeSection);
    });
  }, [activeSection]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <div className="app-shell">
          {/* ── Topbar ── */}
          <header className="topbar">
            <div className="topbar__brand">
              <div className="topbar__brand-icon">
                <i className="bx bx-file" />
              </div>
              <span>CurriculumBuilder</span>
            </div>
            <div className="topbar__divider" />

            <div className="topbar__controls">
              {/* Font selector */}
              <div className="selector-group">
                <span className="selector-group__label">Fonte</span>
                <button type="button" className="selector-group__btn" onClick={prevFont} title="Anterior">
                  <i className="bx bx-chevron-left" />
                </button>
                <span className="selector-group__value">{font.font}</span>
                <button type="button" className="selector-group__btn" onClick={nextFont} title="Próxima">
                  <i className="bx bx-chevron-right" />
                </button>
              </div>

              {/* CV Theme selector */}
              <div className="selector-group">
                <span className="selector-group__label">Tema CV</span>
                <button type="button" className="selector-group__btn" onClick={prevTheme} title="Anterior">
                  <i className="bx bx-chevron-left" />
                </button>
                <span className="selector-group__value">{themeObject.theme}</span>
                <button type="button" className="selector-group__btn" onClick={nextTheme} title="Próximo">
                  <i className="bx bx-chevron-right" />
                </button>
              </div>
            </div>

            <div className="topbar__right">
              {/* UI Theme toggle */}
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={cycleUiTheme}
                title={`Modo: ${THEME_LABELS[uiTheme]}`}
              >
                <i className={`bx ${THEME_ICONS[uiTheme]}`} />
              </button>

              {/* Generate PDF */}
              <Form>
                <button type="submit" className="btn-generate" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <div className="loading-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <i className="bx bxs-download" />
                      Exportar PDF
                    </>
                  )}
                </button>
              </Form>
            </div>
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
                <p className="editor-col__subtitle">Edite o conteúdo e veja na prévia ao lado</p>
              </div>
              <div className="editor-col__body">
                {/* Always rendered — CSS class controls visibility */}
                <SectionLabels />
                <SectionPersonal values={values} />
                <SectionObjective />
                <SectionEducation values={values} />
                <SectionSkills values={values} />
                <SectionExperience values={values} />
              </div>
            </aside>

            {/* Preview column */}
            <main className="preview-col">
              <div className="preview-col__bar">
                <div className="preview-col__bar-dot" style={{ background: "#ff5f57" }} />
                <div className="preview-col__bar-dot" style={{ background: "#ffbd2e" }} />
                <div className="preview-col__bar-dot" style={{ background: "#28c840" }} />
                <span className="preview-col__bar-title">curriculo.pdf — prévia</span>
                <div className="preview-col__zoom-controls">
                  <button type="button" className="preview-col__zoom-btn" onClick={() => setZoom((z) => Math.max(30, z - 10))}>
                    <i className="bx bx-minus" />
                  </button>
                  <span className="preview-col__zoom-val">{zoom}%</span>
                  <button type="button" className="preview-col__zoom-btn" onClick={() => setZoom((z) => Math.min(150, z + 10))}>
                    <i className="bx bx-plus" />
                  </button>
                </div>
              </div>
              <div className="preview-col__body">
                <div className="preview-page" style={{ transform: `scale(${zoom / 100})` }}>
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

          {/* Toasts */}
          <ToastContainer toasts={toasts} />
        </div>
      )}
    </Formik>
  );
};

export default CurriculumEditor;
