import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { BrandX } from "@/components/BrandX";
import heroProdutora from "@/assets/hero-produtora.jpg";
import historia from "@/assets/historia.jpg";
import gControlRoom from "@/assets/gallery/control-room-1.jpg";
import gStudioMixer from "@/assets/gallery/studio-mixer.jpg";
import gLiveRoom from "@/assets/gallery/live-room.jpg";
import gDrumRoom from "@/assets/gallery/drum-room.jpg";
import gGarden from "@/assets/gallery/garden.jpg";
import gExterior from "@/assets/gallery/exterior.jpg";
import gStudioB from "@/assets/gallery/studio-b.jpg";
import gSingerAcoustic from "@/assets/gallery/singer-acoustic.jpg";
import gTrioRecording from "@/assets/gallery/trio-recording.jpg";

const timeline = [
  { year: "2007", month: "Janeiro", title: "O início", text: "Nasce a Flex Studio com foco em produção musical e audiovisual." },
  { year: "2008", month: "Março", title: "Expansão musical", text: "Novas salas de gravação e parcerias com artistas regionais." },
  { year: "2014", month: "Agosto", title: "Era do vídeo", text: "Estruturamos a produtora para vídeo, publicidade e documentários." },
  { year: "2019", month: "Outubro", title: "Estúdios premium", text: "Inauguração de cabines tratadas para locução e audiobooks." },
  { year: "2023", month: "Maio", title: "Reconhecimento", text: "Projetos premiados ao lado de grandes marcas e instituições." },
  { year: "2024", month: "Dezembro", title: "Modernização", text: "Renovação completa da infraestrutura técnica e tratamento acústico." },
  { year: "2025", month: "Julho", title: "Nova direção", text: "Início de um novo ciclo com gestão renovada e visão de futuro." },
  { year: "2026", month: "Janeiro", title: "Novo ciclo", text: "Estrutura modernizada e experiência ainda mais profissional." },
];

const gallery = [
  { src: gStudioMixer, alt: "Sala de controle com mesa de mixagem" },
  { src: gLiveRoom, alt: "Sala de gravação ao vivo" },
  { src: gControlRoom, alt: "Engenheiro em sessão de mix" },
  { src: gDrumRoom, alt: "Sala de bateria com tratamento acústico" },
  { src: gStudioB, alt: "Estúdio B — locução e audiobooks" },
  { src: gSingerAcoustic, alt: "Cantor em sessão acústica" },
  { src: gTrioRecording, alt: "Trio em gravação ao vivo" },
  { src: gGarden, alt: "Área de convivência externa" },
  { src: gExterior, alt: "Fachada e jardim do estúdio" },
];

export const Route = createFileRoute("/produtora")({
  component: Produtora,
  head: () => ({
    meta: [
      { title: "A produtora — Flex Studios" },
      {
        name: "description",
        content:
          "Conheça a história da Flex Studios: mais de 20 anos produzindo áudio, vídeo e conteúdo audiovisual em Belo Horizonte.",
      },
      { property: "og:title", content: "A produtora — Flex Studios" },
      { property: "og:image", content: heroProdutora },
    ],
  }),
});

const testimonials = [
  {
    name: "Fulano de Tal",
    role: "Gerente · Empresa X",
    text:
      "A Flex entregou muito mais que produção: virou parceira de conceito. Equipe técnica impecável e processo criativo claro do briefing à entrega.",
  },
  {
    name: "Mariana Souza",
    role: "Diretora de Marketing · Marca Y",
    text:
      "Estrutura de primeira e atendimento humano. Conseguimos rodar três campanhas em paralelo no mesmo trimestre, com qualidade consistente.",
  },
  {
    name: "Rafael Lima",
    role: "Produtor Musical · Selo Z",
    text:
      "O estúdio é referência em BH. Acústica tratada, equipamentos top de linha e gente que entende de música — não só de gravação.",
  },
];

const TimelineSection = () => {
  const [active, setActive] = useState(timeline.length - 1);
  const isMobile = useIsMobile();
  const VISIBLE = isMobile ? 3 : 5;
  const half = Math.floor(VISIBLE / 2);

  let start = active - half;
  if (start < 0) start = 0;
  if (start + VISIBLE > timeline.length) start = Math.max(0, timeline.length - VISIBLE);
  const visible = timeline.slice(start, start + VISIBLE).map((item, i) => ({
    item,
    index: start + i,
  }));

  const current = timeline[active];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-gradient-radial opacity-70 pointer-events-none" />
      <BrandX className="absolute -right-32 -bottom-20 w-[420px] opacity-[0.06]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> Nossa trajetória
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold font-display">
            Os marcos da <span className="text-gradient-brand">Flex Studios</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mais de duas décadas construindo som, imagem e história ao lado de quem cria.
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative mt-16 md:mt-24">
          {/* trilha */}
          <div className="absolute left-10 right-10 md:left-14 md:right-14 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setActive((p) => Math.max(0, p - 1))}
              disabled={active === 0}
              aria-label="Anterior"
              className="absolute left-0 z-20 grid place-items-center h-10 w-10 rounded-full glass text-foreground border border-border transition-smooth hover:border-primary/60 hover:shadow-glow disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex-1 grid grid-cols-5 gap-2 md:gap-4 px-12 md:px-16">
              {visible.map(({ item, index }) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.year + item.month}
                    type="button"
                    onClick={() => setActive(index)}
                    className="group relative flex justify-center"
                    aria-label={`${item.month} ${item.year}`}
                  >
                    <span
                      className={`flex flex-col items-center justify-center rounded-full transition-smooth ${
                        isActive
                          ? "h-28 w-28 md:h-32 md:w-32 bg-gradient-brand text-primary-foreground shadow-glow"
                          : "h-20 w-20 md:h-24 md:w-24 bg-surface-elevated text-muted-foreground border border-border group-hover:border-primary/50 group-hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`font-bold font-display leading-none ${
                          isActive ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                        }`}
                      >
                        {item.year}
                      </span>
                      <span
                        className={`mt-1 text-[11px] md:text-xs uppercase tracking-wider ${
                          isActive ? "text-primary-foreground/80" : ""
                        }`}
                      >
                        {item.month}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setActive((p) => Math.min(timeline.length - 1, p + 1))}
              disabled={active === timeline.length - 1}
              aria-label="Próximo"
              className="absolute right-0 z-20 grid place-items-center h-10 w-10 rounded-full glass text-foreground border border-border transition-smooth hover:border-primary/60 hover:shadow-glow disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Callout */}
          <div className="relative mt-10 md:mt-14 flex justify-center">
            <div
              key={current.year + current.month}
              className="relative max-w-2xl w-full glass rounded-2xl p-6 md:p-8 shadow-card animate-fade-up"
            >
              <span
                className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 glass border-l border-t border-border"
                aria-hidden
              />
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                <span className="h-px w-6 bg-primary" />
                {current.month} · {current.year}
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold font-display">{current.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{current.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Produtora() {
  const [t, setT] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        eyebrow="A produtora"
        title={<>Tecnologia, criatividade e <span className="text-gradient-brand">talento.</span></>}
        subtitle="Há mais de duas décadas transformando ideias em obras audiovisuais e musicais."
        image={heroProdutora}
      />

      {/* História */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <BrandX className="absolute -left-32 top-32 w-[420px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid gap-14 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> Conheça nossa história
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
              De um <span className="text-gradient-brand">pequeno estúdio</span><br />
              a uma referência regional.
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Fundada em 2007, a Flex Studio nasceu com a proposta de oferecer soluções
                profissionais em audiovisual, música e produção artística, tornando-se ao
                longo dos anos um espaço reconhecido pela qualidade, criatividade e dedicação
                em cada projeto realizado.
              </p>
              <p>
                Durante nossa trajetória, tivemos a oportunidade de receber diversos artistas
                e participar de importantes produções ao lado de grandes clientes e instituições,
                como o Governo de Minas Gerais, Andrade Gutierrez, Universo Produção, Escola
                Livre de Cinema de Belo Horizonte e Instituto Cultural Flávio Gutierrez.
              </p>
              <p>
                Em 2026, a Flex Studio entra em um novo ciclo, marcado por excelência e
                mestria, mantendo nossa essência através de uma renovação na direção e visão
                de futuro. Essa nova fase chega com fôlego renovado, estrutura modernizada e
                experiência cada vez mais profissional para artistas, bandas, produtores e criadores.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card">
              <img
                src={historia}
                alt="Estúdio Flex em seus primeiros anos"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1280}
                height={896}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-6 py-5 shadow-card">
              <p className="text-3xl font-bold text-gradient-brand font-display">2007</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                Início da nossa jornada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-surface/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "20+", l: "Anos de história" },
            { n: "500+", l: "Projetos entregues" },
            { n: "120", l: "Artistas atendidos" },
            { n: "8", l: "Salas e estúdios" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-gradient-brand font-display">{s.n}</p>
              <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Linha do tempo */}
      <TimelineSection />

      {/* Galeria */}
      <section className="relative py-24 md:py-32 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-8 bg-primary" /> Galeria
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                Bastidores e <span className="text-gradient-brand">momentos</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Um recorte do nosso dia a dia: estúdios, equipamentos e artistas que passam pela Flex.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 [grid-auto-flow:dense]">
            {gallery.map((g, i) => {
              const spans = [
                "col-span-2 row-span-2 aspect-square",
                "aspect-square",
                "aspect-square",
                "col-span-2 aspect-[2/1]",
                "aspect-square",
                "aspect-square",
                "aspect-square",
                "aspect-square",
                "col-span-2 aspect-[2/1]",
              ];
              return (
                <figure
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl border border-border shadow-card ${spans[i]}`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <figcaption className="absolute bottom-3 left-4 right-4 text-xs text-foreground/90 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
                    {g.alt}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> Depoimentos
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            O que dizem <span className="text-gradient-brand">nossos clientes</span>
          </h2>

          <div className="mt-14 relative glass rounded-3xl p-8 md:p-14 shadow-card text-left">
            <Quote className="absolute -top-5 left-8 text-primary" size={48} />
            <p className="text-xl md:text-2xl leading-relaxed text-foreground">
              "{testimonials[t].text}"
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-foreground">{testimonials[t].name}</p>
                <p className="text-sm text-primary">{testimonials[t].role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setT((p) => (p - 1 + testimonials.length) % testimonials.length)}
                  className="p-3 rounded-full border border-border hover:border-primary/60 transition-smooth"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setT((p) => (p + 1) % testimonials.length)}
                  className="p-3 rounded-full border border-border hover:border-primary/60 transition-smooth"
                  aria-label="Próximo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}


