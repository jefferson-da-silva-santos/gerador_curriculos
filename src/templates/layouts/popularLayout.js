// Layout "Popular": cabeçalho colorido com foto, coluna única,
// competências como pills — neutro quanto à área profissional.
export const popularLayout = (fontStyles, rgb) => `
  @page { size: A4; margin: 0; }

  * {
    margin: 0; padding: 0; box-sizing: border-box; list-style: none;
    font-size: 0.95rem; min-width: 0;
    overflow-wrap: break-word; word-break: break-word;
  }

  html, body { height: 100%; -webkit-print-color-adjust: exact; overflow-x: hidden; }
  body { ${fontStyles} line-height: 1.5; }

  .pp-page, .pp-page * { color: #1a1917; }
  .pp-page { width: 100%; max-width: 100%; min-height: 100vh; overflow-x: hidden; }

  .pp-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 2.5rem;
    background: rgb(${rgb});
    color: #fff;
  }
  .pp-header, .pp-header * { color: #fff; }

  .pp-header__photo {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.85);
    flex-shrink: 0;
  }

  .pp-header__name { font-size: 1.7rem; font-weight: 700; }
  .pp-header__role { font-size: 1rem; opacity: 0.92; margin-top: 0.2rem; }

  .pp-header__contacts {
    margin-top: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1.2rem;
    font-size: 0.82rem;
  }
  .pp-header__contacts i { margin-right: 0.3rem; }

  .pp-body { padding: 2rem 2.5rem; }

  .pp-section { margin-bottom: 1.6rem; }
  .pp-section__title {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: rgb(${rgb});
    border-bottom: 2px solid rgba(${rgb}, 0.25);
    padding-bottom: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .pp-text { font-size: 0.92rem; }

  .pp-entry { margin-bottom: 1rem; }
  .pp-entry__row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.2rem 1rem;
    font-weight: 700;
  }
  .pp-entry__period { color: rgb(${rgb}); font-weight: 600; font-size: 0.85rem; }
  .pp-entry__sub { font-weight: 600; margin-top: 0.1rem; font-size: 0.88rem; }
  .pp-entry__desc { margin-top: 0.3rem; font-size: 0.88rem; }
  .pp-entry ul { margin-top: 0.4rem; display: flex; flex-direction: column; gap: 0.3rem; }
  .pp-entry li { font-size: 0.88rem; padding-left: 1rem; position: relative; }
  .pp-entry li::before { content: "•"; position: absolute; left: 0; color: rgb(${rgb}); }

  .pp-skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .pp-skill-pill {
    font-size: 0.82rem;
    padding: 0.3rem 0.85rem;
    border-radius: 999px;
    background: rgba(${rgb}, 0.12);
    color: rgb(${rgb});
    font-weight: 600;
  }

  .pp-links { display: flex; flex-direction: column; gap: 0.35rem; }
  .pp-links li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; }
  .pp-links i { color: rgb(${rgb}); font-size: 1rem; }

  .pp-footer { padding: 0 2.5rem 1.5rem; font-size: 0.62rem; color: rgba(0,0,0,0.5) !important; }

  .pp-page a { color: rgb(${rgb}); text-decoration: none; }
`;