import type { Metadata } from "next";
import { AboutView } from "@/components/pages/views/about";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import { createPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createPageMetadata(getStaticPageMeta("about", locale), locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <AboutView locale={locale} />;
}
