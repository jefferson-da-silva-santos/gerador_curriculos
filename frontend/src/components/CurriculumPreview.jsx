import useFont from '../hooks/useFont';
import CurriculumStyles from './CurriculumStyles';
const IMAGE_URL = '/public/img.jpeg';

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

const CurriculumPreview = ({ data, isForExport = false }) => {
  // O hook useFont retorna um objeto como: { id: 1, font: "Inter", link: "...", styles: "font-family: 'Inter', sans-serif;" }
  const { font } = useFont(); 
  
  // Extrai o valor do estilo da fonte, por exemplo: "font-family: 'Inter', sans-serif;"
  // e o transforma em um objeto de estilo React, ex: { fontFamily: "'Inter', sans-serif" }
  // Apenas a parte da família da fonte é usada para a prop `style`.
  const fontStyle = {};
  if (font && font.styles) {
      const match = font.styles.match(/font-family:\s*(.*?);/);
      if (match && match[1]) {
          // Converte para camelCase: 'font-family' -> 'fontFamily'
          fontStyle.fontFamily = match[1].replace(/['"]/g, ''); // Remove aspas para o estilo direto
      }
  }

  return (
    <>
      {/* Adiciona o link da fonte se o componente não for para exportação.
        O componente CurriculumStyles deve injetar o CSS da fonte (ou o link)
        ou você precisará de uma forma de injetar o link `font.link` aqui, 
        se ele não estiver no `CurriculumStyles` ou no HTML global.
      */}
      {!isForExport && <CurriculumStyles />}

      {/* Aplica o estilo da fonte ao container usando a prop `style` */}
      <div className="container" style={fontStyle}>
        <div className="col1">
          <div className="row1">
            <div className="overlay">
              <h1 className="title">{data.personal.name}</h1>
              <p className="function">{data.personal.role}</p>
            </div>
            <img src={IMAGE_URL} alt="Foto" /> 
          </div> 

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

          {/* Seção 3: Competências */}
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
          {/* Seção 4: Objetivo */}
          <div className="row1">
            <h2 className="title">Objetivo</h2>
            <p className="text">{data.objective}</p>
          </div>

          {/* Seção 5: Formação */}
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

          {/* Seção 6: Experiência */}
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