/* eslint-disable no-unused-vars */
import { Formik, Field, Form, FieldArray, useFormikContext } from 'formik';
import CurriculumPreview from './CurriculumPreview';
import useTheme from '../hooks/useTheme';

// Valores iniciais baseados no seu HTML
const initialValues = {
  // Seção de Dados Pessoais (Col1, Row1 e Row2)
  personal: {
    name: 'Jefferson Santos', // Título principal (H1)
    role: 'Desenvolvedor Full Stack', // Função (P)
    fullName: 'Jefferson da Silva Santos', // Nome completo (Item da lista)
    imageSrc: '/public/img.jpeg', // Imagem
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
  // Seção de Competências (Col1, Row3)
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
  // Seção de Objetivo (Col2, Row1)
  objective:
    'Atuar como desenvolvedor Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Trabalho com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.',
  // Seção de Formação (Col2, Row2)
  education: [
    {
      course: 'Desenvolvimento de Sistemas',
      period: '2021 - 2023',
      institution: 'Escola Técnica José Humberto de Moura Cavalcante',
      description:
        'Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.',
    },
  ],
  // Seção de Experiência (Col2, Row3)
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

// Componente que renderiza a prévia do currículo automaticamente a cada mudança
const AutoCurriculumPreview = () => {
  const { values } = useFormikContext();
  return <CurriculumPreview data={values} />;
};

const CurriculumEditor = () => {
  const { toggleTheme } = useTheme();
  const handleSubmit = (values, actions) => {
    // Aqui você pode enviar os dados para um backend ou gerar o HTML/PDF.
    console.log('Dados do Currículo Submetidos:', values);
    actions.setSubmitting(false);
    alert('Dados salvos/submetidos. Verifique o console para os dados JSON.');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '20px', gap: '20px' }}>
      {/* Coluna do Formulário (Formik) */}
      <div style={{ flex: '1', maxWidth: '400px', borderRight: '1px solid #ccc', paddingRight: '20px' }}>
        <div className="group-title">
          <h2>📝 Editor de Currículo</h2>
          <button onClick={toggleTheme}>Mudar Tema</button>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Seção 1: Dados Pessoais */}
              <h3>Dados Pessoais</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #eee', padding: '10px' }}>
                <label>Nome Principal:</label>
                <Field name="personal.name" type="text" className="form-control" />
                <label>Função Principal:</label>
                <Field name="personal.role" type="text" className="form-control" />
                <label>Nome Completo (Lista):</label>
                <Field name="personal.fullName" type="text" className="form-control" />
                <label>URL da Imagem:</label>
                <Field name="personal.imageSrc" type="text" className="form-control" />

                <h4 style={{ marginTop: '10px' }}>Contato</h4>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid #eee', padding: '10px' }}>
                    {values.education.map((edu, index) => (
                      <div className='formacao' key={index} style={{ borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                        <label>Curso:</label>
                        <Field name={`education.${index}.course`} type="text" className="form-control" />
                        <label>Período:</label>
                        <Field name={`education.${index}.period`} type="text" className="form-control" />
                        <label>Instituição:</label>
                        <Field name={`education.${index}.institution`} type="text" className="form-control" />
                        <label>Descrição:</label>
                        <Field name={`education.${index}.description`} as="textarea" rows="2" className="form-control" />
                        <button type="button" onClick={() => remove(index)} style={{ marginTop: '5px' }}>
                          Remover Formação
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid #eee', padding: '10px' }}>
                    {values.skills.map((skill, index) => (
                      <div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                        <Field name={`skills.${index}.name`} type="text" style={{ flex: 2 }} className="form-control" />
                        <Field name={`skills.${index}.level`} as="select" style={{ flex: 1 }} className="form-control">
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </Field>
                        <button type="button" onClick={() => remove(index)}>
                          X
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', border: '1px solid #eee', padding: '10px' }}>
                    {values.experience.map((exp, expIndex) => (
                      <div className='experiencia' key={expIndex} style={{ borderBottom: '2px solid #ccc', paddingBottom: '15px' }}>
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
                            <div className='responsas' style={{ marginLeft: '10px' }}>
                              {exp.responsibilities.map((resp, respIndex) => (
                                <div key={respIndex} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                  <Field name={`experience.${expIndex}.responsibilities.${respIndex}`} as="textarea" rows="2" style={{ flex: 1 }} className="form-control" />
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
                        <button type="button" onClick={() => remove(expIndex)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
                          Remover Experiência
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ role: '', period: '', company: '', location: '', responsibilities: [''] })}>
                      Adicionar Experiência
                    </button>
                  </div>
                )}
              </FieldArray>

              <button type="submit" style={{ padding: '10px', backgroundColor: 'rgb(0, 40, 75)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Salvar Currículo
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Coluna da Visualização (CurriculumPreview) */}
      <div style={{ flex: '1', overflowY: 'auto', padding: '0 20px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '210mm', minHeight: '297mm', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          {/* O FormikContext permite que o AutoCurriculumPreview acesse os valores do formulário */}
          <Formik initialValues={initialValues} onSubmit={() => {}} enableReinitialize>
             {() => <AutoCurriculumPreview />}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CurriculumEditor;