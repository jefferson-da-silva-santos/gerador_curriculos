// Layout "Minimalista": coluna única, sem foto, tipografia enxuta.
// Pensado para ser "ATS-friendly" (fácil de ler por sistemas de triagem
// automática de currículos).
export const minimalLayout = (fontStyles, rgb) => `
  @page { size: A4; margin: 0; }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-size: 0.95rem;
    min-width: 0;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  html, body { height: 100%; -webkit-print-color-adjust: exact; overflow-x: hidden; }
  body { ${fontStyles} }

  /* Trava a cor do texto, independente do modo claro/escuro do editor. */
  .mi-page,
  .mi-page * {
    color: #1a1917;
  }

  .mi-page {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    padding: 2.5rem 3rem;
    overflow-x: hidden;
  }

  .mi-header { margin-bottom: 1.5rem; border-bottom: 3px solid rgb(${rgb}); padding-bottom: 1rem; }
  .mi-header__name { font-size: 1.8rem; font-weight: 700; color: rgb(${rgb}); }
  .mi-header__role { font-size: 1rem; margin-top: 0.15rem; }

  .mi-contacts {
    margin-top: 0.6rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
    font-size: 0.8rem;
  }
  .mi-contacts a { text-decoration: none; }

  .mi-section { margin-bottom: 1.4rem; }
  .mi-section__title {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgb(${rgb});
    margin-bottom: 0.6rem;
  }

  .mi-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .mi-skill-pill {
    font-size: 0.78rem;
    padding: 0.2rem 0.6rem;
    border: 1px solid rgba(${rgb}, 0.4);
    border-radius: 999px;
    color: rgb(${rgb});
  }

  .mi-entry { margin-bottom: 0.9rem; }
  .mi-entry__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-weight: 600;
    gap: 0.2rem 1rem;
  }
  .mi-entry__sub { font-style: italic; margin-top: 0.1rem; font-size: 0.88rem; }
  .mi-entry__desc { margin-top: 0.3rem; font-size: 0.88rem; }
  .mi-entry ul { margin-top: 0.3rem; display: flex; flex-direction: column; gap: 0.2rem; }
  .mi-entry li { font-size: 0.88rem; padding-left: 0.9rem; position: relative; }
  .mi-entry li::before {
    content: "–";
    position: absolute;
    left: 0;
    color: rgb(${rgb});
  }

  .mi-footer {
    margin-top: 1rem;
    font-size: 0.62rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .mi-page a { color: rgb(${rgb}); }
`;
