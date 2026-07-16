// Layout "Compacto": denso, pensado para caber muita informação em 1
// página só — bom para quem tem experiência extensa.
export const compactLayout = (fontStyles, rgb) => `
  @page { size: A4; margin: 0; }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-size: 0.82rem;
    min-width: 0;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  html, body { height: 100%; -webkit-print-color-adjust: exact; overflow-x: hidden; }
  body { ${fontStyles} color: #1c1c1c; line-height: 1.35; }

  .cp-page { width: 100%; max-width: 100%; min-height: 100vh; padding: 1.6rem 2rem; overflow-x: hidden; }

  .cp-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.3rem;
    border-bottom: 2px solid rgb(${rgb});
    padding-bottom: 0.5rem;
    margin-bottom: 0.9rem;
  }
  .cp-header__name { font-size: 1.35rem; font-weight: 700; color: rgb(${rgb}); }
  .cp-header__role { font-size: 0.85rem; color: #444; }

  .cp-contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem 1rem;
    font-size: 0.72rem;
    color: #444;
    margin-bottom: 0.9rem;
  }
  .cp-contacts a { color: #444; text-decoration: none; }

  .cp-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 1.5rem; }

  .cp-section { margin-bottom: 0.8rem; break-inside: avoid; min-width: 0; }
  .cp-section--full { grid-column: 1 / -1; }
  .cp-section__title {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgb(${rgb});
    border-bottom: 1px solid rgba(${rgb}, 0.3);
    margin-bottom: 0.4rem;
    padding-bottom: 0.15rem;
  }

  .cp-chips { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .cp-chip {
    font-size: 0.68rem;
    padding: 0.12rem 0.45rem;
    background: rgba(${rgb}, 0.1);
    color: rgb(${rgb});
    border-radius: 4px;
  }

  .cp-entry { margin-bottom: 0.5rem; }
  .cp-entry__row { display: flex; flex-wrap: wrap; justify-content: space-between; font-weight: 600; gap: 0.2rem 0.5rem; font-size: 0.78rem; }
  .cp-entry__sub { font-size: 0.72rem; color: #555; }
  .cp-entry__desc { font-size: 0.72rem; margin-top: 0.1rem; }
  .cp-entry ul { margin-top: 0.15rem; }
  .cp-entry li { font-size: 0.72rem; padding-left: 0.7rem; position: relative; }
  .cp-entry li::before { content: "•"; position: absolute; left: 0; color: rgb(${rgb}); }

  .cp-footer { margin-top: 0.6rem; font-size: 0.55rem; color: rgba(0,0,0,0.5); }
  a { color: rgb(${rgb}); }
`;