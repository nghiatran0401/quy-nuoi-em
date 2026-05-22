import type { Metadata } from "next";
import { OrganizationView } from "@/components/pages/views/co-cau-to-chuc";
import { createStaticPageMetadata } from "@/lib/page-metadata";

import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createStaticPageMetadata("organization", locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <OrganizationView locale={locale} />;
}
