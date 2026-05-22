import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { HtmlLang } from "@/components/layout/html-lang";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { locales, type Locale } from "@/i18n/config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { buildRootMetadata } from "@/lib/seo/metadata";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildRootMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const resolvedLocale = locale as Locale;
  setRequestLocale(resolvedLocale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang />
      <JsonLd data={[organizationJsonLd(resolvedLocale), websiteJsonLd(resolvedLocale)]} />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
