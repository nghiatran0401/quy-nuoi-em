import type { Metadata } from "next";
import { NewsGrid } from "@/components/data/news-grid";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { getDataPageHero, getDataUiLabel } from "@/content/pages/data-pages";
import { getAllNews } from "@/lib/data/news";
import type { Locale } from "@/i18n/config";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createDataPageMetadata("news", locale);
}

export default async function NewsPage({ params }: PageProps) {
  const locale = (await resolveLocale(params)) as Locale;

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <DataPageBanner {...getDataPageHero("news", locale)} />
      <NewsGrid articles={getAllNews()} readMoreLabel={getDataUiLabel(locale, "readMore")} />
    </article>
  );
}
