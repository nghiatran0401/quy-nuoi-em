import type { Metadata } from "next";
import { MembersView } from "@/components/pages/views/thanh-vien-quy";
import { createStaticPageMetadata } from "@/lib/page-metadata";

import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createStaticPageMetadata("members", locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <MembersView locale={locale} />;
}
