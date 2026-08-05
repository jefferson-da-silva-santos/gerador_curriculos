// ARQUIVO: src/components/PreviewWatermark.jsx
// ==========================================================
// Camada de marca d'água diagonal repetida, por cima do preview ao
// vivo - nunca renderizada no PDF final (ver CurriculumPreview.jsx,
// só monta isso quando isForExport=false).
//
// pointerEvents: "none" - não atrapalha nenhum clique/interação com
// o preview por baixo. aria-hidden - é só decoração, sem valor
// semântico pra leitor de tela.
// ==========================================================
const REPEAT_COUNT = 60;

export default function PreviewWatermark({
  text = "AMOSTRA — BAIXE PARA GERAR O PDF",
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: "48px 64px",
          transform: "rotate(-32deg)",
        }}
      >
        {Array.from({ length: REPEAT_COUNT }, (_, i) => (
          <span
            key={i}
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(120, 120, 120, 0.16)",
              whiteSpace: "nowrap",
              userSelect: "none",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
