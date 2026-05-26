import type { Metadata } from "next";
import { AboutView } from "@/components/pages/views/about";
import { getAboutPageContent } from "@/lib/data/about-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = await getAboutPageContent(locale);
  return buildMetadata({
    locale,
    title: content.meta.title,
    description: content.meta.description,
    pathname: "/about",
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const content = await getAboutPageContent(locale);
  return <AboutView locale={locale} content={content} />;
}
