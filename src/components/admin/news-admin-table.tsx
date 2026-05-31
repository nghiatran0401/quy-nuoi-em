"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Archive, FileText, Globe2, Plus, Radio } from "lucide-react";
import type { NewsArticleRow } from "@/types/supabase";
import { AdminActionFeedback } from "@/components/admin/admin-action-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { NewsRowActions } from "@/components/admin/news-row-actions";
import type { AdminActionState, AdminFormAction } from "@/lib/admin/action-state";

function statusStyles(status: NewsArticleRow["status"]) {
  switch (status) {
    case "published":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "archived":
      return "bg-slate-100 text-slate-600 ring-slate-500/20";
    case "draft":
      return "bg-amber-50 text-amber-800 ring-amber-600/20";
    default:
      return "bg-slate-100 text-slate-600 ring-slate-500/20";
  }
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

type NewsAdminTableProps = {
  rows: Pick<NewsArticleRow, "id" | "slug" | "title" | "status" | "locale" | "published_at" | "updated_at">[];
  loadError?: string;
  archiveAction: AdminFormAction;
  deleteAction: AdminFormAction;
};

export function NewsAdminTable({ rows, loadError, archiveAction, deleteAction }: NewsAdminTableProps) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<AdminActionState>(null);

  const wrapListAction = useCallback(
    (action: AdminFormAction): AdminFormAction =>
      async (prevState, formData) => {
        const result = await action(prevState, formData);
        if (result.ok) {
          router.refresh();
        }
        setFeedback(result);
        return result;
      },
    [router],
  );

  const archiveWithFeedback = useCallback(wrapListAction(archiveAction), [archiveAction, wrapListAction]);
  const deleteWithFeedback = useCallback(wrapListAction(deleteAction), [deleteAction, wrapListAction]);

  const stats = {
    total: rows.length,
    published: rows.filter((row) => row.status === "published").length,
    draft: rows.filter((row) => row.status === "draft").length,
    archived: rows.filter((row) => row.status === "archived").length,
  };

  return (
    <>
      <AdminPageHeader
        title="Tin tức"
        description="Tạo, xuất bản và quản lý các bài viết hiển thị trên website công khai."
        actions={
          <Link href="/admin/news/new" className="admin-btn-primary">
            <Plus className="h-4 w-4" />
            Bài viết mới
          </Link>
        }
      />

      <div className="space-y-3">
        <AdminActionFeedback state={feedback} />
        {loadError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Không thể tải danh sách bài viết: {loadError}
          </div>
        ) : null}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Tổng", value: stats.total, icon: FileText, tone: "text-slate-600 bg-slate-100" },
          { label: "Đã xuất bản", value: stats.published, icon: Radio, tone: "text-emerald-700 bg-emerald-50" },
          { label: "Bản nháp", value: stats.draft, icon: Globe2, tone: "text-amber-800 bg-amber-50" },
          { label: "Lưu trữ", value: stats.archived, icon: Archive, tone: "text-slate-600 bg-slate-100" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="admin-card flex items-center gap-4 p-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-slate-900">{item.value}</p>
                <p className="text-sm text-slate-500">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-card overflow-hidden">
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Chưa có bài viết nào</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Hãy tạo và xuất bản bài viết đầu tiên để hiển thị trên trang chủ và trang tin tức.
            </p>
            <Link href="/admin/news/new" className="admin-btn-primary mt-6">
              <Plus className="h-4 w-4" />
              Tạo bài viết đầu tiên
            </Link>
          </div>
        ) : (
          <div className="admin-table-scroll">
            <table className="min-w-[36rem] w-full text-left text-sm lg:min-w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3.5">Bài viết</th>
                  <th className="px-5 py-3.5">Trạng thái</th>
                  <th className="hidden px-5 py-3.5 md:table-cell">Ngôn ngữ</th>
                  <th className="hidden px-5 py-3.5 lg:table-cell">Ngày đăng</th>
                  <th className="hidden px-5 py-3.5 sm:table-cell">Cập nhật</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.id} className="transition hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                      <Link href={`/admin/news/${row.id}/edit`} className="group block max-w-md">
                        <p className="font-medium text-slate-900 group-hover:text-[var(--admin-accent)]">
                          {row.title}
                        </p>
                        <p className="mt-0.5 truncate font-mono text-xs text-slate-500">/{row.slug}</p>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyles(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="hidden px-5 py-4 uppercase text-slate-600 md:table-cell">{row.locale}</td>
                    <td className="hidden px-5 py-4 text-slate-600 lg:table-cell">{formatDate(row.published_at)}</td>
                    <td className="hidden px-5 py-4 text-slate-600 sm:table-cell">{formatDate(row.updated_at)}</td>
                    <td className="px-5 py-4">
                      <NewsRowActions
                        row={row}
                        archiveAction={archiveWithFeedback}
                        deleteAction={deleteWithFeedback}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
