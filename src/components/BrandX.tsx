/** Decorative brand X (mint + blue triangles) used as background motif */
export function BrandX({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path d="M10 10 L100 100 L10 100 Z" fill="var(--brand-blue)" opacity="0.9" />
      <path d="M190 10 L100 100 L190 100 Z" fill="var(--brand-mint)" opacity="0.9" />
      <path d="M10 190 L100 100 L100 190 Z" fill="var(--brand-mint)" opacity="0.7" />
      <path d="M190 190 L100 100 L100 190 Z" fill="var(--brand-blue)" opacity="0.7" />
    </svg>
  );
}
