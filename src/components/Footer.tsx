import { Instagram, Facebook, Youtube, Twitter, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-3xl" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Estúdio de produção audiovisual e musical em Belo Horizonte. Tecnologia,
            criatividade e talento para transformar ideias em obras.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube, Twitter, Music2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth"
                aria-label="Social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Navegar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-smooth">Home</Link></li>
            <li><Link to="/produtora" className="hover:text-foreground transition-smooth">A produtora</Link></li>
            <li><Link to="/servicos" className="hover:text-foreground transition-smooth">Serviços</Link></li>
            <li><Link to="/infraestrutura" className="hover:text-foreground transition-smooth">Infraestrutura</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Contato</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>R. Monte Simplício, 1363</li>
            <li>Salgado Filho — BH/MG</li>
            <li>30550-160</li>
            <li className="pt-2 text-foreground">contato@flexstudios.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Flex Studios. Todos os direitos reservados.</span>
          <span>Belo Horizonte · Brasil</span>
        </div>
      </div>
    </footer>
  );
}
