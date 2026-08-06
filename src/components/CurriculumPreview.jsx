import useFont from "../hooks/useFont";
import useTheme from "../hooks/useTheme";
import CurriculumStyles from "./CurriculumStyles";
import PreviewWatermark from "./PreviewWatermark";
import { getTemplateById } from "../templates";
import { maskDataForPreview } from "../utils/maskDataForPreview";

const extractFontFamily = (fontStyles) => {
  if (!fontStyles) return undefined;
  const match = fontStyles.match(/font-family:\s*(.*?);/);
  return match?.[1]?.replace(/['"]/g, "");
};

// Este componente não desenha mais o layout do currículo diretamente —
// ele apenas descobre qual modelo (Sidebar / Moderno / Minimalista) está
// ativo no ThemeProvider e renderiza o componente correspondente.
//
// Anti-fraude (só no preview ao vivo, NUNCA no PDF final):
//   - maskDataForPreview trunca texto longo e mascara contato/links -
//     a defesa real, resistente a remoção de marca d'água via IA
//     (ver comentário dentro do próprio maskDataForPreview.js).
//   - <PreviewWatermark /> + o aviso fixo abaixo somam uma camada
//     visual, mas não são a proteção principal.
//   - user-select desligado + menu de clique direito bloqueado: barato
//     de fazer, reduz cópia do que ainda está visível (não impede
//     print, só atrapalha copiar/colar texto e salvar a foto).
// isForExport=true pula tudo isso - o PDF gerado usa os dados
// originais, completos, sem nenhuma marca ou máscara.
const CurriculumPreview = ({ data, isForExport = false }) => {
  const { font } = useFont();
  const { templateId } = useTheme();

  // Ao vivo (dentro do editor) o ThemeProvider é a fonte da verdade do
  // modelo ativo. Na exportação para PDF, renderToString roda fora de
  // qualquer Provider, então usamos o valor gravado em data.templateId
  // (ver handleSubmit em CurriculumEditor.jsx, que injeta esse campo).
  const template = getTemplateById(templateId ?? data.templateId);
  const TemplateComponent = template.Component;
  const fontFamily = extractFontFamily(font?.styles);

  if (isForExport) {
    // PDF final: dados originais, completos, sem marca d'água/máscara.
    return <TemplateComponent data={data} fontFamily={fontFamily} />;
  }

  const previewData = maskDataForPreview(data);

  return (
    <div
      style={{ position: "relative", userSelect: "none" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <CurriculumStyles />
      <TemplateComponent data={previewData} fontFamily={fontFamily} />
      <PreviewWatermark />

      {/* Aviso único, legível, reforçando o que a marca d'água repetida já
          sinaliza de forma mais discreta - não é a defesa principal, só
          deixa claro pro usuário que aquilo ali é uma amostra mesmo. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 51,
          background: "rgba(20, 20, 20, 0.72)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.04em",
          padding: "6px 14px",
          borderRadius: 999,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        PRÉVIA — dados de contato e texto completos só no PDF
      </div>
    </div>
  );
};

export default CurriculumPreview;