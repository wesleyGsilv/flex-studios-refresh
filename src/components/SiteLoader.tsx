import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function SiteLoader({ active }: { active: boolean }) {
  const [mounted, setMounted] = useState(active);
  const [visible, setVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), 420);
    return () => window.clearTimeout(timeout);
  }, [active]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`site-loader${visible ? " is-visible" : ""}`} aria-hidden={!active}>
      <div className="site-loader__backdrop" />
      <div className="site-loader__content">
        <Logo className="site-loader__logo" />
        <div className="site-loader__line" />
        <div className="site-loader__pulse" />
      </div>
    </div>
  );
}