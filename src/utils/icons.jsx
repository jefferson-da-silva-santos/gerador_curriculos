// Ícones SVG inline - substituem as fontes do Boxicons (<i className="bx ...">)
// especificamente nos templates, porque fontes de ícone não renderizam de
// forma confiável dentro da captura de prévia (html-to-image/foreignObject).
// O PDF final (isForExport=true) nunca passa por essa captura, então nesse
// caminho os ícones de fonte funcionariam normalmente - mas manter os
// templates 100% em SVG evita ter dois caminhos visuais diferentes
// (fonte no PDF, SVG na prévia) para o mesmo componente.

const paths = {
  user: "M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z",
  envelope:
    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  phone:
    "M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.4 0 .8-.2 1L6.6 10.8z",
  home: "M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3z",
  link: "M17 7h-3v2h3c1.7 0 3 1.3 3 3s-1.3 3-3 3h-3v2h3c2.8 0 5-2.2 5-5s-2.2-5-5-5zM7 17h3v-2H7c-1.7 0-3-1.3-3-3s1.3-3 3-3h3V7H7c-2.8 0-5 2.2-5 5s2.2 5 5 5zm-1-5h12v-2H6v2z",
  linkedin:
    "M20.4 3H3.6C3.3 3 3 3.3 3 3.6v16.8c0 .3.3.6.6.6h16.8c.3 0 .6-.3.6-.6V3.6c0-.3-.3-.6-.6-.6zM8.3 18.1H5.7V9.7h2.6v8.4zM7 8.6c-.8 0-1.5-.7-1.5-1.5S6.2 5.6 7 5.6s1.5.7 1.5 1.5S7.8 8.6 7 8.6zm11.1 9.5h-2.6v-4.1c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.7v4.1h-2.6s0-6.8 0-7.5h2.6v1.1c.3-.5 1-1.3 2.3-1.3 1.7 0 3 1.1 3 3.4v4.3z",
  github:
    "M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z",
  globe:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6H16c-.2-1.3-.5-2.5-1-3.6A8 8 0 0118.9 8zM12 4c.6.9 1.4 2.4 1.8 4h-3.6c.4-1.6 1.2-3.1 1.8-4zM4.3 14a8.1 8.1 0 010-4h3.2a15 15 0 000 4H4.3zm.8 2h2.9c.2 1.3.5 2.5 1 3.6A8 8 0 015.1 16zm2.9-8H5.1a8 8 0 013.9-3.6c-.5 1.1-.8 2.3-1 3.6zM12 20c-.6-.9-1.4-2.4-1.8-4h3.6c-.4 1.6-1.2 3.1-1.8 4zm2.1-6H9.9a13 13 0 010-4h4.2a13 13 0 010 4zm.9 5.6c.5-1.1.8-2.3 1-3.6h2.9a8 8 0 01-3.9 3.6zM16.4 14a15 15 0 000-4h3.2a8.1 8.1 0 010 4h-3.2z",
  whatsapp:
    "M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.1-.2.1-.4.1-.6 0-.8-.4-1.6-.9-2.3-1.6-.6-.6-1.2-1.4-1.6-2.2-.1-.2-.1-.4 0-.6.1-.2.8-.7 1.1-.9.2-.2.2-.4.1-.7-.1-.3-.9-2-1.1-2.3-.2-.3-.4-.3-.6-.3h-.6c-.2 0-.5.1-.7.3-.2.2-1 .9-1 2.2s.9 2.6 1 2.8c.1.1 1.7 2.6 4.1 3.5 2.4 1 2.4.6 2.8.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3zM12 2a10 10 0 00-8.5 15.4L2 22l4.7-1.5A10 10 0 1012 2z",
  book: "M4 4c0-.6.4-1 1-1h6v18H5c-.6 0-1-.4-1-1V4zm19-1h-6v18h6c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1z",
  briefcase:
    "M20 7h-3V6c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v1H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 6h6v1H9V6z",
  dot: "M12 8a4 4 0 100 8 4 4 0 000-8z",
};

/**
 * @param {{ name: keyof typeof paths, size?: number, style?: object, className?: string }} props
 */
export const Icon = ({ name, size = 16, style, className }) => {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
};

export default Icon;
