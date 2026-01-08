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


export const initialValues = {
  personal: {
    name: "Jefferson Santos",
    role: "Desenvolvedor Full Stack",
    fullName: "Jefferson da Silva Santos",
    imageSrc:
      "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/jefferson-image.jpeg",
  },
  contact: {
    email: "jeffrrwpg678@gmail.com",
    phone: "(81) 9 9936-7426",
    address: "Sítio Guabiraba, 64, Limoeiro - PE",
    links: [
      {
        label: "Portfólio pessoal",
        url: "https://jeffersondev.netlify.app",
        handle: "Portfólio",
        icon: "bx-link-alt", // classe Boxicon
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jefferson-santos-a87b74277",
        handle: "jefferson-santos",
        icon: "bxl-linkedin-square",
      },
      {
        label: "GitHub",
        url: "https://github.com/jefferson-da-silva-santos",
        handle: "jefferson-da-silva-santos",
        icon: "bxl-github",
      },
    ],
  },
  // NOVOS CAMPOS PARA EDIÇÃO DE LEGENDAS
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
    { name: "NestJS", level: 4 },
    { name: "Git / GitHub", level: 4 },
    { name: "Docker", level: 4 },
    { name: "n8n", level: 4 },
    { name: "SASS", level: 4 },
    { name: "MySQL", level: 4 },
    { name: "PostgreSQL", level: 4 },
    { name: "Firebird", level: 4 },
    { name: "Redis", level: 4 },
    { name: "Java", level: 4 },
    { name: "Flutter", level: 4 },
    { name: "UI / UX", level: 4 },
    { name: "Figma", level: 4 },
  ],
  objective:
    "Atuar como desenvolvedor Full Stack, criando soluções completas, modernas e escaláveis, ou contribuindo especificamente no front-end ou back-end. Trabalho com boas práticas de arquitetura, testes e metodologias ágeis para entregar produtos de alta qualidade e impacto real. Disponível para início imediato.",
  education: [
    {
      course: "Desenvolvimento de Sistemas",
      period: "2021 - 2023",
      institution: "Escola Técnica José Humberto de Moura Cavalcante",
      description:
        "Formação técnica em Desenvolvimento de Sistemas, trabalhando com desenvolvimento full stack, lógica, banco de dados, versionamento, UI/UX e práticas de programação moderna.",
    },
  ],
  experience: [
    {
      role: "Desenvolvedor Junior",
      period: "Jun 2025 - Atual",
      company: "Ongold Tech",
      location: "Limoeiro, PE",
      responsibilities: [
        "Desenvolvimento full stack com React, Next.js e Node.js (Express, Adonis, Nest), integrando APIs RESTful e criando interfaces modernas.",
        "Uso de Git, Docker e n8n para versionamento, containerização e automação de processos.",
        "Manutenção, testes, documentação e evolução contínua de sistemas.",
        "Aplicação de boas práticas, Clean Code e Design Patterns, colaborando em equipes ágeis.",
      ],
    },
    {
      role: "Desenvolvedor Freelancer",
      period: "Set 2023 - Dez 2023",
      company: "Óticas Leal",
      location: "Limoeiro, PE",
      responsibilities: [
        'Desenvolvimento do <a href="https://oticasleal.netlify.app" target="_blank">site institucional</a> com React, focado em SEO, usabilidade e responsividade.',
        "Uso de boas práticas de código, versionamento com Git e otimização de performance.",
      ],
    },
    {
      role: "Desenvolvedor Freelancer",
      period: "Abr 2023 - Ago 2023",
      company: "Produtos Léo de Lita",
      location: "Limoeiro, PE",
      responsibilities: [
        '<a href="https://bolachasleodelita.com.br" target="_blank">Site institucional</a> desenvolvido em React, com foco em velocidade e SEO',
        "Arquitetura modular, boas práticas e versionamento com Git.",
      ],
    },
  ],
};