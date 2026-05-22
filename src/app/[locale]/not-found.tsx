import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "vi",
  title: "Không tìm thấy trang",
  description: "Trang bạn tìm không tồn tại trên Dự án Nuôi Em.",
  pathname: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="section-warm mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="heading-display text-4xl">404</h1>
      <p className="text-body mt-4">Trang bạn tìm chưa có trong giai đoạn 1.</p>
      <Link href="/" className="btn-primary mt-8">
        Về trang chủ
      </Link>
    </div>
  );
}
