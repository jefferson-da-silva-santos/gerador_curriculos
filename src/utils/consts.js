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

/* ============================================================
   PERFIS DE EXEMPLO — um por nicho
   ============================================================
   Cada perfil segue exatamente o mesmo shape que o Formik/editor já
   espera (personal, contact, labels, skills, objective, education,
   experience). Todos têm volume de conteúdo equivalente (>= 3
   experiências, formação dupla, 10+ competências) para que nenhum
   pareça "mais pobre" que os outros, independente de qual for
   sorteado ou de qual template estiver ativo.
   ============================================================ */

const PROFILE_DEV = {
  templateId: "sidebar",
  personal: {
    name: "Ana Beatriz Lima",
    role: "Desenvolvedora Full Stack",
    fullName: "Ana Beatriz Lima Cavalcante",
    imageSrc:
      "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png",
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

const PROFILE_MERCADO = {
  templateId: "popular",
  personal: {
    name: "Carlos Eduardo Souza",
    role: "Operador de Caixa",
    fullName: "Carlos Eduardo Souza Ferreira",
    imageSrc:
      "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png",
  },
  contact: {
    email: "carlos.souza@exemplo.com",
    phone: "(11) 9 7654-3210",
    address: "Rua dos Ipês, 45, Guarulhos - SP",
    links: [],
  },
  labels: {
    personalData: "Dados pessoais",
    skills: "Competências",
    objective: "Objetivo",
    education: "Formação",
    experience: "Experiência",
  },
  skills: [
    { name: "Atendimento ao cliente", level: 5 },
    { name: "Operação de caixa", level: 5 },
    { name: "Reposição de estoque", level: 4 },
    { name: "Conferência de mercadorias", level: 4 },
    { name: "Trabalho em equipe", level: 5 },
    { name: "Organização de gôndolas", level: 4 },
    { name: "Controle de validade", level: 4 },
    { name: "Uso de sistema de PDV", level: 4 },
    { name: "Recebimento de mercadorias", level: 3 },
    { name: "Comunicação", level: 5 },
    { name: "Resolução de conflitos", level: 3 },
    { name: "Organização de estoque", level: 4 },
    { name: "Precificação de produtos", level: 3 },
    { name: "Proatividade", level: 4 },
  ],
  objective:
    "Atuar na área de comércio e atacarejo, contribuindo com agilidade no atendimento, organização do estoque e bom relacionamento com os clientes. Disponível para início imediato, inclusive em escalas de fim de semana e feriados, com histórico de assiduidade e proatividade no dia a dia da loja.",
  education: [
    {
      course: "Ensino Médio Completo",
      period: "2016 - 2018",
      institution: "Escola Estadual Exemplo",
      description:
        "Formação geral, com participação em curso de atendimento ao público oferecido pela escola.",
    },
    {
      course: "Curso de Operador de Caixa e Atendimento ao Cliente",
      period: "2019",
      institution: "SENAC",
      description:
        "Capacitação em técnicas de atendimento, operação de sistemas de PDV e resolução de conflitos com clientes.",
    },
  ],
  experience: [
    {
      role: "Repositor de Mercadorias",
      period: "Fev 2023 - Atual",
      company: "Atacarejo Exemplo Ltda.",
      location: "Guarulhos, SP",
      responsibilities: [
        "Reposição e organização de produtos nas gôndolas, seguindo padrão de exposição da loja.",
        "Conferência de validade e controle de estoque no setor de secos e bebidas.",
        "Atendimento e orientação aos clientes sobre localização e disponibilidade de produtos.",
        "Apoio na conferência de mercadorias recebidas do centro de distribuição.",
        "Organização do estoque de reserva, otimizando espaço e facilitando reposição futura.",
      ],
    },
    {
      role: "Operador de Caixa",
      period: "Jan 2021 - Jan 2023",
      company: "Mercado Exemplo",
      location: "Guarulhos, SP",
      responsibilities: [
        "Operação de caixa registradora, com conferência de valores e troco.",
        "Atendimento ágil e cordial durante picos de movimento, mantendo fila organizada.",
        "Abertura e fechamento de caixa, com prestação de contas ao supervisor.",
        "Apoio em promoções e trocas de mercadoria no balcão de atendimento.",
      ],
    },
    {
      role: "Auxiliar de Loja",
      period: "Mar 2019 - Dez 2020",
      company: "Comércio Exemplo",
      location: "São Paulo, SP",
      responsibilities: [
        "Organização geral da loja, limpeza e reposição de pequenos volumes.",
        "Apoio à equipe de vendas em datas de maior movimento.",
        "Controle de etiquetas de preço e comunicação de divergências ao setor responsável.",
      ],
    },
  ],
};

const PROFILE_LANCHONETE = {
  templateId: "popular",
  personal: {
    name: "Juliana Ferreira",
    role: "Atendente de Lanchonete",
    fullName: "Juliana Ferreira dos Santos",
    imageSrc:
      "https://res.cloudinary.com/wjmwysai/image/upload/v1784205084/ana_beatriz_bg7ddq.png",
  },
  contact: {
    email: "juliana.ferreira@exemplo.com",
    phone: "(21) 9 8123-4567",
    address: "Rua das Acácias, 210, Rio de Janeiro - RJ",
    links: [],
  },
  labels: {
    personalData: "Dados pessoais",
    skills: "Competências",
    objective: "Objetivo",
    education: "Formação",
    experience: "Experiência",
  },
  skills: [
    { name: "Atendimento ao público", level: 5 },
    { name: "Preparo de alimentos", level: 4 },
    { name: "Higiene e segurança alimentar", level: 5 },
    { name: "Operação de caixa", level: 4 },
    { name: "Trabalho sob pressão", level: 4 },
    { name: "Organização de ambiente", level: 4 },
    { name: "Montagem de pedidos", level: 5 },
    { name: "Controle de estoque de insumos", level: 3 },
    { name: "Trabalho em equipe", level: 5 },
    { name: "Agilidade no atendimento", level: 4 },
    { name: "Boas práticas de manipulação", level: 4 },
    { name: "Organização de comandas", level: 4 },
    { name: "Comunicação", level: 4 },
  ],
  objective:
    "Atuar na área de alimentação, com foco em atendimento rápido e cordial, boas práticas de higiene e trabalho em equipe. Disponibilidade para atuar em turnos, incluindo finais de semana e feriados, com experiência tanto no salão quanto no apoio à cozinha.",
  education: [
    {
      course: "Ensino Médio Completo",
      period: "2017 - 2019",
      institution: "Escola Estadual Exemplo",
      description: "Formação geral em ensino médio regular.",
    },
    {
      course: "Curso de Boas Práticas de Manipulação de Alimentos",
      period: "2021",
      institution: "SENAI",
      description:
        "Capacitação em higiene alimentar, armazenamento correto de insumos e normas da vigilância sanitária.",
    },
  ],
  experience: [
    {
      role: "Atendente de Balcão",
      period: "Mar 2022 - Atual",
      company: "Lanchonete Exemplo",
      location: "Rio de Janeiro, RJ",
      responsibilities: [
        "Atendimento e montagem de pedidos, seguindo padrão de qualidade da casa.",
        "Operação de caixa e controle de comandas durante o turno.",
        "Limpeza e organização da área de trabalho, seguindo normas de vigilância sanitária.",
        "Apoio no preparo de lanches e bebidas em horários de pico.",
        "Recebimento e conferência de insumos, comunicando faltas à gerência.",
      ],
    },
    {
      role: "Auxiliar de Cozinha",
      period: "Jun 2021 - Fev 2022",
      company: "Restaurante Exemplo",
      location: "Rio de Janeiro, RJ",
      responsibilities: [
        "Preparo de ingredientes e pré-preparo de pratos do dia.",
        "Organização e controle de validade de insumos na geladeira e despensa.",
        "Apoio na limpeza e organização da cozinha ao final do turno.",
      ],
    },
    {
      role: "Auxiliar de Serviços Gerais",
      period: "Jan 2020 - Mai 2021",
      company: "Empresa Exemplo de Eventos",
      location: "Rio de Janeiro, RJ",
      responsibilities: [
        "Apoio na montagem e organização de espaços para eventos.",
        "Atendimento a convidados e suporte à equipe de cozinha em eventos.",
        "Controle de materiais e utensílios utilizados durante o serviço.",
      ],
    },
  ],
};

const PROFILE_ADMINISTRATIVO = {
  templateId: "direto",
  personal: {
    name: "Rafael Mendes",
    role: "Assistente Administrativo",
    fullName: "Rafael Mendes de Oliveira",
    imageSrc: "",
  },
  contact: {
    email: "rafael.mendes@exemplo.com",
    phone: "(31) 9 9876-5432",
    address: "Belo Horizonte - MG",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/exemplo-usuario",
        handle: "rafael-mendes",
        icon: "bxl-linkedin-square",
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
    { name: "Excel avançado", level: 4 },
    { name: "Gestão de documentos", level: 5 },
    { name: "Atendimento a clientes internos", level: 4 },
    { name: "Organização de agenda", level: 5 },
    { name: "Emissão de relatórios", level: 4 },
    { name: "Rotinas de departamento pessoal", level: 3 },
    { name: "Controle de contas a pagar/receber", level: 4 },
    { name: "Pacote Office", level: 5 },
    { name: "Atendimento telefônico", level: 4 },
    { name: "Organização de arquivos", level: 5 },
    { name: "Lançamento de notas fiscais", level: 3 },
    { name: "Comunicação escrita", level: 4 },
  ],
  objective:
    "Atuar na área administrativa, aplicando organização, atenção a detalhes e proatividade na rotina de escritório, com foco em apoiar a equipe, otimizar processos internos e contribuir para a fluidez das operações do setor.",
  education: [
    {
      course: "Administração de Empresas",
      period: "2020 - 2023",
      institution: "Faculdade Exemplo",
      description:
        "Ênfase em gestão de processos, rotinas administrativas e organização empresarial.",
    },
    {
      course: "Técnico em Administração",
      period: "2017 - 2019",
      institution: "Escola Técnica Exemplo",
      description:
        "Formação técnica com foco em rotinas de escritório, atendimento e organização documental.",
    },
  ],
  experience: [
    {
      role: "Auxiliar Administrativo",
      period: "Jan 2023 - Atual",
      company: "Empresa Exemplo Serviços Ltda.",
      location: "Belo Horizonte, MG",
      responsibilities: [
        "Organização de documentos, arquivos e relatórios mensais do setor.",
        "Atendimento telefônico e suporte administrativo às demais equipes.",
        "Controle de agenda e apoio na organização de reuniões e viagens.",
        "Lançamento e conferência de notas fiscais e planilhas de controle.",
      ],
    },
    {
      role: "Estagiário Administrativo",
      period: "Ago 2021 - Dez 2022",
      company: "Empresa Exemplo Comércio Ltda.",
      location: "Belo Horizonte, MG",
      responsibilities: [
        "Apoio no arquivamento e digitalização de documentos do setor financeiro.",
        "Atualização de planilhas de controle de fornecedores e contratos.",
        "Suporte na organização de eventos internos da empresa.",
      ],
    },
    {
      role: "Auxiliar de Escritório (Temporário)",
      period: "Jan 2021 - Jul 2021",
      company: "Empresa Exemplo Contábil",
      location: "Belo Horizonte, MG",
      responsibilities: [
        "Organização de documentos contábeis e apoio à equipe fiscal.",
        "Atendimento a clientes por telefone e e-mail.",
        "Apoio na conferência de guias e obrigações mensais.",
      ],
    },
  ],
};

// Todas as variações disponíveis pra sorteio
const EXAMPLE_PROFILES = [
  PROFILE_DEV,
  PROFILE_MERCADO,
  PROFILE_LANCHONETE,
  PROFILE_ADMINISTRATIVO,
];

/**
 * Sorteia um perfil de exemplo entre os nichos disponíveis, só em
 * memória - não grava nada. Útil para preencher "buracos" num merge
 * com um rascunho já salvo (ver loadDraftOrDefault).
 */
export function getRandomInitialValues() {
  const index = Math.floor(Math.random() * EXAMPLE_PROFILES.length);
  return EXAMPLE_PROFILES[index];
}

/**
 * Sorteia e IMEDIATAMENTE persiste um perfil de exemplo no localStorage,
 * antes de devolvê-lo. Diferente de só sortear em memória, isso garante
 * que, mesmo se o usuário recarregar a página um milissegundo depois de
 * abrir o editor (antes do autosave debounced do Formik disparar), o
 * próximo carregamento encontre esse mesmo perfil salvo - não sorteia
 * de novo. O sorteio só acontece de fato quando NÃO existe draft nenhum
 * ainda (ver loadDraftOrDefault, em CurriculumEditor.jsx).
 */
export function getRandomInitialValuesAndPersist(storageKey) {
  const profile = getRandomInitialValues();
  try {
    localStorage.setItem(storageKey, JSON.stringify(profile));
  } catch {
    /* localStorage indisponível - segue só em memória, sem persistir */
  }
  return profile;
}

// Mantido por compatibilidade com quem ainda importa `initialValues`
// diretamente (ex: código legado) - sempre o perfil de dev, fixo.
export const initialValues = PROFILE_DEV;

// Mapa de classe Boxicons (salva nos dados do usuário, em
// contact.links[].icon) -> nome do Icon SVG (ver utils/icons.jsx).
// Necessário porque os templates renderizam ícones via <Icon /> (SVG
// inline), mas os dados salvos ainda guardam a classe antiga do
// Boxicons (ex: "bxl-linkedin-square") - esse mapa faz a ponte entre
// os dois.
export const BOXICON_TO_SVG_NAME = {
  "bx-link-alt": "link",
  "bxl-linkedin-square": "linkedin",
  "bxl-github": "github",
  "bx-globe": "globe",
  "bx-envelope": "envelope",
  "bxl-whatsapp": "whatsapp",
  "bxl-twitter": "link",
  "bxl-facebook-square": "link",
  "bxl-instagram-alt": "link",
  "bxl-stack-overflow": "link",
  "bxl-medium-square": "link",
};