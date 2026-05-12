import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/produtora", label: "A produtora" },
  { to: "/servicos", label: "Serviços" },
  { to: "/infraestrutura", label: "Infraestrutura" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" aria-label="Flex Studios — Home">
          <Logo className="text-2xl" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              activeProps={{ className: "!text-foreground" }}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-brand" />
                  )}
                </>
              )}
            </Link>
          ))}
          <Link
            to="/"
            hash="contato"
            className="ml-4 inline-flex items-center rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition-smooth"
          >
            Fale conosco
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 text-base text-muted-foreground hover:text-foreground"
                activeProps={{ className: "!text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
