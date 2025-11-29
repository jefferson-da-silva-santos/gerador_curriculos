
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
  return (
    <div className="circles">
      {circles}
    </div>
  );
};

const CurriculumPreview = ({ data, isForExport = false }) => {
  const { font } = useFont();

  const fontStyle = {};
  if (font && font.styles) {
    const match = font.styles.match(/font-family:\s*(.*?);/);
    if (match && match[1]) {
      fontStyle.fontFamily = match[1].replace(/['"]/g, '');
    }
  }

  // Define os títulos das seções, usando o valor editável ou um fallback
  const labels = {
    personalData: data.labels?.personalData || 'Dados pessoais',
    skills: data.labels?.skills || 'Competências',
    objective: data.labels?.objective || 'Objetivo',
    education: data.labels?.education || 'Formação',
    experience: data.labels?.experience || 'Experiência',
  };

  return (
    <>
      {!isForExport && <CurriculumStyles />}

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
            <h2 className="title">{labels.personalData}</h2>
            <ul className="list">
              <li>
                <i className="bx bx-user"></i>
                {data.personal.fullName}
              </li>
              <li>
                <i className="bx bxs-envelope"></i>
                <a href={`mailto:${data.contact.email}`}>E-mail: {data.contact.email}</a>
              </li>
              <li>
                <i className="bx bxs-phone-call"></i>
                <a href={`tel:${data.contact.phone}`}>Telefone: {data.contact.phone}</a>
              </li>
              <li>
                <i className="bx bxs-home"></i>
                <span>Endereço: {data.contact.address}</span>
              </li>
              
              {/* Iteração sobre os links dinâmicos */}
              {data.contact.links.map((link, index) => (
                <li key={index}>
                  <i className={`bx ${link.icon}`}></i>
                  <a href={link.url} target="_blank">
                    {link.label}: {link.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seção 3: Competências */}
          <div className="row3">
            <h2 className="title">{labels.skills}</h2>
            <ul className="list">
              {data.skills.map((skill, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <h2 className="title">{labels.objective}</h2>
            <p className="text">{data.objective}</p>
          </div>

          {/* Seção 5: Formação */}
          <div className="row2">
            <h2 className="title">{labels.education}</h2>
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
            <h2 className="title">{labels.experience}</h2>
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