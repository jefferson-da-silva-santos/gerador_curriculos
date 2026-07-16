const TemplateCompact = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="cp-page" style={fontStyle}>
      <header className="cp-header">
        <div>
          <div className="cp-header__name">{data.personal.name}</div>
          <div className="cp-header__role">{data.personal.role}</div>
        </div>
      </header>

      <div className="cp-contacts">
        <span>{data.contact.address}</span>
        <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
        <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
        {data.contact.links.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noreferrer">
            {link.label}: {link.handle}
          </a>
        ))}
      </div>

      <section className="cp-section cp-section--full">
        <h2 className="cp-section__title">{labels.objective}</h2>
        <p>{data.objective}</p>
      </section>

      <div className="cp-grid">
        <section className="cp-section">
          <h2 className="cp-section__title">{labels.skills}</h2>
          <div className="cp-chips">
            {data.skills.map((skill, i) => (
              <span className="cp-chip" key={i}>{skill.name}</span>
            ))}
          </div>
        </section>

        <section className="cp-section">
          <h2 className="cp-section__title">{labels.education}</h2>
          {data.education.map((edu, i) => (
            <div className="cp-entry" key={i}>
              <div className="cp-entry__row">
                <span>{edu.course}</span>
                <span>{edu.period}</span>
              </div>
              <p className="cp-entry__sub">{edu.institution}</p>
            </div>
          ))}
        </section>

        <section className="cp-section cp-section--full">
          <h2 className="cp-section__title">{labels.experience}</h2>
          {data.experience.map((exp, i) => (
            <div className="cp-entry" key={i}>
              <div className="cp-entry__row">
                <span>{exp.role}</span>
                <span>{exp.period}</span>
              </div>
              <p className="cp-entry__sub">{exp.company} — {exp.location}</p>
              <ul>
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} dangerouslySetInnerHTML={{ __html: resp }} />
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <footer className="cp-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateCompact;
