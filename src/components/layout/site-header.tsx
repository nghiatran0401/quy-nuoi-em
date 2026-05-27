"use client";

import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/logo";
import { mainNavItems, navLabel } from "@/lib/navigation";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="site-header transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="block rounded-xl transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              <BrandLogo priority className="h-11 w-auto max-w-[140px]" />
            </Link>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {navLabel(item.labelKey)}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/dong-gop" className="btn-primary-sm">
              <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
              <span>{navLabel("donate")}</span>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 text-brand-muted transition-colors hover:text-brand-ink focus:outline-none"
              aria-label={mobileOpen ? navLabel("closeMenu") : navLabel("openMenu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="space-y-1 border-t border-brand-border pb-4 pt-3 md:hidden">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-brand-ink hover:bg-brand-surface"
                onClick={() => setMobileOpen(false)}
              >
                {navLabel(item.labelKey)}
              </Link>
            ))}
            <div className="px-3 pt-3">
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
        ) : null}
      </div>
    </nav>
  );
}
