import Image from "next/image";
import { Calendar, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import type { NewsArticle } from "@/lib/data/types";
import { newsArticlePath } from "@/lib/seo/routes";

type NewsGridProps = {
  articles: NewsArticle[];
  readMoreLabel: string;
  emptyLabel?: string;
};

function stripExcerpt(text: string) {
  return text.replace(/[*#[\]]/g, "").replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();
}

export function NewsGrid({ articles, readMoreLabel, emptyLabel }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <p className="mx-auto max-w-3xl px-4 py-12 text-center text-brand-muted sm:px-6">
        {emptyLabel ?? "Chưa có bài viết."}
      </p>
    );
  }

  return (
    <ul className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            href={newsArticlePath(article.slug)}
            className="brand-card-interactive group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center text-5xl text-brand-muted/40">
                  📰
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="mb-2 line-clamp-2 font-heading text-xl font-bold leading-tight text-brand-ink transition-colors group-hover:text-brand-accent">
                  {article.title}
                </h2>
                <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-brand-muted">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-brand-green" aria-hidden />
                    <span className="font-medium">Admin</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand-green" aria-hidden />
                    <span>{article.date}</span>
                  </span>
                </div>
                {article.excerpt ? (
                  <p className="line-clamp-3 text-sm leading-relaxed text-brand-muted">
                    {stripExcerpt(article.excerpt).slice(0, 160)}
                  </p>
                ) : null}
              </div>
              <div className="mt-4 border-t border-brand-border/50 pt-4">
                <span className="link-accent inline-flex items-center gap-2 text-sm">
                  {readMoreLabel}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
