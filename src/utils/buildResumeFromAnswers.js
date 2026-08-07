// ARQUIVO: src/utils/buildResumeFromAnswers.js
// ==========================================================
// Transforma as respostas cruas do CurriculumWizard no MESMO formato
// de `initialValues` que o CurriculumEditor.jsx já usa.
//
// "Tamanho ideal" aqui significa: regras determinísticas de corte e
// formatação (não é IA generativa) - trunca texto longo respeitando
// palavra inteira, separa "o que você fez no trabalho" (um item por
// linha, digitado num textarea) em array de bullets, limita
// quantidade de itens pra não estourar o layout do PDF. Isso é
// honesto e prevísível - sempre produz o mesmo resultado pro mesmo
// texto, sem inventar conteúdo que o usuário não escreveu.
// ==========================================================

const LIMITS = {
  displayNameWords: 4,
  role: 60,
  objective: 320,
  educationDescription: 220,
  responsibility: 140,
  maxResponsibilitiesPerJob: 6,
  maxSkills: 16,
};

const PLATFORM_META = {
  linkedin: { label: "LinkedIn", icon: "bxl-linkedin-square" },
  github: { label: "GitHub", icon: "bxl-github" },
  portfolio: { label: "Portfólio", icon: "bx-globe" },
  other: { label: "Link", icon: "bx-link-alt" },
};

const DEFAULT_LABELS = {
  personalData: "Dados pessoais",
  skills: "Competências",
  objective: "Objetivo",
  education: "Formação",
  experience: "Experiência",
};

/**
 * Trunca por palavra inteira (nunca corta no meio de uma palavra).
 * @param {string} text
 * @param {number} max
 */
export function truncateSmart(text, max) {
  if (typeof text !== "string") return "";
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  // só corta na última palavra inteira se isso não jogar fora mais de
  // 20% do limite - senão corta no limite mesmo (texto sem espaços)
  const safeCut = lastSpace > max * 0.8 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut.trimEnd()}…`;
}

function truncateWords(text, maxWords) {
  if (typeof text !== "string") return "";
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}

function clampLevel(level) {
  const n = Number(level);
  if (!Number.isFinite(n)) return 3;
  return Math.min(5, Math.max(1, Math.round(n)));
}

function extractHandle(url) {
  if (typeof url !== "string" || url.length === 0) return "";
  try {
    const clean = url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const parts = clean.split("/");
    return parts[parts.length - 1] || clean;
  } catch {
    return url;
  }
}

function toLinkObject(link) {
  const meta = PLATFORM_META[link.platform] ?? PLATFORM_META.other;
  return {
    label: meta.label,
    icon: meta.icon,
    url: link.url ?? "",
    handle: extractHandle(link.url),
  };
}

/**
 * Um item de "o que você fez" por linha (é assim que o textarea do
 * wizard orienta o usuário a preencher) - cada linha vira um bullet,
 * truncado individualmente, com um teto de itens por experiência.
 * @param {string} text
 */
export function splitIntoResponsibilities(text) {
  if (typeof text !== "string") return [];

  return text
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim()) // tira marcador que o usuário já tenha digitado
    .filter(Boolean)
    .slice(0, LIMITS.maxResponsibilitiesPerJob)
    .map((line) => truncateSmart(line, LIMITS.responsibility));
}

/**
 * @param {object} answers - respostas cruas coletadas pelo CurriculumWizard
 * @returns {object} no mesmo formato de initialValues
 */
export function buildResumeFromAnswers(answers = {}) {
  return {
    templateId: answers.templateId || "sidebar",
    personal: {
      name: truncateWords(answers.displayName || answers.fullName || "", LIMITS.displayNameWords),
      fullName: (answers.fullName || "").trim(),
      role: truncateSmart(answers.role || "", LIMITS.role),
      imageSrc: answers.photoUrl || "",
    },
    contact: {
      email: (answers.email || "").trim(),
      phone: (answers.phone || "").trim(),
      address: (answers.address || "").trim(),
      links: (answers.links || [])
        .filter((l) => l?.url)
        .map(toLinkObject),
    },
    labels: { ...DEFAULT_LABELS },
    skills: (answers.skills || [])
      .filter((s) => s?.name)
      .slice(0, LIMITS.maxSkills)
      .map((s) => ({ name: s.name.trim(), level: clampLevel(s.level) })),
    objective: truncateSmart(answers.objective || "", LIMITS.objective),
    education: (answers.education || [])
      .filter((e) => e?.course || e?.institution)
      .map((e) => ({
        course: (e.course || "").trim(),
        period: (e.period || "").trim(),
        institution: (e.institution || "").trim(),
        description: truncateSmart(e.description || "", LIMITS.educationDescription),
      })),
    experience: (answers.experience || [])
      .filter((exp) => exp?.role || exp?.company)
      .map((exp) => ({
        role: (exp.role || "").trim(),
        period: (exp.period || "").trim(),
        company: (exp.company || "").trim(),
        location: (exp.location || "").trim(),
        responsibilities: splitIntoResponsibilities(exp.activitiesText || ""),
      })),
  };
}