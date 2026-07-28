import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useConfig } from "@/hooks/use-config";

export function Footer() {
  const config = useConfig();

  const description =
    config?.descricao_roda_pe ??
    "Estúdio de produção audiovisual e musical em Belo Horizonte. Tecnologia, criatividade e talento para transformar ideias em obras.";
  const email = config?.email ?? "contato@flexstudios.com";
  const telefone = config?.telefone;
  const redes = config?.rede ?? [];

  return (
    <footer className="relative border-t border-border bg-surface/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-3xl" src={config?.logo_roda_pe} />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          {redes.length > 0 && (
            <div className="mt-6 flex gap-3">
              {redes.map((r, i) => (
                <a
                  key={i}
                  href={r.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth inline-flex items-center justify-center"
                  aria-label="Rede social"
                >
                  <img
                    src={r.icone}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain [filter:brightness(0)_invert(1)]"
                  />
                </a>
              ))}
            </div>
          )}
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
            <li>R. Monte Simplon, 1363</li>
            <li>Salgado Filho — BH/MG</li>
            <li>30550-160</li>
            {telefone && <li className="pt-2">{telefone}</li>}
            <li className="text-foreground">{email}</li>
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
