import type { Metadata } from "next";
import { QuyTrinhCapMa2026View } from "@/components/pages/quy-trinh-cap-ma-2026-view";
import type { Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale: locale as Locale,
    title: "Quy trình cấp và nhận mã Nuôi Em 2026",
    description:
      "Hướng dẫn đầy đủ cho anh/chị nuôi mới: nhận mã NE qua Fanpage, chuyển khoản đúng cú pháp, vào group, tra mã, nhận ảnh hàng tháng và lịch thăm em.",
    pathname: "/quy-trinh-cap-ma-2026",
    keywords: ["Nuôi Em", "quy trình nhận mã", "mã NE", "quy trình 2026", "chuyển khoản"],
    ogType: "website",
  });
}

export default function QuyTrinhCapMa2026Page() {
  return <QuyTrinhCapMa2026View />;
}
