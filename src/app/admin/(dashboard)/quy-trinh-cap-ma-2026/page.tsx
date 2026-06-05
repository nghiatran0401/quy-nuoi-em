import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default function Process2026AdminPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quy trình cấp mã — nội dung trên trang chủ"
        description="Nội dung quy trình 6 bước hiển thị trên trang chủ. Chỉnh trong mã nguồn."
      />
      <div className="admin-card space-y-4 p-5">
        <p className="text-sm text-slate-700">
          Chỉnh nội dung tại file <code>src/content/process-2026-content.ts</code>. Khi chạy dev, thay đổi sẽ hot
          reload trực tiếp trên giao diện.
        </p>
        <Link
          href="/"
          target="_blank"
          className="admin-btn-secondary inline-flex text-sm"
        >
          <ExternalLink className="h-4 w-4" />
          Xem trên trang chủ
        </Link>
      </div>
    </div>
  );
}
