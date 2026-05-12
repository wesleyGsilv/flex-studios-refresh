import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  GraduationCap,
  Video,
  Globe,
  Music,
  Mic,
  Radio,
  Play,
  Youtube,
  X,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import heroServicos from "@/assets/hero-servicos.jpg";
import portfolioSinger from "@/assets/portfolio-singer.jpg";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  thumb: string;
  youtubeId: string;
};

const portfolio: PortfolioItem[] = [
  { id: "p1", title: "Gravação ao vivo no Estúdio A", category: "Sessão · 2025", thumb: portfolioSinger, youtubeId: "dQw4w9WgXcQ" },
  { id: "p2", title: "Web clip — Banda autoral", category: "Web Clip · 2025", thumb: portfolioSinger, youtubeId: "dQw4w9WgXcQ" },
  { id: "p3", title: "Transmissão multicâmera", category: "Live · 2024", thumb: portfolioSinger, youtubeId: "dQw4w9WgXcQ" },
  { id: "p4", title: "Mixagem e masterização", category: "Áudio · 2024", thumb: portfolioSinger, youtubeId: "dQw4w9WgXcQ" },
  { id: "p5", title: "Aula EAD em cenário virtual", category: "EAD · 2024", thumb: portfolioSinger, youtubeId: "dQw4w9WgXcQ" },
  { id: "p6", title: "Captação externa de evento", category: "Unidade Móvel · 2023", thumb: portfolioSinger, youtubeId: "dQw4w9WgXcQ" },
];

export const Route = createFileRoute("/servicos")({
  component: Servicos,
  head: () => ({
    meta: [
      { title: "Serviços — Flex Studios" },
      {
        name: "description",
        content:
          "EAD, produção de vídeo, web clip, áudio, pré-produção digital e unidade móvel de transmissão. Tudo em um só estúdio.",
      },
      { property: "og:title", content: "Serviços — Flex Studios" },
      { property: "og:image", content: heroServicos },
    ],
  }),
});

const services = [
  {
    icon: GraduationCap,
    title: "Assessoria para EAD",
    desc: "Ensino a distância em sala de aula virtual. Interaja com seus alunos, faça avaliações adversárias e tenha um registro em tempo real.",
  },
  {
    icon: Video,
    title: "Produções em vídeo",
    desc: "Apresente seus produtos e propostas ao vivo com cenário virtual e ferramentas de transmissão Full HD.",
  },
  {
    icon: Globe,
    title: "Web clip",
    desc: "Alcance seu público alvo onde quer que ele esteja: Facebook, YouTube, LiveStream e plataformas customizadas.",
  },
  {
    icon: Music,
    title: "Produções em áudio",
    desc: "Em protocolos HD3 até 48 canais com utilização de timbres virtuais simples e loops de percussão.",
  },
  {
    icon: Mic,
    title: "Pré-produção digital",
    desc: "Reduza os custos de produção do seu trabalho com a utilização de plugins virtuais e via hardware.",
  },
  {
    icon: Radio,
    title: "Unidade móvel de transmissão",
    desc: "Transmissão de vídeo para Web (Full HD). Captação externa de áudio e vídeo com até 64 canais e 6 vídeos, 4 câmeras em replay.",
  },
];

function Servicos() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        eyebrow="Serviços"
        title={<>Tudo que seu projeto <span className="text-gradient-brand">precisa</span>, em um só lugar.</>}
        subtitle="Pacotes flexíveis para áudio, vídeo, transmissão e ensino a distância."
        image={heroServicos}
      />

      {/* Cards */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group relative rounded-2xl border border-border bg-surface p-8 hover:border-primary/50 hover:-translate-y-1 transition-smooth shadow-card overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-brand opacity-0 blur-3xl group-hover:opacity-30 transition-smooth" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <s.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="relative py-24 md:py-32 border-t border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> Portfolio
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              Veja alguns dos nossos <span className="text-gradient-brand">trabalhos</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Uma amostra de produções recentes em estúdio e captação externa.
            </p>
          </div>

          <div className="mt-14 relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden border border-border shadow-card group">
            <img
              src={portfolioSinger}
              alt="Cantor em sessão de gravação"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-smooth"
              loading="lazy"
              width={1280}
              height={896}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <button
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Reproduzir vídeo"
            >
              <span className="p-6 rounded-full bg-gradient-brand text-primary-foreground shadow-glow group-hover:scale-110 transition-smooth">
                <Play size={32} fill="currentColor" />
              </span>
            </button>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary">Sessão · 2025</p>
                <p className="text-xl font-bold">Gravação ao vivo no Estúdio A</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
            >
              <Youtube size={18} /> Acesse nosso canal no YouTube
            </a>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
