import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ReportCoverForm } from "@/components/admin/report-cover-form";
import { listFinancialReportsForAdmin } from "@/lib/data/financial-reports";
import { updateReportCover } from "./actions";

export default async function ReportsAdminPage() {
  const reports = await listFinancialReportsForAdmin();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Ảnh báo cáo tài chính"
        description="Thay ảnh bìa từng báo cáo tháng trên trang /bao-cao. Tiêu đề và link tài liệu giữ nguyên từ dữ liệu hiện có."
      />

      {reports.length === 0 ? (
        <p className="text-sm text-slate-600">Chưa có báo cáo tài chính.</p>
      ) : (
        <div className="admin-card divide-y divide-slate-200 p-5">
          {reports.map((report) => (
            <ReportCoverForm key={report.id} report={report} action={updateReportCover} />
          ))}
        </div>
      )}
    </div>
  );
}
