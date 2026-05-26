import type { Metadata } from "next";
import { QuyTrinhCapMa2026View } from "@/components/pages/quy-trinh-cap-ma-2026-view";
import { getProcess2026PageContent } from "@/lib/data/process-2026-page";
import { resolveLocale } from "@/lib/locale-page";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = await getProcess2026PageContent(locale);

  return buildMetadata({
    locale,
    title: content.meta.title,
    description: content.meta.description,
    pathname: "/quy-trinh-cap-ma-2026",
    keywords: ["Nuôi Em", "quy trình nhận mã", "mã NE", "quy trình 2026", "chuyển khoản"],
    ogType: "website",
  });
}

export default async function QuyTrinhCapMa2026Page({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const content = await getProcess2026PageContent(locale);

  return <QuyTrinhCapMa2026View locale={locale} content={content} />;
}
