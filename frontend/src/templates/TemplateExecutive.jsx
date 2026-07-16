const TemplateExecutive = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="ex-page" style={fontStyle}>
      <header className="ex-header">
        <h1 className="ex-header__name">{data.personal.name}</h1>
        <p className="ex-header__role">{data.personal.role}</p>
        <div className="ex-contacts">
          <span>{data.contact.address}</span>
          <span><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></span>
          <span><a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a></span>
          {data.contact.links.map((link, i) => (
            <span key={i}>
              <a href={link.url} target="_blank" rel="noreferrer">{link.handle}</a>
            </span>
          ))}
        </div>
      </header>

      <div className="ex-divider" />

      <div className="ex-body">
        <div>
          <div className="ex-block">
            <h2 className="ex-block__title">{labels.personalData}</h2>
            <p style={{ fontSize: "0.85rem" }}>{data.personal.fullName}</p>
          </div>

          <div className="ex-block">
            <h2 className="ex-block__title">{labels.skills}</h2>
            {data.skills.map((skill, i) => (
              <div className="ex-skill" key={i}>
                <span>{skill.name}</span>
                <i className="bx bxs-star" />
              </div>
            ))}
          </div>

          <div className="ex-block">
            <h2 className="ex-block__title">{labels.education}</h2>
            {data.education.map((edu, i) => (
              <div className="ex-entry" key={i}>
                <div className="ex-entry__row">
                  <span>{edu.course}</span>
                  <span>{edu.period}</span>
                </div>
                <p className="ex-entry__sub">{edu.institution}</p>
                <p className="ex-entry__desc">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="ex-block">
            <h2 className="ex-block__title">{labels.objective}</h2>
            <p>{data.objective}</p>
          </div>

          <div className="ex-block">
            <h2 className="ex-block__title">{labels.experience}</h2>
            {data.experience.map((exp, i) => (
              <div className="ex-entry" key={i}>
                <div className="ex-entry__row">
                  <span>{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <p className="ex-entry__sub">{exp.company} — {exp.location}</p>
                <ul>
                  {exp.responsibilities.map((resp, ri) => (
                    <li key={ri} dangerouslySetInnerHTML={{ __html: resp }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="ex-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateExecutive;
