// ARQUIVO: src/utils/maskDataForPreview.js
// ==========================================================
// Mascara os dados no PREVIEW AO VIVO - nunca no PDF final
// (isForExport=true, que usa os dados originais, sem chamar isso).
//
// Princípio importante por trás disso: marca d'água sozinha NÃO
// resiste a remoção via IA (generative fill/inpainting removem esse
// tipo de padrão repetido e leve com facilidade hoje em dia). A
// defesa real está aqui - garantir que, mesmo que a marca d'água seja
// removida de um print, o que sobra por baixo ainda não seja um
// currículo utilizável: texto incompleto, contato ilegível, sem links
// navegáveis. Isso a IA não reconstrói, porque o dado real nunca saiu
// do backend - não tem o que "adivinhar" de volta.
// ==========================================================

function stripHtml(value) {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, "") : value;
}

/**
 * @param {string} value
 * @param {number} ratio - fração do texto original mantida visível
 * @param {number} minChars - nunca corta abaixo disso (textos curtos ficam intactos)
 */
function truncate(value, ratio, minChars) {
  if (typeof value !== "string" || value.length === 0) return value;

  const plain = stripHtml(value);
  const cutAt = Math.max(minChars, Math.floor(plain.length * ratio));

  if (plain.length <= cutAt) return plain;

  return `${plain.slice(0, cutAt).trimEnd()}… (texto completo no PDF)`;
}

function maskEmail(email) {
  if (typeof email !== "string" || !email.includes("@")) return email;

  const [local, domain] = email.split("@");
  const visibleLocal = local.slice(0, 2);
  const maskedLocal = `${visibleLocal}${"●".repeat(Math.max(local.length - 2, 3))}`;

  const domainParts = domain.split(".");
  const ext = domainParts.pop();
  const maskedDomain = `${"●".repeat(Math.max(domainParts.join(".").length, 4))}.${ext}`;

  return `${maskedLocal}@${maskedDomain}`;
}

function maskPhone(phone) {
  if (typeof phone !== "string") return phone;

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return "●●●●●●●●";

  const ddd = digits.slice(0, 2);
  const last2 = digits.slice(-2);
  return `(${ddd}) ●●●●●-●${last2}`;
}

function maskAddress(address) {
  if (typeof address !== "string" || address.length === 0) return address;

  const parts = address.split(",");
  if (parts.length <= 1) return "●●●●●●●●●●●●";

  const tail = parts[parts.length - 1].trim();
  return `●●●●●●●●●●, ${tail}`; // mantém só a última parte (cidade/UF), esconde rua/número
}

/**
 * Links (LinkedIn, GitHub, portfólio, etc): esconde a URL de verdade -
 * fica só o rótulo/handle visível, sem endereço navegável ou copiável.
 */
function maskLink(link) {
  return { ...link, url: "#" };
}

/**
 * @param {object} data - os values do Formik (currículo inteiro)
 * @returns {object} cópia mascarada, segura pra exibir no preview ao vivo
 */
export function maskDataForPreview(data) {
  return {
    ...data,
    contact: data.contact
      ? {
          ...data.contact,
          email: maskEmail(data.contact.email),
          phone: maskPhone(data.contact.phone),
          address: maskAddress(data.contact.address),
          links: (data.contact.links ?? []).map(maskLink),
        }
      : data.contact,
    objective: truncate(data.objective, 0.35, 50),
    experience: (data.experience ?? []).map((exp) => ({
      ...exp,
      responsibilities: (exp.responsibilities ?? []).map((r) => truncate(r, 0.4, 20)),
    })),
    education: (data.education ?? []).map((edu) => ({
      ...edu,
      description: truncate(edu.description, 0.4, 20),
    })),
  };
}