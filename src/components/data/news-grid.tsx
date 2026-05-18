import Image from "next/image";
import { Calendar, ChevronRight, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { NewsArticle } from "@/lib/data/types";

type NewsGridProps = {
  articles: NewsArticle[];
  readMoreLabel: string;
};

function stripExcerpt(text: string) {
  return text.replace(/[*#[\]]/g, "").replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();
}

export function NewsGrid({ articles, readMoreLabel }: NewsGridProps) {
  return (
    <ul className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
      {articles.map((article) => (
        <li
          key={article.slug}
          className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center bg-brand-warm text-5xl text-gray-300">
                📰
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h2 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-brand-accent">
                <Link href={`/news/${article.slug}`}>{article.title}</Link>
              </h2>
              <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-brand-blue" aria-hidden />
                  <span className="font-medium">Admin</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-brand-blue" aria-hidden />
                  <span>{article.date}</span>
                </span>
              </div>
              {article.excerpt ? (
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
                  {stripExcerpt(article.excerpt).slice(0, 160)}
                </p>
              ) : null}
            </div>
            <div className="mt-4 border-t border-gray-50 pt-4">
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-all hover:gap-3"
              >
                {readMoreLabel}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
