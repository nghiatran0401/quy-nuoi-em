import type { Metadata } from "next";

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

/** Search Console / domain verification tags (set in production env). */
export function getSiteVerification(): Metadata["verification"] | undefined {
  const google = env("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
  const bing = env("NEXT_PUBLIC_BING_SITE_VERIFICATION");
  const facebook = env("NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION");
  const pinterest = env("NEXT_PUBLIC_PINTEREST_SITE_VERIFICATION");

  const other: Record<string, string | string[]> = {};
  if (bing) other["msvalidate.01"] = bing;
  if (facebook) other["facebook-domain-verification"] = facebook;
  if (pinterest) other["p:domain_verify"] = pinterest;

  if (!google && Object.keys(other).length === 0) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(Object.keys(other).length > 0 ? { other } : {}),
  };
}

export function getSocialMetaOther(): Record<string, string> {
  const other: Record<string, string> = {};
  const fbAppId = env("NEXT_PUBLIC_FACEBOOK_APP_ID");
  if (fbAppId) other["fb:app_id"] = fbAppId;
  return other;
}
