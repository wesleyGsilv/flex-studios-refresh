import { BrandX } from "./BrandX";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[68vh] min-h-[520px] flex items-end overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <BrandX className="absolute -right-20 top-20 w-[420px] opacity-15 animate-float-slow" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full animate-fade-up">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-10 bg-primary" /> {eyebrow}
        </span>
        <h1 className="mt-4 text-5xl md:text-7xl font-bold leading-[1.02] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
