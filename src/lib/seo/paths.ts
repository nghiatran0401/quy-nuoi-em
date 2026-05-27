import { getSiteUrl } from "@/config/site";

export function localizedPath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalized === "/" ? "/" : normalized;
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  const path = localizedPath(pathname);
  return path === "/" ? base : `${base}${path}`;
}
