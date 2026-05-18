import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ArticleContent } from "@/components/data/article-content";
import { getDataUiLabel } from "@/content/pages/data-pages";
import { getNewsBySlug, getNewsSlugs } from "@/lib/data/news";
import type { Locale } from "@/i18n/config";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const article = getNewsBySlug(slug);
  if (!article) return {};

  const siteName = locale === "vi" ? "Dự án Nuôi Em" : "Nuoi Em Project";
  return {
    title: `${article.title} | ${siteName}`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await resolveLocale(params)) as Locale;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  return (
    <article className="min-h-screen bg-brand-surface pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6">
        <Link
          href="/news"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {getDataUiLabel(locale, "backToNews")}
        </Link>
        {article.imageUrl ? (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <Image src={article.imageUrl} alt="" fill className="object-cover" priority />
          </div>
        ) : null}
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
          {getDataUiLabel(locale, "publishedOn")} {article.date}
        </p>
        <ArticleContent content={article.content} />
      </div>
    </article>
  );
}
