import useFont from "../hooks/useFont";
import useTheme from "../hooks/useTheme";
import CurriculumStyles from "./CurriculumStyles";
import { getTemplateById } from "../templates";

const extractFontFamily = (fontStyles) => {
  if (!fontStyles) return undefined;
  const match = fontStyles.match(/font-family:\s*(.*?);/);
  return match?.[1]?.replace(/['"]/g, "");
};

// Este componente não desenha mais o layout do currículo diretamente —
// ele apenas descobre qual modelo (Sidebar / Moderno / Minimalista) está
// ativo no ThemeProvider e renderiza o componente correspondente.
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

  return (
    <>
      {!isForExport && <CurriculumStyles />}
      <TemplateComponent data={data} fontFamily={fontFamily} />
    </>
  );
};

export default CurriculumPreview;
