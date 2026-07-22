// Layout "Corporativo": barra fina no topo, corpo em coluna única, blocos
// com borda esquerda colorida — visual limpo e sóbrio, ótimo para
// empresas mais tradicionais.
export const corporateLayout = (fontStyles, rgb) => `
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
  .co-page,
  .co-page * {
    color: #222222;
  }

  .co-page { width: 100%; max-width: 100%; min-height: 100vh; overflow-x: hidden; }

  .co-topbar { height: 8px; background: rgb(${rgb}); }

  .co-header { padding: 1.6rem 2.5rem 1rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 0.3rem; }
  .co-header__name { font-size: 1.6rem; font-weight: 700; }
  .co-header__role { font-size: 0.95rem; color: rgb(${rgb}); font-weight: 600; margin-top: 0.15rem; }

  .co-contacts-bar {
    background: rgba(${rgb}, 0.06);
    padding: 0.6rem 2.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1.2rem;
    font-size: 0.78rem;
    margin-bottom: 1.4rem;
  }
  .co-contacts-bar a { text-decoration: none; }

  .co-body { padding: 0 2.5rem 2rem; }

  .co-block {
    margin-bottom: 1.4rem;
    padding-left: 1rem;
    border-left: 4px solid rgb(${rgb});
  }
  .co-block__title {
    font-size: 0.88rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: rgb(${rgb});
    margin-bottom: 0.6rem;
  }

  .co-skills-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.4rem 1.5rem; }
  .co-skill-row { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.2rem; font-size: 0.85rem; }

  .co-entry { margin-bottom: 0.9rem; }
  .co-entry__row { display: flex; flex-wrap: wrap; justify-content: space-between; font-weight: 600; gap: 0.3rem 1rem; }
  .co-entry__sub { font-weight: 600; margin-top: 0.1rem; font-size: 0.87rem; }
  .co-entry__desc { margin-top: 0.3rem; font-size: 0.87rem; }
  .co-entry ul { margin-top: 0.3rem; display: flex; flex-direction: column; gap: 0.2rem; }
  .co-entry li { font-size: 0.87rem; padding-left: 0.9rem; position: relative; }
  .co-entry li::before { content: "▪"; position: absolute; left: 0; color: rgb(${rgb}); font-size: 0.6rem; top: 0.25rem; }

  .co-footer { padding: 0 2.5rem 1.5rem; font-size: 0.6rem; color: rgba(0,0,0,0.5); }
  .co-page a { color: rgb(${rgb}); }
`;
