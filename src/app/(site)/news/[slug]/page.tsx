import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArticleContent } from "@/components/data/article-content";
import { JsonLd } from "@/components/seo/json-ld";
import { ShareButtons } from "@/components/seo/share-buttons";
import { getDataPageMeta, getDataUiLabel } from "@/content/pages/data-pages";
import { getNewsBySlug, getNewsSlugs } from "@/lib/data/news";
import {
  articleJsonLd,
  siteBreadcrumb,
  webPageJsonLd,
} from "@/lib/seo/json-ld";
import { buildMetadata, stripMarkdown } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/paths";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};

  const description =
    article.excerpt?.trim() ||
    stripMarkdown(article.content.slice(0, 500), 160) ||
    getDataPageMeta("news").description;

  const sectionLabel = getDataPageMeta("news").title;

  return buildMetadata({
    title: article.title,
    description,
    pathname: `/news/${slug}`,
    ogImage: article.imageUrl,
    ogImageAlt: article.title,
    ogType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    articleSection: sectionLabel,
    articleAuthors: ["Quỹ Nuôi Em"],
    articleTags: ["Quỹ Nuôi Em", "bản tin", "hoạt động", "trẻ em vùng cao"],
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  const description =
    article.excerpt?.trim() ||
    stripMarkdown(article.content.slice(0, 500), 160) ||
    getDataPageMeta("news").description;

  const newsListMeta = getDataPageMeta("news");
  const pathname = `/news/${slug}`;
  const articleUrl = absoluteUrl(pathname);
  const breadcrumbId = `${articleUrl}#breadcrumb`;

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          webPageJsonLd({
            title: article.title,
            description,
            pathname,
            imageUrl: article.imageUrl,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt ?? article.publishedAt,
            breadcrumbId,
          }),
          articleJsonLd({
            title: article.title,
            description,
            pathname,
            imageUrl: article.imageUrl,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt ?? article.publishedAt,
            section: newsListMeta.title,
            tags: ["Quỹ Nuôi Em", "bản tin", "hoạt động", "trẻ vùng cao"],
          }),
          siteBreadcrumb(
            [
              { name: newsListMeta.title, pathname: "/news" },
              { name: article.title, pathname },
            ],
            breadcrumbId,
          ),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6">
        <Link href="/news" className="back-link mb-8">
          <ArrowLeft className="h-4 w-4" />
          {getDataUiLabel("backToNews")}
        </Link>
        {article.imageUrl ? (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-brand-border/60 bg-white shadow-sm">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}
        <h1 className="heading-display mb-2 text-3xl md:text-4xl">{article.title}</h1>
        <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-brand-accent">
          {getDataUiLabel("publishedOn")} {article.date}
        </p>
        <ArticleContent content={article.content} skipTopHeading />
        <ShareButtons
          className="mt-10 border-t border-brand-border/60 pt-8"
          title={article.title}
          url={absoluteUrl(pathname)}
        />
      </div>
    </article>
  );
}
