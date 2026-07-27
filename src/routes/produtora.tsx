import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { BrandX } from "@/components/BrandX";
import { produtoraQueryOptions } from "@/lib/api-produtora";
import { stripHtml } from "@/lib/api-home";
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

const fallbackTimeline = [
  { ano: "2007", mes: "Janeiro", titulo: "O início", descricao: "Nasce a Flex Studio com foco em produção musical e audiovisual." },
  { ano: "2008", mes: "Março", titulo: "Expansão musical", descricao: "Novas salas de gravação e parcerias com artistas regionais." },
  { ano: "2014", mes: "Agosto", titulo: "Era do vídeo", descricao: "Estruturamos a produtora para vídeo, publicidade e documentários." },
  { ano: "2019", mes: "Outubro", titulo: "Estúdios premium", descricao: "Inauguração de cabines tratadas para locução e audiobooks." },
  { ano: "2023", mes: "Maio", titulo: "Reconhecimento", descricao: "Projetos premiados ao lado de grandes marcas e instituições." },
  { ano: "2024", mes: "Dezembro", titulo: "Modernização", descricao: "Renovação completa da infraestrutura técnica e tratamento acústico." },
  { ano: "2025", mes: "Julho", titulo: "Nova direção", descricao: "Início de um novo ciclo com gestão renovada e visão de futuro." },
  { ano: "2026", mes: "Janeiro", titulo: "Novo ciclo", descricao: "Estrutura modernizada e experiência ainda mais profissional." },
];

const fallbackGallery = [
  { url: gStudioMixer, alt: "Sala de controle com mesa de mixagem" },
  { url: gLiveRoom, alt: "Sala de gravação ao vivo" },
  { url: gControlRoom, alt: "Engenheiro em sessão de mix" },
  { url: gDrumRoom, alt: "Sala de bateria com tratamento acústico" },
  { url: gStudioB, alt: "Estúdio B — locução e audiobooks" },
  { url: gSingerAcoustic, alt: "Cantor em sessão acústica" },
  { url: gTrioRecording, alt: "Trio em gravação ao vivo" },
  { url: gGarden, alt: "Área de convivência externa" },
  { url: gExterior, alt: "Fachada e jardim do estúdio" },
];

const fallbackNumeros = [
  { valor: "20+", descricao: "Anos de história" },
  { valor: "500+", descricao: "Projetos entregues" },
  { valor: "120", descricao: "Artistas atendidos" },
  { valor: "8", descricao: "Salas e estúdios" },
];

const fallbackDepoimentos = [
  {
    nome: "Fábio Oliveira",
    descricao: "Saxofonista · Black Bones Brass Band",
    depoimento:
      "A Flex entregou muito mais que produção: virou parceira de conceito. Equipe técnica impecável e processo criativo claro do briefing à entrega.",
  },
];

export const Route = createFileRoute("/produtora")({
  component: Produtora,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(produtoraQueryOptions);
  },
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

type TimelineItem = { ano: string; mes: string; titulo: string; descricao: string };

const TimelineSection = ({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: TimelineItem[];
}) => {
  const [active, setActive] = useState(items.length - 1);
  const isMobile = useIsMobile();
  const VISIBLE = isMobile ? 3 : 5;
  const half = Math.floor(VISIBLE / 2);

  let start = active - half;
  if (start < 0) start = 0;
  if (start + VISIBLE > items.length) start = Math.max(0, items.length - VISIBLE);
  const visible = items.slice(start, start + VISIBLE).map((item, i) => ({
    item,
    index: start + i,
  }));

  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-gradient-radial opacity-70 pointer-events-none" />
      <BrandX className="absolute -right-32 -bottom-20 w-[420px] opacity-[0.06]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" /> {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold font-display">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </div>

        <div className="relative mt-16 md:mt-24">
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

            <div className={`flex-1 grid gap-2 md:gap-4 px-12 md:px-16 ${isMobile ? "grid-cols-3" : "grid-cols-5"}`}>
              {visible.map(({ item, index }) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.ano + item.mes + index}
                    type="button"
                    onClick={() => setActive(index)}
                    className="group relative flex justify-center"
                    aria-label={`${item.mes} ${item.ano}`}
                  >
                    <span
                      className={`flex flex-col items-center justify-center rounded-full transition-smooth ${
                        isActive
                          ? "h-24 w-24 md:h-32 md:w-32 bg-gradient-brand text-primary-foreground shadow-glow"
                          : "h-16 w-16 md:h-24 md:w-24 bg-surface-elevated text-muted-foreground border border-border group-hover:border-primary/50 group-hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`font-bold font-display leading-none ${
                          isActive ? "text-2xl md:text-4xl" : "text-base md:text-2xl"
                        }`}
                      >
                        {item.ano}
                      </span>
                      <span
                        className={`mt-1 uppercase tracking-wider ${
                          isActive ? "text-[10px] md:text-xs text-primary-foreground/80" : "text-[9px] md:text-xs"
                        }`}
                      >
                        {item.mes}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setActive((p) => Math.min(items.length - 1, p + 1))}
              disabled={active === items.length - 1}
              aria-label="Próximo"
              className="absolute right-0 z-20 grid place-items-center h-10 w-10 rounded-full glass text-foreground border border-border transition-smooth hover:border-primary/60 hover:shadow-glow disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="relative mt-10 md:mt-14 flex justify-center">
            <div
              key={current.ano + current.mes}
              className="relative max-w-2xl w-full glass rounded-2xl p-6 md:p-8 shadow-card animate-fade-up"
            >
              <span
                className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 glass border-l border-t border-border"
                aria-hidden
              />
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                <span className="h-px w-6 bg-primary" />
                {current.mes} · {current.ano}
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold font-display">{current.titulo}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{stripHtml(current.descricao)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Produtora() {
  const [t, setT] = useState(0);
  const { data: payload } = useQuery(produtoraQueryOptions);
  const data = payload?.data;

  const heroImage = (typeof data?.banner_desktop === "string" && data.banner_desktop) || heroProdutora;
  const heroTitle = data?.titulo_banner || "Onde boas ideias se sentem em casa.";
  const heroSubtitle = data?.descricao_banner || "Cada canto foi pensado para que as suas ideias fiquem à vontade.";

  const sobreImage = data?.imagem || historia;
  const sobreHtml = data?.descricao_sobre || "";

  const numeros = data?.numeros?.length ? data.numeros : fallbackNumeros;

  const timeline = data?.ano_a_ano?.length ? data.ano_a_ano : fallbackTimeline;
  const tituloLinha = data?.titulo_linha || "Os marcos da Flex Studios";
  const eyebrowLinha = data?.sub_titulo_linha || "Nossa trajetória";
  const descLinha = data?.descricao_linha || "Mais de duas décadas construindo som, imagem e história ao lado de quem cria.";

  const gallery = data?.itens_galeria?.length
    ? data.itens_galeria.map((g) => ({ url: g.url, alt: g.alt || g.caption || g.title || "" }))
    : fallbackGallery;
  const galleryTitle = data?.titulo_da_galeria || "Bastidores e momentos";
  const galleryEyebrow = data?.subtitulo_da_galeria || "Galeria";
  const galleryDesc = stripHtml(
    data?.descricao_galeria || "Um recorte do nosso dia a dia: estúdios, equipamentos e artistas que passam pela Flex.",
  );

  const depoimentos = data?.item?.length ? data.item : fallbackDepoimentos;
  const currentDep = depoimentos[t % depoimentos.length];

  // Split sobre HTML into title (first heading) and paragraphs
  const sobreParts = useMemo(() => {
    if (!sobreHtml) {
      return {
        titulo: "De um pequeno estúdio a uma referência regional.",
        paragrafos: [
          "A Flex existe desde 2007. De lá para cá, muita coisa passou por esta casa: músicas, filmes, podcasts, shows, ensaios, gravações e ideias que começaram pequenas e ganharam o mundo.",
          "Ao longo dessa trajetória, tivemos a oportunidade de trabalhar ao lado de artistas, produtoras, instituições e grandes parceiros como Governo de Minas Gerais, Andrade Gutierrez, Universo Produção, Escola Livre de Cinema de Belo Horizonte e Instituto Cultural Flávio Gutierrez.",
          "Agora, a Flex vive um novo capítulo. A mesma paixão pela criação, com ainda mais estrutura, experiência e vontade de fazer acontecer.",
        ],
      };
    }
    const h1Match = sobreHtml.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i);
    const titulo = h1Match ? stripHtml(h1Match[1]) : "Nossa história";
    const paragrafos = Array.from(sobreHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
      .map((m) => stripHtml(m[1]))
      .filter((p) => p.length > 0);
    return { titulo, paragrafos };
  }, [sobreHtml]);

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        eyebrow="A produtora"
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
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
              {sobreParts.titulo}
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              {sobreParts.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card">
              <img
                src={sobreImage}
                alt="Flex Studios"
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
        <div className={`max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 gap-8 ${numeros.length >= 5 ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
          {numeros.map((s) => (
            <div key={s.descricao} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-gradient-brand font-display">{s.valor}</p>
              <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <TimelineSection
        eyebrow={eyebrowLinha}
        title={tituloLinha}
        description={descLinha}
        items={timeline}
      />

      {/* Galeria */}
      <section className="relative py-24 md:py-32 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <span className="h-px w-8 bg-primary" /> {galleryEyebrow}
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold">{galleryTitle}</h2>
            </div>
            <p className="text-muted-foreground max-w-md">{galleryDesc}</p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 [grid-auto-flow:dense]">
            {gallery.map((g, i) => (
              <figure
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border shadow-card ${spans[i % spans.length]}`}
              >
                <img
                  src={g.url}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                {g.alt && (
                  <figcaption className="absolute bottom-3 left-4 right-4 text-xs text-foreground/90 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
                    {g.alt}
                  </figcaption>
                )}
              </figure>
            ))}
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
            Não é a gente que tá <span className="text-gradient-brand">dizendo, heim.</span>
          </h2>

          <div className="mt-14 relative glass rounded-3xl p-8 md:p-14 shadow-card text-left">
            <Quote className="absolute -top-5 left-8 text-primary" size={48} />
            <p className="text-xl md:text-2xl leading-relaxed text-foreground">
              {stripHtml(currentDep.depoimento)}
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-foreground">{currentDep.nome}</p>
                <p className="text-sm text-primary">{currentDep.descricao}</p>
              </div>
              {depoimentos.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setT((p) => (p - 1 + depoimentos.length) % depoimentos.length)}
                    className="p-3 rounded-full border border-border hover:border-primary/60 transition-smooth"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setT((p) => (p + 1) % depoimentos.length)}
                    className="p-3 rounded-full border border-border hover:border-primary/60 transition-smooth"
                    aria-label="Próximo"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ContactForm dobraFormulario={payload?.dobra_formulario} />
      <Footer />
    </div>
  );
}
