// Layout "Timeline": cabeçalho compacto + experiência/formação em linha
// do tempo vertical com marcadores e conector.
export const timelineLayout = (fontStyles, rgb) => `
  @page { size: A4; margin: 0; }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-size: 0.95rem;
    min-width: 0; /* evita que filhos de flex/grid forcem overflow pelo conteúdo */
    overflow-wrap: break-word;
    word-break: break-word;
  }

  html, body { height: 100%; -webkit-print-color-adjust: exact; overflow-x: hidden; }
  body { ${fontStyles} color: #1c1c1c; }

  .tl-page {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    padding: 2.2rem 2.5rem;
    overflow-x: hidden;
  }

  .tl-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .tl-header img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgb(${rgb});
    flex-shrink: 0;
  }

  .tl-header > div { flex: 1; min-width: 0; }

  .tl-header__name { font-size: 1.7rem; font-weight: 700; color: rgb(${rgb}); }
  .tl-header__role { font-size: 1rem; color: #444; margin-top: 0.15rem; }

  .tl-contacts {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.1rem;
    font-size: 0.78rem;
    color: #444;
  }
  .tl-contacts a { color: #444; text-decoration: none; }

  .tl-section { margin-bottom: 1.5rem; }
  .tl-section__title {
    font-weight: 700;
    color: rgb(${rgb});
    border-bottom: 1px solid rgba(${rgb}, 0.25);
    margin-bottom: 0.9rem;
    padding-bottom: 0.3rem;
  }

  .tl-skills { display: flex; flex-direction: column; gap: 0.5rem; }
  .tl-skill-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.4rem;
  }
  .tl-skill-row > span { flex-shrink: 0; }
  .tl-bar-track {
    flex: 1 1 40%;
    max-width: 60%;
    min-width: 4rem;
    height: 6px;
    background: rgba(${rgb}, 0.15);
    border-radius: 999px;
    margin-left: 0.75rem;
  }
  .tl-bar-fill { height: 100%; border-radius: 999px; background: rgb(${rgb}); }

  /* Linha do tempo */
  .tl-timeline { position: relative; padding-left: 1.4rem; }
  .tl-timeline::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 4px;
    bottom: 4px;
    width: 2px;
    background: rgba(${rgb}, 0.25);
  }

  .tl-item { position: relative; margin-bottom: 1.1rem; }
  .tl-item::before {
    content: "";
    position: absolute;
    left: -1.4rem;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgb(${rgb});
  }

  .tl-item__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-weight: 600;
    gap: 0.4rem 1rem;
  }
  .tl-item__sub { color: rgb(${rgb}); font-weight: 600; margin-top: 0.1rem; font-size: 0.88rem; }
  .tl-item__desc { margin-top: 0.3rem; font-size: 0.88rem; }
  .tl-item ul { margin-top: 0.3rem; display: flex; flex-direction: column; gap: 0.2rem; }
  .tl-item li { font-size: 0.88rem; padding-left: 0.9rem; position: relative; }
  .tl-item li::before { content: "–"; position: absolute; left: 0; color: rgb(${rgb}); }

  .tl-footer { margin-top: 1rem; font-size: 0.6rem; color: rgba(0,0,0,0.5); }
  a { color: rgb(${rgb}); }
`;