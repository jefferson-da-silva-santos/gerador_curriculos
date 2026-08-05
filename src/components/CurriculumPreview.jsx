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
//   - maskDataForPreview trunca objetivo/responsabilidades/descrições -
//     dá pra conferir layout e estilo, mas não copiar o texto completo.
//   - <PreviewWatermark /> cobre a tela com marca d'água repetida.
// isForExport=true pula os dois - o PDF gerado usa os dados originais,
// completos, sem nenhuma marca.
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
    // PDF final: dados originais, completos, sem marca d'água.
    return <TemplateComponent data={data} fontFamily={fontFamily} />;
  }

  const previewData = maskDataForPreview(data);

  return (
    <div style={{ position: "relative" }}>
      <CurriculumStyles />
      <TemplateComponent data={previewData} fontFamily={fontFamily} />
      <PreviewWatermark />
    </div>
  );
};

export default CurriculumPreview;