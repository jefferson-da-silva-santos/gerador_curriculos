// Layout "Criativo": header diagonal (clip-path) com bloco de cor forte,
// faixa lateral estreita só de habilidades, resto em coluna única.
export const creativeLayout = (fontStyles, rgb) => `
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
  .cr-page,
  .cr-page * {
    color: #1c1c1c;
  }

  .cr-page { width: 100%; max-width: 100%; min-height: 100vh; position: relative; overflow-x: hidden; }

  .cr-banner {
    position: relative;
    background: rgb(${rgb});
    padding: 2.2rem 2.5rem 3rem;
    clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);
  }
  .cr-banner, .cr-banner * { color: #fff; }

  .cr-banner__inner { display: flex; align-items: center; gap: 1.5rem; }
  .cr-banner__inner > div { flex: 1; min-width: 0; }

  .cr-banner img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    flex-shrink: 0;
  }

  .cr-banner__name { font-size: 1.9rem; font-weight: 700; }
  .cr-banner__role { opacity: 0.9; margin-top: 0.2rem; }

  .cr-contacts {
    margin-top: 0.6rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.1rem;
    font-size: 0.8rem;
  }
  .cr-contacts a, .cr-contacts span { text-decoration: none; }

  .cr-body { padding: 1.2rem 2.5rem 2rem; }

  .cr-block { margin-bottom: 1.5rem; }
  .cr-block__title {
    display: inline-block;
    font-weight: 700;
    color: #fff !important;
    background: rgb(${rgb});
    padding: 0.2rem 0.8rem;
    border-radius: 999px;
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
  }

  .cr-skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .cr-skill-pill {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    padding: 0.25rem 0.7rem;
    border: 1.5px solid rgb(${rgb});
    border-radius: 999px;
  }
  .cr-skill-pill .cr-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(${rgb}, 0.25); flex-shrink: 0; }
  .cr-skill-pill .cr-dot.filled { background: rgb(${rgb}); }

  .cr-entry { margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid rgba(${rgb}, 0.3); }
  .cr-entry__row { display: flex; flex-wrap: wrap; justify-content: space-between; font-weight: 600; gap: 0.3rem 1rem; }
  .cr-entry__sub { color: rgb(${rgb}); font-weight: 600; margin-top: 0.1rem; font-size: 0.87rem; }
  .cr-entry__desc { margin-top: 0.3rem; font-size: 0.87rem; }
  .cr-entry ul { margin-top: 0.3rem; display: flex; flex-direction: column; gap: 0.2rem; }
  .cr-entry li { font-size: 0.87rem; padding-left: 0.9rem; position: relative; }
  .cr-entry li::before { content: "▸"; position: absolute; left: 0; color: rgb(${rgb}); }

  .cr-footer { padding: 0 2.5rem 1.5rem; font-size: 0.6rem; color: rgba(0,0,0,0.5); }
  .cr-body a { color: rgb(${rgb}); }
`;
