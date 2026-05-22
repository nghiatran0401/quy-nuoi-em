import type { Metadata } from "next";
import { HistoryView } from "@/components/pages/views/lich-su-hinh-thanh";
import { createStaticPageMetadata } from "@/lib/page-metadata";

import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createStaticPageMetadata("history", locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <HistoryView locale={locale} />;
}
