import type { Metadata } from "next";
import { NewsGrid } from "@/components/data/news-grid";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
  getDataUiLabel,
} from "@/content/pages/data-pages";
import { getAllNews } from "@/lib/data/news";
import type { Locale } from "@/i18n/config";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createDataPageMetadata("news", locale);
}

export const revalidate = 60;

export default async function NewsPage({ params }: PageProps) {
  const locale = (await resolveLocale(params)) as Locale;
  const articles = await getAllNews(locale);
  const meta = getDataPageMeta("news", locale);

  const itemList = itemListJsonLd({
    locale,
    name: meta.title,
    description: meta.description,
    items: articles.map((article) => ({
      name: article.title,
      pathname: `/news/${article.slug}`,
      description: article.excerpt,
    })),
  });

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          collectionPageJsonLd({
            locale,
            title: meta.title,
            description: meta.description,
            pathname: "/news",
            hasPart: itemList,
          }),
          itemList,
          siteBreadcrumb([{ name: meta.title, pathname: "/news" }], locale),
        ]}
      />
      <DataPageBanner {...getDataPageHero("news", locale)} />
      <NewsGrid
        articles={articles}
        readMoreLabel={getDataUiLabel(locale, "readMore")}
        emptyLabel={locale === "vi" ? "Chưa có tin tức. Vui lòng quay lại sau." : "No news posts yet. Please check back soon."}
      />
    </article>
  );
}
