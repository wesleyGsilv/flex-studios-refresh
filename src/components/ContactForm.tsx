import { useEffect, useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import {
  contactMailSchema,
  sendContactEmail,
  type ContactMailInput,
} from "@/lib/contact-mail";
import type { DobraFormulario, ContatoItem } from "@/lib/api-home";

const initialFormData: ContactMailInput = {
  nome: "",
  sobrenome: "",
  email: "",
  celular: "",
  mensagem: "",
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function normalizeEmail(value: string) {
  return value.replace(/\s+/g, "").toLowerCase();
}

const fallbackContatos: ContatoItem[] = [
  { titulo: "Estúdio", descricao: "R. Monte Simplon, 1363 — BH/MG" },
  { titulo: "E-mail", descricao: "contato@flexstudios.com" },
  { titulo: "Telefone", descricao: "+55 (31) 0000-0000" },
];

const fallbackIcons = [MapPin, Mail, Phone];

export function ContactForm({ dobra }: { dobra?: DobraFormulario }) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const title = dobra?.title ?? "Vamos transformar sua ideia em obra.";
  const eyebrow = dobra?.data?.contato_subtitulo ?? "Contato";
  const contatos =
    dobra?.data?.contato_lista && dobra.data.contato_lista.length > 0
      ? dobra.data.contato_lista
      : fallbackContatos;

  function updateField<K extends keyof ContactMailInput>(field: K, value: ContactMailInput[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  useEffect(() => {
    if (submitState !== "success") return;
    const timeout = window.setTimeout(() => {
      setSubmitState("idle");
      setFeedbackMessage(null);
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, [submitState]);

  return (
    <section id="contato" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" /> {eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
            {title}
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
            Preencha o formulário e nossa equipe entra em contato para tirar dúvidas,
            enviar orçamentos ou marcar uma visita ao estúdio.
          </p>

          <div className="mt-10 space-y-5">
            {contatos.map((c, i) => (
              <Info
                key={`${c.titulo}-${i}`}
                icon={c.icone}
                FallbackIcon={fallbackIcons[i % fallbackIcons.length]}
                title={c.titulo}
                value={c.descricao}
              />
            ))}
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitState("submitting");
            setFeedbackMessage(null);

            try {
              const payload = contactMailSchema.parse(formData);
              await sendContactEmail(payload);
              setSubmitState("success");
              setFeedbackMessage("Mensagem enviada com sucesso. Retornaremos em breve.");
              setFormData(initialFormData);
            } catch (error) {
              console.error(error);
              setSubmitState("error");
              const message =
                error instanceof Error && error.message
                  ? error.message
                  : "Nao foi possivel enviar sua mensagem agora. Tente novamente em instantes.";
              setFeedbackMessage(message);
            }
          }}
          className="glass rounded-2xl p-6 md:p-8 shadow-card"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" name="nome" value={formData.nome} onChange={(v) => updateField("nome", v)} required autoComplete="given-name" />
            <Field label="Sobrenome" name="sobrenome" value={formData.sobrenome} onChange={(v) => updateField("sobrenome", v)} required autoComplete="family-name" />
            <Field label="E-mail" name="email" type="email" value={formData.email} onChange={(v) => updateField("email", normalizeEmail(v))} autoComplete="email" inputMode="email" placeholder="voce@exemplo.com" />
            <Field label="Celular" name="celular" type="tel" value={formData.celular} onChange={(v) => updateField("celular", formatPhone(v))} required autoComplete="tel" inputMode="tel" maxLength={15} placeholder="(31) 99999-9999" />
          </div>
          <label className="block mt-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Mensagem
            </span>
            <textarea
              name="mensagem"
              rows={5}
              value={formData.mensagem}
              onChange={(e) => updateField("mensagem", e.target.value)}
              className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-smooth resize-none"
              placeholder="Conte sobre seu projeto…"
            />
          </label>
          {feedbackMessage && (
            <p className={`mt-4 text-sm ${submitState === "error" ? "text-red-300" : "text-primary"}`}>
              {feedbackMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition-smooth"
          >
            {submitState === "submitting"
              ? "Enviando..."
              : submitState === "success"
                ? "Mensagem enviada ✓"
                : <>Enviar <Send size={16} /></>}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", value, onChange, required = false, autoComplete, inputMode, maxLength, placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-smooth"
      />
    </label>
  );
}

function Info({
  icon,
  FallbackIcon,
  title,
  value,
}: {
  icon?: string;
  FallbackIcon: React.ComponentType<{ size?: number }>;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow shrink-0 flex items-center justify-center">
        {icon ? (
          <img src={icon} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain [filter:brightness(0)_invert(1)]" />
        ) : (
          <FallbackIcon size={18} />
        )}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="text-foreground font-medium">{value}</p>
      </div>
    </div>
  );
}
