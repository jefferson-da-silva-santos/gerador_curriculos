import { useState, useEffect } from "react";
import FontContext from "../context/FontContext";
import { fontes } from "../utils/fonts";

const FONT_LINK_ID = "curriculum-google-font-link";

/**
 * Injeta (ou atualiza) a tag <link rel="stylesheet"> do Google Fonts
 * correspondente à fonte ativa. Sem isso, o font-family aplicado na
 * prévia não tem efeito real — o navegador nunca baixou o arquivo da
 * fonte, então cai silenciosamente no fallback (sans-serif).
 */
function useGoogleFontLoader(fontLink) {
  useEffect(() => {
    if (!fontLink) return;

    let link = document.getElementById(FONT_LINK_ID);
    if (!link) {
      link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Só troca o href se realmente mudou, evitando piscar / recarregar à toa
    if (link.href !== fontLink) {
      link.href = fontLink;
    }
  }, [fontLink]);
}

const FontProvider = ({ children }) => {
  const [font, setFont] = useState(fontes[0]);

  useGoogleFontLoader(font.link);

  function toggleFont() {
    const currentFontIndex = fontes.findIndex((f) => f.font === font.font);
    const nextFontIndex = (currentFontIndex + 1) % fontes.length;
    setFont(fontes[nextFontIndex]);
  }

  function nextFont() {
    const currentFontIndex = fontes.findIndex((f) => f.font === font.font);
    const nextFontIndex = (currentFontIndex + 1) % fontes.length;
    setFont(fontes[nextFontIndex]);
  }

  function prevFont() {
    const currentFontIndex = fontes.findIndex((f) => f.font === font.font);
    const prevFontIndex = (currentFontIndex - 1 + fontes.length) % fontes.length;
    setFont(fontes[prevFontIndex]);
  }

  return (
    <FontContext.Provider value={{ font, toggleFont, nextFont, prevFont }}>
      {children}{" "}
    </FontContext.Provider>
  );
};

export default FontProvider;