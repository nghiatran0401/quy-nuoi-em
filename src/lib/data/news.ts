import newsJson from "@/data/news.json";
import articlesJson from "@/data/news-articles.json";
import { nuoiEmImage } from "@/lib/nuoiem-images";
import {
  isAllowedNewsImage,
  normalizeNewsSlug,
  sanitizeBrandText,
  unwrapProxiedImageUrl,
} from "@/lib/brand-sanitize";
import type { NewsArticle, NewsArticleDetail } from "@/lib/data/types";

const articles = newsJson as NewsArticle[];
const articleBodies = articlesJson as Record<
  string,
  { title: string; date: string; imageUrl?: string; content: string }
>;

const FALLBACK_NEWS_IMAGE = nuoiEmImage("hero");

function normalizeImage(url: string | undefined): string | undefined {
  const unwrapped = unwrapProxiedImageUrl(url);
  if (!unwrapped || !isAllowedNewsImage(unwrapped)) {
    return FALLBACK_NEWS_IMAGE;
  }
  return unwrapped;
}

function normalizeArticle(article: NewsArticle): NewsArticle {
  return {
    ...article,
    slug: normalizeNewsSlug(article.slug),
    title: sanitizeBrandText(article.title),
    excerpt: article.excerpt ? sanitizeBrandText(article.excerpt) : undefined,
    imageUrl: normalizeImage(article.imageUrl),
  };
}

export function getAllNews(): NewsArticle[] {
  return articles.map(normalizeArticle).sort((a, b) => b.date.localeCompare(a.date, "vi"));
}

export function getNewsBySlug(slug: string): NewsArticleDetail | undefined {
  const resolvedSlug = normalizeNewsSlug(slug);
  const summary = articles.find((article) => normalizeNewsSlug(article.slug) === resolvedSlug);
  const body = articleBodies[resolvedSlug] ?? articleBodies[slug];

  if (!summary && !body) return undefined;

  const title = sanitizeBrandText(body?.title ?? summary?.title ?? resolvedSlug);
  const imageUrl = normalizeImage(body?.imageUrl ?? summary?.imageUrl);

  return {
    slug: resolvedSlug,
    title,
    date: body?.date ?? summary?.date ?? "",
    excerpt: summary?.excerpt ? sanitizeBrandText(summary.excerpt) : undefined,
    imageUrl,
    content: body?.content ? sanitizeBrandText(body.content) : "",
  };
}

export function getNewsSlugs(): string[] {
  return articles.map((article) => normalizeNewsSlug(article.slug));
}

export function getLatestNews(limit = 3): NewsArticle[] {
  return getAllNews().slice(0, limit);
}
