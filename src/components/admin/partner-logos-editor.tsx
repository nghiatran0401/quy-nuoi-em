"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import {
  createPartnerLogo,
  deletePartnerLogo,
} from "@/app/admin/(dashboard)/about/partner-logo-actions";
import { resolvePartnerLogoSrc, type PartnerLogoRecord } from "@/lib/data/partner-logos";

type PartnerLogosEditorProps = {
  logos: PartnerLogoRecord[];
};

export function PartnerLogosEditor({ logos }: PartnerLogosEditorProps) {
  const hasFallbackOnly = logos.length > 0 && logos.every((l) => l.id.startsWith("fallback-"));
  const editableLogos = logos.filter((l) => !l.id.startsWith("fallback-"));

  return (
    <div className="space-y-4 border-t border-slate-200 pt-4">
      <p className="text-xs text-slate-600">
        Logo chạy ngang trên trang chủ, giới thiệu và thành viên quỹ. Thứ tự theo thời gian thêm.
      </p>

      {hasFallbackOnly ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 text-sm text-amber-900">
          Chưa kết nối Supabase — đang dùng logo tĩnh. Chạy migration để quản lý tại đây.
        </p>
      ) : null}

      {editableLogos.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {editableLogos.map((logo) => (
            <li
              key={logo.id}
              className="group relative flex aspect-[4/3] items-center justify-center rounded-lg border border-slate-200 bg-white p-2"
            >
              <Image
                src={resolvePartnerLogoSrc(logo.image_url)}
                alt=""
                width={120}
                height={72}
                className="max-h-full max-w-full object-contain"
              />
              <form action={deletePartnerLogo} className="absolute right-1 top-1">
                <input type="hidden" name="id" value={logo.id} />
                <button
                  type="submit"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-sm opacity-90 transition hover:bg-red-700 group-hover:opacity-100"
                  aria-label="Xóa logo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        !hasFallbackOnly ? <p className="text-sm text-slate-500">Chưa có logo.</p> : null
      )}

      {!hasFallbackOnly ? (
        <form
          action={createPartnerLogo}
          encType="multipart/form-data"
          className="flex flex-wrap items-center gap-3"
        >
          <input
            id="new-partner-logo"
            name="logo_image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            required
            className="max-w-xs text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700"
          />
          <button type="submit" className="admin-btn-secondary text-sm">
            <Plus className="h-4 w-4" />
            Thêm logo
          </button>
        </form>
      ) : null}
    </div>
  );
}
