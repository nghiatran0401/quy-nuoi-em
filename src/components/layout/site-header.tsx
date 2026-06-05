"use client";

import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/logo";
import { mainNavItems, navLabel } from "@/lib/navigation";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <nav className="site-header transition-all duration-300">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-20">
          <div className="flex min-w-0 shrink-0 items-center">
            <Link
              href="/"
              className="block rounded-xl transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              <BrandLogo priority className="h-10 w-auto max-w-[56px] object-contain sm:h-12 sm:max-w-[68px]" />
            </Link>
          </div>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
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

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/dong-gop" className="btn-primary-sm">
              <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
              <span>{navLabel("donate")}</span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href="/dong-gop"
              className="touch-target focus-ring inline-flex items-center justify-center rounded-full bg-brand-accent p-2.5 text-white shadow-[0_2px_12px_-2px_rgb(240_120_74/0.45)] transition hover:bg-brand-accent-light active:scale-[0.98]"
              aria-label={navLabel("donate")}
            >
              <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
            </Link>
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

        {mobileOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 top-16 z-40 bg-brand-ink/20 backdrop-blur-[2px] lg:hidden"
              aria-label={navLabel("closeMenu")}
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-50 max-h-[min(72vh,calc(100dvh-4.5rem))] space-y-1 overflow-y-auto overscroll-contain border-t border-brand-border bg-white/95 pb-safe pt-3 shadow-[var(--shadow-brand-soft)] backdrop-blur-xl lg:hidden">
            {mainNavItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block min-h-11 rounded-lg px-3 py-2.5 text-base text-brand-ink hover:bg-brand-surface active:bg-brand-sky-soft"
                  onClick={() => setMobileOpen(false)}
                >
                  {navLabel(item.labelKey)}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block min-h-11 rounded-lg px-3 py-2.5 text-base text-brand-ink hover:bg-brand-surface active:bg-brand-sky-soft"
                  onClick={() => setMobileOpen(false)}
                >
                  {navLabel(item.labelKey)}
                </Link>
              ),
            )}
            <div className="px-3 pt-2">
              <Link
                href="/dong-gop"
                className="btn-primary-sm flex w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
                <span>{navLabel("donate")}</span>
              </Link>
            </div>
          </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}
