import type { Metadata } from "next";
import { ThienNguyenEmbed } from "@/components/data/thien-nguyen-embed";
import { getDataPageMeta } from "@/content/pages/data-pages";
import { createPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createPageMetadata(getDataPageMeta("statements", locale), locale);
}

export default function StatementsPage() {
  return <ThienNguyenEmbed />;
}
