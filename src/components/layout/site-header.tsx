"use client";

import { Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { mainNavItems } from "@/lib/navigation";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex shrink-0 items-center">
            <Link href="/" className="block" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo/logo-quytnbs.svg"
                alt="Quỹ Tony Buổi Sáng"
                width={120}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 transition-colors hover:text-brand-blue"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <LocaleSwitcher />
            <Link
              href="/dong-gop"
              className="flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2 font-medium text-white transition-all hover:opacity-90"
            >
              <Heart className="h-5 w-5 fill-current text-brand-green" aria-hidden />
              <span>{t("donate")}</span>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 text-gray-600 transition-colors hover:text-brand-blue focus:outline-none"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="space-y-1 border-t border-gray-100 pb-4 pt-3 md:hidden">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-blue"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-3 pt-3">
              <LocaleSwitcher />
              <Link
                href="/dong-gop"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-blue px-4 py-2 font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="h-5 w-5 fill-current text-brand-green" aria-hidden />
                <span>{t("donate")}</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
