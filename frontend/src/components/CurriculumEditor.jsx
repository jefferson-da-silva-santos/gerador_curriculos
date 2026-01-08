import { Formik, Field, Form, FieldArray, useFormikContext } from "formik";
import CurriculumPreview from "./CurriculumPreview";
import useTheme from "../hooks/useTheme";
import { renderToString } from "react-dom/server";
import useFont from "../hooks/useFont";

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
    // Os valores iniciais de 'icon' devem ser uma das classes em ICON_OPTIONS
    links: [
      {
        label: "Portfólio pessoal",
        url: "https://jeffersondev.netlify.app",
        handle: "Portfólio",
        icon: "bx-link-alt", // classe Boxicon
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jefferson-santos-a87b74277",
        handle: "jefferson-santos",
        icon: "bxl-linkedin-square",
      },
      {
        label: "GitHub",
        url: "https://github.com/jefferson-da-silva-santos",
        handle: "jefferson-da-silva-santos",
        icon: "bxl-github",
      },
    ],
  },
  // NOVOS CAMPOS PARA EDIÇÃO DE LEGENDAS
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
    { name: "NestJS", level: 4 },
    { name: "Git / GitHub", level: 4 },
    { name: "Docker", level: 4 },
    { name: "n8n", level: 4 },
    { name: "SASS", level: 4 },
    { name: "MySQL", level: 4 },
    { name: "PostgreSQL", level: 4 },
    { name: "Firebird", level: 4 },
    { name: "Redis", level: 4 },
    { name: "Java", level: 4 },
    { name: "Flutter", level: 4 },
    { name: "UI / UX", level: 4 },
    { name: "Figma", level: 4 },
  ],
  objective:
    "Atuar como desenvolvedor Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Trabalho com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.",
  education: [
    {
      course: "Desenvolvimento de Sistemas",
      period: "2021 - 2023",
      institution: "Escola Técnica José Humberto de Moura Cavalcante",
      description:
        "Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.",
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

const AutoCurriculumPreview = () => {
  const { values } = useFormikContext();
  return <CurriculumPreview data={values} />;
};

const generateCurriculumHtml = (data, styles, font) => {
  const curriculumBodyHtml = renderToString(
    <CurriculumPreview data={data} isForExport={true} />
  );

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
          href="${font}"
          rel="stylesheet"
          />
          <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
          />
          <title>Curriculum</title>
          <style>
          ${styles}
          </style>
      </head>
    <body>
    ${curriculumBodyHtml}
   </body>
  </html>
 `;
};

const inlineStyles = {
  skillItemRow: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    marginBottom: "5px",
  },
  skillNameField: {
    flexGrow: 1,
  },
  removeButtonMargin: {
    marginLeft: "5px",
  },
  linkItemGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
    alignItems: "center",
    marginBottom: "10px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
  },
  linkRemoveButton: {},
  linkFieldLabel: {
    display: "block",
    fontSize: "0.8em",
    marginBottom: "3px",
    fontWeight: "bold",
  },
  iconSelectField: {
  },
};

const CurriculumEditor = () => {
  const { themeObject, nextTheme, prevTheme } = useTheme();
  const { font, nextFont, prevFont } = useFont();

  const handleGeneratePdf = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      const finalHtml = generateCurriculumHtml(
        values,
        themeObject.styles,
        font.link
      );

      const response = await fetch("http://localhost:3000/gerar-curriculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlContent: finalHtml }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "curriculo.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      alert("✅ PDF gerado e download iniciado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao gerar o PDF:", error);
      alert(`Falha ao gerar o PDF. Detalhes: ${error.message}`);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="editor-container">
      <Formik initialValues={initialValues} onSubmit={handleGeneratePdf}>
        {({ values, isSubmitting }) => (
          <>
            {/* Coluna do Formulário */}
            <div className="editor-form-column">
              <div className="group-title">
                <h2>Editor de Currículo</h2>

                <div className="group-buttons">
                  <div className="wrap">
                    <p>Selecione a Fonte:</p>
                    <div className="buttons">
                      <button disabled={isSubmitting} onClick={prevFont}>
                        <i className="bx bx-chevrons-left"></i>
                      </button>
                      <span className="text">{font.font}</span>
                      <button disabled={isSubmitting} onClick={nextFont}>
                        <i className="bx bx-chevrons-right"></i>
                      </button>
                    </div>
                  </div>

                  <div className="wrap">
                    <p>Selecione o Tema:</p>
                    <div className="buttons">
                      <button disabled={isSubmitting} onClick={prevTheme}>
                        <i className="bx bx-chevrons-left"></i>
                      </button>
                      <span className="text">{themeObject.theme}</span>
                      <button disabled={isSubmitting} onClick={nextTheme}>
                        <i className="bx bx-chevrons-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Form className="editor-form">
                {/* 🌟 NOVA SEÇÃO: Edição de Legendas/Títulos */}
                <h3>Editar Títulos de Seção 📝</h3>
                <div className="input-group-section section-titulos">
                  <label>Título de Objetivo:</label>
                  <Field
                    name="labels.objective"
                    type="text"
                    className="form-control"
                  />
                  <label>Título de Formação:</label>
                  <Field
                    name="labels.education"
                    type="text"
                    className="form-control"
                  />
                  <label>Título de Competências:</label>
                  <Field
                    name="labels.skills"
                    type="text"
                    className="form-control"
                  />
                  <label>Título de Experiência:</label>
                  <Field
                    name="labels.experience"
                    type="text"
                    className="form-control"
                  />
                  <label>Título de Dados Pessoais:</label>
                  <Field
                    name="labels.personalData"
                    type="text"
                    className="form-control"
                  />
                </div>
                <hr />

                {/* Seção 1: Dados Pessoais */}
                <h3>Dados Pessoais</h3>
                <div className="input-group-section section-personal">
                  <label>Nome Principal:</label>
                  <Field
                    name="personal.name"
                    type="text"
                    className="form-control"
                  />
                  <label>Função Principal:</label>
                  <Field
                    name="personal.role"
                    type="text"
                    className="form-control"
                  />
                  <label>Nome Completo (Lista):</label>
                  <Field
                    name="personal.fullName"
                    type="text"
                    className="form-control"
                  />
                  <label>URL da Imagem:</label>
                  <Field
                    name="personal.imageSrc"
                    type="text"
                    className="form-control"
                  />

                  <h4 className="sub-section-title">Contato Básico</h4>
                  <label>E-mail:</label>
                  <Field
                    name="contact.email"
                    type="email"
                    className="form-control"
                  />
                  <label>Telefone:</label>
                  <Field
                    name="contact.phone"
                    type="text"
                    className="form-control"
                  />
                  <label>Endereço:</label>
                  <Field
                    name="contact.address"
                    type="text"
                    className="form-control"
                  />

                  {/* 🌟 SEÇÃO ALTERADA: Links Dinâmicos */}
                  <h4 className="sub-section-title">Links</h4>
                  <FieldArray name="contact.links">
                    {({ push, remove }) => (
                      <div className="links-array-section">
                        {values.contact.links.map((link, index) => (
                          <div key={index} style={inlineStyles.linkItemGrid}>
                            <div>
                              <label style={inlineStyles.linkFieldLabel}>
                                Ícone (Selecionar):
                              </label>
                              {/* 👇 CAMPO ALTERADO PARA SELECT */}
                              <Field
                                name={`contact.links.${index}.icon`}
                                as="select"
                                className="form-control"
                                style={inlineStyles.iconSelectField}
                              >
                                {/* Mapeia o array de ICON_OPTIONS para gerar as opções do select */}
                                {ICON_OPTIONS.map((option) => (
                                  <option key={option.id} value={option.class}>
                                    {option.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <div>
                              <label style={inlineStyles.linkFieldLabel}>
                                Rótulo/Nome:
                              </label>
                              <Field
                                name={`contact.links.${index}.label`}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label style={inlineStyles.linkFieldLabel}>
                                Handle (Ex: @usuário):
                              </label>
                              <Field
                                name={`contact.links.${index}.handle`}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label style={inlineStyles.linkFieldLabel}>
                                URL:
                              </label>
                              <Field
                                name={`contact.links.${index}.url`}
                                type="url"
                                className="form-control"
                              />
                            </div>
                            <button
                              className="btn-delete"
                              type="button"
                              onClick={() => remove(index)}
                              style={inlineStyles.linkRemoveButton}
                              title="Remover Link"
                            >
                              Remover Link <i className="bx bx-trash"></i>
                            </button>
                            <span /> {/* Espaço vazio para alinhar */}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn-add-link"
                          onClick={() =>
                            push({
                              label: "",
                              url: "",
                              handle: "",
                              icon: ICON_OPTIONS[0].class,
                            })
                          }
                        >
                          <i className="bx bx-plus"></i> Adicionar Novo Link
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <hr />

                {/* Seção 2: Objetivo */}
                <h3 id="objective-editor">{values.labels.objective}</h3>
                <Field
                  name="objective"
                  as="textarea"
                  rows="4"
                  className="form-control"
                />
                <hr />

                {/* Seção 3: Formação */}
                <h3 id="education-editor">{values.labels.education}</h3>
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <div className="input-group-section">
                      {values.education.map((edu, index) => (
                        <div className="formacao form-item-border" key={index}>
                          <label>Curso:</label>
                          <Field
                            name={`education.${index}.course`}
                            type="text"
                            className="form-control"
                          />
                          <label>Período:</label>
                          <Field
                            name={`education.${index}.period`}
                            type="text"
                            className="form-control"
                          />
                          <label>Instituição:</label>
                          <Field
                            name={`education.${index}.institution`}
                            type="text"
                            className="form-control"
                          />
                          <label>Descrição:</label>
                          <Field
                            name={`education.${index}.description`}
                            as="textarea"
                            rows="2"
                            className="form-control"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="remove-button-margin btn-delete"
                          >
                            Remover Formação <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-add-link"
                        onClick={() =>
                          push({
                            course: "",
                            period: "",
                            institution: "",
                            description: "",
                          })
                        }
                      >
                        <i className="bx bx-plus"></i> Adicionar Formação
                      </button>
                    </div>
                  )}
                </FieldArray>
                <hr />

                {/* Seção 4: Competências (Com botões de mover) */}
                <h3 id="skills-editor">{values.labels.skills}</h3>
                <FieldArray name="skills">
                  {({ push, remove, swap }) => (
                    <div className="input-group-section">
                      {values.skills.map((skill, index) => (
                        <div key={index} style={inlineStyles.skillItemRow}>
                          {/* Botão Mover para Cima */}
                          <button
                            type="button"
                            onClick={() => swap(index, index - 1)}
                            disabled={index === 0}
                            className="button-move"
                            title="Mover para Cima"
                          >
                            <i className="bx bx-up-arrow-alt"></i>
                          </button>
                          {/* Botão Mover para Baixo */}
                          <button
                            type="button"
                            className="button-move"
                            onClick={() => swap(index, index + 1)}
                            disabled={index === values.skills.length - 1}
                            title="Mover para Baixo"
                          >
                            <i className="bx bx-down-arrow-alt"></i>
                          </button>

                          <Field
                            name={`skills.${index}.name`}
                            type="text"
                            className="form-control"
                            style={inlineStyles.skillNameField}
                          />
                          <Field
                            name={`skills.${index}.level`}
                            as="select"
                            className="form-control skill-level-field"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </Field>
                          <button
                            className="btn-del"
                            type="button"
                            onClick={() => remove(index)}
                            title="Remover Competência"
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        className="btn-add-link"
                        type="button"
                        onClick={() => push({ name: "", level: 3 })}
                      >
                        <i className="bx bx-plus"></i> Adicionar Competência
                      </button>
                    </div>
                  )}
                </FieldArray>
                <hr />

                {/* Seção 5: Experiência */}
                <h3 id="experience-editor">{values.labels.experience}</h3>
                <FieldArray name="experience">
                  {({ push, remove }) => (
                    <div className="input-group-section">
                      {values.experience.map((exp, expIndex) => (
                        <div
                          className="experiencia form-item-double-border"
                          key={expIndex}
                        >
                          <h4>Experiência #{expIndex + 1}</h4>
                          <label>Cargo:</label>
                          <Field
                            name={`experience.${expIndex}.role`}
                            type="text"
                            className="form-control"
                          />
                          <label>Período:</label>
                          <Field
                            name={`experience.${expIndex}.period`}
                            type="text"
                            className="form-control"
                          />
                          <label>Empresa:</label>
                          <Field
                            name={`experience.${expIndex}.company`}
                            type="text"
                            className="form-control"
                          />
                          <label>Localização:</label>
                          <Field
                            name={`experience.${expIndex}.location`}
                            type="text"
                            className="form-control"
                          />

                          <h5>Responsabilidades</h5>
                          <FieldArray
                            name={`experience.${expIndex}.responsibilities`}
                          >
                            {({ push: pushResp, remove: removeResp }) => (
                              <div className="responsas responsa-list-indent">
                                {exp.responsibilities.map((resp, respIndex) => (
                                  <div
                                    key={respIndex}
                                    className="responsa-item-row"
                                  >
                                    <Field
                                      name={`experience.${expIndex}.responsibilities.${respIndex}`}
                                      as="textarea"
                                      rows="2"
                                      className="form-control responsa-field"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeResp(respIndex)}
                                    >
                                      -
                                    </button>
                                  </div>
                                ))}
                                <button
                                  className="btn-add-link"
                                  type="button"
                                  onClick={() => pushResp("")}
                                >
                                  + Responsabilidade
                                </button>
                              </div>
                            )}
                          </FieldArray>
                          <button
                            type="button"
                            onClick={() => remove(expIndex)}
                            className="btn-delete"
                          >
                            Remover Experiência <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-add-link"
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
                        <i className="bx bx-plus"></i> Adicionar Experiência
                      </button>
                    </div>
                  )}
                </FieldArray>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-button ${
                    isSubmitting ? "submitting" : ""
                  }`}
                >
                  {isSubmitting ? "Gerando PDF..." : "Gerar e Baixar PDF"}
                </button>
              </Form>
            </div>

            {/* Coluna da Visualização (CurriculumPreview) */}
            <div className="editor-preview-column">
              <div className="preview-page-mockup">
                <AutoCurriculumPreview />
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CurriculumEditor;
