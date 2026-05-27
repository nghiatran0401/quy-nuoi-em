import Image from "next/image";
import { AdminAlert } from "@/components/admin/admin-alert";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { decodeAdminParam, formatAdminMessage } from "@/lib/admin/messages";
import { resolveCmsImageUrl } from "@/lib/cms/resolve-image-url";
import { listFinancialReportsForAdmin } from "@/lib/data/financial-reports";
import { updateReportCover } from "./actions";

type PageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function ReportsAdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = formatAdminMessage(params.message);
  const error = decodeAdminParam(params.error);
  const reports = await listFinancialReportsForAdmin();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Ảnh báo cáo tài chính"
        description="Thay ảnh bìa từng báo cáo tháng trên trang /bao-cao. Tiêu đề và link tài liệu giữ nguyên từ dữ liệu hiện có."
      />

      <div className="space-y-3">
        {message ? <AdminAlert variant="success" message={message} /> : null}
        {error ? <AdminAlert variant="error" message={error} /> : null}
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-slate-600">Chưa có báo cáo tài chính.</p>
      ) : (
        <div className="admin-card divide-y divide-slate-200 p-5">
          {reports.map((report) => (
            <form
              key={report.id}
              action={updateReportCover}
              encType="multipart/form-data"
              className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <input type="hidden" name="id" value={report.id} />
              <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                <Image
                  src={resolveCmsImageUrl(report.image_url, report.image_url)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="font-semibold text-slate-900">{report.title}</p>
                <p className="text-xs text-slate-500">Năm {report.year}</p>
                <input
                  name="cover_image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  required
                  className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
                />
              </div>
              <button type="submit" className="admin-btn-secondary shrink-0 text-sm">
                Đổi ảnh bìa
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
