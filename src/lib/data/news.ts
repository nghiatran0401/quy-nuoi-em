import newsJson from "@/data/news.json";
import articlesJson from "@/data/news-articles.json";
import type { NewsArticle, NewsArticleDetail } from "@/lib/data/types";

const articles = newsJson as NewsArticle[];
const articleBodies = articlesJson as Record<
  string,
  { title: string; date: string; imageUrl?: string; content: string }
>;

export function getAllNews(): NewsArticle[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date, "vi"));
}

export function getNewsBySlug(slug: string): NewsArticleDetail | undefined {
  const summary = articles.find((article) => article.slug === slug);
  const body = articleBodies[slug];
  if (!summary && !body) return undefined;

  return {
    slug,
    title: body?.title ?? summary?.title ?? slug,
    date: body?.date ?? summary?.date ?? "",
    excerpt: summary?.excerpt,
    imageUrl: body?.imageUrl ?? summary?.imageUrl,
    content: body?.content ?? "",
  };
}

export function getNewsSlugs(): string[] {
  return articles.map((article) => article.slug);
}

export function getLatestNews(limit = 3): NewsArticle[] {
  return getAllNews().slice(0, limit);
}
