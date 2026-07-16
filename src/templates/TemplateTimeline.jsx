const IMAGE_FALLBACK =
  "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png";

const TemplateTimeline = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="tl-page" style={fontStyle}>
      <header className="tl-header">
        <img src={data.personal.imageSrc || IMAGE_FALLBACK} alt="Foto" />
        <div>
          <h1 className="tl-header__name">{data.personal.name}</h1>
          <p className="tl-header__role">{data.personal.role}</p>
          <div className="tl-contacts">
            <span>{data.contact.address}</span>
            <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
            <a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
            {data.contact.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer">
                {link.label}: {link.handle}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="tl-section">
        <h2 className="tl-section__title">{labels.objective}</h2>
        <p>{data.objective}</p>
      </section>

      <section className="tl-section">
        <h2 className="tl-section__title">{labels.skills}</h2>
        <div className="tl-skills">
          {data.skills.map((skill, i) => (
            <div className="tl-skill-row" key={i}>
              <span>{skill.name}</span>
              <div className="tl-bar-track">
                <div className="tl-bar-fill" style={{ width: `${(skill.level / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tl-section">
        <h2 className="tl-section__title">{labels.experience}</h2>
        <div className="tl-timeline">
          {data.experience.map((exp, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-item__row">
                <span>{exp.role}</span>
                <span>{exp.period}</span>
              </div>
              <p className="tl-item__sub">{exp.company} — {exp.location}</p>
              <ul>
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} dangerouslySetInnerHTML={{ __html: resp }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="tl-section">
        <h2 className="tl-section__title">{labels.education}</h2>
        <div className="tl-timeline">
          {data.education.map((edu, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-item__row">
                <span>{edu.course}</span>
                <span>{edu.period}</span>
              </div>
              <p className="tl-item__sub">{edu.institution}</p>
              <p className="tl-item__desc">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="tl-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateTimeline;
