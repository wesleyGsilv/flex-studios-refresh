import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Megaphone,
  Video,
  Mic,
  Clapperboard,
  Users,
  ShieldCheck,
  Clock,
  MessageCircle,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { MotionReveal } from "@/components/MotionReveal";
import { useWhatsappLink } from "@/hooks/use-config";

export const Route = createFileRoute("/para-empresas")({
  component: ParaEmpresas,
  head: () => ({
    meta: [
      { title: "Para Empresas e Agências — Flex Studios" },
      {
        name: "description",
        content:
          "Estrutura completa de estúdio para empresas e agências de publicidade e marketing gravarem e produzirem conteúdo para seus clientes.",
      },
      { property: "og:title", content: "Para Empresas e Agências — Flex Studios" },
      {
        property: "og:description",
        content:
          "Estrutura completa de estúdio para empresas e agências de publicidade e marketing gravarem e produzirem conteúdo para seus clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const publicos = [
  {
    icon: Megaphone,
    titulo: "Agências de publicidade",
    descricao:
      "Produza campanhas, spots, vídeos institucionais e conteúdo para redes sociais dos seus clientes com estrutura profissional e sem custo fixo de estúdio próprio.",
  },
  {
    icon: Building2,
    titulo: "Empresas e marketing interno",
    descricao:
      "Times de marketing e comunicação que precisam gravar treinamentos, vídeos institucionais, podcasts corporativos e conteúdo recorrente com qualidade constante.",
  },
  {
    icon: Users,
    titulo: "Produtoras e freelancers",
    descricao:
      "Traga seu cliente e sua equipe: a gente entrega a sala, o equipamento e o suporte técnico para você focar na direção e na criatividade.",
  },
];

const estrutura = [
  {
    icon: Clapperboard,
    titulo: "Estúdios para vídeo",
    descricao:
      "Salas de 16m² e 20m² ideais para videocast, videoaula e gravações que pedem um espaço controlado, com iluminação e captação profissionais.",
  },
  {
    icon: Mic,
    titulo: "Estúdio B para áudio",
    descricao:
      "Espaço compacto com excelente tratamento acústico, perfeito para locuções, audiobooks, dublagens e trilhas.",
  },
  {
    icon: Video,
    titulo: "Produção completa",
    descricao:
      "Da captação à entrega: gravação, edição e finalização do material pronto para publicar, tudo em um só lugar.",
  },
];

const diferenciais = [
  {
    icon: ShieldCheck,
    titulo: "Sigilo e exclusividade",
    descricao:
      "Sua campanha fica segura: salas reservadas, acesso controlado e total confidencialidade sobre o material dos seus clientes.",
  },
  {
    icon: Clock,
    titulo: "Agenda flexível",
    descricao:
      "Locação por hora, diária ou pacotes mensais para demandas recorrentes — a agenda se adapta ao cronograma da sua agência.",
  },
  {
    icon: Check,
    titulo: "Suporte técnico incluso",
    descricao:
      "Equipe técnica do Flex acompanha a gravação para que nenhum take se perca por problema de equipamento.",
  },
];

const usos = [
  "Vídeos institucionais e corporativos",
  "Spots e campanhas publicitárias",
  "Conteúdo para redes sociais",
  "Podcasts e videocasts de marca",
  "Treinamentos e videoaulas",
  "Locuções, dublagens e audiobooks",
];

function ParaEmpresas() {
  const whatsappHref = useWhatsappLink(
    "Olá, sou de uma empresa/agência e quero saber mais sobre a estrutura do Flex Studios para produção de conteúdo."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        eyebrow="Para empresas e agências"
        title="Sua próxima campanha nasce aqui dentro."
        subtitle="O Flex abre as portas da sua estrutura para empresas e agências de publicidade e marketing que precisam gravar e produzir conteúdo para seus clientes — com qualidade de estúdio profissional e sem dor de cabeça."
      />

      {/* Para quem é */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <MotionReveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> Para quem é
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              Feito para quem produz para os outros.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Você cuida da estratégia e da criação. A gente cuida do espaço,
              do equipamento e da técnica.
            </p>
          </MotionReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {publicos.map((p) => (
              <MotionReveal key={p.titulo}>
                <article className="group relative h-full rounded-2xl border border-border bg-surface p-8 hover:border-primary/50 hover:-translate-y-1 transition-smooth shadow-card overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-brand opacity-0 blur-3xl group-hover:opacity-30 transition-smooth" />
                  <div className="relative">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                      <p.icon size={22} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{p.titulo}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {p.descricao}
                    </p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="relative py-24 md:py-32 border-t border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <MotionReveal className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> A estrutura
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              Estúdio completo, pronto para o seu cliente.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Todas as salas climatizadas, com tratamento acústico e equipe
              técnica de plantão.
            </p>
          </MotionReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {estrutura.map((e) => (
              <MotionReveal key={e.titulo}>
                <article className="h-full rounded-2xl border border-border bg-surface p-8 shadow-card">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <e.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{e.titulo}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {e.descricao}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>

          {/* O que dá pra produzir */}
          <MotionReveal className="mt-16 rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-card">
            <h3 className="text-2xl font-bold text-center">
              O que dá pra produzir aqui
            </h3>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {usos.map((uso) => (
                <li key={uso} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex p-1 rounded-full bg-gradient-brand text-primary-foreground shrink-0">
                    <Check size={14} />
                  </span>
                  <span className="text-sm text-muted-foreground">{uso}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <MotionReveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> Diferenciais
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              Por que trazer sua produção para o Flex?
            </h2>
          </MotionReveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {diferenciais.map((d) => (
              <MotionReveal key={d.titulo}>
                <article className="h-full rounded-2xl border border-border bg-surface p-8 hover:border-primary/50 transition-smooth shadow-card">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <d.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{d.titulo}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {d.descricao}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>

          {/* CTA */}
          <MotionReveal className="mt-16 text-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
            >
              <MessageCircle size={18} /> Falar com a gente sobre sua produção
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Conta pra gente o que sua empresa ou agência precisa e montamos
              uma proposta sob medida.
            </p>
          </MotionReveal>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
