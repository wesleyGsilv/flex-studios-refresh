import logoUrl from "@/assets/logo.svg";
import { useConfig } from "@/hooks/use-config";

export function Logo({ className = "", src }: { className?: string; src?: string }) {
  const config = useConfig();
  const finalSrc = src ?? config?.logo_cabecalho ?? logoUrl;
  return (
    <img
      src={finalSrc}
      alt="Flex Studios"
      className={`h-10 w-auto ${className}`}
    />
  );
}
