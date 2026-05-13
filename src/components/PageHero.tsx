import { BrandX } from "./BrandX";
import { MotionReveal } from "./MotionReveal";
import { useParallax } from "@/hooks/use-parallax";

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
  const imageOffset = useParallax(0.22);
  const brandOffset = useParallax(0.38);
  const contentOffset = useParallax(0.08);

  return (
    <section className="relative h-[68vh] min-h-[520px] flex items-end overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-[124%] w-full object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${imageOffset}px, 0) scale(1.14)` }}
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/72 to-background/14" />
      <div className="absolute inset-0 bg-gradient-radial opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(29,245,192,0.18),transparent_30%,transparent_60%,rgba(41,170,225,0.22))] mix-blend-screen" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate3d(0, ${-brandOffset}px, 0)` }}
      >
        <BrandX className="absolute -right-12 top-14 w-[500px] opacity-25 animate-float-slow" />
      </div>

      <div className="absolute left-[6%] top-[22%] h-36 w-36 rounded-full border border-primary/30 bg-primary/16 blur-3xl animate-pulse-soft" />
      <div className="absolute right-[10%] top-[18%] h-52 w-52 rounded-full border border-secondary/30 bg-secondary/14 blur-3xl animate-pulse-soft [animation-delay:700ms]" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(circle_at_center,rgba(29,245,192,0.32),transparent_68%)] blur-3xl" />

      <MotionReveal
        className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full"
        distance={58}
      >
        <div style={{ transform: `translate3d(0, ${-contentOffset}px, 0)` }}>
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
      </MotionReveal>
    </section>
  );
}
