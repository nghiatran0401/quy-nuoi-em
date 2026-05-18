import type { Metadata } from "next";
import { ProcessView } from "@/components/pages/views/quy-trinh-xet-duyet";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import { createPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createPageMetadata(getStaticPageMeta("process", locale), locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <ProcessView locale={locale} />;
}
