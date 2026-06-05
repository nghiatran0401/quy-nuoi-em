import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default function HomepageAdminPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Trang chủ đã chuyển sang code"
        description="CMS cho trang chủ đã được tắt. Nội dung trang chủ giờ quản lý trực tiếp trong mã nguồn."
      />
      <div className="admin-card p-5">
        <p className="text-sm text-slate-700">
          Chỉnh nội dung tại file <code>src/content/homepage-content.ts</code>. Khi chạy dev, thay đổi sẽ hot
          reload trực tiếp trên giao diện.
        </p>
      </div>
    </div>
  );
}
