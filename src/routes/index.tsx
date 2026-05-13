import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { BrandX } from "@/components/BrandX";
import heroHome from "@/assets/hero-home.jpg";
import heroProdutora from "@/assets/hero-produtora.jpg";
import heroServicos from "@/assets/hero-servicos.jpg";
import heroInfra from "@/assets/hero-infra.jpg";
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

const slides = [
  { img: heroHome, title: "Som que move pessoas", sub: "Áudio profissional com a precisão que sua marca merece." },
  { img: heroProdutora, title: "Imagem com propósito", sub: "Produção audiovisual da concepção ao corte final." },
  { img: heroServicos, title: "Tecnologia + criatividade", sub: "Mais de 20 anos transformando ideias em obras." },
  { img: heroInfra, title: "Estúdio à altura do seu projeto", sub: "Infraestrutura completa para áudio, vídeo e transmissão." },
];

const clients = [
  { name: "Escola", src: clientEscola },
  { name: "Universo", src: clientUniverso },
  { name: "Governo de Minas Gerais", src: clientGoverno },
  { name: "Andrade Gutierrez", src: clientAG },
  { name: "ICFG", src: clientICFG },
];

function Home() {
  const [i, setI] = useState(0);
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
              className="absolute inset-0 h-full w-full object-cover scale-105"
              width={1920}
              height={1080}
              loading={idx === 0 ? undefined : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </div>
        ))}

        <BrandX className="absolute -right-32 -bottom-20 w-[640px] opacity-10 animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-32">
          <div key={i} className="animate-fade-up max-w-3xl">
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

          <div className="mt-12 flex items-center gap-3">
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
          </div>
        </div>
      </section>

      {/* Clientes */}
      <section className="py-20 border-y border-border bg-surface/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground text-center">
            Clientes que confiam no nosso trabalho
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {clients.map((c) => (
              <div
                key={c.name}
                className="h-20 rounded-xl border border-border bg-background/40 flex items-center justify-center px-4 hover:border-primary/40 transition-smooth group"
              >
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-10 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-smooth"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onde estamos */}
      <section className="relative py-24 md:py-32 overflow-hidden">
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
              <p className="text-foreground font-medium">R. Monte Simplício, 1393</p>
              <p className="text-muted-foreground">Salgado Filho, Belo Horizonte — MG</p>
              <p className="text-muted-foreground">CEP 30550-160</p>
            </div>
            <a
              href="https://maps.google.com/?q=R.+Monte+Simplicio,+1393,+Belo+Horizonte"
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
              src="https://www.google.com/maps?q=R.+Monte+Simplicio,+1393,+Belo+Horizonte&output=embed"
              className="absolute inset-0 w-full h-full grayscale contrast-110"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10 rounded-2xl" />
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
