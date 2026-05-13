import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Music2, Lightbulb, Cpu, Camera, Mic2, Snowflake, BookAudio, Video } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import heroInfra from "@/assets/hero-infra.jpg";
import equipmentGuitar from "@/assets/equipment-guitar.jpg";
import equipmentDrums from "@/assets/equipment-drums.jpg";
import equipmentViolao from "@/assets/equipment-violao.jpg";
import equipmentBass from "@/assets/equipment-bass.jpg";

const carouselSlides = [
  { src: equipmentDrums, label: "Bateria RMV" },
  { src: equipmentGuitar, label: "Guitarra" },
  { src: equipmentViolao, label: "Violão" },
  { src: equipmentBass, label: "Baixo" },
];

export const Route = createFileRoute("/infraestrutura")({
  component: Infraestrutura,
  head: () => ({
    meta: [
      { title: "Infraestrutura — Flex Studios" },
      {
        name: "description",
        content:
          "Conheça a infraestrutura do Flex Studios: instrumentos musicais, equipamentos de luz, hardwares, câmeras e estúdio de podcast.",
      },
      { property: "og:title", content: "Infraestrutura — Flex Studios" },
      { property: "og:image", content: heroInfra },
    ],
  }),
});

const categories = [
  {
    icon: Music2,
    title: "Instrumentos musicais",
    items: ["Computador", "DAW", "Interface de áudio", "Microfones", "Fones de ouvido", "Monitores de estúdio", "Cabos", "Pedestais de microfone", "Pop filter"],
  },
  {
    icon: Lightbulb,
    title: "Equipamentos de luz",
    items: ["Painéis LED RGB", "Refletores Fresnel", "Softboxes", "Spots de palco", "Mesa DMX", "Hazer e máquinas de fumaça"],
  },
  {
    icon: Cpu,
    title: "Hardwares",
    items: ["Workstations Mac/PC", "SSDs NVMe de alta performance", "Switchers de vídeo", "Mesas de mixagem digitais", "Conversores AD/DA"],
  },
  {
    icon: Camera,
    title: "Câmeras",
    items: ["Sony FX6", "Sony FX3", "Canon C70", "Lentes Cine Sigma", "Estabilizadores Ronin", "Tripés Sachtler"],
  },
  {
    icon: Mic2,
    title: "Podcast",
    items: ["Cabine acústica", "Microfones Shure SM7B", "Mesa Rodecaster Pro II", "4 câmeras 4K", "Iluminação dedicada"],
  },
  {
    icon: BookAudio,
    title: "Estúdio B — Audiobooks & locuções",
    items: [
      "Espaço compacto com excelente tratamento acústico",
      "Ideal para gravação de audiobooks",
      "Perfeito para locuções, narrações e dublagem",
      "Cabine isolada com baixíssimo ruído de fundo",
      "Microfones de alta sensibilidade",
    ],
  },
  {
    icon: Video,
    title: "Salas para videocast & video aulas",
    items: [
      "Sala 1 — 16 m² para formatos enxutos",
      "Sala 2 — 20 m² ideal para videocasts e video aulas",
      "Cenografia e iluminação preparadas para vídeo",
      "Estrutura para múltiplas câmeras",
      "Ambiente confortável para convidados",
    ],
  },
];

const amenities = [
  {
    icon: Snowflake,
    title: "Ar-condicionado em todas as salas",
    description:
      "Conforto térmico garantido em todos os ambientes — gravações longas sem perder qualidade nem rendimento.",
  },
  {
    icon: BookAudio,
    title: "Estúdio B para audiobooks",
    description:
      "Espaço menor com tratamento acústico de excelência, ideal para audiobooks, locuções e narrações.",
  },
  {
    icon: Video,
    title: "Duas salas para vídeo",
    description:
      "Uma sala de 16 m² e outra de 20 m², perfeitas para videocasts, video aulas e produções que pedem mais espaço.",
  },
];

function Infraestrutura() {
  const [open, setOpen] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((p) => (p + 1) % carouselSlides.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        eyebrow="Infraestrutura"
        title={<>Seu projeto merece um <span className="text-gradient-brand">estúdio à altura</span>.</>}
        subtitle="Estrutura moderna, técnica e versátil para áudio, vídeo, ensaios e produções profissionais."
        image={heroInfra}
      />

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            O Flex Studios conta com uma estrutura moderna e preparada para atender produções
            musicais e audiovisuais de diferentes portes. Nossos espaços foram desenvolvidos
            para oferecer conforto, qualidade técnica e versatilidade — o ambiente ideal para
            ensaios profissionais, gravações e projetos criativos com alto nível de produção.
          </p>
        </div>
      </section>

      {/* Diferenciais das salas */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {amenities.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border bg-surface p-6 transition-smooth hover:border-primary/50 hover:shadow-glow"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow mb-4">
                  <a.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
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
                  key={c.title}
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
                      <span className="text-lg font-semibold">{c.title}</span>
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
                      <ul className="px-6 pb-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 text-sm text-muted-foreground">
                        {c.items.map((it) => (
                          <li key={it} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card">
              <img
                src={equipmentGuitar}
                alt="Equipamentos do estúdio"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1280}
                height={896}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-wider text-primary">Estúdio A</p>
                <p className="text-xl font-bold text-foreground mt-1">
                  Tratamento acústico profissional
                </p>
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
