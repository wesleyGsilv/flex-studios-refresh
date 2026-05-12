import { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contato" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" /> Contato
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.05]">
            Vamos transformar sua{" "}
            <span className="text-gradient-brand">ideia em obra</span>.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
            Preencha o formulário e nossa equipe entra em contato para tirar dúvidas,
            enviar orçamentos ou marcar uma visita ao estúdio.
          </p>

          <div className="mt-10 space-y-5">
            <Info icon={MapPin} title="Estúdio" value="R. Monte Simplício, 1393 — BH/MG" />
            <Info icon={Mail} title="E-mail" value="contato@flexstudios.com" />
            <Info icon={Phone} title="Telefone" value="+55 (31) 0000-0000" />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
          }}
          className="glass rounded-2xl p-6 md:p-8 shadow-card"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" name="nome" />
            <Field label="Sobrenome" name="sobrenome" />
            <Field label="E-mail" name="email" type="email" />
            <Field label="Celular" name="celular" type="tel" />
          </div>
          <label className="block mt-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Mensagem
            </span>
            <textarea
              required
              rows={5}
              className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-smooth resize-none"
              placeholder="Conte sobre seu projeto…"
            />
          </label>
          <button
            type="submit"
            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition-smooth"
          >
            {sent ? "Mensagem enviada ✓" : <>Enviar <Send size={16} /></>}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        className="w-full rounded-xl bg-background/60 border border-input px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-smooth"
      />
    </label>
  );
}

function Info({ icon: Icon, title, value }: { icon: React.ComponentType<{ size?: number }>; title: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="text-foreground font-medium">{value}</p>
      </div>
    </div>
  );
}
