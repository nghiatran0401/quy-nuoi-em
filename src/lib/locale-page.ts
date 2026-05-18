import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return "vi";
  }
  setRequestLocale(locale);
  return locale as Locale;
}
