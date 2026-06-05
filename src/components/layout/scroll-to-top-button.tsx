"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL_PX = 320;

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: getScrollBehavior() });
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_SCROLL_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
      onClick={scrollWindowToTop}
      className={`focus-ring touch-target fixed right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border/60 bg-white/95 text-brand-green shadow-[var(--shadow-brand-soft)] backdrop-blur-sm transition duration-300 hover:border-brand-green/40 hover:bg-brand-sky-soft hover:text-brand-deep active:scale-95 sm:right-6 sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
