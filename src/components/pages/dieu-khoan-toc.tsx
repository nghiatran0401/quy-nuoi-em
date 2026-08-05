"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getActiveTocSectionId,
  isTocSectionAligned,
  readValidTocHash,
  replaceTocHash,
  scrollToTocSection,
  waitForScrollEnd,
} from "@/lib/finance-page-toc-spy";
import type { TocItem } from "@/lib/dieu-khoan-toc";

type DieuKhoanTocProps = {
  items: readonly TocItem[];
};

export function DieuKhoanToc({ items }: DieuKhoanTocProps) {
  const scrollLockRef = useRef<string | null>(null);
  const navigateGenerationRef = useRef(0);
  const initialHashHandledRef = useRef(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const releaseScrollLock = useCallback(
    (expectedId?: string) => {
      if (expectedId && scrollLockRef.current !== expectedId) return;
      scrollLockRef.current = null;
      const active = getActiveTocSectionId(items);
      setActiveId(active);
      replaceTocHash(active);
    },
    [items],
  );

  const applyScrollSpy = useCallback(() => {
    if (scrollLockRef.current) {
      setActiveId(scrollLockRef.current);
      return;
    }

    const active = getActiveTocSectionId(items);
    setActiveId(active);
    replaceTocHash(active);
  }, [items]);

  const beginLockedNavigation = useCallback(
    (id: string, options?: { scroll?: boolean }) => {
      const generation = navigateGenerationRef.current + 1;
      navigateGenerationRef.current = generation;
      scrollLockRef.current = id;
      setActiveId(id);
      replaceTocHash(id);

      const shouldScroll = options?.scroll ?? true;
      if (shouldScroll && !isTocSectionAligned(id)) {
        scrollToTocSection(id);
      }

      void waitForScrollEnd().then(() => {
        if (navigateGenerationRef.current !== generation) return;
        releaseScrollLock(id);
      });
    },
    [releaseScrollLock],
  );

  useLayoutEffect(() => {
    if (initialHashHandledRef.current) return;

    const hashId = readValidTocHash(items);
    initialHashHandledRef.current = true;

    if (hashId) {
      beginLockedNavigation(hashId);
      return;
    }

    applyScrollSpy();
  }, [applyScrollSpy, beginLockedNavigation, items]);

  useEffect(() => {
    const onHashChange = () => {
      const hashId = readValidTocHash(items);
      if (!hashId) {
        applyScrollSpy();
        return;
      }

      beginLockedNavigation(hashId, { scroll: !isTocSectionAligned(hashId) });
    };

    window.addEventListener("scroll", applyScrollSpy, { passive: true });
    window.addEventListener("resize", applyScrollSpy);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);

    return () => {
      window.removeEventListener("scroll", applyScrollSpy);
      window.removeEventListener("resize", applyScrollSpy);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, [applyScrollSpy, beginLockedNavigation, items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Mục lục điều khoản"
      className="rounded-2xl border border-brand-border/60 bg-white/90 p-4 shadow-[var(--shadow-brand-soft)] lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
        Mục lục
      </p>
      <ol className="mt-3 space-y-0.5">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  beginLockedNavigation(item.id);
                }}
                className={`focus-ring block rounded-lg px-2.5 py-2 text-sm leading-snug transition ${
                  isActive
                    ? "bg-brand-green/10 font-semibold text-brand-deep ring-1 ring-inset ring-brand-green/20"
                    : "text-brand-muted hover:bg-brand-sky-soft hover:text-brand-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
