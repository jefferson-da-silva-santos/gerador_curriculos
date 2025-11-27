import stylesCommon from "./stylesCommon";

export const stylesThemeBlue = `
    ${stylesCommon}

    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(0, 40, 75),
            rgba(20, 80, 133, 0.778)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(0, 40, 75);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(0, 40, 75);
    }

    .container .col1 .row2 i {
        color: rgb(0, 40, 75);
        font-size: 1.5rem;
    }

    .container .col1 .row3 .title {
        color: rgb(0, 40, 75);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(0, 40, 75, 0.387);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(0, 40, 75);
    }
    
    .container .col2 .row2 .university-name {
        color: rgb(0, 40, 75);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(0, 40, 75);
    }

    a {
        color: rgb(0, 40, 75);
    }
`;

export const stylesThemePink = `
    ${stylesCommon}

    /* Definições de cor base: rgb(123, 0, 90) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(123, 0, 90),
            rgba(123, 0, 90, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(123, 0, 90);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(123, 0, 90);
    }

    .container .col1 .row2 i {
        color: rgb(123, 0, 90);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(123, 0, 90);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(123, 0, 90, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(123, 0, 90);
    }

    .container .col2 .row2 .university-name {
        color: rgb(123, 0, 90);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(123, 0, 90);
    }

    a {
        color: rgb(123, 0, 90);
    }
`;

export const stylesThemeGreen = `
    ${stylesCommon}

    /* ==== Tema Verde ====
      Cor base: green (ou rgba(0,128,0,*) quando precisar de variação)
    */

    /* Col1 */
    .container .col1 {
        background-color: rgb(0 40 75 / 3%);
    }

    /* Header (overlay) */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            green,
            rgba(0, 128, 0, 0.5)
        );
    }

    /* Row2 títulos */
    .container .col1 .row2 .title {
        color: green;
        border-bottom: 1px solid rgba(0, 128, 0, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: green;
    }

    /* Row3 títulos */
    .container .col1 .row3 .title {
        color: green;
        border-bottom: 1px solid rgba(0, 128, 0, 0.196);
    }

    /* Círculos de skills */
    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(0, 128, 0, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: green;
    }

    /* Col2 */
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title,
    .container .col2 .row2 .university-name,
    .container .col2 .row3 .enterprise-name,
    a {
        color: green;
        border-bottom: 1px solid rgba(0, 128, 0, 0.196);
    }
`;


export const stylesThemeRed = `
    ${stylesCommon}

    /* ==== Tema Vermelho ====
       Cor base: rgb(163, 0, 0)
       Versões com opacidade usam rgba(163, 0, 0, *)
    */

    /* Header (overlay) */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(163, 0, 0),
            rgba(163, 0, 0, 0.5)
        );
    }

    /* Títulos principais em col1 row2/row3 + col2 */
    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(163, 0, 0);
        border-bottom: 1px solid rgba(163, 0, 0, 0.196);
    }

    /* Textos e links da seção pessoal */
    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(163, 0, 0);
    }

    /* Ícones pessoais */
    .container .col1 .row2 i {
        color: rgb(163, 0, 0);
        font-size: 1.5rem;
    }

    /* Círculos de skills (competências) */
    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(163, 0, 0, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(163, 0, 0);
    }

    /* Nome da universidade */
    .container .col2 .row2 .university-name {
        color: rgb(163, 0, 0);
    }

    /* Nome da empresa */
    .container .col2 .row3 .enterprise-name {
        color: rgb(163, 0, 0);
    }

    /* Todos os links */
    a {
        color: rgb(163, 0, 0);
    }
`;


export const stylesThemeYellow = `
    ${stylesCommon}

    /* ==== Tema Amarelo ====
       Cor base: rgb(163, 163, 0)
       Versões transparentes usam rgba(163, 163, 0, *)
    */

    /* Header Overlay */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(163, 163, 0),
            rgba(163, 163, 0, 0.656)
        );
    }

    /* Títulos (Seções) */
    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(163, 163, 0);
        border-bottom: 1px solid rgba(163, 163, 0, 0.196);
    }

    /* Texto e links pessoais */
    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: rgb(163, 163, 0);
    }

    .container .col1 .row2 i {
        font-size: 1.5rem;
    }

    /* Círculos de Skills */
    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(163, 163, 0, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(163, 163, 0);
    }

    /* Universidade */
    .container .col2 .row2 .university-name {
        color: rgb(163, 163, 0);
    }

    /* Nome da empresa */
    .container .col2 .row3 .enterprise-name {
        color: rgb(163, 163, 0);
    }

    /* Todos os links */
    a {
        color: rgb(163, 163, 0);
    }
`;


export const stylesThemeBlack = `
    ${stylesCommon}

    /* ==== Tema Preto ====
       Cor base: black
       Variações de opacidade usam rgba(0, 0, 0, *)
    */

    /* Header Overlay */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            black,
            rgba(0, 0, 0, 0.738)
        );
    }

    /* Títulos das seções */
    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: black;
        border-bottom: 1px solid rgba(0, 0, 0, 0.196);
    }

    /* Texto e links pessoais */
    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: black;
    }

    /* Ícones pessoais */
    .container .col1 .row2 i {
        font-size: 1.5rem;
    }

    /* Círculos de Skills */
    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(0, 0, 0, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: black;
    }

    /* Universidade */
    .container .col2 .row2 .university-name {
        color: black;
    }

    /* Nome da empresa */
    .container .col2 .row3 .enterprise-name {
        color: black;
    }

    /* Todos os links */
    a {
        color: black;
    }
`;

export const stylesThemeOrange = `
    ${stylesCommon}

    /* ==== Tema Laranja ====
       Cor base: rgb(230, 124, 0)
    */

    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(230, 124, 0),
            rgba(230, 124, 0, 0.65)
        );
    }

    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(230, 124, 0);
        border-bottom: 1px solid rgba(230, 124, 0, 0.2);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: rgb(230, 124, 0);
    }

    .container .col1 .row2 i {
        font-size: 1.5rem;
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(230, 124, 0, 0.28);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(230, 124, 0);
    }

    .container .col2 .row2 .university-name,
    .container .col2 .row3 .enterprise-name,
    a {
        color: rgb(230, 124, 0);
    }
`;

export const stylesThemeGray = `
    ${stylesCommon}

    /* ==== Tema Cinza ====
       Cor base: rgb(80, 80, 80)
    */

    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(80, 80, 80),
            rgba(80, 80, 80, 0.6)
        );
    }

    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(80, 80, 80);
        border-bottom: 1px solid rgba(80, 80, 80, 0.2);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: rgb(80, 80, 80);
    }

    .container .col1 .row2 i {
        font-size: 1.5rem;
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(80, 80, 80, 0.3);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(80, 80, 80);
    }

    .container .col2 .row2 .university-name,
    .container .col2 .row3 .enterprise-name,
    a {
        color: rgb(80, 80, 80);
    }
`;


export const stylesThemeLightPink = `
    ${stylesCommon}

    /* ==== Tema Rosa Claro ====
       Cor base: rgb(255, 160, 190)
       Accent mais forte: rgb(255, 120, 170)
    */

    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(255, 120, 170),
            rgba(255, 120, 170, 0.55)
        );
    }

    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(255, 120, 170);
        border-bottom: 1px solid rgba(255, 120, 170, 0.18);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: rgb(255, 120, 170);
    }

    .container .col1 .row2 i {
        font-size: 1.5rem;
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(255, 120, 170, 0.22);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(255, 120, 170);
    }

    .container .col2 .row2 .university-name,
    .container .col2 .row3 .enterprise-name,
    a {
        color: rgb(255, 120, 170);
    }
`;



export const stylesThemeGold = `
    ${stylesCommon}

    /* ==== Tema Dourado ====
       Cor base: rgb(212, 175, 55)
       Opacidade: rgba(212, 175, 55, *)
    */

    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(212, 175, 55),
            rgba(212, 175, 55, 0.7)
        );
    }

    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(212, 175, 55);
        border-bottom: 1px solid rgba(212, 175, 55, 0.25);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: rgb(212, 175, 55);
    }

    .container .col1 .row2 i {
        font-size: 1.52rem;
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(212, 175, 55, 0.32);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(212, 175, 55);
    }

    .container .col2 .row2 .university-name,
    .container .col2 .row3 .enterprise-name,
    a {
        color: rgb(212, 175, 55);
    }
`;

export const stylesThemeLime = `
    ${stylesCommon}

    /* ==== Tema Verde Limão ====
       Cor base: rgb(120, 255, 0)
       Versões transparentes: rgba(120, 255, 0, *)
    */

    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(120, 255, 0),
            rgba(120, 255, 0, 0.6)
        );
    }

    .container .col1 .row2 .title,
    .container .col1 .row3 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(95, 200, 0);
        border-bottom: 1px solid rgba(120, 255, 0, 0.3);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li,
    .container .col1 .row2 i {
        color: rgb(95, 200, 0);
    }

    .container .col1 .row2 i {
        font-size: 1.5rem;
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(120, 255, 0, 0.35);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(95, 200, 0);
    }

    .container .col2 .row2 .university-name,
    .container .col2 .row3 .enterprise-name,
    a {
        color: rgb(95, 200, 0);
    }
`;


export const stylesThemeDarkBlue = `
    ${stylesCommon}

    /* Definições de cor base: rgb(0, 40, 75) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(0, 40, 75),
            rgba(0, 40, 75, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(0, 40, 75);
        border-bottom: 1px solid rgba(0, 40, 75, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(0, 40, 75);
    }

    .container .col1 .row2 i {
        color: rgb(0, 40, 75);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(0, 40, 75);
        border-bottom: 1px solid rgba(0, 40, 75, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(0, 40, 75, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(0, 40, 75);
    }

    .container .col2 .row2 .university-name {
        color: rgb(0, 40, 75);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(0, 40, 75);
    }

    a {
        color: rgb(0, 40, 75);
    }
`;


export const stylesThemeLightBlue = `
    ${stylesCommon}

    /* Definições de cor base: rgb(0, 150, 200) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(0, 150, 200),
            rgba(0, 150, 200, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(0, 150, 200);
        border-bottom: 1px solid rgba(0, 150, 200, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(0, 150, 200);
    }

    .container .col1 .row2 i {
        color: rgb(0, 150, 200);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(0, 150, 200);
        border-bottom: 1px solid rgba(0, 150, 200, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(0, 150, 200, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(0, 150, 200);
    }

    .container .col2 .row2 .university-name {
        color: rgb(0, 150, 200);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(0, 150, 200);
    }

    a {
        color: rgb(0, 150, 200);
    }
`;


export const stylesThemeBeige = `
    ${stylesCommon}

    /* Definições de cor base: rgb(184, 134, 11) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(184, 134, 11),
            rgba(184, 134, 11, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(184, 134, 11);
        border-bottom: 1px solid rgba(184, 134, 11, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(184, 134, 11);
    }

    .container .col1 .row2 i {
        color: rgb(184, 134, 11);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(184, 134, 11);
        border-bottom: 1px solid rgba(184, 134, 11, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(184, 134, 11, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(184, 134, 11);
    }

    .container .col2 .row2 .university-name {
        color: rgb(184, 134, 11);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(184, 134, 11);
    }

    a {
        color: rgb(184, 134, 11);
    }
`;

export const stylesThemeHotPink = `
    ${stylesCommon}

    /* Definições de cor base: rgb(255, 20, 147) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(255, 20, 147),
            rgba(255, 20, 147, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(255, 20, 147);
        border-bottom: 1px solid rgba(255, 20, 147, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(255, 20, 147);
    }

    .container .col1 .row2 i {
        color: rgb(255, 20, 147);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(255, 20, 147);
        border-bottom: 1px solid rgba(255, 20, 147, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(255, 20, 147, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(255, 20, 147);
    }

    .container .col2 .row2 .university-name {
        color: rgb(255, 20, 147);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(255, 20, 147);
    }

    a {
        color: rgb(255, 20, 147);
    }
`;

export const stylesThemeViolet = `
    ${stylesCommon}

    /* Definições de cor base: rgb(138, 43, 226) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(138, 43, 226),
            rgba(138, 43, 226, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(138, 43, 226);
        border-bottom: 1px solid rgba(138, 43, 226, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(138, 43, 226);
    }

    .container .col1 .row2 i {
        color: rgb(138, 43, 226);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(138, 43, 226);
        border-bottom: 1px solid rgba(138, 43, 226, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(138, 43, 226, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(138, 43, 226);
    }

    .container .col2 .row2 .university-name {
        color: rgb(138, 43, 226);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(138, 43, 226);
    }

    a {
        color: rgb(138, 43, 226);
    }
`;


export const stylesThemePurple = `
    ${stylesCommon}

    /* Definições de cor base: rgb(75, 0, 130) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(75, 0, 130),
            rgba(75, 0, 130, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(75, 0, 130);
        border-bottom: 1px solid rgba(75, 0, 130, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(75, 0, 130);
    }

    .container .col1 .row2 i {
        color: rgb(75, 0, 130);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(75, 0, 130);
        border-bottom: 1px solid rgba(75, 0, 130, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(75, 0, 130, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(75, 0, 130);
    }

    .container .col2 .row2 .university-name {
        color: rgb(75, 0, 130);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(75, 0, 130);
    }

    a {
        color: rgb(75, 0, 130);
    }
`;

export const stylesThemeCyan = `
    ${stylesCommon}

    /* Definições de cor base: rgb(0, 150, 150) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(0, 150, 150),
            rgba(0, 150, 150, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(0, 150, 150);
        border-bottom: 1px solid rgba(0, 150, 150, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(0, 150, 150);
    }

    .container .col1 .row2 i {
        color: rgb(0, 150, 150);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(0, 150, 150);
        border-bottom: 1px solid rgba(0, 150, 150, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(0, 150, 150, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(0, 150, 150);
    }

    .container .col2 .row2 .university-name {
        color: rgb(0, 150, 150);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(0, 150, 150);
    }

    a {
        color: rgb(0, 150, 150);
    }
`;


export const stylesThemeWine = `
    ${stylesCommon}

    /* Definições de cor base: rgb(128, 0, 32) */
    
    /* Cores */
    .container .col1 .overlay {
        background-image: linear-gradient(
            to right,
            rgb(128, 0, 32),
            rgba(128, 0, 32, 0.656)
        );
    }

    .container .col1 .row2 .title,
    .container .col2 .row1 .title,
    .container .col2 .row2 .title,
    .container .col2 .row3 .title {
        color: rgb(128, 0, 32);
        border-bottom: 1px solid rgba(128, 0, 32, 0.196);
    }

    .container .col1 .row2 a,
    .container .col1 .row2 li {
        color: rgb(128, 0, 32);
    }

    .container .col1 .row2 i {
        color: rgb(128, 0, 32);
        font-size: 1.5rem;
    }
    
    .container .col1 .row3 .title {
        color: rgb(128, 0, 32);
        border-bottom: 1px solid rgba(128, 0, 32, 0.196);
    }

    .container .col1 .row3 .list .circles .circle {
        background-color: rgba(128, 0, 32, 0.286);
    }

    .container .col1 .row3 .list .circles .circle.cl {
        background-color: rgb(128, 0, 32);
    }

    .container .col2 .row2 .university-name {
        color: rgb(128, 0, 32);
    }

    .container .col2 .row3 .enterprise-name {
        color: rgb(128, 0, 32);
    }

    a {
        color: rgb(128, 0, 32);
    }
`;