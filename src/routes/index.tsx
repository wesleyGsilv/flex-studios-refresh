import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { BrandX } from "@/components/BrandX";
import { MotionReveal } from "@/components/MotionReveal";
import { GallerySection } from "@/components/GallerySection";
import { useParallax } from "@/hooks/use-parallax";
import { homeQueryOptions, stripHtml, type HomeData } from "@/lib/api-home";
import heroHome from "@/assets/hero-home.jpg";
import clientEscola from "@/assets/clients/escola.svg";
import clientUniverso from "@/assets/clients/universo.svg";
import clientGoverno from "@/assets/clients/governo.svg";
import clientAG from "@/assets/clients/ag.svg";
import clientICFG from "@/assets/clients/icfg.svg";
import gControlRoom from "@/assets/gallery/control-room-1.jpg";
import gStudioMixer from "@/assets/gallery/studio-mixer.jpg";
import gLiveRoom from "@/assets/gallery/live-room.jpg";
import gDrumRoom from "@/assets/gallery/drum-room.jpg";
import gGarden from "@/assets/gallery/garden.jpg";
import gExterior from "@/assets/gallery/exterior.jpg";
import gStudioB from "@/assets/gallery/studio-b.jpg";
import gSingerAcoustic from "@/assets/gallery/singer-acoustic.jpg";
import gTrioRecording from "@/assets/gallery/trio-recording.jpg";

const fallbackGallery = [
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

const fallbackClients = [
  { name: "Escola", src: clientEscola },
  { name: "Universo", src: clientUniverso },
  { name: "Governo de Minas Gerais", src: clientGoverno },
  { name: "Andrade Gutierrez", src: clientAG },
  { name: "ICFG", src: clientICFG },
];

const fallbackSalas = [
  { titulo: "Sala de ensaio", descricao: "Sala completa para sua banda evoluir com qualidade de estúdio." },
  { titulo: "Sala de podcast", descricao: "Serviço completo: gravação multicâmera, áudio tratado e material pronto para publicar." },
  { titulo: "Estúdio B", descricao: "Estrutura premium para gravação, mixagem e produção em ambiente acústico de alto padrão." },
];

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(homeQueryOptions);
  },
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

function getBannerImage(data: HomeData | undefined): string {
  const banner = data?.itens_banner?.[0];
  if (!banner) return heroHome;
  const celular =
    typeof banner.imagem_celular === "string"
      ? banner.imagem_celular
      : banner.imagem_celular?.url;
  return banner.imagem_desktop || banner.imagem_tablete || celular || heroHome;
}

function Home() {
  const heroOffset = useParallax(0.18);
  const markOffset = useParallax(0.34);
  const contentOffset = useParallax(0.1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { data: payload } = useQuery(homeQueryOptions);
  const data = payload?.data;
  const dobraFormulario = payload?.dobra_formulario?.[0];


  const banner = data?.itens_banner?.[0];
  const heroImage = getBannerImage(data);
  const heroTitle = banner?.titulo ?? "O clima é de casa. A estrutura é de estúdio.";
  const heroSubtitle = banner?.subtitulo ?? "Flex Studios · BH";
  const heroDescription =
    banner?.descricao ??
    "Criamos um ambiente totalmente pensado para acolher artistas, criadores e produtores, com a qualidade técnica que grandes projetos exigem.";

  const salaEyebrow = data?.sala_subtitulo ?? "Qual sala escolher?";
  const salaTitulo = data?.sala_titulo ?? "Calma que a gente te ajuda.";
  const salaDescricao = data
    ? stripHtml(data.sala_descricao)
    : "O Flex tem 3 salas diferentes, cada uma pensada para um tipo de projeto. Quer gravar um podcast ou produzir conteúdo? Tá precisando registrar instrumentos? Ou a ideia é montar uma superprodução com iluminação e cenário? Aqui tem espaço pra tudo.";
  const salas = data?.sala?.length ? data.sala : fallbackSalas;

  const galeriaEyebrow = data?.galeirs_ubtitulo ?? "Galeria";
  const galeriaTitulo = data?.galeria_titulo ?? "Repara na bagunça.";
  const galeriaDescricao = data
    ? stripHtml(data.galeria_descricao)
    : "Tem gente ensaiando. Tem gente gravando. Tem gente tendo ideia. Dá uma volta pela casa e conheça os espaços onde a mágica acontece.";

  const gallery = useMemo(() => {
    if (data?.galeria_fotos?.length) {
      return data.galeria_fotos.map((g, i) => ({
        src: g.url,
        alt: g.legenda || fallbackGallery[i]?.alt || `Foto ${i + 1}`,
      }));
    }
    return fallbackGallery;
  }, [data]);

  const clientesTitulo =
    (data?.cliente_titulo && stripHtml(data.cliente_titulo)) ||
    '"Amigo é coisa pra se guardar" — do lado esquerdo do peito';
  const clientes = data?.clientes_itens?.length
    ? data.clientes_itens.map((c) => ({ name: c.nome, src: c.logo }))
    : fallbackClients;

  const localidadeEyebrow = data?.localidade_subtitulo ?? "Onde estamos";
  const localidadeTitulo = data?.localidade_titulo ?? "No coração de Belo Horizonte.";
  const localidadeDescricao = data
    ? stripHtml(data.localidade_descricao)
    : "Estúdio aberto para visitas com hora marcada. Venha conhecer a estrutura e conversar pessoalmente sobre o seu projeto. R. Monte Simplon, 1363 Salgado Filho, Belo Horizonte — MG CEP 30550-160";
  const rota =
    (data?.rota && data.rota.replace(/"$/g, "")) ||
    "https://maps.google.com/?q=R.+Monte+Simplon,+1363,+Belo+Horizonte";

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImg = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % gallery.length)),
    [gallery.length]
  );
  const prevImg = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [gallery.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") nextImg();
      else if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, closeLightbox, nextImg, prevImg]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-[126%] w-full object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${heroOffset}px, 0) scale(1.14)` }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/38 to-background/8" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(29,245,192,0.04),transparent_32%,transparent_58%,rgba(41,170,225,0.06))] mix-blend-screen" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate3d(0, ${-markOffset}px, 0)` }}
        >
          <BrandX className="absolute -right-28 -bottom-16 w-[760px] opacity-6 animate-float-slow" />
        </div>

        <div className="absolute left-[7%] top-[16%] h-44 w-44 rounded-full border border-primary/12 bg-primary/4 blur-3xl animate-pulse-soft" />
        <div className="absolute right-[10%] top-[19%] h-56 w-56 rounded-full border border-secondary/12 bg-secondary/4 blur-3xl animate-pulse-soft [animation-delay:900ms]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_center,rgba(29,245,192,0.08),transparent_64%)] blur-3xl" />



        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-32">
          <MotionReveal className="max-w-3xl" distance={42}>
            <div style={{ transform: `translate3d(0, ${-contentOffset}px, 0)` }}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <Sparkles size={14} /> {heroSubtitle}
              </span>
              <h1 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.98]">
                {heroTitle}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {heroDescription}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/infraestrutura"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
                >
                  DÁ UMA OLHADA NA ESTRUTURA <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Qual sala escolher */}
      <MotionReveal as="section" className="py-24 md:py-32" distance={30}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> {salaEyebrow}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
              {salaTitulo}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{salaDescricao}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {salas.map((s) => (
              <article
                key={s.titulo}
                className="group rounded-2xl border border-border bg-surface p-8 hover:border-primary/50 hover:-translate-y-1 transition-smooth shadow-card"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  {s.titulo}
                </span>
                <h3 className="mt-3 text-2xl font-bold">{s.titulo}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.descricao}</p>
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

      {/* Galeria */}
      <GallerySection
        eyebrow={galeriaEyebrow}
        title={galeriaTitulo}
        description={galeriaDescricao}
        gallery={gallery}
        onOpenLightbox={setLightbox}
      />

      {/* Clientes */}
      <MotionReveal as="section" className="py-20 border-y border-border bg-surface/40" distance={30}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground text-center">
            {clientesTitulo}
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {clientes.map((c) => (
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
              <MapPin size={14} /> {localidadeEyebrow}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
              {localidadeTitulo}
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              {localidadeDescricao}
            </p>
            <a
              href={rota}
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

      <ContactForm dobra={dobraFormulario} />
      <Footer />

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de fotos ampliada"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Fechar"
            className="absolute top-5 right-5 z-10 rounded-full border border-border bg-surface/80 p-2.5 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            aria-label="Foto anterior"
            className="absolute left-3 md:left-6 z-10 rounded-full border border-border bg-surface/80 p-3 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
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
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="max-w-[92vw] max-h-[80vh] object-contain rounded-xl shadow-glow"
            />
            <figcaption className="mt-4 text-sm text-muted-foreground text-center">
              {gallery[lightbox].alt}
              <span className="ml-2 text-xs opacity-70">
                {lightbox + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
