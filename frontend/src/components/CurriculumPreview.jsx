// src/components/CurriculumPreview.js (ou .jsx)

import React from 'react';
import CurriculumStyles from './CurriculumStyles';
// IMPORTANTE: use o caminho relativo original se a imagem estiver no diretório 'public'
// Para o export SSR (renderToString), o caminho deve ser o que o Puppeteer acessará, que é '/public/img.jpeg'
// Para o preview local no navegador, o React pode precisar de um import diferente, mas vamos priorizar o caminho para o Puppeteer.
// Se você está usando bundlers como Webpack/Vite, 'import img from ...' pode injetar um hash, o que é problemático para o Puppeteer. 
// Para simplificar, vamos usar a string de caminho URL pura que o Puppeteer reconhecerá:
const IMAGE_URL = '/public/img.jpeg'; 


// Função auxiliar para renderizar os círculos de nível de competência (Mantida)
const renderSkillCircles = (level) => {
  const circles = [];
  for (let i = 1; i <= 5; i++) {
    circles.push(
      <div
        key={i}
        className={`circle ${i <= level ? 'cl' : ''}`}
      ></div>
    );
  }
  return <div className="circles">{circles}</div>;
};

/**
 * Componente de Pré-visualização do Currículo.
 * @param {object} data - Os dados do currículo.
 * @param {boolean} [isForExport=false] - Se for true, omite o CurriculumStyles para evitar duplicação de CSS na exportação HTML.
 */
const CurriculumPreview = ({ data, isForExport = false }) => {
  return (
    <>
      {/* 🛑 ATENÇÃO: Se for para exportação, NÃO injetamos o CSS aqui. */}
      {/* O CSS será injetado diretamente na tag <style> do HTML final pelo CurriculumEditor. */}
      {!isForExport && <CurriculumStyles />}

      <div className="container">
        <div className="col1">
          {/* Seção 1: Nome e Cargo */}
          <div className="row1">
            <div className="overlay">
              <h1 className="title">{data.personal.name}</h1>
              <p className="function">{data.personal.role}</p>
            </div>
            {/* O Puppeteer acessará o caminho /public/img.jpeg diretamente no servidor Express */}
            <img src={IMAGE_URL} alt="Foto" /> 
          </div> 

          {/* Seção 2: Dados Pessoais (Mantida) */}
          <div className="row2">
            <h2 className="title">Dados pessoais</h2>
            <ul className="list">
              <li>
                <i className="bx bx-user"></i>
                {data.personal.fullName}
              </li>
              <li>
                <i className="bx bx-link-alt"></i>
                <a href={data.contact.portfolioUrl} target="_blank">
                  Portfólio pessoal
                </a>
              </li>
              <li>
                <i className="bx bxs-envelope"></i>
                <a href={`mailto:${data.contact.email}`}>
                  E-mail: {data.contact.email}
                </a>
              </li>
              <li>
                <i className="bx bxs-phone-call"></i>
                <a href={`tel:${data.contact.phone}`}>
                  Telefone: {data.contact.phone}
                </a>
              </li>
              <li>
                <i className="bx bxs-home"></i>
                <span>Endereço: {data.contact.address}</span>
              </li>
              <li>
                <i className="bx bxl-linkedin-square"></i>
                <a href={data.contact.linkedinUrl} target="_blank">
                  LinkedIn: {data.contact.linkedinHandle}
                </a>
              </li>
              <li>
                <i className="bx bxl-github"></i>
                <a href={data.contact.githubUrl} target="_blank">
                  GitHub: {data.contact.githubHandle}
                </a>
              </li>
            </ul>
          </div>

          {/* Seção 3: Competências (Mantida) */}
          <div className="row3">
            <h2 className="title">Competências</h2>
            <ul className="list">
              {data.skills.map((skill, index) => (
                <li key={index}>
                  {skill.name}
                  {renderSkillCircles(skill.level)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col2">
          {/* Seção 4: Objetivo (Mantida) */}
          <div className="row1">
            <h2 className="title">Objetivo</h2>
            <p className="text">{data.objective}</p>
          </div>

          {/* Seção 5: Formação (Mantida) */}
          <div className="row2">
            <h2 className="title">Formação</h2>
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="group">
                  <div className="group__col1">{edu.course}</div>
                  <div className="group__col2">{edu.period}</div>
                </div>
                <div className="infos">
                  <h3 className="university-name">{edu.institution}</h3>
                  <p className="description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Seção 6: Experiência (Mantida) */}
          <div className="row3">
            <h2 className="title">Experiência</h2>
            {data.experience.map((exp, index) => (
              <div className="item" key={index}>
                <div className="group">
                  <div className="group__col1">{exp.role}</div>
                  <div className="group__col2">{exp.period}</div>
                </div>
                <div className="infos">
                  <h3 className="enterprise-name">
                    {exp.company} — {exp.location}
                  </h3>
                  <ul className="list">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>
                        <i className="bx bxs-circle"></i>
                        {/* Permite HTML embutido na responsabilidade (como tags <a>) */}
                        <span dangerouslySetInnerHTML={{ __html: resp }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <footer className="footer">
            <p className="text">
              Autorizo o processamento de meus dados pessoais para fins de
              recrutamento para o cargo ao qual estou me candidatando.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CurriculumPreview;