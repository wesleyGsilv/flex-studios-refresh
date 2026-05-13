import { MessageCircle } from "lucide-react";

const PHONE = "5531999999999"; // troque pelo número real
const MESSAGE = "Olá! Gostaria de saber mais sobre o Flex Studios.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-brand text-primary-foreground shadow-glow hover:scale-110 transition-smooth"
    >
      <MessageCircle size={28} fill="currentColor" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-40 animate-ping" />
    </a>
  );
}
