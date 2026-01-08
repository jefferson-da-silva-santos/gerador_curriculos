import { renderToString } from "react-dom/server";
import { initialValues } from "./consts";

const generateCurriculumHtml = (data, styles, font) => {
  const curriculumBodyHtml = renderToString(
    <CurriculumPreview data={data} isForExport={true} />
  );

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
          href="${font}"
          rel="stylesheet"
          />
          <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
          />
          <title>Curriculum</title>
          <style>
          ${styles}
          </style>
      </head>
    <body>
    ${curriculumBodyHtml}
   </body>
  </html>
 `;
};

export const getSavedValues = () => {
  const saved = localStorage.getItem("curriculum_data");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return initialValues;
    }
  }
  return initialValues;
};


export const handleGeneratePdf = async (values, actions) => {
  actions.setSubmitting(true);

  try {
    const finalHtml = generateCurriculumHtml(
      values,
      themeObject.styles,
      font.link
    );

    const response = await fetch("http://localhost:3000/gerar-curriculo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ htmlContent: finalHtml }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "curriculo.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);

    alert("✅ PDF gerado e download iniciado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao gerar o PDF:", error);
    alert(`Falha ao gerar o PDF. Detalhes: ${error.message}`);
  } finally {
    actions.setSubmitting(false);
  }
};