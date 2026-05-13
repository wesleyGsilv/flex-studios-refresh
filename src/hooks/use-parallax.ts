import { useEffect, useState } from "react";

export function useParallax(speed = 0.16) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    let frame = 0;

    const updateOffset = () => {
      frame = 0;
      setOffset(window.scrollY * speed);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [speed]);

  return offset;
}