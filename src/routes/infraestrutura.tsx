import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Music2,
  Lightbulb,
  Cpu,
  Camera,
  Mic2,
  Snowflake,
  BookAudio,
  Video,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { stripHtml, type HomeBannerItem } from "@/lib/api-home";
import {
  infraestruturaQueryOptions,
  type InfraCategoria,
} from "@/lib/api-infra";

const fallbackCategories: InfraCategoria[] = [
  {
    titulo: "Instrumentos musicais",
    equipamentos: [
      { equipamento: "Computador" },
      { equipamento: "DAW" },
      { equipamento: "Interface de áudio" },
      { equipamento: "Microfones" },
      { equipamento: "Fones de ouvido" },
      { equipamento: "Monitores de estúdio" },
      { equipamento: "Cabos" },
      { equipamento: "Pedestais de microfone" },
      { equipamento: "Pop filter" },
    ],
  },
  {
    titulo: "Equipamentos de luz",
    equipamentos: [
      { equipamento: "Painéis LED RGB" },
      { equipamento: "Refletores Fresnel" },
      { equipamento: "Softboxes" },
      { equipamento: "Spots de palco" },
      { equipamento: "Mesa DMX" },
      { equipamento: "Hazer e máquinas de fumaça" },
    ],
  },
  {
    titulo: "Hardwares",
    equipamentos: [
      { equipamento: "Workstations Mac/PC" },
      { equipamento: "SSDs NVMe de alta performance" },
      { equipamento: "Switchers de vídeo" },
      { equipamento: "Mesas de mixagem digitais" },
      { equipamento: "Conversores AD/DA" },
    ],
  },
  {
    titulo: "Câmeras",
    equipamentos: [
      { equipamento: "Sony FX6" },
      { equipamento: "Sony FX3" },
      { equipamento: "Canon C70" },
      { equipamento: "Lentes Cine Sigma" },
      { equipamento: "Estabilizadores Ronin" },
      { equipamento: "Tripés Sachtler" },
    ],
  },
  {
    titulo: "Podcast",
    equipamentos: [
      { equipamento: "Cabine acústica" },
      { equipamento: "Microfones Shure SM7B" },
      { equipamento: "Mesa Rodecaster Pro II" },
      { equipamento: "4 câmeras 4K" },
      { equipamento: "Iluminação dedicada" },
    ],
  },
  {
    titulo: "Estúdio B — Audiobooks & locuções",
    equipamentos: [
      { equipamento: "Excelente tratamento acústico" },
      { equipamento: "Ideal para audiobooks" },
      { equipamento: "Perfeito para locuções e narrações" },
      { equipamento: "Cabine isolada com baixíssimo ruído" },
      { equipamento: "Microfones de alta sensibilidade" },
    ],
  },
  {
    titulo: "Salas para videocast & video aulas",
    equipamentos: [
      { equipamento: "Sala 1 — 16 m²" },
      { equipamento: "Sala 2 — 20 m²" },
      { equipamento: "Cenografia e iluminação para vídeo" },
      { equipamento: "Estrutura para múltiplas câmeras" },
      { equipamento: "Ambiente confortável para convidados" },
    ],
  },
];

function iconForCategory(titulo: string): LucideIcon {
  const t = titulo.toLowerCase();
  if (t.includes("instrumento")) return Music2;
  if (t.includes("luz") || t.includes("ilumina")) return Lightbulb;
  if (t.includes("hardware")) return Cpu;
  if (t.includes("câmera") || t.includes("camera")) return Camera;
  if (t.includes("podcast")) return Mic2;
  if (t.includes("audiobook") || t.includes("locu")) return BookAudio;
  if (t.includes("video") || t.includes("vídeo")) return Video;
  return Sparkles;
}

function iconForDiferencial(titulo: string): LucideIcon {
  const t = titulo.toLowerCase();
  if (t.includes("ar") || t.includes("condicionado")) return Snowflake;
  if (t.includes("audiobook") || t.includes("locu")) return BookAudio;
  if (t.includes("vídeo") || t.includes("video")) return Video;
  return Sparkles;
}

function parseDiferencial(html: string): { titulo: string; descricao: string } {
  const tituloMatch = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
  const paraMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return {
    titulo: tituloMatch ? stripHtml(tituloMatch[1]) : stripHtml(html),
    descricao: paraMatch ? stripHtml(paraMatch[1]) : "",
  };
}

function getBannerImage(banner: HomeBannerItem | undefined): string {
  if (!banner) return "";
  const pick = (v: unknown): string | undefined => {
    if (!v) return undefined;
    if (typeof v === "string") return v;
    if (typeof v === "object" && "url" in (v as Record<string, unknown>)) {
      return (v as { url?: string }).url;
    }
    return undefined;
  };
  return (
    pick(banner.imagem_desktop) ||
    pick(banner.imagem_tablete) ||
    pick(banner.imagem_celular) ||
    ""
  );
}

export const Route = createFileRoute("/infraestrutura")({
  component: Infraestrutura,
  loader: ({ context }) => context.queryClient.ensureQueryData(infraestruturaQueryOptions),
  head: () => ({
    meta: [
      { title: "Infraestrutura — Flex Studios" },
      {
        name: "description",
        content:
          "Conheça a infraestrutura do Flex Studios: instrumentos musicais, equipamentos de luz, hardwares, câmeras e estúdio de podcast.",
      },
      { property: "og:title", content: "Infraestrutura — Flex Studios" },
    ],
  }),
});

function Infraestrutura() {
  const { data: payload } = useQuery(infraestruturaQueryOptions);
  const data = payload?.data;
  const dobraFormulario = payload?.dobra_formulario?.[0];

  const banner = data?.itens_banner?.[0];
  const heroImage = getBannerImage(banner);
  const heroEyebrow = banner?.subtitulo || "Infraestrutura";
  const heroTitle = banner?.titulo || "Na moral? Nossa estrutura é f*da.";
  const heroSubtitle = banner?.descricao
    ? stripHtml(banner.descricao)
    : "Desculpa o palavreado. Mas depois de ver a acústica, a iluminação, os equipamentos e a qualidade dos nossos profissionais, você vai entender.";

  const introText = data?.descricao_diferenciais
    ? stripHtml(data.descricao_diferenciais)
    : "Tem espaço para ensaiar, gravar, filmar, produzir e experimentar. Tudo isso em ambientes que combinam conforto, versatilidade e uma estrutura profissional pronta para acompanhar a sua ideia.";

  const amenities = useMemo(() => {
    const list = data?.conteudo?.length
      ? data.conteudo.map((c) => parseDiferencial(c.descricao))
      : [
          {
            titulo: "Ar-condicionado em todas as salas",
            descricao:
              "Conforto térmico garantido em todos os ambientes — gravações longas sem perder qualidade nem rendimento.",
          },
          {
            titulo: "Estúdio B para audiobooks",
            descricao:
              "Espaço menor com tratamento acústico de excelência, ideal para audiobooks, locuções e narrações.",
          },
          {
            titulo: "Duas salas para vídeo",
            descricao:
              "Uma sala de 16 m² e outra de 20 m², perfeitas para videocasts, video aulas e produções que pedem mais espaço.",
          },
        ];
    return list.map((a) => ({ ...a, icon: iconForDiferencial(a.titulo) }));
  }, [data]);

  const categories = useMemo(() => {
    const source = data?.item?.length ? data.item : fallbackCategories;
    return source.map((c) => {
      const apiItems = Array.isArray(c.equipamentos)
        ? c.equipamentos.map((e) => e.equipamento).filter(Boolean)
        : [];
      const fallback = fallbackCategories.find(
        (f) => f.titulo.toLowerCase() === c.titulo.toLowerCase()
      );
      const fallbackItems =
        fallback && Array.isArray(fallback.equipamentos)
          ? fallback.equipamentos.map((e) => e.equipamento)
          : [];
      return {
        titulo: c.titulo,
        icon: iconForCategory(c.titulo),
        items: apiItems.length ? apiItems : fallbackItems,
      };
    });
  }, [data]);

  const carouselSlides = useMemo(
    () =>
      (data?.fotos ?? []).map((f) => ({
        src: f.url,
        label: f.title ? f.title.replace(/[-_]/g, " ") : "",
      })),
    [data]
  );

  const [open, setOpen] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!carouselSlides.length) return;
    const id = setInterval(
      () => setSlide((p) => (p + 1) % carouselSlides.length),
      4000
    );
    return () => clearInterval(id);
  }, [carouselSlides.length]);

  useEffect(() => {
    setSlide(0);
  }, [carouselSlides.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
      />

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {introText}
          </p>
        </div>
      </section>

      {/* Diferenciais das salas */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {amenities.map((a) => (
              <div
                key={a.titulo}
                className="rounded-2xl border border-border bg-surface p-6 transition-smooth hover:border-primary/50 hover:shadow-glow"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow mb-4">
                  <a.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{a.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acordeão + Imagem */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
          <div className="space-y-3">
            {categories.map((c, idx) => {
              const isOpen = open === idx;
              return (
                <div
                  key={c.titulo}
                  className={`rounded-2xl border bg-surface overflow-hidden transition-smooth ${
                    isOpen ? "border-primary/50 shadow-glow" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`p-3 rounded-xl transition-smooth ${
                          isOpen
                            ? "bg-gradient-brand text-primary-foreground shadow-glow"
                            : "bg-background/60 text-primary border border-border"
                        }`}
                      >
                        <c.icon size={20} />
                      </span>
                      <span className="text-lg font-semibold">{c.titulo}</span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-muted-foreground transition-smooth ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {c.items.length ? (
                        <ul className="px-6 pb-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 text-sm text-muted-foreground">
                          {c.items.map((it) => (
                            <li key={it} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="px-6 pb-6 text-sm text-muted-foreground italic">
                          Em breve, mais detalhes sobre esta categoria.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {carouselSlides.length > 0 && (
            <div className="lg:sticky lg:top-28">
              <button
                type="button"
                onClick={() => setLightbox(slide)}
                aria-label="Ampliar foto"
                className="group relative block w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card cursor-zoom-in"
              >
                {carouselSlides.map((s, idx) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.label}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      idx === slide ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    width={1024}
                    height={1280}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  {carouselSlides[slide]?.label && (
                    <span className="text-left text-sm font-medium text-foreground capitalize">
                      {carouselSlides[slide].label}
                    </span>
                  )}
                  <div className="flex gap-1.5 pb-1 ml-auto">
                    {carouselSlides.map((_, idx) => (
                      <span
                        key={idx}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); setSlide(idx); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); setSlide(idx); } }}
                        className={`h-1 rounded-full transition-smooth ${
                          idx === slide ? "w-6 bg-gradient-brand" : "w-3 bg-muted"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </section>

      <ContactForm dobra={dobraFormulario} />
      <Footer />

      {lightbox !== null && carouselSlides[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
            className="absolute top-5 right-5 z-10 rounded-full border border-border bg-surface/80 p-2.5 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i - 1 + carouselSlides.length) % carouselSlides.length)); }}
            aria-label="Foto anterior"
            className="absolute left-3 md:left-6 z-10 rounded-full border border-border bg-surface/80 p-3 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i + 1) % carouselSlides.length)); }}
            aria-label="Próxima foto"
            className="absolute right-3 md:right-6 z-10 rounded-full border border-border bg-surface/80 p-3 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
          >
            <ChevronRight size={22} />
          </button>
          <figure
            className="relative max-w-[92vw] max-h-[86vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={carouselSlides[lightbox].src}
              alt={carouselSlides[lightbox].label}
              className="max-w-[92vw] max-h-[78vh] object-contain rounded-xl shadow-glow"
            />
            <figcaption className="mt-4 text-center">
              {carouselSlides[lightbox].label && (
                <span className="block text-sm font-medium text-foreground capitalize">
                  {carouselSlides[lightbox].label}
                </span>
              )}
              <span className="block mt-1 text-xs text-muted-foreground opacity-70">
                {lightbox + 1} / {carouselSlides.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
