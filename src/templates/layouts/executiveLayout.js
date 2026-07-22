// Layout "Executivo": cabeçalho centralizado e elegante, corpo em 2
// colunas (estreita à esquerda / larga à direita), títulos em versalete.
export const executiveLayout = (fontStyles, rgb) => `
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
  .ex-page,
  .ex-page * {
    color: #222222;
  }

  .ex-page { width: 100%; max-width: 100%; min-height: 100vh; padding: 2.5rem 3rem; overflow-x: hidden; }

  .ex-header { text-align: center; margin-bottom: 1rem; }
  .ex-header__name {
    font-size: 2rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgb(${rgb});
    font-weight: 700;
  }
  .ex-header__role { font-size: 1rem; margin-top: 0.3rem; letter-spacing: 0.03em; }

  .ex-contacts {
    margin-top: 0.6rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    font-size: 0.78rem;
  }
  .ex-contacts span:not(:last-child)::after { content: "•"; margin-left: 0.4rem; color: rgba(${rgb}, 0.5); }
  .ex-contacts a { text-decoration: none; }

  .ex-divider {
    height: 2px;
    background: rgb(${rgb});
    width: 4rem;
    margin: 1.2rem auto 1.6rem;
  }

  .ex-body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 2.2rem; }

  .ex-block { margin-bottom: 1.5rem; }
  .ex-block__title {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgb(${rgb});
    margin-bottom: 0.7rem;
  }

  .ex-skill { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.3rem; margin-bottom: 0.4rem; font-size: 0.85rem; }
  .ex-skill i { color: rgb(${rgb}); }

  .ex-entry { margin-bottom: 1rem; }
  .ex-entry__row { display: flex; flex-wrap: wrap; justify-content: space-between; font-weight: 600; gap: 0.3rem 1rem; }
  .ex-entry__sub { font-style: italic; margin-top: 0.1rem; font-size: 0.87rem; }
  .ex-entry__desc { margin-top: 0.3rem; font-size: 0.87rem; }
  .ex-entry ul { margin-top: 0.3rem; display: flex; flex-direction: column; gap: 0.2rem; }
  .ex-entry li { font-size: 0.87rem; padding-left: 0.9rem; position: relative; }
  .ex-entry li::before { content: "—"; position: absolute; left: 0; color: rgb(${rgb}); }

  .ex-footer { margin-top: 1.2rem; text-align: center; font-size: 0.6rem; color: rgba(0,0,0,0.5); }
  .ex-page a { color: rgb(${rgb}); }
`;
