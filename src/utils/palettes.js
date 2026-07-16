// Paleta de cores compartilhada entre TODOS os modelos de currículo.
// Extraída dos 19 temas originais de themeStyles.js, para que "Sidebar",
// "Moderno" e "Minimalista" usem exatamente as mesmas cores disponíveis.
export const PALETTES = [
  { id: "blue", name: "Azul", rgb: "0, 40, 75" },
  { id: "pink", name: "Rosa", rgb: "123, 0, 90" },
  { id: "green", name: "Verde", rgb: "0, 128, 0" },
  { id: "red", name: "Vermelho", rgb: "163, 0, 0" },
  { id: "yellow", name: "Amarelo", rgb: "163, 163, 0" },
  { id: "black", name: "Preto", rgb: "0, 0, 0" },
  { id: "darkBlue", name: "Azul Escuro", rgb: "0, 40, 75" },
  { id: "lightBlue", name: "Azul Claro", rgb: "0, 150, 200" },
  { id: "beige", name: "Bege", rgb: "184, 134, 11" },
  { id: "hotPink", name: "Pink", rgb: "255, 20, 147" },
  { id: "violet", name: "Violeta", rgb: "138, 43, 226" },
  { id: "purple", name: "Roxo", rgb: "75, 0, 130" },
  { id: "cyan", name: "Ciano", rgb: "0, 150, 150" },
  { id: "wine", name: "Vinho", rgb: "128, 0, 32" },
  { id: "orange", name: "Laranja", rgb: "230, 124, 0" },
  { id: "gray", name: "Cinza", rgb: "80, 80, 80" },
  { id: "lightPink", name: "Rosa Claro", rgb: "255, 160, 190" },
  { id: "gold", name: "Dourado", rgb: "212, 175, 55" },
  { id: "lime", name: "Lima", rgb: "120, 255, 0" },
];

export const getPaletteById = (id) =>
  PALETTES.find((p) => p.id === id) ?? PALETTES[0];

// Mapa entre o id de paleta e o nome da função stylesTheme* já existente
// em themeStyles.js — usado apenas pelo modelo "sidebar", que mantém o
// arquivo original intacto (retrocompatibilidade total).
export const SIDEBAR_THEME_FN_NAME = {
  blue: "stylesThemeBlue",
  pink: "stylesThemePink",
  green: "stylesThemeGreen",
  red: "stylesThemeRed",
  yellow: "stylesThemeYellow",
  black: "stylesThemeBlack",
  darkBlue: "stylesThemeDarkBlue",
  lightBlue: "stylesThemeLightBlue",
  beige: "stylesThemeBeige",
  hotPink: "stylesThemeHotPink",
  violet: "stylesThemeViolet",
  purple: "stylesThemePurple",
  cyan: "stylesThemeCyan",
  wine: "stylesThemeWine",
  orange: "stylesThemeOrange",
  gray: "stylesThemeGray",
  lightPink: "stylesThemeLightPink",
  gold: "stylesThemeGold",
  lime: "stylesThemeLime",
};
