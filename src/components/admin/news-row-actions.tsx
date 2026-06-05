"use client";

import Link from "next/link";
import { Archive, ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useActionState, useState, type MouseEvent } from "react";
import type { NewsArticleRow } from "@/types/supabase";
import { ADMIN_ACTION_INITIAL, type AdminFormAction } from "@/lib/admin/action-state";
import { newsArticlePath } from "@/lib/seo/routes";

type NewsRowActionsProps = {
  row: Pick<NewsArticleRow, "id" | "slug" | "title" | "status" | "locale">;
  archiveAction: AdminFormAction;
  deleteAction: AdminFormAction;
};

export function NewsRowActions({ row, archiveAction, deleteAction }: NewsRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [, archiveFormAction] = useActionState(archiveAction, ADMIN_ACTION_INITIAL);
  const [, deleteFormAction] = useActionState(deleteAction, ADMIN_ACTION_INITIAL);

  function confirmDelete(event: MouseEvent<HTMLButtonElement>) {
    const ok = window.confirm(`Xóa vĩnh viễn "${row.title}"?\n\nHành động này không thể hoàn tác.`);
    if (!ok) event.preventDefault();
    setOpen(false);
  }

  return (
    <div className="relative flex items-center justify-end gap-1">
      <Link
        href={`/admin/news/${row.id}/edit`}
        className="admin-btn-ghost hidden px-2.5 sm:inline-flex"
        title="Sửa"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      {row.status === "published" ? (
        <Link
          href={newsArticlePath(row.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-ghost hidden px-2.5 sm:inline-flex"
          title="Xem bài viết"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      ) : null}

      <button
        type="button"
        className="admin-btn-ghost px-2.5"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Thao tác</span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
          >
            <Link
              href={`/admin/news/${row.id}/edit`}
              role="menuitem"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:hidden"
              onClick={() => setOpen(false)}
            >
              <Pencil className="h-4 w-4" />
              Sửa
            </Link>
            {row.status === "published" ? (
              <Link
                href={newsArticlePath(row.slug)}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:hidden"
                onClick={() => setOpen(false)}
              >
                <ExternalLink className="h-4 w-4" />
                Xem bài viết
              </Link>
            ) : null}
            {row.status !== "archived" ? (
              <form action={archiveFormAction}>
                <input type="hidden" name="id" value={row.id} />
                <button
                  type="submit"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  <Archive className="h-4 w-4" />
                  Lưu trữ
                </button>
              </form>
            ) : null}
            <form action={deleteFormAction}>
              <input type="hidden" name="id" value={row.id} />
              <button
                type="submit"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                onClick={confirmDelete}
              >
                <Trash2 className="h-4 w-4" />
                Xóa
              </button>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
}
