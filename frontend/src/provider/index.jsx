import { useState } from "react"
import ThemeContext from "../context/ThemeContext"
import { stylesThemeBlack, stylesThemeBlue, stylesThemeGreen, stylesThemePink, stylesThemeRed, stylesThemeYellow } from "../utils/themeStyles";
const themes = [
    {
      id: 1,
      theme: 'blue-theme',
      styles: stylesThemeBlue,
    },
    {
      id: 2,
      theme: 'pink-theme',
      styles: stylesThemePink,
    },
    {
      id: 3,
      theme: 'green-theme',
      styles: stylesThemeGreen,
    },
    {
      id: 4,
      theme: 'red-theme',
      styles: stylesThemeRed,
    },
    {
      id: 5,
      theme: 'yellow-theme',
      styles: stylesThemeYellow,
    },
    {
      id: 6,
      theme: 'black-theme',
      styles: stylesThemeBlack,
    }
  ]

const ThemeProvider = ({children}) => {
  const [themeObject, setThemeObject] = useState(themes[0]);
  const toggleTheme = () => {
    switch (themeObject.theme) {
      case themes[0].theme:
        setThemeObject(themes[1]);
        break;
      case themes[1].theme:
        setThemeObject(themes[2]);
        break;
      case themes[2].theme:
        setThemeObject(themes[3]);
        break;
      case themes[3].theme:
        setThemeObject(themes[4]);
        break;
      case themes[4].theme:
        setThemeObject(themes[5]);
        break;
      case themes[5].theme:
        setThemeObject(themes[0]);
        break;
      default:
        setThemeObject(themes[0]);
        break;
    }
  }

  return (
    <ThemeContext.Provider value={{
      themeObject,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider