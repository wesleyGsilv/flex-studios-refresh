import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Music2, Mic, Headphones, Sparkles, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { useConfig } from "@/hooks/use-config";
import { whatsappLink } from "@/lib/api-config";
import { stripHtml } from "@/lib/api-home";
import {
  planosQueryOptions,
  getPlanosBannerImage,
  type PlanoItem,
} from "@/lib/api-planos";

export const Route = createFileRoute("/planos")({
  component: Planos,
  loader: ({ context }) => context.queryClient.ensureQueryData(planosQueryOptions),
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

function iconForPlano(nome: string): LucideIcon {
  const n = nome.toLowerCase();
  if (n.includes("podcast")) return Mic;
  if (n.includes("estúdio") || n.includes("estudio") || n.includes("locação")) return Headphones;
  return Music2;
}

type ParsedPrice = { price: string; unit: string; note?: string; raw: string };

function parsePrice(raw: string): ParsedPrice {
  if (!raw) return { price: "—", unit: "", raw: "" };
  const m = raw.match(/R\$\s*([\d.,]+)\s*\/?\s*([^\s]+)?\s*(.*)?/i);
  if (m) {
    return {
      price: m[1],
      unit: m[2] ? `/ ${m[2]}` : "",
      note: m[3]?.trim() || undefined,
      raw,
    };
  }
  return { price: "", unit: "", note: raw, raw };
}

function Planos() {
  const { data: payload } = useQuery(planosQueryOptions);
  const data = payload?.data;
  const dobraFormulario = payload?.dobra_formulario?.[0];

  const [billing, setBilling] = useState<"avulso" | "mensal">("mensal");
  const config = useConfig();
  const phone = config?.whatsapp ?? "31986641213";

  const heroImage =
    getPlanosBannerImage(data?.banner_desktop) ||
    getPlanosBannerImage(data?.banner_tablete) ||
    getPlanosBannerImage(data?.banner_celular) ||
    "";

  const heroEyebrow = data?.subtitulo || "Planos & Assinaturas";
  const heroTitle = data?.titulo_banner || "Tem uma ideia grande aí? Tem um preço baixo aqui.";
  const heroSubtitle = data?.descricao_banner
    ? stripHtml(data.descricao_banner)
    : "Agora que você já conhece a casa, é hora de escolher seu plano.";

  const plans: PlanoItem[] = data?.plano?.length ? data.plano : [];

  const faqs = useMemo(
    () =>
      (data?.pergunta_e_resposta ?? []).map((f) => ({
        pergunta: f.pergunta,
        resposta: stripHtml(f.resposta),
      })),
    [data]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
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
            const Icon = iconForPlano(plan.nome);
            const raw = billing === "mensal" ? plan.valor_mensal : plan.valor_avulso;
            const price = parsePrice(raw);
            const features = Array.isArray(plan.diferenciais)
              ? plan.diferenciais.map((d) => d.item).filter(Boolean)
              : [];
            const highlight = plan.opcao_destaque;
            return (
              <article
                key={plan.titulo}
                className={`group relative rounded-2xl p-8 transition-smooth flex flex-col ${
                  highlight
                    ? "bg-gradient-to-b from-surface-elevated to-surface border border-primary/30 shadow-glow"
                    : "bg-surface border border-border hover:border-primary/30"
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-brand text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                    Mais procurado
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {plan.nome}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl md:text-3xl font-bold">{plan.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {plan.descricao}
                </p>

                <div className="mt-6 min-h-[72px]">
                  {price.price ? (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-lg text-muted-foreground">R$</span>
                      <span className="text-5xl font-bold text-gradient-brand leading-none">
                        {price.price}
                      </span>
                      {price.unit && (
                        <span className="text-base text-muted-foreground">{price.unit}</span>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gradient-brand leading-tight">
                      {price.note || price.raw}
                    </div>
                  )}
                  {price.price && price.note && (
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {price.note}
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(
                    phone,
                    `Olá, tenho interesse no plano ${plan.titulo} (${billing}). Gostaria de saber mais detalhes e como contratar.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-smooth ${
                    highlight
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
            <div key={item.k} className="glass rounded-xl p-5 border border-border">
              <h4 className="text-sm font-semibold text-foreground">{item.k}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            {data?.titulo || "Perguntas frequentes"}
          </h2>
          {data?.descricao && (
            <p className="mt-3 text-center text-muted-foreground">
              {stripHtml(data.descricao)}
            </p>
          )}
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.pergunta}
                className="group rounded-xl border border-border bg-surface p-5 open:border-primary/40 transition-smooth"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                  {f.pergunta}
                  <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {f.resposta}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      <ContactForm dobra={dobraFormulario} />
      <Footer />
    </div>
  );
}
