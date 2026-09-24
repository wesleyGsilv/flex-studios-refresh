import { useConfig, useWhatsappLink } from "@/hooks/use-config";

export function WhatsAppButton() {
  const link = useWhatsappLink(
    "Olá, tenho interesse em saber mais sobre os serviços do Flex Studios. Poderiam me fornecer mais informações?"
  );
  useConfig(); // garante prefetch

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-brand text-primary-foreground shadow-glow hover:scale-110 transition-smooth"
    >
      <span className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping" />
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative h-7 w-7 fill-current"
      >
        <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.292.64 4.434 1.751 6.262L4 29l7.94-1.71A11.95 11.95 0 0 0 16.003 27C22.632 27 28 21.627 28 15S22.632 3 16.003 3Zm0 21.6a9.59 9.59 0 0 1-4.886-1.337l-.35-.207-4.71 1.014 1.005-4.59-.228-.367A9.6 9.6 0 1 1 16.003 24.6Zm5.46-7.183c-.299-.15-1.77-.873-2.044-.973-.274-.1-.473-.15-.673.15s-.772.973-.946 1.173c-.174.2-.349.225-.648.075-.299-.15-1.262-.465-2.404-1.483-.888-.792-1.488-1.77-1.662-2.07-.174-.3-.018-.462.131-.612.135-.134.299-.349.448-.523.149-.175.199-.3.299-.5.1-.2.05-.374-.025-.524-.075-.15-.673-1.624-.922-2.224-.243-.583-.49-.504-.673-.513l-.573-.01a1.1 1.1 0 0 0-.797.374c-.274.3-1.046 1.022-1.046 2.495s1.07 2.894 1.22 3.094c.149.2 2.106 3.215 5.103 4.508.713.308 1.27.491 1.704.628.715.227 1.367.195 1.882.118.574-.086 1.77-.722 2.02-1.42.249-.697.249-1.295.174-1.42-.075-.124-.274-.199-.573-.349Z" />
      </svg>
    </a>
  );
}
