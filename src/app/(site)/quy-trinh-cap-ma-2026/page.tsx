import type { Metadata } from "next";
import { QuyTrinhCapMa2026View } from "@/components/pages/quy-trinh-cap-ma-2026-view";
import { getProcess2026PageContent } from "@/lib/data/process-2026-page";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getProcess2026PageContent();

  return buildMetadata({
    title: content.meta.title,
    description: content.meta.description,
    pathname: "/quy-trinh-cap-ma-2026",
    keywords: ["Nuôi Em", "quy trình nhận mã", "mã NE", "quy trình 2026", "chuyển khoản"],
    ogType: "website",
  });
}

export default async function QuyTrinhCapMa2026Page() {
  const content = await getProcess2026PageContent();
  return <QuyTrinhCapMa2026View content={content} />;
}
