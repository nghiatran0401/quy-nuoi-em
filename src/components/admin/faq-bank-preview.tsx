import type { DonateInfoContent } from "@/lib/data/donate-info";

type FaqBankPreviewProps = {
  bank: DonateInfoContent;
  question: string;
};

/** Compact read-only preview for admin FAQ bank items. */
export function FaqBankPreview({ bank, question }: FaqBankPreviewProps) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/80 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Xem trước trên trang chủ</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{question || "—"}</p>
      <div className="mt-2 grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
        <div>
          <span className="text-slate-500">NH:</span> {bank.bank} — {bank.branch}
        </div>
        <div>
          <span className="text-slate-500">Số tài khoản:</span>{" "}
          <span className="font-bold tabular-nums text-[var(--admin-accent)]">{bank.accountNumber}</span>
        </div>
      </div>
      <p className="mt-1 truncate text-xs text-slate-600">{bank.transferFormat}</p>
    </div>
  );
}
