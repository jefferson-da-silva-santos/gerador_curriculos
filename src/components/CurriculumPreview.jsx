import useFont from "../hooks/useFont";
import useTheme from "../hooks/useTheme";
import { getTemplateById } from "../templates";
import { maskDataForPreview } from "../utils/maskDataForPreview";
import LivePreviewSnapshot from "./LivePreviewSnapshot";

const extractFontFamily = (fontStyles) => {
  if (!fontStyles) return undefined;
  const match = fontStyles.match(/font-family:\s*(.*?);/);
  return match?.[1]?.replace(/['"]/g, "");
};

const CurriculumPreview = ({ data, isForExport = false }) => {
  const { font } = useFont();
  const { templateId, paletteId, themeObject } = useTheme();

  const template = getTemplateById(templateId ?? data.templateId);
  const TemplateComponent = template.Component;
  const fontFamily = extractFontFamily(font?.styles);

  if (isForExport) {
    return <TemplateComponent data={data} fontFamily={fontFamily} />;
  }

  const previewData = maskDataForPreview(data);

  return (
    <div
      style={{ position: "relative", userSelect: "none", height: "100%" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <LivePreviewSnapshot
        TemplateComponent={TemplateComponent}
        data={previewData}
        fontFamily={fontFamily}
        // Assinatura do tema ativo - qualquer mudança aqui precisa
        // forçar uma nova captura, já que ela afeta o CSS injetado
        // por <CurriculumStyles /> dentro do nó escondido, não o
        // conteúdo de `data` em si.
        themeSignature={`${templateId}-${paletteId}-${themeObject?.styles?.length ?? 0}`}
      />
    </div>
  );
};

export default CurriculumPreview;
