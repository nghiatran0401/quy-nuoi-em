import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { newsSectionCopy } from "@/content/home-sections";
import { getLatestNews } from "@/lib/data/news";
import type { Locale } from "@/i18n/config";

type Props = { locale: Locale };

function formatNewsDate(date: string) {
  return date.replace(/^Thứ \w+,\s*/i, "").replace(/^\w+,\s*/i, "");
}

export function HomeNewsSection({ locale }: Props) {
  const copy = newsSectionCopy[locale];
  const articles = getLatestNews(3);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-green">{copy.eyebrow}</h2>
            <h3 className="font-heading text-3xl font-bold text-brand-blue md:text-4xl">{copy.title}</h3>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 font-bold text-brand-blue transition-all hover:gap-3"
          >
            {copy.viewAll}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-full flex-col md:flex-row">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 md:aspect-auto md:w-2/5">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  ) : (
                    <div className="flex min-h-[200px] h-full w-full items-center justify-center bg-gray-50 text-5xl text-gray-300">
                      📰
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-brand-blue">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-brand-blue" />
                        <span className="font-medium">{copy.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-brand-blue" />
                        <span>{formatNewsDate(article.date)}</span>
                      </div>
                    </div>
                    {article.excerpt ? (
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-500">
                        {article.excerpt.replace(/[*#\[\]]/g, "").slice(0, 160)}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-auto border-t border-gray-50 pt-4">
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-all hover:gap-3"
                    >
                      {copy.readMore}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
