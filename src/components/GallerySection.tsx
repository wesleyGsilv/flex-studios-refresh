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

const spans = [
  "col-span-2 row-span-2 aspect-square",
  "aspect-square",
  "aspect-square",
  "col-span-2 aspect-[2/1]",
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "col-span-2 aspect-[2/1]",
];

export function GallerySection({
  eyebrow,
  title,
  description,
  gallery,
  onOpenLightbox,
}: GallerySectionProps) {
  return (
    <MotionReveal
      as="section"
      className="relative py-24 md:py-32 border-t border-border bg-surface/30"
      distance={30}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary" /> {eyebrow}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">{title}</h2>
          </div>
          <p className="text-muted-foreground max-w-md">{description}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 [grid-auto-flow:dense]">
          {gallery.map((g, i) => (
            <figure
              key={`${g.src}-${i}`}
              className={`group relative overflow-hidden rounded-2xl border border-border shadow-card ${spans[i % spans.length]}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              <button
                type="button"
                onClick={() => onOpenLightbox(i)}
                aria-label={`Ampliar imagem ${i + 1}`}
                className="absolute inset-0 z-10 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </figure>
          ))}
        </div>
      </div>
    </MotionReveal>
  );
}
