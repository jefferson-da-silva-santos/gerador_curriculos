import { useState, useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";

const FEATURES = [
  {
    icon: "bx bx-edit-alt",
    title: "Edição em tempo real",
    text: "Veja cada alteração no seu currículo instantaneamente, direto no navegador, sem recarregar a página.",
  },
  {
    icon: "bx bx-layout",
    title: "8 modelos prontos",
    text: "De ATS-friendly a criativo: escolha o layout que combina com a vaga e troque quando quiser.",
  },
  {
    icon: "bx bx-camera",
    title: "Upload de foto",
    text: "Adicione sua foto com poucos cliques e ajuste o enquadramento direto no editor.",
  },
  {
    icon: "bx bx-credit-card",
    title: "Pagamento avulso",
    text: "Sem plano, sem mensalidade. Você paga R$ 5,00 só quando for baixar o PDF final.",
  },
  {
    icon: "bx bx-save",
    title: "Rascunho salvo",
    text: "Tudo é salvo automaticamente no seu navegador. Saia e volte quando quiser, sem perder nada.",
  },
  {
    icon: "bx bx-file-blank",
    title: "PDF de alta qualidade",
    text: "Exportação em PDF nítido, com tipografia e cores fiéis ao que você viu no editor.",
  },
];

const MODELS = [
  {
    name: "Sidebar Clássico",
    tag: "Coluna lateral com contato e skills",
    variant: "mp-sidebar",
  },
  {
    name: "Moderno",
    tag: "Blocos limpos com destaque de cor",
    variant: "mp-modern",
  },
  {
    name: "Minimalista / ATS",
    tag: "Otimizado para leitura automática",
    variant: "mp-ats",
  },
  {
    name: "Timeline",
    tag: "Experiência em linha do tempo",
    variant: "mp-timeline",
  },
  {
    name: "Executivo",
    tag: "Cabeçalho amplo e sério",
    variant: "mp-executive",
  },
  {
    name: "Compacto",
    tag: "Mais informação por página",
    variant: "mp-compact",
  },
  {
    name: "Criativo",
    tag: "Formas e cor para áreas criativas",
    variant: "mp-creative",
  },
  {
    name: "Corporativo",
    tag: "Visual tradicional e discreto",
    variant: "mp-corporate",
  },
];

const STEPS = [
  {
    icon: "bx bx-list-check",
    title: "Preencha suas informações",
    text: "Dados pessoais, experiências, formação e competências. Tudo em um formulário guiado e rápido.",
  },
  {
    icon: "bx bx-palette",
    title: "Escolha modelo e cor",
    text: "Troque entre 8 modelos e 19 paletas de cor em tempo real, até encontrar a combinação ideal.",
  },
  {
    icon: "bx bx-download",
    title: "Pague e baixe o PDF",
    text: "Pague R$ 5,00 via Pix ou cartão, com aprovação instantânea, e baixe seu currículo em PDF.",
  },
];

const TESTIMONIALS = [
  {
    initials: "RM",
    name: "Rafael Martins",
    role: "Desenvolvedor Front-end",
    text: "Terminei meu currículo em menos de 10 minutos e já mandei pra três vagas no mesmo dia. O modelo ATS foi decisivo pra passar pela triagem.",
  },
  {
    initials: "CA",
    name: "Camila Andrade",
    role: "Analista de RH",
    text: "Uso pra recomendar candidatos e pra mim mesma. Não precisar criar conta nem pagar assinatura pra usar uma vez é o diferencial.",
  },
  {
    initials: "TS",
    name: "Thiago Souza",
    role: "Designer de Produto",
    text: "O modelo Criativo deixou meu currículo com muito mais personalidade do que os templates de Word que eu usava antes.",
  },
];

const FAQS = [
  {
    q: "Preciso criar uma conta para usar?",
    a: "Não. O CurrículoPro funciona sem cadastro: você acessa o editor, monta seu currículo e paga apenas na hora de baixar o PDF.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pagamento é avulso, de R$ 5,00 por currículo gerado, via Pix ou cartão de crédito, com aprovação instantânea. Não há assinatura nem cobrança recorrente.",
  },
  {
    q: "Meus dados ficam salvos em algum servidor?",
    a: "Suas informações são salvas automaticamente apenas no seu navegador, como rascunho. Nenhum dado é armazenado em nossos servidores sem que você gere o PDF.",
  },
  {
    q: "Posso editar meu currículo depois de gerar o PDF?",
    a: "Sim. Como tudo é salvo no navegador, basta voltar ao editor para ajustar informações, trocar modelo ou cor e gerar um novo PDF quando precisar.",
  },
  {
    q: "Quantos modelos e cores estão disponíveis?",
    a: "Você tem acesso a 8 modelos de currículo (Sidebar Clássico, Moderno, Minimalista/ATS, Timeline, Executivo, Compacto, Criativo e Corporativo) e 19 paletas de cor para combinar.",
  },
  {
    q: "O CurrículoPro serve para qualquer profissão?",
    a: "Sim. Embora tenha nascido pensando em desenvolvedores e profissionais de tecnologia, os modelos e o editor funcionam bem para qualquer área.",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Criamos uma referência para a div principal
  const rootRef = useRef(null);

  useEffect(() => {
    console.log("🚀 [Effect] Listener montado.");

    const handleScroll = (e) => {
      // Se a rolagem for na div, pegamos o scrollTop dela. Se for no window, pegamos o window.scrollY
      const y =
        e.target === document
          ? window.scrollY || document.documentElement.scrollTop
          : e.target.scrollTop;

      console.log(`📜 [Scroll detectado] Posição Y atual: ${y}px`);

      const shouldBeScrolled = y > 10;
      setScrolled((prev) =>
        prev !== shouldBeScrolled ? shouldBeScrolled : prev,
      );
    };

    const currentElement = rootRef.current;

    // Adicionamos o listener na div (se ela for a que rola) ou no window caso contrário
    // Se a barra de rolagem for da página inteira, mude currentElement para window
    if (currentElement) {
      currentElement.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      console.log("🧹 [Effect] Listener removido.");
      if (currentElement) {
        currentElement.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(`🎨 [Render] Estado 'scrolled' atual: ${scrolled}`);
  }, [scrolled]);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? -1 : i);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <nav
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      >
        <div className={styles.navInner}>
          <div className={styles.logo}>
            <img
              src="logo.png"
              style={{ width: "2.3rem" }}
              className="logo-image"
            />
            CurrículoPro
          </div>
          <ul className={styles.navLinks}>
            <li>
              <a href="#modelos">Modelos</a>
            </li>
            <li>
              <a href="#como-funciona">Como funciona</a>
            </li>
            <li>
              <a href="#preco">Preço</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <div className={styles.navCta}>
            <a href="/editor" className={styles.navCtaBtn}>
              Criar meu currículo
            </a>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <i className="bx bx-menu" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <button
          className={styles.mobileClose}
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <i className="bx bx-x" />
        </button>
        <a href="#modelos" onClick={() => setMenuOpen(false)}>
          Modelos
        </a>
        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>
          Como funciona
        </a>
        <a href="#preco" onClick={() => setMenuOpen(false)}>
          Preço
        </a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>
          FAQ
        </a>
        <a
          href="/editor"
          className={styles.navCtaBtn}
          onClick={() => setMenuOpen(false)}
        >
          Criar meu currículo
        </a>
      </div>

      <header className={styles.hero}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>
            <i className="bx bx-check-shield" />
            Sem cadastro. Sem assinatura.
          </span>
          <h1 className={styles.heroTitle}>
            Seu currículo profissional em minutos,{" "}
            <span className={styles.gradText}>pronto para PDF.</span>
          </h1>
          <p className={styles.heroSub}>
            Escolha entre 8 modelos e 19 paletas de cor, edite em tempo real no
            navegador e baixe em PDF pagando só R$ 5,00 — sem plano, sem
            cadastro, sem burocracia.
          </p>
          <div className={styles.heroActions}>
            <a href="/editor" className={styles.btnPrimary}>
              Criar meu currículo agora <i className="bx bx-right-arrow-alt" />
            </a>
            <a href="#modelos" className={styles.btnSecondary}>
              Ver modelos
            </a>
          </div>
          <div className={styles.heroTrust}>
            <i className="bx bx-check-circle" />
            Pronto em cerca de 5 minutos, do zero ao PDF baixado.
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.pdfChip}>
            <i className="bx bxs-file-pdf" />
            PDF pronto
          </div>
          <div className={styles.paletteChip}>
            <div className={styles.paletteDots}>
              <div
                className={styles.paletteDot}
                style={{ background: "#4f46e5" }}
              />
              <div
                className={styles.paletteDot}
                style={{ background: "#7c3aed" }}
              />
              <div
                className={styles.paletteDot}
                style={{ background: "#0ea5e9" }}
              />
              <div
                className={styles.paletteDot}
                style={{ background: "#f59e0b" }}
              />
            </div>
            <span>19 paletas</span>
          </div>
          <div className={styles.resumeCardWrap}>
            <div className={styles.resumeCard}>
              <div className={styles.resumeCardHeader}>
                <div className={styles.resumeAvatar}>AB</div>
                <div className={styles.resumeHeaderText}>
                  <div className={styles.resumeName}>Ana Beatriz Costa</div>
                  <div className={styles.resumeRole}>
                    Desenvolvedora Front-end
                  </div>
                  <div className={styles.resumeContact}>
                    <i className="bx bx-map" />
                    <span>São Paulo, SP</span>
                    <span>
                      <i className="bx bx-envelope" /> ana@email.com
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.resumeBody}>
                <div className={styles.resumeSidebar}>
                  <div>
                    <div className={styles.resumeSideTitle}>Competências</div>
                    <div className={styles.skillTags}>
                      {["React", "TypeScript", "Node.js", "UI/UX"].map(
                        (t, i) => (
                          <span
                            className={styles.skillTag}
                            key={t}
                            style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                          >
                            {t}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={styles.resumeSideTitle}>Idiomas</div>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillBarFill}
                        style={{ "--w": "92%", animationDelay: "0.5s" }}
                      />
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillBarFill}
                        style={{ "--w": "68%", animationDelay: "0.7s" }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.resumeMain}>
                  <div className={styles.resumeSideTitle}>Experiência</div>
                  {[0, 1, 2].map((i) => (
                    <div
                      className={styles.expItem}
                      key={i}
                      style={{ animationDelay: `${0.5 + i * 0.18}s` }}
                    >
                      <div className={styles.expDot} />
                      <div className={styles.expText}>
                        <div className={styles.expTitle} />
                        <div
                          className={styles.expLine}
                          style={{ width: "86%" }}
                        />
                        <div
                          className={styles.expLine}
                          style={{ width: "58%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.resumeBadge}>
                <i className="bx bxs-badge-check" />
                <div className={styles.resumeBadgeText}>
                  <strong>Modelo Moderno</strong>
                  <span>Paleta Índigo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statNum}>8</div>
          <div className={styles.statLabel}>modelos de currículo</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>19</div>
          <div className={styles.statLabel}>paletas de cor</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>R$5</div>
          <div className={styles.statLabel}>por currículo gerado</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>~5 min</div>
          <div className={styles.statLabel}>do zero ao PDF</div>
        </div>
      </div>

      <section className={styles.section} id="funcionalidades">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            Tudo que você precisa, num editor só
          </h2>
          <p className={styles.sectionSub}>
            Sem instalar nada, sem aprender uma ferramenta nova. Só preencher e
            ver o resultado.
          </p>
        </div>
        <div className={styles.featGrid}>
          {FEATURES.map((f, i) => (
            <div className={styles.featCard} key={f.title}>
              <span className={styles.featIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.featIcon}>
                <i className={f.icon} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="modelos">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>8 modelos para qualquer vaga</h2>
          <p className={styles.sectionSub}>
            De currículos otimizados para triagem automática a modelos criativos
            para áreas visuais.
          </p>
        </div>
        <div className={styles.modelsCarousel}>
          <div className={styles.modelsTrack}>
            {[...MODELS, ...MODELS].map((m, i) => (
              <div className={styles.modelCard} key={`${m.name}-${i}`}>
                <div className={`${styles.modelPreview} ${styles[m.variant]}`}>
                  <ModelMockup variant={m.variant} styles={styles} />
                </div>
                <div className={styles.modelName}>{m.name}</div>
                <div className={styles.modelTag}>{m.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="como-funciona">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Como funciona</h2>
          <p className={styles.sectionSub}>
            Três passos entre você e um currículo pronto para enviar.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {STEPS.map((s, i) => (
            <div className={styles.stepCard} key={s.title}>
              <div className={styles.stepCircle}>
                <i className={s.icon} />
                <span className={styles.stepNum}>{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="preco">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            Um preço simples, sem letras miúdas
          </h2>
          <p className={styles.sectionSub}>
            Pague apenas quando estiver satisfeito com o resultado.
          </p>
        </div>
        <div className={styles.pricingWrap}>
          <div className={styles.priceCard}>
            <span className={styles.priceBadge}>Sem assinatura</span>
            <div className={styles.priceValue}>
              R$ 5<span>,00</span>
            </div>
            <div className={styles.priceUnit}>por currículo gerado em PDF</div>
            <ul className={styles.priceList}>
              <li>
                <i className="bx bx-check-circle" />8 modelos e 19 paletas de
                cor
              </li>
              <li>
                <i className="bx bx-check-circle" />
                Edição ilimitada antes de pagar
              </li>
              <li>
                <i className="bx bx-check-circle" />
                Pagamento via Pix ou cartão
              </li>
              <li>
                <i className="bx bx-check-circle" />
                PDF em alta qualidade, sem marca d'água
              </li>
              <li>
                <i className="bx bx-check-circle" />
                Rascunho salvo automaticamente
              </li>
            </ul>
            <a href="/editor" className={styles.btnPrimary}>
              Criar meu currículo agora <i className="bx bx-right-arrow-alt" />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section} id="depoimentos">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Quem já usou, recomenda</h2>
          <p className={styles.sectionSub}>
            Profissionais de diferentes áreas já criaram seus currículos com o
            CurrículoPro.
          </p>
        </div>
        <div className={styles.testCarousel}>
          <div className={styles.testTrack}>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div className={styles.testCard} key={`${t.name}-${i}`}>
                <div className={styles.testStars}>
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                  <i className="bx bxs-star" />
                </div>
                <p>"{t.text}"</p>
                <div className={styles.testAuthor}>
                  <div className={styles.testAvatar}>{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="faq">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Perguntas frequentes</h2>
          <p className={styles.sectionSub}>
            Não achou sua dúvida aqui? Fale com a gente pelo suporte.
          </p>
        </div>
        <div className={styles.faqList}>
          {FAQS.map((f, i) => (
            <div className={styles.faqItem} key={f.q}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(i)}
                aria-expanded={openFaq === i}
              >
                {f.q}
                <i
                  className={`bx bx-plus ${openFaq === i ? styles.faqIconOpen : ""}`}
                />
              </button>
              <div
                className={`${styles.faqAnswer} ${openFaq === i ? styles.faqAnswerOpen : ""}`}
              >
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.finalCta}>
          <h2>Seu currículo pronto ainda hoje</h2>
          <p>
            Sem cadastro, sem assinatura. Monte agora e pague só quando for
            baixar o PDF.
          </p>
          <a href="/editor" className={styles.btnPrimary}>
            Criar meu currículo agora <i className="bx bx-right-arrow-alt" />
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <img
                src="logo.png"
                style={{ width: "2.3rem" }}
                className="logo-image"
              />
              CurrículoPro
            </div>
            <p>
              Gerador de currículos online com modelos prontos, edição em tempo
              real e pagamento avulso de R$ 5,00 por PDF.
            </p>
          </div>
          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <h4>Produto</h4>
              <a href="#modelos">Modelos</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#preco">Preço</a>
            </div>
            <div className={styles.footerCol}>
              <h4>Suporte</h4>
              <a href="#faq">FAQ</a>
              <a href="mailto:suporte@curriculopro.com.br">Contato</a>
            </div>
            <div className={styles.footerCol}>
              <h4>Legal</h4>
              <a href="/privacidade">Privacidade</a>
              <a href="/termos">Termos de uso</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>
            © {new Date().getFullYear()} CurrículoPro. Todos os direitos
            reservados.
          </span>
          <div className={styles.footerSocial}>
            <a href="#" aria-label="Instagram">
              <i className="bx bxl-instagram" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="bx bxl-linkedin" />
            </a>
            <a href="#" aria-label="Twitter">
              <i className="bx bxl-twitter" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ModelMockup({ variant, styles }) {
  switch (variant) {
    case "mp-sidebar":
      return (
        <>
          <div
            className={`${styles.mpSide} ${styles.mpFillA}`}
            style={{ width: "34%" }}
          />
          <div className={styles.mpMain}>
            <div
              className={styles.mpLine}
              style={{
                height: 10,
                width: "80%",
                background: "#d8d4ef",
                borderRadius: 4,
              }}
            />
            <div
              className={styles.mpLine}
              style={{
                height: 6,
                width: "95%",
                background: "#e4e0f7",
                borderRadius: 4,
              }}
            />
            <div
              className={styles.mpLine}
              style={{
                height: 6,
                width: "90%",
                background: "#e4e0f7",
                borderRadius: 4,
              }}
            />
            <div
              className={styles.mpLine}
              style={{
                height: 6,
                width: "75%",
                background: "#e4e0f7",
                borderRadius: 4,
              }}
            />
          </div>
        </>
      );
    case "mp-modern":
      return (
        <>
          <div className={`${styles.mpBlock} ${styles.mpFillA}`} />
          <div className={`${styles.mpBlock} ${styles.mpFillLight}`} />
          <div className={`${styles.mpBlock} ${styles.mpFillLight}`} />
        </>
      );
    case "mp-ats":
      return (
        <>
          {[90, 100, 85, 95, 70, 88].map((w, i) => (
            <div className={styles.mpLine} key={i} style={{ width: `${w}%` }} />
          ))}
        </>
      );
    case "mp-timeline":
      return (
        <>
          {[1, 2, 3, 4].map((i) => (
            <div className={styles.mpRow} key={i}>
              <div className={styles.mpDot} />
              <div
                style={{
                  height: 8,
                  flex: 1,
                  background: "#e4e0f7",
                  borderRadius: 4,
                }}
              />
            </div>
          ))}
        </>
      );
    case "mp-executive":
      return (
        <>
          <div className={`${styles.mpTop} ${styles.mpFillA}`} />
          {[95, 80, 88].map((w, i) => (
            <div
              key={i}
              style={{
                height: 8,
                width: `${w}%`,
                background: "#e4e0f7",
                borderRadius: 4,
                marginTop: 10,
              }}
            />
          ))}
        </>
      );
    case "mp-compact":
      return (
        <>
          {[100, 90, 96, 82, 92, 76, 88, 70].map((w, i) => (
            <div
              key={i}
              style={{
                height: 5,
                width: `${w}%`,
                background: i % 2 === 0 ? "#c7c1ee" : "#e4e0f7",
                borderRadius: 3,
              }}
            />
          ))}
        </>
      );
    case "mp-creative":
      return (
        <>
          <div className={`${styles.mpSide} ${styles.mpFillB}`} />
          <div className={styles.mpMain}>
            <div
              style={{
                height: 10,
                width: "70%",
                background: "#7c3aed",
                opacity: 0.3,
                borderRadius: 4,
              }}
            />
            <div
              style={{
                height: 6,
                width: "85%",
                background: "#e4e0f7",
                borderRadius: 4,
                marginTop: 8,
              }}
            />
            <div
              style={{
                height: 6,
                width: "65%",
                background: "#e4e0f7",
                borderRadius: 4,
                marginTop: 6,
              }}
            />
          </div>
        </>
      );
    case "mp-corporate":
    default:
      return (
        <>
          <div
            className={`${styles.mpTop} ${styles.mpFillLight}`}
            style={{ background: "#1e1b2e" }}
          />
          {[92, 82, 90, 76].map((w, i) => (
            <div
              key={i}
              style={{
                height: 7,
                width: `${w}%`,
                background: "#e4e0f7",
                borderRadius: 4,
                marginTop: 8,
              }}
            />
          ))}
        </>
      );
  }
}
