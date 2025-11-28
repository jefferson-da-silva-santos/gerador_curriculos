export const stylesCommon = (font) => {
    return (
        `
    /* Reset + print-friendliness */
    @page {
        size: A4;
        margin: 0;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-size: 0.85rem;
    }

    html,
    body {
        height: 100%;
        -webkit-print-color-adjust: exact;
    }

    body {
        ${font}
    }

    h1, h3, h4, h5, h6 {
        font-size: 1rem;
    }

    h2 {
        font-size: 1.5rem;
        padding-bottom: .5rem;
    }

     .container .col1 .overlay {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: 0 0 5rem 5rem;
        height: 11rem;
        top: 0;
  }

    /* Container: ocupar 100% da altura da página */
    .container {
        width: 100%;
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 0;
        margin: 0 auto;
    }

    /* Col1 */
    .container .col1 {
        background-color: rgb(0 40 75 / 3%); /* Este é um estilo base que pode ser mantido ou movido */
        position: relative;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0;
    }

    /* Col1 Row1 */
    .container .col1 .row1 {
        overflow: hidden;
        color: white;
        width: 100%;
        height: 19rem;
    }

    .container .col1 .row1 img {
        position: relative;
        top: -6%;
        left: 0%;
        transform: translate(0%, -21%);
        z-index: 99;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        border: 5px solid rgb(255, 255, 255);
        object-fit: cover;
    }

    .container .col1 .row1 .title {
        display: inline-block;
        line-height: 1;
        font-size: 1.8rem;
    }

    .container .col1 .row1 .function {
        display: inline-block;
        font-size: 1rem;
    }

    /* Col1 Row2 */
    .container .col1 .row2 {
        padding: 1rem;
        text-align: start;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        align-items: baseline;
    }

    .container .col1 .row2 .title {
        display: inline-block;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid rgba(0, 40, 75, 0.196); /* Cor da linha inferior pode ser ajustada, mas mantida como base */
        margin-bottom: 0.5rem;
    }

    .container .col1 .row2 .list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .container .col1 .row2 li {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .bxs-circle {
        font-size: 0.5rem;
        margin-right: 0.5rem;
    }

    /* Col1 Row3 */
    .container .col1 .row3 {
        padding: 1rem;
        text-align: start;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        align-items: baseline;
    }

    .container .col1 .row3 .title {
        display: inline-block;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid rgba(0, 40, 75, 0.196); /* Cor da linha inferior pode ser ajustada, mas mantida como base */
        margin-bottom: 0.5rem;
    }

    .container .col1 .row3 .list {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.5rem;
    }

    .container .col1 .row3 li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 0.5rem;
    }

    .container .col1 .row3 .list .circles {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .container .col1 .row3 .list .circles .circle {
        width: 9px;
        height: 9px;
        border-radius: 50%;
    }
    
    /* Col2 */
    .container .col2 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: baseline;
        gap: 0;
    }

    .container .col2 .row1 {
        padding: 1rem;
        padding-top: 3rem;
        text-align: start;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        align-items: baseline;
    }

    .container .col2 .row1 .title {
        display: inline-block;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid rgba(0, 40, 75, 0.196); /* Cor da linha inferior pode ser ajustada, mas mantida como base */
        margin-bottom: 0.5rem;
    }

    .container .col2 .row2 {
        padding: 1rem;
        text-align: start;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5rem;
        align-items: baseline;
    }

    .container .col2 .row2 .title {
        display: inline-block;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid rgba(0, 40, 75, 0.196); /* Cor da linha inferior pode ser ajustada, mas mantida como base */
        margin-bottom: 0.5rem;
    }

    .container .col2 .row2 .group {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
        font-weight: 600;
    }

    .container .col2 .row2 .university-name {
        font-weight: 600;
        line-height: 1;
    }

    .container .col2 .row2 .description {
        padding: 0.5rem 1rem;
    }

    .container .col2 .row3 {
        padding: 1rem;
        text-align: start;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        align-items: baseline;
    }

    .container .col2 .row3 .title {
        display: inline-block;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid rgba(0, 40, 75, 0.196); /* Cor da linha inferior pode ser ajustada, mas mantida como base */
        margin-bottom: 0.5rem;
    }

    .container .col2 .row3 .item {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 0.5rem;
    }

    .container .col2 .row3 .group {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
        font-weight: 600;
    }

    .container .col2 .row3 .enterprise-name {
        font-weight: 600;
        line-height: 1;
    }

    .container .col2 .row3 .list {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.3rem;
    }

    .footer {
        position: fixed;
        bottom: 0;
        padding: 1rem;
        width: 100%;
        height: max-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5rem;
        align-items: baseline;
    }

    .footer .text {
        font-size: .6rem;
        max-width: 26rem;
    }

    a {
        text-decoration: none;
    }
`
    )
};

export default stylesCommon;