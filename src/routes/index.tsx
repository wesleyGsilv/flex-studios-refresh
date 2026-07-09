import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { BrandX } from "@/components/BrandX";
import { MotionReveal } from "@/components/MotionReveal";
import { useParallax } from "@/hooks/use-parallax";
import heroHome from "@/assets/hero-home.jpg";
import clientEscola from "@/assets/clients/escola.svg";
import clientUniverso from "@/assets/clients/universo.svg";
import clientGoverno from "@/assets/clients/governo.svg";
import clientAG from "@/assets/clients/ag.svg";
import clientICFG from "@/assets/clients/icfg.svg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Flex Studios — Estúdio de produção audiovisual e musical em BH" },
      {
        name: "description",
        content:
          "Flex Studios: produção de vídeo, áudio, web clips, EAD e transmissão ao vivo em Belo Horizonte. 20+ anos transformando ideias em obras.",
      },
      { property: "og:title", content: "Flex Studios — Produção audiovisual e musical" },
      { property: "og:description", content: "Estúdio completo em Belo Horizonte. Áudio, vídeo, EAD e transmissão." },
      { property: "og:image", content: heroHome },
      { name: "twitter:image", content: heroHome },
    ],
  }),
});

const clients = [
  { name: "Escola", src: clientEscola },
  { name: "Universo", src: clientUniverso },
  { name: "Governo de Minas Gerais", src: clientGoverno },
  { name: "Andrade Gutierrez", src: clientAG },
  { name: "ICFG", src: clientICFG },
];

function Home() {
  const [i, setI] = useState(0);
  const heroOffset = useParallax(0.18);
  const markOffset = useParallax(0.34);
  const contentOffset = useParallax(0.1);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero carrossel */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.img}
              alt=""
              className="absolute inset-0 h-[126%] w-full object-cover will-change-transform"
              style={{ transform: `translate3d(0, ${heroOffset}px, 0) scale(1.14)` }}
              width={1920}
              height={1080}
              loading={idx === 0 ? undefined : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/56 to-background/18" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(29,245,192,0.16),transparent_28%,transparent_52%,rgba(41,170,225,0.2))] mix-blend-screen" />
          </div>
        ))}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate3d(0, ${-markOffset}px, 0)` }}
        >
          <BrandX className="absolute -right-28 -bottom-16 w-[760px] opacity-16 animate-float-slow" />
        </div>

        <div className="absolute left-[7%] top-[16%] h-44 w-44 rounded-full border border-primary/30 bg-primary/18 blur-3xl animate-pulse-soft" />
        <div className="absolute right-[10%] top-[19%] h-56 w-56 rounded-full border border-secondary/30 bg-secondary/16 blur-3xl animate-pulse-soft [animation-delay:900ms]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_center,rgba(29,245,192,0.3),transparent_64%)] blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-32">
          <MotionReveal key={i} className="max-w-3xl" distance={42}>
            <div style={{ transform: `translate3d(0, ${-contentOffset}px, 0)` }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <Sparkles size={14} /> Flex Studios · BH
            </span>
            <h1 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.98]">
              {slides[i].title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {slides[i].sub}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
              >
                Conheça os serviços <ArrowRight size={16} />
              </Link>
              <Link
                to="/produtora"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 backdrop-blur px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/60 transition-smooth"
              >
                Nossa história
              </Link>
            </div>
            </div>
          </MotionReveal>

          <MotionReveal className="mt-12 flex items-center gap-3" delay={140} distance={24}>
            <button
              onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
              className="p-3 rounded-full glass hover:border-primary/50 transition-smooth"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1 rounded-full transition-smooth ${
                    idx === i ? "w-10 bg-gradient-brand" : "w-5 bg-muted"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((p) => (p + 1) % slides.length)}
              className="p-3 rounded-full glass hover:border-primary/50 transition-smooth"
              aria-label="Próximo"
            >
              <ChevronRight size={16} />
            </button>
          </MotionReveal>
        </div>
      </section>

      {/* Qual sala escolher */}
      <MotionReveal as="section" className="py-24 md:py-32" distance={30}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> Qual sala escolher?
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
              Calma que a gente <span className="text-gradient-brand">te ajuda.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              O Flex tem 3 salas diferentes, cada uma pensada para um tipo de projeto. Quer
              gravar um podcast ou produzir conteúdo? Tá precisando registrar instrumentos? Ou
              a ideia é montar uma superprodução com iluminação e cenário? Aqui tem espaço
              pra tudo.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { badge: "Sala de ensaio", title: "Sala de ensaio", desc: "Sala completa para sua banda evoluir com qualidade de estúdio." },
              { badge: "Sala de podcast", title: "Sala de podcast", desc: "Serviço completo: gravação multicâmera, áudio tratado e material pronto para publicar." },
              { badge: "Estúdio B", title: "Estúdio B", desc: "Estrutura premium para gravação, mixagem e produção em ambiente acústico de alto padrão." },
            ].map((s) => (
              <article
                key={s.title}
                className="group rounded-2xl border border-border bg-surface p-8 hover:border-primary/50 hover:-translate-y-1 transition-smooth shadow-card"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  {s.badge}
                </span>
                <h3 className="mt-3 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/planos"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
            >
              Vem ver os planos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </MotionReveal>

      {/* Clientes */}
      <MotionReveal as="section" className="py-20 border-y border-border bg-surface/40" distance={30}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground text-center">
            "Amigo é coisa pra se guardar" — do lado esquerdo do peito
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {clients.map((c) => (
              <div
                key={c.name}
                className="h-20 rounded-xl border border-border bg-white flex items-center justify-center px-4 hover:border-primary/40 transition-smooth group"
              >
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </MotionReveal>

      {/* Onde estamos */}
      <MotionReveal as="section" className="relative py-24 md:py-32 overflow-hidden" delay={120} distance={34}>
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <MapPin size={14} /> Onde estamos
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
              No coração de <span className="text-gradient-brand">Belo Horizonte</span>.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              Estúdio aberto para visitas com hora marcada. Venha conhecer a estrutura
              e conversar pessoalmente sobre o seu projeto.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <p className="text-foreground font-medium">R. Monte Simplon, 1363</p>
              <p className="text-muted-foreground">Salgado Filho, Belo Horizonte — MG</p>
              <p className="text-muted-foreground">CEP 30550-160</p>
            </div>
            <a
              href="https://maps.google.com/?q=R.+Monte+Simplon,+1363,+Belo+Horizonte"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
            >
              Veja sua rota <ArrowRight size={16} />
            </a>
          </div>
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-border shadow-card">
            <iframe
              title="Mapa Flex Studios"
              src="https://www.google.com/maps?q=R.+Monte+Simplicio,+1363,+Belo+Horizonte&output=embed"
              className="absolute inset-0 w-full h-full grayscale contrast-110"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10 rounded-2xl" />
          </div>
        </div>
      </MotionReveal>

      <ContactForm />
      <Footer />
    </div>
  );
}
