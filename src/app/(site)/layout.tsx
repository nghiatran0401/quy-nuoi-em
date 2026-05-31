import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site-copy";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { buildRootMetadata } from "@/lib/seo/metadata";

type SiteLayoutProps = {
  children: ReactNode;
};

export function generateMetadata(): Metadata {
  const { metadata } = siteCopy;
  return buildRootMetadata({
    title: metadata.title,
    ogTitle: metadata.ogTitle,
    description: metadata.description,
    keywords: metadata.keywords.split(",").map((k) => k.trim()),
  });
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const supabaseUrl = isSupabaseConfigured()
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : undefined;

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      {supabaseUrl ? (
        <>
          <link rel="preconnect" href={supabaseUrl} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={supabaseUrl} />
        </>
      ) : null}
      <div className="flex min-h-screen min-w-0 flex-col">
        <SiteHeader />
        <main className="min-w-0 flex-grow">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
