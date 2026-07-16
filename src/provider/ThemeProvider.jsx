import { useState, useMemo } from "react";
import ThemeContext from "../context/ThemeContext";
import useFont from "../hooks/useFont";
import { TEMPLATE_LIST, PALETTES, getTemplateById } from "../templates";

const ThemeProvider = ({ children }) => {
  const { font } = useFont();

  const [templateId, setTemplateId] = useState(TEMPLATE_LIST[0].id);
  const [paletteId, setPaletteId] = useState(PALETTES[0].id);

  const template = getTemplateById(templateId);

  // themeObject.styles mantém o mesmo formato que o restante do app já
  // consome (CurriculumStyles injeta isso num <style>), só que agora é
  // gerado pelo template ativo em vez de um único arquivo fixo.
  const themeObject = useMemo(
    () => ({
      theme: `${templateId}-${paletteId}`,
      templateId,
      paletteId,
      styles: template.getStyles(font.styles, paletteId),
    }),
    [template, templateId, paletteId, font.styles]
  );

  const nextTemplate = () => {
    const idx = TEMPLATE_LIST.findIndex((t) => t.id === templateId);
    setTemplateId(TEMPLATE_LIST[(idx + 1) % TEMPLATE_LIST.length].id);
  };

  const prevTemplate = () => {
    const idx = TEMPLATE_LIST.findIndex((t) => t.id === templateId);
    setTemplateId(TEMPLATE_LIST[(idx - 1 + TEMPLATE_LIST.length) % TEMPLATE_LIST.length].id);
  };

  const nextTheme = () => {
    const idx = PALETTES.findIndex((p) => p.id === paletteId);
    setPaletteId(PALETTES[(idx + 1) % PALETTES.length].id);
  };

  const prevTheme = () => {
    const idx = PALETTES.findIndex((p) => p.id === paletteId);
    setPaletteId(PALETTES[(idx - 1 + PALETTES.length) % PALETTES.length].id);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeObject,
        templateId,
        paletteId,
        currentTemplate: template,
        currentPalette: PALETTES.find((p) => p.id === paletteId),
        toggleTheme: nextTheme,
        nextTheme,
        prevTheme,
        nextTemplate,
        prevTemplate,
        setTemplateId,
        setPaletteId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
