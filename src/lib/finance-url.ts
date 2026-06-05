import { getSiteUrl } from "@/config/site";

export const FINANCE_PAGE_PATH = "/tai-chinh";

export const FINANCE_STATEMENTS_PATH = `${FINANCE_PAGE_PATH}#sao-ke`;

const LEGACY_FINANCE_HOSTS = new Set(["taichinh.nuoiem.com", "www.taichinh.nuoiem.com"]);

const LEGACY_FINANCE_URL_PATTERN = /https?:\/\/(?:www\.)?taichinh\.nuoiem\.com\/?/gi;

/** Canonical public URL for share cards, CMS copy, and legacy rewrites. */
export function getFinancePageUrl(): string {
  return `${getSiteUrl()}${FINANCE_PAGE_PATH}`;
}

/** Replace old taichinh.nuoiem.com links in stored copy with the new finance page URL. */
export function rewriteLegacyFinanceUrls(text: string): string {
  return text.replace(LEGACY_FINANCE_URL_PATTERN, getFinancePageUrl());
}

/** Map a legacy finance hostname to an in-app route (preserves hash). */
export function legacyFinancePath(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!LEGACY_FINANCE_HOSTS.has(parsed.hostname)) {
      return null;
    }

    return `${FINANCE_PAGE_PATH}${parsed.hash}`;
  } catch {
    return null;
  }
}
