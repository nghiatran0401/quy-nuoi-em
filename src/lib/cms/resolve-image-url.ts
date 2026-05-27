import { siteImage } from "@/lib/images";

/** Resolve CMS-stored path or absolute URL for next/image. */
export function resolveCmsImageUrl(url: string | null | undefined, fallback: string): string {
  const value = url?.trim() || fallback;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return siteImage(value.startsWith("/") ? value : `/${value}`);
}
