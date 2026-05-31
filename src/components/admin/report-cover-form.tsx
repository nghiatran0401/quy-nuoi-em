"use client";

import Image from "next/image";
import { useActionState } from "react";
import { AdminActionFeedback } from "@/components/admin/admin-action-form";
import { ADMIN_ACTION_INITIAL, type AdminFormAction } from "@/lib/admin/action-state";
import { resolveCmsImageUrl } from "@/lib/cms/resolve-image-url";
import type { FinancialReportAdminRow } from "@/lib/data/financial-reports";

type ReportCoverFormProps = {
  report: FinancialReportAdminRow;
  action: AdminFormAction;
};

export function ReportCoverForm({ report, action }: ReportCoverFormProps) {
  const [state, formAction] = useActionState(action, ADMIN_ACTION_INITIAL);

  return (
    <div className="space-y-3 py-5 first:pt-0 last:pb-0">
      <AdminActionFeedback state={state} />
      <form
        action={formAction}
        encType="multipart/form-data"
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
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
    </div>
  );
}
