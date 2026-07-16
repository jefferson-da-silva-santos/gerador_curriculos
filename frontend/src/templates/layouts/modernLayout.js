// Layout "Moderno": banner cheio no topo com foto redonda + nome,
// corpo em grade de 2 colunas abaixo. Recebe a fonte e a cor primária
// (string "r, g, b") vindas da paleta compartilhada (utils/palettes.js).
export const modernLayout = (fontStyles, rgb) => `
  @page { size: A4; margin: 0; }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-size: 0.95rem;
  }

  html, body {
    height: 100%;
    -webkit-print-color-adjust: exact;
  }

  body { ${fontStyles} }

  h1, h3, h4, h5, h6 { font-size: 1rem; }
  h2 { font-size: 1.3rem; padding-bottom: 0.4rem; }

  .m-page { width: 100%; min-height: 100vh; }

  .m-banner {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 2.5rem;
    color: #fff;
    background: linear-gradient(120deg, rgb(${rgb}), rgba(${rgb}, 0.75));
  }

  .m-banner img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.9);
    flex-shrink: 0;
  }

  .m-banner__name { font-size: 2rem; line-height: 1.1; }
  .m-banner__role { opacity: 0.9; margin-top: 0.25rem; }

  .m-banner__contacts {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
    font-size: 0.85rem;
  }

  .m-banner__contacts a,
  .m-banner__contacts span { color: #fff; text-decoration: none; }

  .m-body {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 2rem;
    padding: 2rem 2.5rem;
  }

  .m-block { margin-bottom: 1.75rem; }

  .m-block__title {
    font-weight: 700;
    color: rgb(${rgb});
    border-bottom: 2px solid rgba(${rgb}, 0.25);
    margin-bottom: 0.75rem;
    padding-bottom: 0.3rem;
  }

  .m-skill-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .m-circles { display: flex; gap: 0.35rem; }
  .m-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(${rgb}, 0.3);
  }
  .m-circle.filled { background: rgb(${rgb}); }

  .m-entry { margin-bottom: 1rem; }
  .m-entry__row {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    gap: 1rem;
  }
  .m-entry__sub { font-weight: 600; color: rgb(${rgb}); margin-top: 0.15rem; }
  .m-entry__desc { margin-top: 0.35rem; }
  .m-entry ul { margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.3rem; }
  .m-entry li { display: flex; gap: 0.5rem; }
  .m-entry li i { font-size: 0.5rem; margin-top: 0.4rem; color: rgb(${rgb}); }

  .m-footer {
    padding: 1rem 2.5rem 2rem;
    font-size: 0.65rem;
    color: rgba(0, 0, 0, 0.55);
  }

  a { text-decoration: none; color: rgb(${rgb}); }
`;
