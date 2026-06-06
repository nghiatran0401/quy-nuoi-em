"use client";

import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/brand/logo";
import { ReceiveCodeButton } from "@/components/layout/receive-code-button";
import { mainNavItems, navLabel } from "@/lib/navigation";

const MOBILE_MENU_SELECTOR = '[data-mobile-menu="true"]';

type ScrollLockHandlers = {
  preventTouchMove: (event: TouchEvent) => void;
  preventWheel: (event: WheelEvent) => void;
};

function lockPageScroll(): ScrollLockHandlers {
  const preventTouchMove = (event: TouchEvent) => {
    const menu = document.querySelector(MOBILE_MENU_SELECTOR);
    if (menu?.contains(event.target as Node)) return;
    event.preventDefault();
  };

  const preventWheel = (event: WheelEvent) => {
    const menu = document.querySelector(MOBILE_MENU_SELECTOR);
    if (menu?.contains(event.target as Node)) return;
    event.preventDefault();
  };

  document.addEventListener("touchmove", preventTouchMove, { passive: false });
  document.addEventListener("wheel", preventWheel, { passive: false });

  return { preventTouchMove, preventWheel };
}

function unlockPageScroll({ preventTouchMove, preventWheel }: ScrollLockHandlers) {
  document.removeEventListener("touchmove", preventTouchMove);
  document.removeEventListener("wheel", preventWheel);
}

function readHeaderBottom(navElement: HTMLElement | null): number | null {
  if (!navElement) return null;
  return navElement.getBoundingClientRect().bottom;
}

export function SiteHeader() {
  const navRef = useRef<HTMLElement>(null);
  const menuTopRef = useRef<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuTop, setMenuTop] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mobileOpen) {
      menuTopRef.current = null;
      setMenuTop(null);
      document.documentElement.style.removeProperty("--mobile-menu-top");
      delete document.documentElement.dataset.mobileNavOpen;
      return;
    }

    document.documentElement.dataset.mobileNavOpen = "true";

    const top = readHeaderBottom(navRef.current);
    if (top === null) return;

    menuTopRef.current = top;
    setMenuTop(top);
    document.documentElement.style.setProperty("--mobile-menu-top", `${top}px`);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const scrollLock = lockPageScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const onResize = () => {
      const top = readHeaderBottom(navRef.current);
      if (top === null) return;
      menuTopRef.current = top;
      setMenuTop(top);
      document.documentElement.style.setProperty("--mobile-menu-top", `${top}px`);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      delete document.documentElement.dataset.mobileNavOpen;
      document.documentElement.style.removeProperty("--mobile-menu-top");
      unlockPageScroll(scrollLock);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const overlayStyle =
    menuTop === null
      ? undefined
      : {
          top: menuTop,
          maxHeight: `calc(100dvh - ${menuTop}px - env(safe-area-inset-bottom, 0px))`,
        };

  const mobileMenuPortal =
    mobileOpen && mounted && menuTop !== null
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-x-0 bottom-0 z-[200] touch-none bg-brand-ink/40 backdrop-blur-[2px] lg:hidden"
              style={{ top: menuTop }}
              aria-label={navLabel("closeMenu")}
              onClick={closeMobile}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={navLabel("openMenu")}
              data-mobile-menu="true"
              className="fixed inset-x-0 z-[210] overflow-y-auto overscroll-contain border-b border-brand-border bg-white shadow-[var(--shadow-brand-soft)] lg:hidden"
              style={overlayStyle}
            >
              <nav className="page-container py-1">
                {mainNavItems.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block min-h-11 rounded-lg py-2.5 text-base font-medium text-brand-ink transition-colors hover:bg-brand-surface active:bg-brand-sky-soft"
                      onClick={closeMobile}
                    >
                      {navLabel(item.labelKey)}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block min-h-11 rounded-lg py-2.5 text-base font-medium text-brand-ink transition-colors hover:bg-brand-surface active:bg-brand-sky-soft"
                      onClick={closeMobile}
                    >
                      {navLabel(item.labelKey)}
                    </Link>
                  ),
                )}
              </nav>
              <div className="page-container space-y-2 border-t border-brand-border/70 py-3 pb-safe">
                <ReceiveCodeButton variant="mobile-menu" onNavigate={closeMobile} />
                <Link
                  href="/dong-gop"
                  className="btn-primary-sm flex w-full justify-center"
                  onClick={closeMobile}
                >
                  <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
                  <span>{navLabel("donate")}</span>
                </Link>
              </div>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <nav ref={navRef} className="site-header relative z-[220] bg-white/90 transition-all duration-300">
        <div className="page-container">
          <div className="flex h-16 items-center gap-3 sm:h-20 lg:gap-4">
            <div className="flex min-w-0 shrink-0 items-center">
              <Link
                href="/"
                className="block rounded-xl transition-opacity hover:opacity-90"
                onClick={closeMobile}
              >
                <BrandLogo priority className="h-10 w-auto max-w-[56px] object-contain sm:h-12 sm:max-w-[68px]" />
              </Link>
            </div>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6">
              {mainNavItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link whitespace-nowrap"
                  >
                    {navLabel(item.labelKey)}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className="nav-link whitespace-nowrap">
                    {navLabel(item.labelKey)}
                  </Link>
                ),
              )}
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 lg:gap-3">
              <div className="hidden items-center gap-2 sm:gap-2.5 lg:flex lg:gap-3">
                <ReceiveCodeButton variant="desktop" />
                <Link href="/dong-gop" className="btn-primary-sm">
                  <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
                  <span>{navLabel("donate")}</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                {!mobileOpen ? (
                  <>
                    <ReceiveCodeButton variant="mobile-icon" />
                    <Link
                      href="/dong-gop"
                      className="touch-target focus-ring inline-flex items-center justify-center rounded-full bg-brand-accent p-2.5 text-white shadow-[0_2px_12px_-2px_rgb(240_120_74/0.45)] transition hover:bg-brand-accent-light active:scale-[0.98]"
                      aria-label={navLabel("donate")}
                    >
                      <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
                    </Link>
                  </>
                ) : null}
                <button
                  type="button"
                  className="touch-target focus-ring inline-flex items-center justify-center rounded-lg p-2 text-brand-muted transition-colors hover:bg-brand-surface hover:text-brand-ink"
                  aria-label={mobileOpen ? navLabel("closeMenu") : navLabel("openMenu")}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((open) => !open)}
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuPortal}
    </>
  );
}
