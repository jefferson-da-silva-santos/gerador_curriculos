const IMAGE_FALLBACK =
  "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png";

const TemplateModern = ({ data, fontFamily }) => {
  const fontStyle = fontFamily ? { fontFamily } : {};

  const labels = {
    personalData: data.labels?.personalData || "Dados pessoais",
    skills: data.labels?.skills || "Competências",
    objective: data.labels?.objective || "Objetivo",
    education: data.labels?.education || "Formação",
    experience: data.labels?.experience || "Experiência",
  };

  return (
    <div className="m-page" style={fontStyle}>
      <div className="m-banner">
        <img src={data.personal.imageSrc || IMAGE_FALLBACK} alt="Foto" />
        <div>
          <h1 className="m-banner__name">{data.personal.name}</h1>
          <p className="m-banner__role">{data.personal.role}</p>
          <div className="m-banner__contacts">
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

      <div className="m-body">
        <div>
          <div className="m-block">
            <h2 className="m-block__title">{labels.personalData}</h2>
            <p>{data.personal.fullName}</p>
          </div>

          <div className="m-block">
            <h2 className="m-block__title">{labels.skills}</h2>
            {data.skills.map((skill, i) => (
              <div className="m-skill-row" key={i}>
                <span>{skill.name}</span>
                <div className="m-circles">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className={`m-circle ${n <= skill.level ? "filled" : ""}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="m-block">
            <h2 className="m-block__title">{labels.objective}</h2>
            <p>{data.objective}</p>
          </div>

          <div className="m-block">
            <h2 className="m-block__title">{labels.education}</h2>
            {data.education.map((edu, i) => (
              <div className="m-entry" key={i}>
                <div className="m-entry__row">
                  <span>{edu.course}</span>
                  <span>{edu.period}</span>
                </div>
                <p className="m-entry__sub">{edu.institution}</p>
                <p className="m-entry__desc">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="m-block">
            <h2 className="m-block__title">{labels.experience}</h2>
            {data.experience.map((exp, i) => (
              <div className="m-entry" key={i}>
                <div className="m-entry__row">
                  <span>{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <p className="m-entry__sub">
                  {exp.company} — {exp.location}
                </p>
                <ul>
                  {exp.responsibilities.map((resp, ri) => (
                    <li key={ri}>
                      <i className="bx bxs-circle" />
                      <span dangerouslySetInnerHTML={{ __html: resp }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="m-footer">
        Autorizo o processamento de meus dados pessoais para fins de
        recrutamento para o cargo ao qual estou me candidatando.
      </footer>
    </div>
  );
};

export default TemplateModern;
