"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Sticky site header height (`h-20`). */
const SITE_HEADER_OFFSET_PX = 80;

function scrollWindowToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToHashTarget(hash: string) {
  const target = document.getElementById(hash);
  if (!target) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

/**
 * Ensures route changes scroll to the top instantly.
 * Global `scroll-behavior: smooth` breaks Next.js App Router scroll restoration.
 */
export function NavigationScroll() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    const isRouteChange =
      previousPathname.current !== null && previousPathname.current !== pathname;

    previousPathname.current = pathname;

    if (!isRouteChange) {
      return;
    }

    scrollWindowToTop();

    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    if (scrollToHashTarget(hash)) {
      return;
    }

    requestAnimationFrame(() => {
      scrollToHashTarget(hash);
    });
  }, [pathname]);

  useLayoutEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!id) {
        scrollWindowToTop();
        return;
      }

      scrollToHashTarget(id);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}

export { SITE_HEADER_OFFSET_PX };
