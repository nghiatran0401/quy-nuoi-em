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
import { DATA_PAGE_PATHS, newsArticlePath } from "@/lib/seo/routes";
import { createDataPageMetadata } from "@/lib/page-metadata";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = createDataPageMetadata("news");

export const revalidate = 60;

export default async function NewsPage() {
  const articles = await getAllNews();
  const meta = getDataPageMeta("news");

  const itemList = itemListJsonLd({
    name: meta.title,
    description: meta.description,
    items: articles.map((article) => ({
      name: article.title,
      pathname: newsArticlePath(article.slug),
      description: article.excerpt,
    })),
  });

  return (
    <article className="min-h-screen bg-brand-warm page-bottom-pad">
      <JsonLd
        data={[
          collectionPageJsonLd({
            title: meta.title,
            description: meta.description,
            pathname: DATA_PAGE_PATHS.news,
            hasPart: itemList,
          }),
          itemList,
          siteBreadcrumb([{ name: meta.title, pathname: DATA_PAGE_PATHS.news }]),
        ]}
      />
      <DataPageBanner {...getDataPageHero("news")} />
      <NewsGrid
        articles={articles}
        readMoreLabel={getDataUiLabel("readMore")}
        emptyLabel="Chưa có tin tức. Vui lòng quay lại sau."
      />
    </article>
  );
}
