"use client";

import { ListTree } from "lucide-react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  getActiveTocSectionId,
  isTocSectionAligned,
  readValidTocHash,
  replaceTocHash,
  scrollToTocSection,
  waitForScrollEnd,
} from "@/lib/finance-page-toc-spy";

type FinancePageTocProps = {
  items: readonly { id: string; label: string }[];
};

const tocToggleClassName =
  "focus-ring touch-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border/60 bg-white/95 text-brand-green shadow-[var(--shadow-brand-soft)] backdrop-blur-sm transition duration-300 hover:border-brand-green/40 hover:bg-brand-sky-soft hover:text-brand-deep active:scale-95 sm:h-12 sm:w-12";

function TocLink({
  item,
  isActive,
  onNavigate,
}: {
  item: { id: string; label: string };
  isActive: boolean;
  onNavigate: (id: string) => void;
}) {
  return (
    <li>
      <a
        href={`#${item.id}`}
        aria-current={isActive ? "location" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(item.id);
        }}
        className={`focus-ring block rounded-lg px-3 py-2 text-sm transition ${
          isActive
            ? "bg-brand-green/10 font-semibold text-brand-deep ring-1 ring-inset ring-brand-green/20"
            : "text-brand-muted hover:bg-brand-sky-soft hover:text-brand-ink"
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              isActive ? "bg-brand-green" : "bg-brand-border"
            }`}
            aria-hidden
          />
          <span className="leading-snug">{item.label}</span>
        </span>
      </a>
    </li>
  );
}

export function FinancePageToc({ items }: FinancePageTocProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollLockRef = useRef<string | null>(null);
  const navigateGenerationRef = useRef(0);
  const initialHashHandledRef = useRef(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navigate = (id: string) => {
    setOpen(false);
    beginLockedNavigation(id);
  };

  const activeLabel = items.find((item) => item.id === activeId)?.label ?? "Mục lục";

  return (
    <div
      ref={rootRef}
      className="fixed right-4 z-30 bottom-[calc(max(1rem,env(safe-area-inset-bottom,0px))+3.5rem)] flex flex-col items-end sm:right-6 sm:bottom-[calc(max(1rem,env(safe-area-inset-bottom,0px))+3.75rem)] print:hidden"
    >
      {open ? (
        <nav
          id={panelId}
          aria-label="Mục lục trang tài chính"
          className="mb-2 w-[min(100vw-2rem,13rem)] rounded-2xl border border-brand-border/60 bg-white/95 p-2 shadow-[var(--shadow-brand-soft)] backdrop-blur-sm"
        >
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
            Mục lục
          </p>
          <ul className="space-y-0.5">
            {items.map((item) => (
              <TocLink
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onNavigate={navigate}
              />
            ))}
          </ul>
        </nav>
      ) : null}

      <button
        type="button"
        aria-label="Mục lục trang"
        aria-expanded={open}
        aria-controls={panelId}
        title={`Mục lục — ${activeLabel}`}
        onClick={() => {
          setOpen((value) => {
            const nextOpen = !value;
            if (nextOpen && !scrollLockRef.current) {
              applyScrollSpy();
            }
            return nextOpen;
          });
        }}
        className={`${tocToggleClassName} ${open ? "border-brand-green/40 bg-brand-sky-soft text-brand-deep" : ""}`}
      >
        <ListTree className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
