import { getMetadataBase, getSiteUrl } from "@/config/site";

export function localizedPath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized === "/" ? "/" : normalized;
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  const path = localizedPath(pathname);
  return path === "/" ? base : `${base}${path}`;
}

/** Resolve a site-relative asset path or external URL to an absolute URL for crawlers. */
export function absoluteAssetUrl(pathOrUrl: string | undefined | null): string | undefined {
  const value = pathOrUrl?.trim();
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  const base = getMetadataBase();
  return new URL(value.startsWith("/") ? value.slice(1) : value, base).toString();
}
