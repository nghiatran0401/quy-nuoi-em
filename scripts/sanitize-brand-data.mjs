#!/usr/bin/env node
/**
 * Sanitize scraped Tony-era news data for Nuôi Em production branding.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const NEWS = path.join(ROOT, "src/data/news.json");
const ARTICLES = path.join(ROOT, "src/data/news-articles.json");
const FALLBACK_IMAGE = "/images/nuoiem/home-1528463943.jpg";

const TONY_SLUG = "quy-tony-buoi-sang-can-tim";
const NEW_SLUG = "du-an-nuoi-em-tuyen-giam-doc";

function unwrapProxiedImageUrl(url) {
  if (!url) return url;
  if (url.includes("_next/image")) {
    try {
      const inner = new URL(url, "https://example.com").searchParams.get("url");
      if (inner) return decodeURIComponent(inner);
    } catch {
      /* noop */
    }
  }
  const embedded = url.match(/https?:\/\/\/_next\/image\?url=([^&)\s]+)/i);
  if (embedded) return decodeURIComponent(embedded[1]);
  return url;
}

function unwrapEmbeddedInText(text) {
  return text.replace(
    /https?:\/\/\/_next\/image\?url=([^&)\s]+)(?:&[^)\s]*)?/gi,
    (_, encoded) => decodeURIComponent(encoded),
  );
}

function sanitizeText(text) {
  let out = unwrapEmbeddedInText(text)
    .replace(/quytonybuoisang\.com/gi, "")
    .replace(/\[←[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[\*\*#Quỹ\\?_TNBS\*\*\]\([^)]*\)/gi, "Dự án Nuôi Em")
    .replace(/#Quỹ[_\s]*TNBS/gi, "Dự án Nuôi Em")
    .replace(/TONY BUỎI SÁNG/gi, "Dự án Nuôi Em")
    .replace(/TONY BUOI SANG/gi, "Dự án Nuôi Em");

  out = out
    .replace(/\[\*\*#Dự án Nuôi Em\\?_TNBS\*\*\]\([^)]*\)/gi, "Dự án Nuôi Em")
    .replace(/Dự án Nuôi Em TNBS/gi, "Dự án Nuôi Em")
    .replace(/\bTNBS\b/g, "")
    .replace(/Quỹ/g, "Dự án Nuôi Em")
    .replace(/Dự án Nuôi Em Nuôi Em/g, "Dự án Nuôi Em")
    .replace(/ {2,}/g, " ");

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

function cleanExcerpt(excerpt, fallbackFromContent) {
  if (!excerpt && fallbackFromContent) {
    const plain = sanitizeText(fallbackFromContent)
      .replace(/^#+\s*.+\n+/m, "")
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
      .replace(/\*\*/g, "")
      .trim();
    if (plain.length > 40) {
      return plain.length > 220 ? `${plain.slice(0, 217)}…` : plain;
    }
  }
  if (!excerpt) return "";
  let text = excerpt.replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();
  text = sanitizeText(text);
  if (text.length > 220) text = `${text.slice(0, 217)}…`;
  return text;
}

function normalizeImage(url) {
  const unwrapped = unwrapProxiedImageUrl(url);
  if (!unwrapped || unwrapped.includes("quytonybuoisang.com")) {
    return FALLBACK_IMAGE;
  }
  if (unwrapped.startsWith("/")) return unwrapped;
  if (
    unwrapped.includes("supabase.co") ||
    unwrapped.includes("wixstatic.com") ||
    unwrapped.includes("fbcdn.net")
  ) {
    return unwrapped;
  }
  return FALLBACK_IMAGE;
}

const news = JSON.parse(fs.readFileSync(NEWS, "utf8"));
const articles = JSON.parse(fs.readFileSync(ARTICLES, "utf8"));

const updatedNews = news.map((item) => {
  const slug = item.slug === TONY_SLUG ? NEW_SLUG : item.slug;
  const body = articles[slug] ?? articles[item.slug];
  return {
    ...item,
    slug,
    title: sanitizeText(item.title),
    excerpt: cleanExcerpt(item.excerpt, body?.content),
    imageUrl: normalizeImage(item.imageUrl ?? body?.imageUrl),
  };
});

const updatedArticles = {};
for (const [slug, body] of Object.entries(articles)) {
  const key = slug === TONY_SLUG ? NEW_SLUG : slug;
  updatedArticles[key] = {
    ...body,
    title: sanitizeText(body.title),
    content: sanitizeText(body.content),
    imageUrl: body.imageUrl ? normalizeImage(body.imageUrl) : undefined,
  };
}

fs.writeFileSync(NEWS, `${JSON.stringify(updatedNews, null, 2)}\n`);
fs.writeFileSync(ARTICLES, `${JSON.stringify(updatedArticles, null, 2)}\n`);
console.log("Sanitized news.json and news-articles.json");
