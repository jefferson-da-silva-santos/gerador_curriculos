import TemplateSidebar from "./TemplateSidebar";
import TemplateModern from "./TemplateModern";
import TemplateMinimal from "./TemplateMinimal";
import TemplateTimeline from "./TemplateTimeline";
import TemplateExecutive from "./TemplateExecutive";
import TemplateCompact from "./TemplateCompact";
import TemplateCreative from "./TemplateCreative";
import TemplateCorporate from "./TemplateCorporate";
import TemplatePopular from "./TemplatePopular";
import TemplateDireto from "./TemplateDireto";

import { modernLayout } from "./layouts/modernLayout";
import { minimalLayout } from "./layouts/minimalLayout";
import { timelineLayout } from "./layouts/timelineLayout";
import { executiveLayout } from "./layouts/executiveLayout";
import { compactLayout } from "./layouts/compactLayout";
import { creativeLayout } from "./layouts/creativeLayout";
import { corporateLayout } from "./layouts/corporateLayout";
import { popularLayout } from "./layouts/popularLayout";
import { diretoLayout } from "./layouts/diretoLayout";

import * as legacyThemeStyles from "../utils/themeStyles";
import { PALETTES, SIDEBAR_THEME_FN_NAME, getPaletteById } from "../utils/palettes";

// Cada modelo expõe:
// - id / label: usados no seletor da UI
// - Component: o JSX que renderiza o currículo (recebe { data, fontFamily })
// - getStyles(fontStyles, paletteId): retorna o CSS completo (layout + cor)
//   pronto para ser injetado tanto na prévia quanto no HTML exportado p/ PDF
export const TEMPLATES = {
  sidebar: {
    id: "sidebar",
    label: "Sidebar Clássico",
    description: "Coluna lateral com foto, colunas de conteúdo à direita.",
    Component: TemplateSidebar,
    getStyles: (fontStyles, paletteId) => {
      const fnName = SIDEBAR_THEME_FN_NAME[paletteId] ?? SIDEBAR_THEME_FN_NAME.blue;
      const fn = legacyThemeStyles[fnName];
      return fn(fontStyles);
    },
  },
  modern: {
    id: "modern",
    label: "Moderno",
    description: "Banner no topo em largura total, corpo em duas colunas.",
    Component: TemplateModern,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return modernLayout(fontStyles, palette.rgb);
    },
  },
  minimal: {
    id: "minimal",
    label: "Minimalista",
    description: "Coluna única, sem foto — ideal para triagem automática (ATS).",
    Component: TemplateMinimal,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return minimalLayout(fontStyles, palette.rgb);
    },
  },
  timeline: {
    id: "timeline",
    label: "Timeline",
    description: "Experiência e formação em linha do tempo vertical.",
    Component: TemplateTimeline,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return timelineLayout(fontStyles, palette.rgb);
    },
  },
  executive: {
    id: "executive",
    label: "Executivo",
    description: "Cabeçalho centralizado e elegante, títulos em versalete.",
    Component: TemplateExecutive,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return executiveLayout(fontStyles, palette.rgb);
    },
  },
  compact: {
    id: "compact",
    label: "Compacto",
    description: "Denso e otimizado para caber muita informação em 1 página.",
    Component: TemplateCompact,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return compactLayout(fontStyles, palette.rgb);
    },
  },
  creative: {
    id: "creative",
    label: "Criativo",
    description: "Banner diagonal colorido e visual mais arrojado.",
    Component: TemplateCreative,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return creativeLayout(fontStyles, palette.rgb);
    },
  },
  corporate: {
    id: "corporate",
    label: "Corporativo",
    description: "Visual limpo e sóbrio, com blocos de borda colorida.",
    Component: TemplateCorporate,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return corporateLayout(fontStyles, palette.rgb);
    },
  },

  popular: {
    id: "popular",
    label: "Popular",
    description: "Com foto, cabeçalho colorido e competências em tags — ideal para atendimento, comércio e serviços.",
    Component: TemplatePopular,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return popularLayout(fontStyles, palette.rgb);
    },
  },
  direto: {
    id: "direto",
    label: "Direto ao Ponto",
    description: "Sem foto, objetivo e fácil de ler — bom para qualquer área, sem cara de nicho.",
    Component: TemplateDireto,
    getStyles: (fontStyles, paletteId) => {
      const palette = getPaletteById(paletteId);
      return diretoLayout(fontStyles, palette.rgb);
    },
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);
export { PALETTES };
export const getTemplateById = (id) => TEMPLATES[id] ?? TEMPLATES.sidebar;