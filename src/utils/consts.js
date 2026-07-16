export const ICON_OPTIONS = [
  { id: 1, name: "Link Padrão", class: "bx-link-alt" },
  { id: 2, name: "LinkedIn", class: "bxl-linkedin-square" },
  { id: 3, name: "GitHub", class: "bxl-github" },
  { id: 4, name: "Website/Portfólio", class: "bx-globe" },
  { id: 5, name: "Email", class: "bx-envelope" },
  { id: 6, name: "Telefone/WhatsApp", class: "bxl-whatsapp" },
  { id: 7, name: "Twitter/X", class: "bxl-twitter" },
  { id: 8, name: "Facebook", class: "bxl-facebook-square" },
  { id: 9, name: "Instagram", class: "bxl-instagram-alt" },
  { id: 10, name: "Stack Overflow", class: "bxl-stack-overflow" },
  { id: 11, name: "Medium", class: "bxl-medium-square" },
];

export const inlineStyles = {
  skillItemRow: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    marginBottom: "5px",
  },
  skillNameField: {
    flexGrow: 1,
  },
  removeButtonMargin: {
    marginLeft: "5px",
  },
  linkItemGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
    alignItems: "center",
    marginBottom: "10px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
  },
  linkRemoveButton: {},
  linkFieldLabel: {
    display: "block",
    fontSize: "0.8em",
    marginBottom: "3px",
    fontWeight: "bold",
  },
  iconSelectField: {},
};

// ─── Dados fictícios (apenas para demonstração do editor) ─────────────────
export const initialValues = {
  templateId: "sidebar", // "sidebar" | "modern" | "minimal" | "timeline" | "executive" | "compact" | "creative" | "corporate"
  personal: {
    name: "Ana Beatriz Lima",
    role: "Desenvolvedora Full Stack",
    fullName: "Ana Beatriz Lima Cavalcante",
    imageSrc: "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png",
  },
  contact: {
    email: "ana.lima.dev@exemplo.com",
    phone: "(11) 9 8765-4321",
    address: "Rua das Palmeiras, 123, São Paulo - SP",
    links: [
      {
        label: "Portfólio pessoal",
        url: "https://exemplo-portfolio.com",
        handle: "Portfólio",
        icon: "bx-link-alt",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/exemplo-usuario",
        handle: "ana-lima-dev",
        icon: "bxl-linkedin-square",
      },
      {
        label: "GitHub",
        url: "https://github.com/exemplo-usuario",
        handle: "ana-lima-dev",
        icon: "bxl-github",
      },
    ],
  },
  labels: {
    personalData: "Dados pessoais",
    skills: "Competências",
    objective: "Objetivo",
    education: "Formação",
    experience: "Experiência",
  },
  skills: [
    { name: "React", level: 4 },
    { name: "Next.js", level: 4 },
    { name: "Node.js", level: 4 },
    { name: "NestJS", level: 3 },
    { name: "Git / GitHub", level: 5 },
    { name: "Docker", level: 3 },
    { name: "TypeScript", level: 4 },
    { name: "SASS", level: 3 },
    { name: "MySQL", level: 4 },
    { name: "PostgreSQL", level: 4 },
    { name: "MongoDB", level: 3 },
    { name: "Redis", level: 2 },
    { name: "Java", level: 3 },
    { name: "Flutter", level: 2 },
    { name: "UI / UX", level: 3 },
    { name: "Figma", level: 3 },
  ],
  objective:
    "Atuar como desenvolvedora Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Experiência com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.",
  education: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      period: "2021 - 2023",
      institution: "Faculdade Exemplo de Tecnologia",
      description:
        "Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.",
    },
  ],
  experience: [
    {
      role: "Desenvolvedora Pleno",
      period: "Jan 2024 - Atual",
      company: "Empresa Exemplo Tecnologia Ltda.",
      location: "São Paulo, SP",
      responsibilities: [
        "Desenvolvimento full stack com React, Next.js e Node.js (Express, NestJS), integrando APIs RESTful e criando interfaces modernas.",
        "Uso de Git, Docker e CI/CD para versionamento, containerização e automação de processos.",
        "Manutenção, testes, documentação e evolução contínua de sistemas.",
        "Aplicação de boas práticas, Clean Code e Design Patterns, colaborando em equipes ágeis.",
      ],
    },
    {
      role: "Desenvolvedora Freelancer",
      period: "Mar 2023 - Dez 2023",
      company: "Studio Exemplo Design",
      location: "Remoto",
      responsibilities: [
        'Desenvolvimento do <a href="https://exemplo-site-institucional.com" target="_blank">site institucional</a> com React, focado em SEO, usabilidade e responsividade.',
        "Uso de boas práticas de código, versionamento com Git e otimização de performance.",
      ],
    },
    {
      role: "Estagiária de Desenvolvimento",
      period: "Jun 2022 - Fev 2023",
      company: "Empresa Fictícia Sistemas",
      location: "São Paulo, SP",
      responsibilities: [
        "Apoio no desenvolvimento de módulos internos em React, com foco em velocidade e qualidade de código.",
        "Arquitetura modular, boas práticas e versionamento com Git.",
      ],
    },
  ],
};
