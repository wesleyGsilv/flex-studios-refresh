export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-baseline gap-1 font-display font-bold ${className}`}>
      <span className="text-foreground tracking-tight">fle</span>
      <span className="relative">
        <span className="text-gradient-brand text-[1.4em] leading-none">X</span>
      </span>
      <span className="text-muted-foreground text-[0.65em] uppercase tracking-[0.2em] ml-1">
        studios
      </span>
    </div>
  );
}
