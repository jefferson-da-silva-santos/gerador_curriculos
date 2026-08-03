import { useEffect, useState, type FC, type ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import styles from "./App.module.css";

/** URL do editor (o app React do gerador de currículos em si). */
const APP_URL = "https://app.curriculopro.com.br";

const notyf = new Notyf({
  duration: 3500,
  position: { x: "right", y: "top" },
  dismissible: true,
});

/* ────────────────────────────────────────────────────────────────
   Tipos
   ──────────────────────────────────────────────────────────────── */
interface Template {
  id: string;
  name: string;
  description: string;
  accent: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

/* ────────────────────────────────────────────────────────────────
   Dados estáticos da página
   ──────────────────────────────────────────────────────────────── */
const TEMPLATES: Template[] = [
  { id: "sidebar", name: "Sidebar Clássico", description: "Coluna lateral com foto", accent: "#4f46e5" },
  { id: "modern", name: "Moderno", description: "Banner no topo em largura total", accent: "#0ea5e9" },
  { id: "minimal", name: "Minimalista", description: "Ideal para triagem automática (ATS)", accent: "#111827" },
  { id: "timeline", name: "Timeline", description: "Experiência em linha do tempo", accent: "#16a34a" },
  { id: "executive", name: "Executivo", description: "Cabeçalho centralizado e elegante", accent: "#a16207" },
  { id: "compact", name: "Compacto", description: "Muita informação em 1 página", accent: "#7c3aed" },
  { id: "creative", name: "Criativo", description: "Banner diagonal colorido", accent: "#db2777" },
  { id: "corporate", name: "Corporativo", description: "Visual sóbrio e tradicional", accent: "#334155" },
];

const FEATURES: Feature[] = [
  {
    icon: "bx-edit-alt",
    title: "Edição fluida, em tempo real",
    description:
      "Veja o currículo mudando enquanto você digita. Arraste competências, troque tema e fonte na hora, sem recarregar nada.",
  },
  {
    icon: "bx-palette",
    title: "8 modelos + 19 paletas de cor",
    description:
      "De ATS-friendly a criativo, com uma paleta de cores para cada um. Troque de modelo sem perder o que já preencheu.",
  },
  {
    icon: "bx-image-add",
    title: "Foto com upload direto",
    description:
      "Envie sua foto, recorte e otimize automaticamente — sem precisar hospedar imagem em outro lugar.",
  },
  {
    icon: "bxl-pix",
    title: "Pague só o que usar",
    description:
      "Sem assinatura, sem plano mensal. R$ 5 por currículo gerado, via Pix ou cartão, aprovação na hora.",
  },
  {
    icon: "bx-save",
    title: "Rascunho salvo automaticamente",
    description:
      "Seu progresso fica salvo no navegador. Feche a aba, volte semana que vem, está tudo do jeito que deixou.",
  },
  {
    icon: "bx-file-blank",
    title: "PDF pronto para enviar",
    description:
      "Exportação em alta qualidade, formatada para impressão e para upload em plataformas de vaga.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marina Costa",
    role: "Desenvolvedora Front-end Jr.",
    quote:
      "Troquei de modelo três vezes até achar o que combinava comigo, e não perdi nenhuma informação preenchida. Levou uns 10 minutos no total.",
    initials: "MC",
  },
  {
    name: "Rafael Andrade",
    role: "Analista de Suporte N2",
    quote:
      "Paguei R$5 e baixei na hora, via Pix. Muito mais rápido que abrir um editor de texto e brigar com a formatação.",
    initials: "RA",
  },
  {
    name: "Juliana Prado",
    role: "Estagiária de Marketing",
    quote:
      "Nem sabia que dava pra currículo ser bonito assim sem contratar um designer. O modelo Criativo ficou ótimo pro meu perfil.",
    initials: "JP",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Preciso criar conta para usar?",
    answer:
      "Não. Você edita o currículo direto no navegador, sem cadastro. Só paga na hora de baixar o PDF final.",
  },
  {
    question: "O currículo serve para qualquer profissão?",
    answer:
      "Sim. Os modelos nasceram pensando em desenvolvedores, mas todos os campos são livres — dá pra usar para qualquer área.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Você paga R$ 5,00 por currículo gerado, via Pix ou cartão de crédito/débito. A aprovação é confirmada na hora, e o download libera automaticamente.",
  },
  {
    question: "Posso editar depois de já ter baixado?",
    answer:
      "Sim, o rascunho continua salvo no seu navegador. Você pode voltar, ajustar e gerar um novo PDF quando quiser (cada geração é cobrada separadamente).",
  },
  {
    question: "Meus dados ficam salvos em algum servidor?",
    answer:
      "Os dados do formulário ficam salvos apenas localmente, no seu navegador (localStorage). O conteúdo só trafega para o servidor no momento de gerar o PDF.",
  },
];

/* ────────────────────────────────────────────────────────────────
   Sub-componentes
   ──────────────────────────────────────────────────────────────── */

/** Cabeçalho fixo, com efeito de vidro (glassmorphism) ao rolar. */
const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
      <div className={styles.navbarInner}>
        <a href="#topo" className={styles.brand}>
          <i className="bx bxs-file-doc" />
          CurrículoPro
        </a>
        <nav className={styles.navLinks}>
          <a href="#modelos">Modelos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#preco">Preço</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a href={APP_URL} className={styles.navCta}>
          Criar meu currículo
        </a>
      </div>
    </header>
  );
};

/** Seção principal — assimétrica, com o "mockup" do currículo flutuando. */
const Hero: FC = () => (
  <section id="topo" className={styles.hero}>
    <div className={styles.heroGlowOne} />
    <div className={styles.heroGlowTwo} />

    <div className={styles.heroContent} data-aos="fade-right">
      <span className={styles.heroBadge}>
        <i className="bx bxs-bolt" /> Pronto em minutos, sem cadastro
      </span>
      <h1 className={styles.heroTitle}>
        Seu currículo profissional, <span className={styles.heroTitleAccent}>pronto agora</span>
      </h1>
      <p className={styles.heroSubtitle}>
        8 modelos prontos, edição em tempo real e pagamento só na hora de baixar.
        Sem plano mensal, sem letrinha miúda — R$ 5 por currículo, via Pix ou cartão.
      </p>
      <div className={styles.heroActions}>
        <a href={APP_URL} className={styles.btnPrimary}>
          Começar agora <i className="bx bx-right-arrow-alt" />
        </a>
        <a href="#modelos" className={styles.btnGhost}>
          Ver modelos
        </a>
      </div>
      <div className={styles.heroTrust}>
        <i className="bx bxs-shield-alt-2" />
        Pagamento aprovado na hora, com o Pix. Sem assinatura.
      </div>
    </div>

    <div className={styles.heroVisual} data-aos="fade-left" data-aos-delay="150">
      <div className={styles.heroCard}>
        <div className={styles.heroCardHeader}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardAvatar} />
          <div className={styles.heroCardLineLg} />
          <div className={styles.heroCardLineSm} />
          <div className={styles.heroCardBar} />
          <div className={styles.heroCardBar} style={{ width: "70%" }} />
          <div className={styles.heroCardBar} style={{ width: "85%" }} />
        </div>
      </div>
      <div className={styles.heroCardFloating}>
        <i className="bx bxl-pix" />
        Pix aprovado
      </div>
    </div>
  </section>
);

/** Barra de estatísticas rápidas, quebrando o hero do restante da página. */
const StatsBar: FC = () => (
  <section className={styles.statsBar} data-aos="fade-up">
    <div className={styles.statItem}>
      <strong>8</strong>
      <span>modelos de currículo</span>
    </div>
    <div className={styles.statDivider} />
    <div className={styles.statItem}>
      <strong>19</strong>
      <span>paletas de cor</span>
    </div>
    <div className={styles.statDivider} />
    <div className={styles.statItem}>
      <strong>R$ 5</strong>
      <span>por currículo, sem assinatura</span>
    </div>
    <div className={styles.statDivider} />
    <div className={styles.statItem}>
      <strong>~5 min</strong>
      <span>tempo médio de edição</span>
    </div>
  </section>
);

/** Grade assimétrica de funcionalidades. */
const Features: FC = () => (
  <section className={styles.features}>
    <div className={styles.sectionHeading} data-aos="fade-up">
      <span className={styles.sectionKicker}>Por que o CurrículoPro</span>
      <h2>Feito para quem quer resolver rápido, sem abrir mão de ficar bonito</h2>
    </div>

    <div className={styles.featuresGrid}>
      {FEATURES.map((feature, i) => (
        <div
          key={feature.title}
          className={`${styles.featureCard} ${i === 0 ? styles.featureCardWide : ""}`}
          data-aos="fade-up"
          data-aos-delay={i * 80}
        >
          <div className={styles.featureIcon}>
            <i className={`bx ${feature.icon}`} />
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

/** Vitrine horizontal dos 8 modelos de currículo. */
const TemplatesShowcase: FC = () => (
  <section id="modelos" className={styles.templatesSection}>
    <div className={styles.sectionHeading} data-aos="fade-up">
      <span className={styles.sectionKicker}>Modelos</span>
      <h2>Escolha o modelo, troque quantas vezes quiser</h2>
      <p>Cada modelo tem seu próprio layout — mudar de um pro outro não apaga o que você já preencheu.</p>
    </div>

    <div className={styles.templatesScroller} data-aos="fade-up" data-aos-delay="100">
      {TEMPLATES.map((template) => (
        <div key={template.id} className={styles.templateCard}>
          <div
            className={styles.templateCardPreview}
            style={{ background: `linear-gradient(160deg, ${template.accent}22, ${template.accent}05)` }}
          >
            <div className={styles.templateCardBar} style={{ background: template.accent }} />
            <div className={styles.templateCardLines}>
              <span style={{ width: "80%" }} />
              <span style={{ width: "55%" }} />
              <span style={{ width: "70%" }} />
            </div>
          </div>
          <div className={styles.templateCardInfo}>
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/** Passo a passo, em layout alternado (zig-zag). */
const HowItWorks: FC = () => {
  const steps = [
    {
      icon: "bx-edit",
      title: "Preencha seus dados",
      description: "Nome, experiências, formação e competências — arrastando para reordenar do seu jeito.",
    },
    {
      icon: "bx-brush",
      title: "Escolha modelo e cor",
      description: "8 layouts e 19 paletas. Troque à vontade, o conteúdo continua o mesmo.",
    },
    {
      icon: "bxl-pix",
      title: "Pague R$ 5 e baixe",
      description: "Pix ou cartão, aprovação na hora. O PDF libera assim que o pagamento é confirmado.",
    },
  ];

  return (
    <section id="como-funciona" className={styles.howItWorks}>
      <div className={styles.sectionHeading} data-aos="fade-up">
        <span className={styles.sectionKicker}>Como funciona</span>
        <h2>Três passos, sem enrolação</h2>
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, i) => (
          <div
            key={step.title}
            className={`${styles.stepRow} ${i % 2 === 1 ? styles.stepRowReverse : ""}`}
            data-aos={i % 2 === 1 ? "fade-left" : "fade-right"}
          >
            <div className={styles.stepNumber}>0{i + 1}</div>
            <div className={styles.stepIcon}>
              <i className={`bx ${step.icon}`} />
            </div>
            <div className={styles.stepText}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/** Cartão único de preço — simples e direto, sem tabela de planos. */
const Pricing: FC = () => (
  <section id="preco" className={styles.pricing}>
    <div className={styles.pricingCard} data-aos="zoom-in">
      <span className={styles.pricingKicker}>Sem assinatura</span>
      <div className={styles.pricingValue}>
        <span className={styles.pricingCurrency}>R$</span>
        <span className={styles.pricingAmount}>5</span>
        <span className={styles.pricingSuffix}>/ currículo</span>
      </div>
      <ul className={styles.pricingList}>
        <li><i className="bx bx-check" /> Edição ilimitada antes de gerar</li>
        <li><i className="bx bx-check" /> 8 modelos + 19 paletas de cor</li>
        <li><i className="bx bx-check" /> Upload de foto incluso</li>
        <li><i className="bx bx-check" /> Pix ou cartão, aprovação na hora</li>
        <li><i className="bx bx-check" /> PDF em alta qualidade</li>
      </ul>
      <a href={APP_URL} className={styles.btnPrimary}>
        Criar meu currículo
      </a>
    </div>
  </section>
);

/** Depoimentos, em cards levemente rotacionados (quebra o padrão de grid reto). */
const Testimonials: FC = () => (
  <section className={styles.testimonials}>
    <div className={styles.sectionHeading} data-aos="fade-up">
      <span className={styles.sectionKicker}>Quem já usou</span>
      <h2>Gente que precisava de um currículo rápido — e ficou bonito também</h2>
    </div>

    <div className={styles.testimonialsGrid}>
      {TESTIMONIALS.map((t, i) => (
        <blockquote
          key={t.name}
          className={styles.testimonialCard}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <i className={`bx bxs-quote-alt-left ${styles.quoteIcon}`} />
          <p>{t.quote}</p>
          <footer>
            <span className={styles.testimonialAvatar}>{t.initials}</span>
            <div>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);

/** Item individual do acordeão de perguntas frequentes. */
const FaqAccordionItem: FC<{ item: FaqItem; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle,
}) => (
  <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
    <button className={styles.faqQuestion} onClick={onToggle} type="button" aria-expanded={isOpen}>
      {item.question}
      <i className={`bx bx-chevron-down ${styles.faqChevron}`} />
    </button>
    <div className={styles.faqAnswer}>
      <p>{item.answer}</p>
    </div>
  </div>
);

/** Seção de perguntas frequentes, em acordeão. */
const Faq: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="duvidas" className={styles.faqSection}>
      <div className={styles.sectionHeading} data-aos="fade-up">
        <span className={styles.sectionKicker}>Dúvidas frequentes</span>
        <h2>Tudo o que você precisa saber antes de começar</h2>
      </div>

      <div className={styles.faqList} data-aos="fade-up" data-aos-delay="100">
        {FAQ_ITEMS.map((item, i) => (
          <FaqAccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
          />
        ))}
      </div>
    </section>
  );
};

/** Chamada final para ação, antes do rodapé. */
const FinalCta: FC = () => (
  <section className={styles.finalCta} data-aos="zoom-in">
    <h2>Seu próximo currículo pode estar pronto em minutos</h2>
    <p>Sem cadastro, sem plano mensal. Só R$ 5 quando você realmente for baixar.</p>
    <a href={APP_URL} className={styles.btnLight}>
      Começar agora <i className="bx bx-right-arrow-alt" />
    </a>
  </section>
);

const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <span className={styles.brand}>
        <i className="bx bxs-file-doc" /> CurrículoPro
      </span>
      <p>Feito para quem precisa de um currículo bom, rápido — e sem burocracia.</p>
      <div className={styles.footerLinks}>
        <a href="#modelos">Modelos</a>
        <a href="#como-funciona">Como funciona</a>
        <a href="#preco">Preço</a>
        <a href="#duvidas">Dúvidas</a>
      </div>
    </div>
  </footer>
);

/** Wrapper simples para seções que precisam de um children tipado. */
const Section: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

/* ────────────────────────────────────────────────────────────────
   App
   ──────────────────────────────────────────────────────────────── */
const App: FC = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });

    // Feedback simples de exemplo para qualquer clique nos CTAs externos -
    // útil caso o /app ainda não esteja no ar durante testes locais.
    const handleCtaClick = () => notyf.success("Abrindo o editor de currículos...");
    const ctas = document.querySelectorAll<HTMLAnchorElement>(`a[href="${APP_URL}"]`);
    ctas.forEach((cta) => cta.addEventListener("click", handleCtaClick));
    return () => ctas.forEach((cta) => cta.removeEventListener("click", handleCtaClick));
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <Section>
        <Hero />
        <StatsBar />
        <Features />
        <TemplatesShowcase />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Faq />
        <FinalCta />
      </Section>
      <Footer />
    </div>
  );
};

export default App;
