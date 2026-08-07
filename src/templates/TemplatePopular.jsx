// Modelo "Popular": cabeçalho colorido com foto circular, layout de
// coluna única — pensado para vagas de atendimento, comércio, mercado,
// alimentação. Competências em pills (sem "nível"), sem nada
// visualmente associado a tecnologia.
const TemplatePopular = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="pp-page" style={fontStyle}>
      <header className="pp-header">
        {data.personal.imageSrc && (
          <img
            className="pp-header__photo"
            src={data.personal.imageSrc}
            alt="Foto"
          />
        )}
        <div className="pp-header__info">
          <h1 className="pp-header__name">{data.personal.name}</h1>
          <p className="pp-header__role">{data.personal.role}</p>
          <div className="pp-header__contacts">
            {data.contact.email && (
              <span>
                <i className="bx bxs-envelope" /> {data.contact.email}
              </span>
            )}
            {data.contact.phone && (
              <span>
                <i className="bx bxs-phone-call" /> {data.contact.phone}
              </span>
            )}
            {data.contact.address && (
              <span>
                <i className="bx bxs-map" /> {data.contact.address}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="pp-body">
        {data.objective && (
          <section className="pp-section">
            <h2 className="pp-section__title">{labels.objective}</h2>
            <p className="pp-text">{data.objective}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="pp-section">
            <h2 className="pp-section__title">{labels.experience}</h2>
            {data.experience.map((exp, i) => (
              <div className="pp-entry" key={i}>
                <div className="pp-entry__row">
                  <span>{exp.role}</span>
                  <span className="pp-entry__period">{exp.period}</span>
                </div>
                <p className="pp-entry__sub">
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
          <section className="pp-section">
            <h2 className="pp-section__title">{labels.education}</h2>
            {data.education.map((edu, i) => (
              <div className="pp-entry" key={i}>
                <div className="pp-entry__row">
                  <span>{edu.course}</span>
                  <span className="pp-entry__period">{edu.period}</span>
                </div>
                <p className="pp-entry__sub">{edu.institution}</p>
                {edu.description && (
                  <p className="pp-entry__desc">{edu.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {data.skills?.length > 0 && (
          <section className="pp-section">
            <h2 className="pp-section__title">{labels.skills}</h2>
            <div className="pp-skills">
              {data.skills.map((skill, i) => (
                <span className="pp-skill-pill" key={i}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.contact.links?.length > 0 && (
          <section className="pp-section">
            <h2 className="pp-section__title">Links</h2>
            <ul className="pp-links">
              {data.contact.links.map((link, i) => (
                <li key={i}>
                  <i className={`bx ${link.icon}`} />
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}: {link.handle}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="pp-footer">
        <p>
          Autorizo o processamento de meus dados pessoais para fins de
          recrutamento para o cargo ao qual estou me candidatando.
        </p>
      </footer>
    </div>
  );
};

export default TemplatePopular;
