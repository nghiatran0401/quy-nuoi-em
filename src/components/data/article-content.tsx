import Link from "next/link";
import type { ReactNode } from "react";
import { sanitizeBrandText } from "@/lib/brand-sanitize";
import { createHeadingIdAssigner } from "@/lib/dieu-khoan-toc";
import { FINANCE_PAGE_PATH, legacyFinancePath } from "@/lib/finance-url";

const URL_PATTERN = /https?:\/\/[^\s]+/g;

function trimUrlTrailingPunctuation(url: string): { href: string; trailing: string } {
  const trailingMatch = url.match(/[.,;:!?)}\]"']+$/);
  if (!trailingMatch) {
    return { href: url, trailing: "" };
  }

  const trailing = trailingMatch[0];
  return { href: url.slice(0, -trailing.length), trailing };
}

function toInternalPath(href: string): string | null {
  const legacyPath = legacyFinancePath(href);
  if (legacyPath) {
    return legacyPath;
  }

  try {
    const url = new URL(href);
    if (url.hostname === "quynuoiem.com" || url.hostname === "www.quynuoiem.com") {
      const pathname = url.pathname.replace(/\/$/, "") || "/";
      if (pathname === FINANCE_PAGE_PATH) {
        return `${FINANCE_PAGE_PATH}${url.hash}`;
      }
      return `${pathname}${url.search}${url.hash}`;
    }
  } catch {
    return null;
  }

  return null;
}

function renderLinkedText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const rawUrl = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const { href, trailing } = trimUrlTrailingPunctuation(rawUrl);
    const internalPath = toInternalPath(href);

    if (internalPath) {
      nodes.push(
        <Link key={`${keyPrefix}-${start}`} href={internalPath} className="link-accent break-all">
          {href}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${keyPrefix}-${start}`}
          href={href}
          className="link-accent break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {href}
        </a>,
      );
    }

    if (trailing) {
      nodes.push(trailing);
    }

    lastIndex = start + rawUrl.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

type ArticleContentProps = {
  content: string;
  /** When the page already renders an <h1>, skip the first markdown H1. */
  skipTopHeading?: boolean;
  /** Add stable `id` anchors on `##` headings for in-page TOC links. */
  anchorHeadings?: boolean;
};

export function ArticleContent({
  content,
  skipTopHeading = false,
  anchorHeadings = false,
}: ArticleContentProps) {
  const lines = sanitizeBrandText(content)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("[←"));

  let skippedTopHeading = false;
  const assignHeadingId = anchorHeadings ? createHeadingIdAssigner() : null;

  return (
    <article className="mt-6 max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith("# ")) {
          if (skipTopHeading && !skippedTopHeading) {
            skippedTopHeading = true;
            return null;
          }
          return (
            <h2 key={index} className="heading-section mb-6">
              {line.slice(2)}
            </h2>
          );
        }
        if (line.startsWith("## ")) {
          const label = line.slice(3);
          const id = assignHeadingId?.(label);
          return (
            <h2
              key={index}
              id={id}
              className="mb-4 mt-8 scroll-mt-24 font-heading text-xl font-bold text-brand-ink"
            >
              {label}
            </h2>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4 list-disc text-brand-muted">
              {renderLinkedText(line.slice(2), `li-${index}`)}
            </li>
          );
        }
        if (line.startsWith("![")) return null;
        if (line.startsWith("[")) return null;
        return (
          <p key={index} className="mb-4 leading-relaxed text-brand-muted">
            {renderLinkedText(line, `p-${index}`)}
          </p>
        );
      })}
    </article>
  );
}
