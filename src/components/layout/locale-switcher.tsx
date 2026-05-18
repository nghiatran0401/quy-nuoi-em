"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const nextLocale: Locale = locale === "vi" ? "en" : "vi";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
      aria-label={nextLocale === "en" ? t("switchToEnglish") : t("switchToVietnamese")}
    >
      <span className="text-base leading-none">{nextLocale === "en" ? "🇬🇧" : "🇻🇳"}</span>
      <span>{nextLocale === "en" ? "EN" : "VI"}</span>
    </button>
  );
}
