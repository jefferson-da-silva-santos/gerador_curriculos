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

const themes = [
  {
    id: 1,
    theme: "blue-theme",
    styles: stylesThemeBlue,
  },
  {
    id: 2,
    theme: "pink-theme",
    styles: stylesThemePink,
  },
  {
    id: 3,
    theme: "green-theme",
    styles: stylesThemeGreen,
  },
  {
    id: 4,
    theme: "red-theme",
    styles: stylesThemeRed,
  },
  {
    id: 5,
    theme: "yellow-theme",
    styles: stylesThemeYellow,
  },
  {
    id: 6,
    theme: "black-theme",
    styles: stylesThemeBlack,
  }, // NOVOS TEMAS ADICIONADOS
  {
    id: 7,
    theme: "dark-blue-theme",
    styles: stylesThemeDarkBlue,
  },
  {
    id: 8,
    theme: "light-blue-theme",
    styles: stylesThemeLightBlue,
  },
  {
    id: 9,
    theme: "beige-theme",
    styles: stylesThemeBeige,
  },
  {
    id: 10,
    theme: "hot-pink-theme",
    styles: stylesThemeHotPink,
  },
  {
    id: 11,
    theme: "violet-theme",
    styles: stylesThemeViolet,
  },
  {
    id: 12,
    theme: "purple-theme",
    styles: stylesThemePurple,
  },
  {
    id: 13,
    theme: "cyan-theme",
    styles: stylesThemeCyan,
  },
  {
    id: 14,
    theme: "wine-theme",
    styles: stylesThemeWine,
  },
  {
    id: 15,
    theme: "orange-theme",
    styles: stylesThemeOrange,
  },
  {
    id: 16,
    theme: "gray-theme",
    styles: stylesThemeGray,
  },
  {
    id: 17,
    theme: "light-pink-theme",
    styles: stylesThemeLightPink,
  },
  {
    id: 18,
    theme: "gold-theme",
    styles: stylesThemeGold,
  },
  {
    id: 19,
    theme: "lime-theme",
    styles: stylesThemeLime,
  },
];

const ThemeProvider = ({ children }) => {
  const [themeObject, setThemeObject] = useState(themes[0]); 
  const toggleTheme = () => {
    const currentThemeIndex = themes.findIndex(
      (t) => t.theme === themeObject.theme
    );
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setThemeObject(themes[nextThemeIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeObject,
        toggleTheme,
      }}
    >
            {children}   {" "}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
