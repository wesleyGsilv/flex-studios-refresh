import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Music2, Mic, Headphones, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import heroPlanos from "@/assets/hero-servicos.jpg";
import { mensagemWhatsapp } from "@/lib/utils";

export const Route = createFileRoute("/planos")({
  component: Planos,
  head: () => ({
    meta: [
      { title: "Planos e Assinaturas — Flex Studios" },
      {
        name: "description",
        content:
          "Planos avulsos e mensais para ensaios, podcast e Estúdio B. Economize com assinaturas mensais na Flex Studios.",
      },
      { property: "og:title", content: "Planos e Assinaturas — Flex Studios" },
      {
        property: "og:description",
        content:
          "Ensaios a partir de R$ 250, podcast turnkey e Estúdio B com plano mensal a partir de R$ 380/h.",
      },
    ],
  }),
});

type Plan = {
  id: string;
  icon: React.ElementType;
  badge: string;
  name: string;
  tagline: string;
  avulso: { price: string; unit: string; note?: string };
  mensal: { price: string; unit: string; note?: string };
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    id: "ensaios",
    icon: Music2,
    badge: "Sala de ensaio",
    name: "Ensaios",
    tagline: "Sala completa para sua banda evoluir com qualidade de estúdio.",
    avulso: { price: "250", unit: "/ 2h", note: "diária" },
    mensal: { price: "220", unit: "/ hora", note: "seg. a sex." },
    features: [
      "Backline profissional inclusa",
      "Acústica tratada e monitoração",
      "Agendamento prioritário no plano mensal",
      "Café, água e wi-fi de cortesia",
    ],
  },
  {
    id: "podcast",
    icon: Mic,
    badge: "Sala de podcast",
    name: "Podcast Turnkey",
    tagline:
      "Serviço completo: gravação multicâmera, áudio tratado e material pronto para publicar.",
    avulso: { price: "Sob", unit: "consulta", note: "pacote por episódio" },
    mensal: { price: "Plano", unit: "recorrente", note: "episódios mensais" },
    features: [
      "Captação de vídeo multicâmera",
      "Áudio com edição e tratamento",
      "Cortes verticais para redes sociais",
      "Entrega de masters + assets prontos",
    ],
    highlight: true,
  },
  {
    id: "estudio-b",
    icon: Headphones,
    badge: "Estúdio B",
    name: "Locação Estúdio B",
    tagline:
      "Estrutura premium para gravação, mixagem e produção em ambiente acústico de alto padrão.",
    avulso: { price: "400", unit: "/ hora", note: "hora avulsa" },
    mensal: { price: "380", unit: "/ hora", note: "plano mensal" },
    features: [
      "Console e monitores de referência",
      "Operador técnico disponível",
      "Cabine vocal e live room integrados",
      "Desconto progressivo no plano mensal",
    ],
  },
];

function Planos() {
  const [billing, setBilling] = useState<"avulso" | "mensal">("mensal");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        eyebrow="Planos & Assinaturas"
        title={
          <>
            Estúdio recorrente,{" "}
            <span className="text-gradient-brand">preço inteligente</span>
          </>
        }
        subtitle="Escolha entre uso avulso ou economize com nossos planos mensais. Estrutura completa, equipe técnica e flexibilidade para artistas, bandas e criadores."
        image={heroPlanos}
      />

      {/* Toggle */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-8 relative z-10">
        <div className="flex justify-center">
          <div className="glass inline-flex p-1 rounded-full">
            {(["avulso", "mensal"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-smooth ${
                  billing === b
                    ? "bg-gradient-brand text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {b === "avulso" ? "Avulso" : "Mensal"}
                {b === "mensal" && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider">
                    <Sparkles size={10} /> economize
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const price = plan[billing];
            const Icon = plan.icon;
            return (
              <article
                key={plan.id}
                className={`group relative rounded-2xl p-8 transition-smooth flex flex-col ${
                  plan.highlight
                    ? "bg-gradient-to-b from-surface-elevated to-surface border border-primary/30 shadow-glow"
                    : "bg-surface border border-border hover:border-primary/30"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-brand text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                    Mais procurado
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl md:text-3xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  {price.price !== "Sob" && price.price !== "Plano" && (
                    <span className="text-lg text-muted-foreground">R$</span>
                  )}
                  <span className="text-5xl font-bold text-gradient-brand leading-none">
                    {price.price}
                  </span>
                  <span className="text-base text-muted-foreground">{price.unit}</span>
                </div>
                {price.note && (
                  <span className="mt-1 text-xs text-muted-foreground">{price.note}</span>
                )}

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={mensagemWhatsapp(
                    `Olá, tenho interesse no plano ${plan.name} (${billing}). Gostaria de saber mais detalhes e como contratar.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-smooth ${
                    plan.highlight
                      ? "bg-gradient-brand text-primary-foreground shadow-glow hover:scale-[1.02]"
                      : "border border-border hover:border-primary text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  Quero esse plano
                </a>
              </article>
            );
          })}
        </div>

        {/* Comparison strip */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            { k: "Sem fidelidade", v: "Cancele quando quiser no plano mensal." },
            { k: "Equipe técnica", v: "Operador de áudio e vídeo disponível." },
            { k: "Estrutura premium", v: "Backline, acústica e equipamentos top de linha." },
          ].map((item) => (
            <div
              key={item.k}
              className="glass rounded-xl p-5 border border-border"
            >
              <h4 className="text-sm font-semibold text-foreground">{item.k}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Perguntas <span className="text-gradient-brand">frequentes</span>
        </h2>
        <div className="mt-10 space-y-4">
          {[
            {
              q: "Como funciona o plano mensal?",
              a: "Você contrata um pacote de horas mensais com valor reduzido por hora, com agendamento prioritário e flexibilidade para distribuir as horas durante o mês (seg. a sex.).",
            },
            {
              q: "Posso fazer um teste antes de assinar?",
              a: "Sim. Você pode contratar uma diária avulsa para conhecer a estrutura antes de migrar para o plano mensal.",
            },
            {
              q: "O que está incluso no podcast turnkey?",
              a: "Captação multicâmera, áudio tratado, edição básica, cortes verticais para redes e entrega de todos os arquivos prontos para publicação.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-surface p-5 open:border-primary/40 transition-smooth"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                {f.q}
                <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
