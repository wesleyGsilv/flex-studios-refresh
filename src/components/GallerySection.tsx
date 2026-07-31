import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";

type GalleryItem = {
  src: string;
  alt: string;
};

type GallerySectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  gallery: GalleryItem[];
  onOpenLightbox: (index: number) => void;
};

export function GallerySection({
  eyebrow,
  title,
  description,
  gallery,
  onOpenLightbox,
}: GallerySectionProps) {
  const [slide, setSlide] = useState(0);

  const next = useCallback(
    () => setSlide((p) => (p + 1) % gallery.length),
    [gallery.length]
  );
  const prev = useCallback(
    () => setSlide((p) => (p - 1 + gallery.length) % gallery.length),
    [gallery.length]
  );

  useEffect(() => {
    if (gallery.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [gallery.length, next]);

  return (
    <MotionReveal
      as="section"
      className="relative py-24 md:py-32 border-t border-border bg-surface/30"
      distance={30}
    >
      <div className="absolute inset-0 bg-gradient-radial opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> {eyebrow}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">{title}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{description}</p>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-card bg-surface">
            {gallery.map((g, i) => (
              <figure
                key={`${g.src}-${i}`}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === slide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(i)}
                  aria-label={`Ampliar imagem: ${g.alt}`}
                  className="absolute inset-0 z-20 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  width={1024}
                  height={1280}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              </figure>
            ))}

            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full border border-border bg-surface/80 p-2.5 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full border border-border bg-surface/80 p-2.5 text-foreground hover:bg-surface hover:border-primary/50 transition-smooth"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 z-20 flex gap-1.5">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlide(idx)}
                  className={`h-1.5 rounded-full transition-smooth ${
                    idx === slide ? "w-6 bg-gradient-brand" : "w-3 bg-muted"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}
