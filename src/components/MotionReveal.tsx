import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
  as?: "div" | "section";
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  distance = 28,
  scale = 0.98,
  as = "div",
}: MotionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const style = {
    "--motion-delay": `${delay}ms`,
    "--motion-distance": `${distance}px`,
    "--motion-scale": scale,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={`motion-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}