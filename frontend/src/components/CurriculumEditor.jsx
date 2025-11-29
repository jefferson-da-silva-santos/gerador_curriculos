import { Formik, Field, Form, FieldArray, useFormikContext } from 'formik';
import CurriculumPreview from './CurriculumPreview';
import useTheme from '../hooks/useTheme';
import { renderToString } from 'react-dom/server'; 
import useFont from '../hooks/useFont';

const initialValues = {
  personal: {
    name: 'Jefferson Santos', 
    role: 'Desenvolvedor Full Stack', 
    fullName: 'Jefferson da Silva Santos', 
    imageSrc: '/public/img.jpeg',
  },
  contact: {
    portfolioUrl: 'https://jeffersondev.netlify.app',
    email: 'jeffrrwpg678@gmail.com',
    phone: '(81) 9 9936-7426',
    address: 'Sítio Guabiraba, 64, Limoeiro - PE',
    linkedinUrl: 'https://www.linkedin.com/in/jefferson-santos-a87b74277',
    linkedinHandle: 'jefferson-santos',
    githubUrl: 'https://github.com/jefferson-da-silva-santos',
    githubHandle: 'jefferson-da-silva-santos',
  },

  skills: [
    { name: 'React', level: 4 },
    { name: 'Next.js', level: 4 },
    { name: 'Node.js', level: 4 },
    { name: 'NestJS', level: 4 },
    { name: 'Git / GitHub', level: 4 },
    { name: 'Docker', level: 4 },
    { name: 'n8n', level: 4 },
    { name: 'SASS', level: 4 },
    { name: 'MySQL', level: 4 },
    { name: 'PostgreSQL', level: 4 },
    { name: 'Firebird', level: 4 },
    { name: 'Redis', level: 4 },
    { name: 'Java', level: 4 },
    { name: 'Flutter', level: 4 },
    { name: 'UI / UX', level: 4 },
    { name: 'Figma', level: 4 },
  ],

  objective:
    'Atuar como desenvolvedor Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Trabalho com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.',
  education: [
    {
      course: 'Desenvolvimento de Sistemas',
      period: '2021 - 2023',
      institution: 'Escola Técnica José Humberto de Moura Cavalcante',
      description:
        'Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.',
    },
  ],

  experience: [
    {
      role: 'Desenvolvedor Junior',
      period: 'Jun 2025 - Atual',
      company: 'Ongold Tech',
      location: 'Limoeiro, PE',
      responsibilities: [
        'Desenvolvimento full stack com React, Next.js e Node.js (Express, Adonis, Nest), integrando APIs RESTful e criando interfaces modernas.',
        'Uso de Git, Docker e n8n para versionamento, containerização e automação de processos.',
        'Manutenção, testes, documentação e evolução contínua de sistemas.',
        'Aplicação de boas práticas, Clean Code e Design Patterns, colaborando em equipes ágeis.',
      ],
    },
    {
      role: 'Desenvolvedor Freelancer',
      period: 'Set 2023 - Dez 2023',
      company: 'Óticas Leal',
      location: 'Limoeiro, PE',
      responsibilities: [
        'Desenvolvimento do <a href="https://oticasleal.netlify.app" target="_blank">site institucional</a> com React, focado em SEO, usabilidade e responsividade.',
        'Uso de boas práticas de código, versionamento com Git e otimização de performance.',
      ],
    },
    {
      role: 'Desenvolvedor Freelancer',
      period: 'Abr 2023 - Ago 2023',
      company: 'Produtos Léo de Lita',
      location: 'Limoeiro, PE',
      responsibilities: [
        '<a href="https://bolachasleodelita.com.br" target="_blank">Site institucional</a> desenvolvido em React, com foco em velocidade e SEO',
        'Arquitetura modular, boas práticas e versionamento com Git.',
      ],
    },
  ],
};

const AutoCurriculumPreview = () => {
  const { values } = useFormikContext();
  return <CurriculumPreview data={values} />;
};

const generateCurriculumHtml = (data, styles, font) => {
  const curriculumBodyHtml = renderToString(<CurriculumPreview data={data} isForExport={true} />);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href=${font}
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


const CurriculumEditor = () => {
  const {  themeObject, nextTheme, prevTheme } = useTheme();
  const { font, nextFont, prevFont } = useFont();

  const handleGeneratePdf = async (values, actions) => {
    actions.setSubmitting(true);
    
    try {
        const finalHtml = generateCurriculumHtml(values, themeObject.styles, font.link);
        
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

        // 3. Receber o blob (o PDF) e forçar o download
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'curriculo.pdf'; // O nome do arquivo definido no backend é 'curriculo.pdf'
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleGeneratePdf} 
      >
        {({ values, isSubmitting }) => (
          <>
            {/* Coluna do Formulário */}
            <div className="editor-form-column">
              <div className="group-title">
                <h2>Editor de Currículo</h2>

               
                <div className='group-buttons'>

                  <div className='wrap'>
                    <p>Selecione a Fonte:</p>
                    <div className="buttons">
                      <button disabled={isSubmitting} onClick={prevFont}>
                        <i className='bx bx-chevrons-left' ></i>
                      </button>
                      <span className='text'>{font.font}</span>
                      <button disabled={isSubmitting} onClick={nextFont}>
                        <i className='bx bx-chevrons-right'></i>
                      </button>
                    </div>
                  </div>

                  <div className='wrap'>
                    <p>Selecione o Tema:</p>
                    <div className="buttons">
                      <button disabled={isSubmitting} onClick={prevTheme}>
                        <i className='bx bx-chevrons-left' ></i>
                      </button>
                      <span className='text'>{themeObject.theme}</span>
                      <button disabled={isSubmitting} onClick={nextTheme}>
                        <i className='bx bx-chevrons-right'></i>
                      </button>
                    </div>
                  </div>


                </div>
              </div>
              <Form className="editor-form">

                {/* Seção 1: Dados Pessoais */}
                <h3>Dados Pessoais</h3>
                <div className="input-group-section">
                  <label>Nome Principal:</label>
                  <Field name="personal.name" type="text" className="form-control" />
                  <label>Função Principal:</label>
                  <Field name="personal.role" type="text" className="form-control" />
                  <label>Nome Completo (Lista):</label>
                  <Field name="personal.fullName" type="text" className="form-control" />
                  <label>URL da Imagem:</label>
                  <Field name="personal.imageSrc" type="text" className="form-control" />

                  <h4 className="sub-section-title">Contato</h4>
                  <label>E-mail:</label>
                  <Field name="contact.email" type="email" className="form-control" />
                  <label>Telefone:</label>
                  <Field name="contact.phone" type="text" className="form-control" />
                  <label>Endereço:</label>
                  <Field name="contact.address" type="text" className="form-control" />
                  <label>Portfolio URL:</label>
                  <Field name="contact.portfolioUrl" type="url" className="form-control" />
                  <label>LinkedIn URL:</label>
                  <Field name="contact.linkedinUrl" type="url" className="form-control" />
                  <label>GitHub URL:</label>
                  <Field name="contact.githubUrl" type="url" className="form-control" />
                </div>

                {/* Seção 2: Objetivo */}
                <h3>Objetivo</h3>
                <Field name="objective" as="textarea" rows="4" className="form-control" />

                {/* Seção 3: Formação */}
                <h3>Formação</h3>
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <div className="input-group-section">
                      {values.education.map((edu, index) => (
                        <div className='formacao form-item-border' key={index}>
                          <label>Curso:</label>
                          <Field name={`education.${index}.course`} type="text" className="form-control" />
                          <label>Período:</label>
                          <Field name={`education.${index}.period`} type="text" className="form-control" />
                          <label>Instituição:</label>
                          <Field name={`education.${index}.institution`} type="text" className="form-control" />
                          <label>Descrição:</label>
                          <Field name={`education.${index}.description`} as="textarea" rows="2" className="form-control" />
                          <button type="button" onClick={() => remove(index)} className="remove-button-margin">
                            <i className="bx bx-trash"></i>  Remover Formação
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => push({ course: '', period: '', institution: '', description: '' })}>
                        Adicionar Formação
                      </button>
                    </div>
                  )}
                </FieldArray>

                {/* Seção 4: Competências */}
                <h3>Competências</h3>
                <FieldArray name="skills">
                  {({ push, remove }) => (
                    <div className="input-group-section">
                      {values.skills.map((skill, index) => (
                        <div key={index} className="skill-item-row">
                          <Field name={`skills.${index}.name`} type="text" className="form-control skill-name-field" />
                          <Field name={`skills.${index}.level`} as="select" className="form-control skill-level-field">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </Field>
                          <button className="remove-button-margin" type="button" onClick={() => remove(index)}>
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => push({ name: '', level: 3 })}>
                        Adicionar Competência
                      </button>
                    </div>
                  )}
                </FieldArray>

                {/* Seção 5: Experiência */}
                <h3>Experiência</h3>
                <FieldArray name="experience">
                  {({ push, remove }) => (
                    <div className="input-group-section">
                      {values.experience.map((exp, expIndex) => (
                        <div className='experiencia form-item-double-border' key={expIndex}>
                          <h4>Experiência #{expIndex + 1}</h4>
                          <label>Cargo:</label>
                          <Field name={`experience.${expIndex}.role`} type="text" className="form-control" />
                          <label>Período:</label>
                          <Field name={`experience.${expIndex}.period`} type="text" className="form-control" />
                          <label>Empresa:</label>
                          <Field name={`experience.${expIndex}.company`} type="text" className="form-control" />
                          <label>Localização:</label>
                          <Field name={`experience.${expIndex}.location`} type="text" className="form-control" />

                          <h5>Responsabilidades</h5>
                          <FieldArray name={`experience.${expIndex}.responsibilities`}>
                            {({ push: pushResp, remove: removeResp }) => (
                              <div className='responsas responsa-list-indent'>
                                {exp.responsibilities.map((resp, respIndex) => (
                                  <div key={respIndex} className="responsa-item-row">
                                    <Field name={`experience.${expIndex}.responsibilities.${respIndex}`} as="textarea" rows="2" className="form-control responsa-field" />
                                    <button type="button" onClick={() => removeResp(respIndex)}>
                                      -
                                    </button>
                                  </div>
                                ))}
                                <button type="button" onClick={() => pushResp('')}>
                                  + Responsabilidade
                                </button>
                              </div>
                            )}
                          </FieldArray>
                          <button type="button" onClick={() => remove(expIndex)} className="remove-experience-button">
                           <i className="bx bx-trash"></i> Remover Experiência
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => push({ role: '', period: '', company: '', location: '', responsibilities: [''] })}>
                        Adicionar Experiência
                      </button>
                    </div>
                  )}
                </FieldArray>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                >
                  {isSubmitting ? 'Gerando PDF...' : 'Gerar e Baixar PDF'}
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