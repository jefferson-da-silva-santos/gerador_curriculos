export const diretoLayout = (fontStyles, rgb) => `
  @page { size: A4; margin: 0; }

  * {
    margin: 0; padding: 0; box-sizing: border-box; list-style: none;
    font-size: 0.92rem; min-width: 0;
    overflow-wrap: break-word; word-break: break-word;
  }

  html, body { height: 100%; -webkit-print-color-adjust: exact; overflow-x: hidden; }
  body { ${fontStyles} line-height: 1.45; }

  .dt-page, .dt-page * { color: #1c1c1c; }
  .dt-page { width: 100%; max-width: 100%; min-height: 100vh; overflow-x: hidden; }

  .dt-header {
    padding: 1.8rem 2.5rem 1.2rem;
    border-bottom: 3px solid rgb(${rgb});
  }
  .dt-header__name { font-size: 1.6rem; font-weight: 700; color: rgb(${rgb}); }
  .dt-header__role { font-size: 0.95rem; margin-top: 0.15rem; }

  .dt-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr);
    gap: 2rem;
    padding: 1.6rem 2.5rem;
  }

  .dt-block { margin-bottom: 1.5rem; }
  .dt-block__title {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgb(${rgb});
    margin-bottom: 0.6rem;
    border-bottom: 1px solid rgba(${rgb}, 0.25);
    padding-bottom: 0.3rem;
  }

  .dt-list { display: flex; flex-direction: column; gap: 0.45rem; }
  .dt-list li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; }
  .dt-list i { color: rgb(${rgb}); font-size: 1rem; flex-shrink: 0; }

  .dt-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .dt-skill-pill {
    font-size: 0.76rem;
    padding: 0.22rem 0.6rem;
    border: 1px solid rgba(${rgb}, 0.4);
    border-radius: 999px;
    color: rgb(${rgb});
  }

  .dt-text { font-size: 0.9rem; }

  .dt-entry { margin-bottom: 0.9rem; }
  .dt-entry__row {
    display: flex; justify-content: space-between; flex-wrap: wrap;
    font-weight: 700; gap: 0.2rem 1rem; font-size: 0.9rem;
  }
  .dt-entry__period { color: rgb(${rgb}); font-weight: 600; font-size: 0.82rem; }
  .dt-entry__sub { font-weight: 600; font-size: 0.85rem; margin-top: 0.1rem; }
  .dt-entry__desc { font-size: 0.85rem; margin-top: 0.25rem; }
  .dt-entry ul { margin-top: 0.3rem; display: flex; flex-direction: column; gap: 0.25rem; }
  .dt-entry li { font-size: 0.85rem; padding-left: 0.9rem; position: relative; }
  .dt-entry li::before { content: "–"; position: absolute; left: 0; color: rgb(${rgb}); }

  .dt-footer { padding: 0 2.5rem 1.5rem; font-size: 0.6rem; color: rgba(0,0,0,0.5) !important; }

  .dt-page a { color: rgb(${rgb}); text-decoration: none; }
`;