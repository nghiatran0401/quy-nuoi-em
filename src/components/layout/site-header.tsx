"use client";

import { Heart, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/logo";
import { Link } from "@/i18n/navigation";
import { mainNavItems } from "@/lib/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader() {
  const t = useTranslations("nav");
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
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <LocaleSwitcher />
            <Link
              href="/dong-gop"
              className="btn-primary-sm"
            >
              <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
              <span>{t("donate")}</span>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 text-brand-muted transition-colors hover:text-brand-ink focus:outline-none"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
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
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-3 pt-3">
              <LocaleSwitcher />
              <Link
                href="/dong-gop"
                className="btn-primary-sm flex flex-1 justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="h-5 w-5 fill-current text-brand-highlight" aria-hidden />
                <span>{t("donate")}</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
