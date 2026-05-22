import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ArticleContent } from "@/components/data/article-content";
import { JsonLd } from "@/components/seo/json-ld";
import { ShareButtons } from "@/components/seo/share-buttons";
import { getDataUiLabel } from "@/content/pages/data-pages";
import { getNewsBySlug, getNewsSlugs } from "@/lib/data/news";
import type { Locale } from "@/i18n/config";
import { resolveLocale } from "@/lib/locale-page";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getDataPageMeta } from "@/content/pages/data-pages";
import { buildMetadata, stripMarkdown } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/paths";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await resolveLocale(params)) as Locale;
  const article = getNewsBySlug(slug);
  if (!article) return {};

  const description =
    article.excerpt?.trim() ||
    stripMarkdown(article.content.slice(0, 500), 160) ||
    getDataPageMeta("news", locale).description;

  return buildMetadata({
    locale,
    title: article.title,
    description,
    pathname: `/news/${slug}`,
    ogImage: article.imageUrl,
    ogType: "article",
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await resolveLocale(params)) as Locale;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  const description =
    article.excerpt?.trim() ||
    stripMarkdown(article.content.slice(0, 500), 160) ||
    getDataPageMeta("news", locale).description;

  const newsListMeta = getDataPageMeta("news", locale);
  const pathname = `/news/${slug}`;

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          articleJsonLd({
            locale,
            title: article.title,
            description,
            pathname,
            imageUrl: article.imageUrl,
          }),
          breadcrumbJsonLd(
            [
              { name: newsListMeta.title, pathname: "/news" },
              { name: article.title, pathname },
            ],
            locale,
          ),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6">
        <Link href="/news" className="back-link mb-8">
          <ArrowLeft className="h-4 w-4" />
          {getDataUiLabel(locale, "backToNews")}
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
          {getDataUiLabel(locale, "publishedOn")} {article.date}
        </p>
        <ArticleContent content={article.content} skipTopHeading />
        <ShareButtons
          className="mt-10 border-t border-brand-border/60 pt-8"
          locale={locale}
          title={article.title}
          url={absoluteUrl(pathname, locale)}
        />
      </div>
    </article>
  );
}
