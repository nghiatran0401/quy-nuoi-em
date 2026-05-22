import type { Metadata } from "next";
import { ThienNguyenEmbed } from "@/components/data/thien-nguyen-embed";
import type { Locale } from "@/i18n/config";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createDataPageMetadata("statements", locale);
}

export default async function StatementsPage({ params }: PageProps) {
  const locale = (await resolveLocale(params)) as Locale;
  return <ThienNguyenEmbed locale={locale} />;
}
