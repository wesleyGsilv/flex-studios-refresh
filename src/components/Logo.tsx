import logoUrl from "@/assets/logo.svg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Flex Studios"
      className={`h-10 w-auto ${className}`}
    />
  );
}
