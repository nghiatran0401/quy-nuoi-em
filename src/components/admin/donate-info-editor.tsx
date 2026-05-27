"use client";

import { CreditCard } from "lucide-react";
import type { DonateInfoContent } from "@/lib/data/donate-info";

type DonateInfoEditorProps = {
  locale: "vi";
  initial: DonateInfoContent;
};

export function DonateInfoEditor({ locale, initial }: DonateInfoEditorProps) {
  const prefix = `${locale}_donate`;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-lg border border-amber-200/80 bg-amber-50/80 px-3 py-2.5 text-xs text-amber-950">
        <CreditCard className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>
          Nội dung này hiển thị khi mở câu FAQ loại <strong>Tài khoản ngân hàng</strong> và trên trang{" "}
          <strong>/dong-gop</strong>. Ảnh QR chỉnh ở trường phía trên (mục 6).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${prefix}_bank`}>
            Tên ngắn ngân hàng
          </label>
          <input
            id={`${prefix}_bank`}
            name={`${prefix}_bank`}
            defaultValue={initial.bank}
            className="admin-input"
            placeholder="MB"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${prefix}_account_number`}>
            Số tài khoản (hiển thị lớn trên FAQ)
          </label>
          <input
            id={`${prefix}_account_number`}
            name={`${prefix}_account_number`}
            defaultValue={initial.accountNumber}
            className="admin-input font-mono"
            placeholder="1805"
          />
        </div>
      </div>

      <div>
        <label className="admin-label" htmlFor={`${prefix}_branch`}>
          Tên đầy đủ ngân hàng / chi nhánh
        </label>
        <input
          id={`${prefix}_branch`}
          name={`${prefix}_branch`}
          defaultValue={initial.branch}
          className="admin-input"
        />
      </div>

      <div>
        <label className="admin-label" htmlFor={`${prefix}_account_name`}>
          Chủ tài khoản
        </label>
        <input
          id={`${prefix}_account_name`}
          name={`${prefix}_account_name`}
          defaultValue={initial.accountName}
          className="admin-input"
        />
      </div>

      <div>
        <label className="admin-label" htmlFor={`${prefix}_account_highlight`}>
          Dòng mô tả trên số lớn (FAQ)
        </label>
        <input
          id={`${prefix}_account_highlight`}
          name={`${prefix}_account_highlight`}
          defaultValue={initial.accountHighlight}
          className="admin-input"
        />
      </div>

      <div>
        <label className="admin-label" htmlFor={`${prefix}_public_line`}>
          Dòng số tài khoản trên trang Đóng góp
        </label>
        <input
          id={`${prefix}_public_line`}
          name={`${prefix}_public_line`}
          defaultValue={initial.publicAccountLine}
          className="admin-input"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${prefix}_transfer_format`}>
            Cú pháp chuyển khoản
          </label>
          <textarea
            id={`${prefix}_transfer_format`}
            name={`${prefix}_transfer_format`}
            defaultValue={initial.transferFormat}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${prefix}_transfer_example`}>
            Ví dụ cú pháp
          </label>
          <input
            id={`${prefix}_transfer_example`}
            name={`${prefix}_transfer_example`}
            defaultValue={initial.transferExample}
            className="admin-input font-mono text-sm"
            placeholder="NE00123 09xxxxxxxx Nguyen Van A"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Xem trước (FAQ)</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-medium uppercase text-slate-500">Ngân hàng</p>
            <p className="font-semibold text-slate-900">{initial.bank}</p>
            <p className="text-xs text-slate-600">{initial.branch}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase text-slate-500">Chủ tài khoản</p>
            <p className="text-sm font-semibold text-slate-900">{initial.accountName}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600">{initial.accountHighlight}</p>
        <p className="mt-1 text-3xl font-extrabold tabular-nums text-[var(--admin-accent)]">
          {initial.accountNumber}
        </p>
        <p className="mt-2 text-xs text-slate-600">
          <span className="font-medium text-slate-800">Cú pháp:</span> {initial.transferFormat}
        </p>
        <p className="mt-1 font-mono text-xs text-slate-700">Ví dụ: {initial.transferExample}</p>
      </div>
    </div>
  );
}
