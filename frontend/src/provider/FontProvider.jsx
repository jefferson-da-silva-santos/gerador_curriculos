import { useState } from "react";
import FontContext from "../context/FontContext";
import { fontes } from "../utils/fonts";

const FontProvider = ({ children }) => {
  const [font, setFont] = useState(fontes[0]);

  function toggleFont() {
    const currentFontIndex = fontes.findIndex((f) => f.font === font.font);
    const nextFontIndex = (currentFontIndex + 1) % fontes.length;
    setFont(fontes[nextFontIndex]);
  }

  return (
    <FontContext.Provider value={{ font, toggleFont }}>
      {children}{" "}
    </FontContext.Provider>
  );
};

export default FontProvider;
