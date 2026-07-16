const TemplateMinimal = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="mi-page" style={fontStyle}>
      <header className="mi-header">
        <h1 className="mi-header__name">{data.personal.name}</h1>
        <p className="mi-header__role">{data.personal.role}</p>
        <div className="mi-contacts">
          <span>{data.contact.address}</span>
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
          {data.contact.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer">
              {link.label}: {link.handle}
            </a>
          ))}
        </div>
      </header>

      <section className="mi-section">
        <h2 className="mi-section__title">{labels.objective}</h2>
        <p>{data.objective}</p>
      </section>

      <section className="mi-section">
        <h2 className="mi-section__title">{labels.skills}</h2>
        <div className="mi-skills">
          {data.skills.map((skill, i) => (
            <span className="mi-skill-pill" key={i}>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mi-section">
        <h2 className="mi-section__title">{labels.experience}</h2>
        {data.experience.map((exp, i) => (
          <div className="mi-entry" key={i}>
            <div className="mi-entry__row">
              <span>{exp.role}</span>
              <span>{exp.period}</span>
            </div>
            <p className="mi-entry__sub">
              {exp.company} — {exp.location}
            </p>
            <ul>
              {exp.responsibilities.map((resp, ri) => (
                <li key={ri} dangerouslySetInnerHTML={{ __html: resp }} />
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mi-section">
        <h2 className="mi-section__title">{labels.education}</h2>
        {data.education.map((edu, i) => (
          <div className="mi-entry" key={i}>
            <div className="mi-entry__row">
              <span>{edu.course}</span>
              <span>{edu.period}</span>
            </div>
            <p className="mi-entry__sub">{edu.institution}</p>
            <p className="mi-entry__desc">{edu.description}</p>
          </div>
        ))}
      </section>

      <footer className="mi-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateMinimal;
