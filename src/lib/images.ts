const SITE_ORIGIN = "https://quytonybuoisang.com";

export function siteImage(path: string) {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function partnerLogo(slug: string) {
  return siteImage(`/logo-doi-tac/${slug}.jpg`);
}
