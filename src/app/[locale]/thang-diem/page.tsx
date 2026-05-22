import type { Metadata } from "next";
import { ScoringView } from "@/components/pages/views/thang-diem";
import { createStaticPageMetadata } from "@/lib/page-metadata";

import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createStaticPageMetadata("scoring", locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <ScoringView locale={locale} />;
}
