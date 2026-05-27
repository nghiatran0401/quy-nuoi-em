import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { newsSectionCopy } from "@/content/home-sections";
import { getLatestNews } from "@/lib/data/news";

function formatNewsDate(date: string) {
  return date.replace(/^Thứ \w+,\s*/i, "").replace(/^\w+,\s*/i, "");
}

export async function HomeNewsSection() {
  const copy = newsSectionCopy;
  const articles = await getLatestNews(3);

  return (
    <section className="bg-brand-sky-soft/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div>
            <h2 className="eyebrow mb-2">{copy.eyebrow}</h2>
            <h3 className="heading-display text-3xl font-bold md:text-4xl">{copy.title}</h3>
          </div>
          <Link
            href="/news"
            className="link-accent group flex items-center gap-2 transition-all hover:gap-3"
          >
            {copy.viewAll}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        {articles.length === 0 ? (
          <p className="text-center text-brand-muted">
            Chưa có tin tức. Vui lòng quay lại sau.
          </p>
        ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="brand-card-interactive group overflow-hidden"
            >
              <div className="flex h-full flex-col md:flex-row">
                <div className="relative aspect-video w-full overflow-hidden bg-brand-surface md:aspect-auto md:w-2/5">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  ) : (
                    <div className="flex min-h-[200px] h-full w-full items-center justify-center bg-brand-warm text-5xl text-brand-muted/40">
                      📰
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-brand-ink transition-colors group-hover:text-brand-accent">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-brand-muted">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-brand-green" />
                        <span className="font-medium">{copy.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-brand-green" />
                        <span>{formatNewsDate(article.date)}</span>
                      </div>
                    </div>
                    {article.excerpt ? (
                      <p className="text-body mb-4 line-clamp-3 text-sm">
                        {article.excerpt.replace(/[*#\[\]]/g, "").slice(0, 160)}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-auto border-t border-brand-border/60 pt-4">
                    <Link
                      href={`/news/${article.slug}`}
                      className="link-accent inline-flex items-center gap-2 text-sm transition-all hover:gap-3"
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
        )}
      </div>
    </section>
  );
}
