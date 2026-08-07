// Modelo "Direto": duas colunas, sem foto, competências em pills —
// direto ao ponto, ótimo pra qualquer área que valorize objetividade
// (mercado, atacarejo, produção, serviços gerais).
const TemplateDireto = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="dt-page" style={fontStyle}>
      <header className="dt-header">
        <h1 className="dt-header__name">{data.personal.name}</h1>
        <p className="dt-header__role">{data.personal.role}</p>
      </header>

      <div className="dt-grid">
        <aside className="dt-side">
          <section className="dt-block">
            <h2 className="dt-block__title">{labels.personalData}</h2>
            <ul className="dt-list">
              <li>
                <i className="bx bx-user" /> {data.personal.fullName}
              </li>
              {data.contact.email && (
                <li>
                  <i className="bx bxs-envelope" />
                  <a href={`mailto:${data.contact.email}`}>
                    {data.contact.email}
                  </a>
                </li>
              )}
              {data.contact.phone && (
                <li>
                  <i className="bx bxs-phone-call" />
                  <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
                </li>
              )}
              {data.contact.address && (
                <li>
                  <i className="bx bxs-map" /> {data.contact.address}
                </li>
              )}
              {data.contact.links.map((link, i) => (
                <li key={i}>
                  <i className={`bx ${link.icon}`} />
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {data.skills?.length > 0 && (
            <section className="dt-block">
              <h2 className="dt-block__title">{labels.skills}</h2>
              <div className="dt-skills">
                {data.skills.map((skill, i) => (
                  <span className="dt-skill-pill" key={i}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="dt-main">
          {data.objective && (
            <section className="dt-block">
              <h2 className="dt-block__title">{labels.objective}</h2>
              <p className="dt-text">{data.objective}</p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="dt-block">
              <h2 className="dt-block__title">{labels.experience}</h2>
              {data.experience.map((exp, i) => (
                <div className="dt-entry" key={i}>
                  <div className="dt-entry__row">
                    <span>{exp.role}</span>
                    <span className="dt-entry__period">{exp.period}</span>
                  </div>
                  <p className="dt-entry__sub">
                    {exp.company}
                    {exp.location ? ` — ${exp.location}` : ""}
                  </p>
                  {exp.responsibilities?.length > 0 && (
                    <ul>
                      {exp.responsibilities.map((r, ri) => (
                        <li key={ri} dangerouslySetInnerHTML={{ __html: r }} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.education?.length > 0 && (
            <section className="dt-block">
              <h2 className="dt-block__title">{labels.education}</h2>
              {data.education.map((edu, i) => (
                <div className="dt-entry" key={i}>
                  <div className="dt-entry__row">
                    <span>{edu.course}</span>
                    <span className="dt-entry__period">{edu.period}</span>
                  </div>
                  <p className="dt-entry__sub">{edu.institution}</p>
                  {edu.description && (
                    <p className="dt-entry__desc">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>

      <footer className="dt-footer">
        <p>
          Autorizo o processamento de meus dados pessoais para fins de
          recrutamento para o cargo ao qual estou me candidatando.
        </p>
      </footer>
    </div>
  );
};

export default TemplateDireto;
