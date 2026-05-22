import type { Metadata } from "next";
import { ContactView } from "@/components/pages/views/contact";
import { createStaticPageMetadata } from "@/lib/page-metadata";

import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createStaticPageMetadata("contact", locale);
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  return <ContactView locale={locale} />;
}
