import { useState } from "react";
import ThemeContext from "../context/ThemeContext";
import {
  stylesThemeBlack,
  stylesThemeBlue,
  stylesThemeGreen,
  stylesThemePink,
  stylesThemeRed,
  stylesThemeYellow,
  stylesThemeDarkBlue,
  stylesThemeLightBlue,
  stylesThemeBeige,
  stylesThemeHotPink,
  stylesThemeViolet,
  stylesThemePurple,
  stylesThemeCyan,
  stylesThemeWine,
  stylesThemeOrange,
  stylesThemeGray,
  stylesThemeLightPink,
  stylesThemeGold,
  stylesThemeLime,
} from "../utils/themeStyles";
import useFont from "../hooks/useFont";

const getThemes = (font) => [
  {
    id: 1,
    theme: "blue-theme",
    styles: stylesThemeBlue(font),
  },
  {
    id: 2,
    theme: "pink-theme",
    styles: stylesThemePink(font),
  },
  {
    id: 3,
    theme: "green-theme",
    styles: stylesThemeGreen(font),
  },
  {
    id: 4,
    theme: "red-theme",
    styles: stylesThemeRed(font),
  },
  {
    id: 5,
    theme: "yellow-theme",
    styles: stylesThemeYellow(font),
  },
  {
    id: 6,
    theme: "black-theme",
    styles: stylesThemeBlack(font),
  }, // NOVOS TEMAS ADICIONADOS
  {
    id: 7,
    theme: "dark-blue-theme",
    styles: stylesThemeDarkBlue(font),
  },
  {
    id: 8,
    theme: "light-blue-theme",
    styles: stylesThemeLightBlue(font),
  },
  {
    id: 9,
    theme: "beige-theme",
    styles: stylesThemeBeige(font),
  },
  {
    id: 10,
    theme: "hot-pink-theme",
    styles: stylesThemeHotPink(font),
  },
  {
    id: 11,
    theme: "violet-theme",
    styles: stylesThemeViolet(font),
  },
  {
    id: 12,
    theme: "purple-theme",
    styles: stylesThemePurple(font),
  },
  {
    id: 13,
    theme: "cyan-theme",
    styles: stylesThemeCyan(font),
  },
  {
    id: 14,
    theme: "wine-theme",
    styles: stylesThemeWine(font),
  },
  {
    id: 15,
    theme: "orange-theme",
    styles: stylesThemeOrange(font),
  },
  {
    id: 16,
    theme: "gray-theme",
    styles: stylesThemeGray(font),
  },
  {
    id: 17,
    theme: "light-pink-theme",
    styles: stylesThemeLightPink(font),
  },
  {
    id: 18,
    theme: "gold-theme",
    styles: stylesThemeGold(font),
  },
  {
    id: 19,
    theme: "lime-theme",
    styles: stylesThemeLime(font),
  },
];

const ThemeProvider = ({ children }) => {
  const { font } = useFont();
  console.log("Fonte: " + font);
  
  const themes = getThemes(font.styles);
  const [themeObject, setThemeObject] = useState(themes[0]);
  
  const toggleTheme = () => {
    const currentThemeIndex = themes.findIndex(
      (t) => t.theme === themeObject.theme
    );
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setThemeObject(themes[nextThemeIndex]);
  };

  function nextTheme() {
    const currentThemeIndex = themes.findIndex((t) => t.theme === themeObject.theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setThemeObject(themes[nextThemeIndex]);
  }

  function prevTheme() {
    const currentThemeIndex = themes.findIndex((t) => t.theme === themeObject.theme);
    const prevThemeIndex = (currentThemeIndex - 1 + themes.length) % themes.length;
    setThemeObject(themes[prevThemeIndex]);
  }

  return (
    <ThemeContext.Provider
      value={{
        themeObject,
        toggleTheme,
        nextTheme,
        prevTheme
      }}
    >
      {children}{" "}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
