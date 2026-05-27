import { isAllowedNewsImage, sanitizeBrandText, unwrapProxiedImageUrl } from "@/lib/brand-sanitize";
import { nuoiEmImage } from "@/lib/nuoiem-images";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import type { NewsArticle, NewsArticleDetail } from "@/lib/data/types";
import type { NewsArticleRow } from "@/types/supabase";

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
    slug: article.slug,
    title: sanitizeBrandText(article.title),
    excerpt: article.excerpt ? sanitizeBrandText(article.excerpt) : undefined,
    imageUrl: normalizeImage(article.imageUrl),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  };
}

function formatPublishedDate(row: Pick<NewsArticleRow, "display_date" | "published_at">): string {
  if (row.display_date) return row.display_date;
  if (!row.published_at) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(row.published_at));
}

function rowToArticle(row: NewsArticleRow): NewsArticle {
  return normalizeArticle({
    slug: row.slug,
    title: row.title,
    date: formatPublishedDate(row),
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    excerpt: row.excerpt ?? undefined,
    imageUrl: row.image_url ?? undefined,
  });
}

function rowToDetail(row: NewsArticleRow): NewsArticleDetail {
  const base = rowToArticle(row);
  return {
    ...base,
    content: sanitizeBrandText(row.content),
  };
}

async function fetchSupabasePublished(): Promise<NewsArticleRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .eq("locale", "vi")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("[news] Supabase fetch failed:", error.message);
    return [];
  }

  return (data ?? []) as NewsArticleRow[];
}

function sortByDateDesc(items: NewsArticle[]): NewsArticle[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date, "vi"));
}

export async function getAllNews(): Promise<NewsArticle[]> {
  const rows = await fetchSupabasePublished();
  return sortByDateDesc(rows.map(rowToArticle));
}

export async function getNewsBySlug(slug: string): Promise<NewsArticleDetail | undefined> {
  if (!isSupabaseConfigured()) return undefined;

  const supabase = createPublicClient();
  const { data } = await supabase
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .eq("locale", "vi")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return undefined;
  return rowToDetail(data as NewsArticleRow);
}

export async function getNewsSlugs(): Promise<string[]> {
  const rows = await fetchSupabasePublished();
  return rows.map((row) => row.slug);
}

export async function getNewsSitemapEntries(): Promise<
  Array<{ slug: string; lastModified?: string }>
> {
  const rows = await fetchSupabasePublished();
  return rows.map((row) => ({
    slug: row.slug,
    lastModified: row.updated_at || row.published_at || undefined,
  }));
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  const all = await getAllNews();
  return all.slice(0, limit);
}
