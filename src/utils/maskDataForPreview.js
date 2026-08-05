// ARQUIVO: src/utils/maskDataForPreview.js
// ==========================================================
// Mascara os campos de texto longo (objetivo, responsabilidades,
// descrição de formação) no PREVIEW AO VIVO - nunca no PDF final
// (isForExport=true, que usa os dados originais, sem chamar isso).
//
// Objetivo: quem visualiza consegue confirmar layout/estilo/fonte/
// cor, mas não tem o texto completo pronto pra copiar ou printar e
// usar como currículo de verdade.
//
// Implementação por TRUNCAMENTO em texto puro (não por blur via CSS)
// de propósito: alguns campos (ex: responsibilities) podem conter
// HTML embutido (ver initialValues do editor, que já tem um <a> ali
// dentro). Injetar blur via HTML arriscaria cortar uma tag no meio.
// Truncar em texto puro é seguro nos dois casos.
// ==========================================================

function stripHtml(value) {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, "") : value;
}

/**
 * @param {string} value
 * @param {number} [ratio=0.55] - fração do texto original mantida visível
 * @param {number} [minChars=40] - nunca corta abaixo disso (textos curtos ficam intactos)
 */
function truncate(value, ratio = 0.55, minChars = 40) {
  if (typeof value !== "string" || value.length === 0) return value;

  const plain = stripHtml(value);
  const cutAt = Math.max(minChars, Math.floor(plain.length * ratio));

  if (plain.length <= cutAt) return plain; // texto já curto - não mexe

  return `${plain.slice(0, cutAt).trimEnd()}… (texto completo no PDF)`;
}

/**
 * @param {object} data - os values do Formik (currículo inteiro)
 * @returns {object} cópia com os campos de texto longo truncados
 */
export function maskDataForPreview(data) {
  return {
    ...data,
    objective: truncate(data.objective, 0.5, 60),
    experience: (data.experience ?? []).map((exp) => ({
      ...exp,
      responsibilities: (exp.responsibilities ?? []).map((r) => truncate(r, 0.6, 25)),
    })),
    education: (data.education ?? []).map((edu) => ({
      ...edu,
      description: truncate(edu.description, 0.6, 25),
    })),
  };
}