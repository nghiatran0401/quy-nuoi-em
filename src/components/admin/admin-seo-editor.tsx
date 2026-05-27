"use client";

import { useId, useState } from "react";
import { siteConfig } from "@/config/site";

const TITLE_RECOMMENDED = 60;
const DESCRIPTION_RECOMMENDED = 160;

type AdminSeoEditorProps = {
  prefix: string;
  initialTitle: string;
  initialDescription: string;
  /** Shown in the search preview URL line, e.g. /quy-trinh-cap-ma-2026 */
  previewPath: string;
};

function counterClass(length: number, recommended: number): string {
  if (length === 0) return "text-slate-400";
  if (length <= recommended) return "text-emerald-600";
  if (length <= recommended + 15) return "text-amber-600";
  return "text-red-600";
}

export function AdminSeoEditor({
  prefix,
  initialTitle,
  initialDescription,
  previewPath,
}: AdminSeoEditorProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const previewTitle = title.trim() || "Tiêu đề trang";
  const previewDescription =
    description.trim() ||
    "Thêm mô tả ngắn để hiển thị trên Google và khi chia sẻ link lên mạng xã hội.";
  const pathLine = previewPath.startsWith("/") ? previewPath : `/${previewPath}`;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Xem trước trên Google
        </p>
        <div className="space-y-1 font-[Arial,sans-serif]">
          <p className="truncate text-xs text-[#4d5156]">
            {siteConfig.shortName.toLowerCase().replace(/\s+/g, "")}
            .com
            <span className="text-[#70757a]"> › {pathLine.replace(/^\//, "")}</span>
          </p>
          <p className="line-clamp-1 text-xl leading-snug text-[#1a0dab]">{previewTitle}</p>
          <p className="line-clamp-2 text-sm leading-snug text-[#4d5156]">{previewDescription}</p>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <label className="admin-label mb-0" htmlFor={titleId}>
            Tiêu đề SEO
          </label>
          <span className={`text-xs tabular-nums ${counterClass(title.length, TITLE_RECOMMENDED)}`}>
            {title.length}/{TITLE_RECOMMENDED}
          </span>
        </div>
        <input
          id={titleId}
          name={`${prefix}_meta_title`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="admin-input"
          placeholder="Quy trình cấp và nhận mã Nuôi Em 2026"
          maxLength={80}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          Hiển thị trên tab trình duyệt và kết quả tìm kiếm. Nên giữ dưới {TITLE_RECOMMENDED} ký tự.
        </p>
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <label className="admin-label mb-0" htmlFor={descriptionId}>
            Mô tả SEO
          </label>
          <span
            className={`text-xs tabular-nums ${counterClass(description.length, DESCRIPTION_RECOMMENDED)}`}
          >
            {description.length}/{DESCRIPTION_RECOMMENDED}
          </span>
        </div>
        <textarea
          id={descriptionId}
          name={`${prefix}_meta_description`}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="admin-input resize-y"
          placeholder="Hướng dẫn đầy đủ cho anh/chị nuôi mới: nhận mã NE, chuyển khoản đúng cú pháp..."
          maxLength={200}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          Không hiển thị trên trang; dùng cho Google và xem trước khi chia sẻ link.
        </p>
      </div>
    </div>
  );
}
