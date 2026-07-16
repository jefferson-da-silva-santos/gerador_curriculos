const IMAGE_FALLBACK =
  "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png";

const TemplateCreative = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="cr-page" style={fontStyle}>
      <div className="cr-banner">
        <div className="cr-banner__inner">
          <img src={data.personal.imageSrc || IMAGE_FALLBACK} alt="Foto" />
          <div>
            <h1 className="cr-banner__name">{data.personal.name}</h1>
            <p className="cr-banner__role">{data.personal.role}</p>
            <div className="cr-contacts">
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
        </div>
      </div>

      <div className="cr-body">
        <div className="cr-block">
          <span className="cr-block__title">{labels.objective}</span>
          <p>{data.objective}</p>
        </div>

        <div className="cr-block">
          <span className="cr-block__title">{labels.skills}</span>
          <div className="cr-skills">
            {data.skills.map((skill, i) => (
              <div className="cr-skill-pill" key={i}>
                {skill.name}
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`cr-dot ${n <= skill.level ? "filled" : ""}`} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="cr-block">
          <span className="cr-block__title">{labels.experience}</span>
          {data.experience.map((exp, i) => (
            <div className="cr-entry" key={i}>
              <div className="cr-entry__row">
                <span>{exp.role}</span>
                <span>{exp.period}</span>
              </div>
              <p className="cr-entry__sub">{exp.company} — {exp.location}</p>
              <ul>
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} dangerouslySetInnerHTML={{ __html: resp }} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cr-block">
          <span className="cr-block__title">{labels.education}</span>
          {data.education.map((edu, i) => (
            <div className="cr-entry" key={i}>
              <div className="cr-entry__row">
                <span>{edu.course}</span>
                <span>{edu.period}</span>
              </div>
              <p className="cr-entry__sub">{edu.institution}</p>
              <p className="cr-entry__desc">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="cr-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateCreative;
