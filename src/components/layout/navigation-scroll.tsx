"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Sticky site header height (`h-20`). */
const SITE_HEADER_OFFSET_PX = 80;

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function scrollWindowToTop(behavior = getScrollBehavior()) {
  window.scrollTo({ top: 0, left: 0, behavior });
}

function scrollToHashTarget(hash: string) {
  const target = document.getElementById(hash);
  if (!target) {
    return false;
  }

  target.scrollIntoView({
    behavior: getScrollBehavior(),
    block: "start",
  });
  return true;
}

function getPageKey(url: URL) {
  return `${url.pathname}${url.search}`;
}

function isModifiedClick(event: MouseEvent) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function shouldHandleAnchorClick(anchor: HTMLAnchorElement) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  return true;
}

function handleSamePageLinkClick(event: MouseEvent) {
  if (isModifiedClick(event)) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement) || !shouldHandleAnchorClick(anchor)) {
    return;
  }

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }

  if (url.origin !== window.location.origin) {
    return;
  }

  const currentKey = getPageKey(new URL(window.location.href));
  const targetKey = getPageKey(url);

  if (currentKey !== targetKey) {
    return;
  }

  event.preventDefault();

  const hash = url.hash.slice(1);

  if (hash) {
    const nextUrl = `${url.pathname}${url.search}#${hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (currentUrl !== nextUrl) {
      window.history.pushState(null, "", nextUrl);
    }
    scrollToHashTarget(hash);
    return;
  }

  const nextUrl = `${url.pathname}${url.search}`;
  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (currentUrl !== nextUrl || window.location.hash) {
    window.history.replaceState(null, "", nextUrl);
  }

  scrollWindowToTop();
}

/**
 * Scrolls to top (or in-page targets) on route changes and when re-clicking
 * the current page in navigation. Uses explicit smooth scrolling instead of
 * relying on global `scroll-behavior` so Next.js App Router restoration stays predictable.
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

    const hash = window.location.hash.slice(1);
    if (hash) {
      if (!scrollToHashTarget(hash)) {
        requestAnimationFrame(() => {
          scrollToHashTarget(hash);
        });
      }
      return;
    }

    scrollWindowToTop();
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

  useEffect(() => {
    document.addEventListener("click", handleSamePageLinkClick, true);
    return () => document.removeEventListener("click", handleSamePageLinkClick, true);
  }, []);

  return null;
}

export { SITE_HEADER_OFFSET_PX };
