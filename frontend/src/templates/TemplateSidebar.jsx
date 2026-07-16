// Modelo "Sidebar" — é o layout original do projeto (coluna lateral com foto
// + coluna principal), preservado 100% igual ao antigo CurriculumPreview.jsx.

const renderSkillCircles = (level) => {
  const circles = [];
  for (let i = 1; i <= 5; i++) {
    circles.push(
      <div key={i} className={`circle ${i <= level ? "cl" : ""}`}></div>
    );
  }
  return <div className="circles">{circles}</div>;
};

const IMAGE_FALLBACK =
  "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png";

const TemplateSidebar = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="container" style={fontStyle}>
      <div className="col1">
        <div className="row1">
          <div className="overlay">
            <h1 className="title">{data.personal.name}</h1>
            <p className="function">{data.personal.role}</p>
          </div>
          <img src={data.personal.imageSrc || IMAGE_FALLBACK} alt="Foto" />
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

            {data.contact.links.map((link, index) => (
              <li key={index}>
                <i className={`bx ${link.icon}`}></i>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label}: {link.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="row3">
          <h2 className="title">{labels.skills}</h2>
          <ul className="list">
            {data.skills.map((skill, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {skill.name}
                {renderSkillCircles(skill.level)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col2">
        <div className="row1">
          <h2 className="title">{labels.objective}</h2>
          <p className="text">{data.objective}</p>
        </div>

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
  );
};

export default TemplateSidebar;
