const TemplateCorporate = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="co-page" style={fontStyle}>
      <div className="co-topbar" />

      <header className="co-header">
        <div>
          <div className="co-header__name">{data.personal.name}</div>
          <div className="co-header__role">{data.personal.role}</div>
        </div>
      </header>

      <div className="co-contacts-bar">
        <span>{data.contact.address}</span>
        <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
        <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
        {data.contact.links.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noreferrer">
            {link.label}: {link.handle}
          </a>
        ))}
      </div>

      <div className="co-body">
        <section className="co-block">
          <h2 className="co-block__title">{labels.objective}</h2>
          <p>{data.objective}</p>
        </section>

        <section className="co-block">
          <h2 className="co-block__title">{labels.skills}</h2>
          <div className="co-skills-grid">
            {data.skills.map((skill, i) => (
              <div className="co-skill-row" key={i}>
                <span>{skill.name}</span>
                <span>{"★".repeat(skill.level)}{"☆".repeat(5 - skill.level)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="co-block">
          <h2 className="co-block__title">{labels.experience}</h2>
          {data.experience.map((exp, i) => (
            <div className="co-entry" key={i}>
              <div className="co-entry__row">
                <span>{exp.role}</span>
                <span>{exp.period}</span>
              </div>
              <p className="co-entry__sub">{exp.company} — {exp.location}</p>
              <ul>
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} dangerouslySetInnerHTML={{ __html: resp }} />
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="co-block">
          <h2 className="co-block__title">{labels.education}</h2>
          {data.education.map((edu, i) => (
            <div className="co-entry" key={i}>
              <div className="co-entry__row">
                <span>{edu.course}</span>
                <span>{edu.period}</span>
              </div>
              <p className="co-entry__sub">{edu.institution}</p>
              <p className="co-entry__desc">{edu.description}</p>
            </div>
          ))}
        </section>
      </div>

      <footer className="co-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateCorporate;
