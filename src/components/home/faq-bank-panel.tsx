import Image from "next/image";
import { CreditCard } from "lucide-react";
import { ThienNguyenProfileSection } from "@/components/shared/thien-nguyen-profile-section";
import { getUiLabel } from "@/content/pages/static-pages";
import type { DonateInfoContent } from "@/lib/data/donate-info";
import { homeMediaImageSrc } from "@/lib/data/home-media";

type FaqBankPanelProps = {
  bank: DonateInfoContent;
  donateQrUrl: string;
};

export function FaqBankPanel({ bank, donateQrUrl }: FaqBankPanelProps) {

  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-card)]">
      <div className="border-b border-brand-border/50 bg-gradient-to-r from-brand-sky-soft/90 via-white to-brand-peach/30 px-4 py-3.5 sm:px-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-green">
          <CreditCard className="h-4 w-4 shrink-0" aria-hidden />
          Thông tin chuyển khoản
        </p>
      </div>

      <div className="grid gap-6 p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_200px] md:items-start md:gap-8">
        <div className="order-2 space-y-4 md:order-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">Ngân hàng</p>
              <p className="mt-1 font-heading text-lg font-bold text-brand-ink">{bank.bank}</p>
              <p className="text-sm text-brand-muted">{bank.branch}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">Chủ tài khoản</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-brand-ink sm:text-base">
                {bank.accountName}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-brand-accent/15 bg-gradient-to-br from-brand-warm to-white px-4 py-4">
            <p className="text-sm leading-relaxed text-brand-muted">{bank.accountHighlight}</p>
            <p className="stat-value mt-2 tabular-nums">{bank.accountNumber}</p>
          </div>

          <div className="rounded-lg border border-brand-border/60 bg-brand-sky-soft/30 px-3.5 py-3 text-sm">
            <p className="font-semibold text-brand-ink">Cú pháp chuyển khoản</p>
            <p className="mt-1 leading-relaxed text-brand-muted">{bank.transferFormat}</p>
            <p className="mt-1.5 text-xs text-brand-muted/90">
              Ví dụ: <span className="font-mono text-brand-ink">{bank.transferExample}</span>
            </p>
          </div>
        </div>

        <div className="order-1 flex flex-col items-center md:order-2 md:pt-1">
          <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl border border-brand-border/60 bg-white p-3 shadow-sm ring-1 ring-brand-accent/10">
            <Image
              src={homeMediaImageSrc(donateQrUrl)}
              alt="Mã QR chuyển khoản Ngân hàng Quân đội — Quỹ Nuôi Em"
              fill
              className="object-contain p-1"
              sizes="(max-width: 200px) 100vw, 200px"
              priority={false}
            />
          </div>
          <p className="mt-3 max-w-[200px] text-center text-sm font-medium text-brand-muted">
            {getUiLabel("scanQr")}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-border/50 bg-brand-warm/40 px-4 py-3.5 sm:px-5">
        <ThienNguyenProfileSection variant="embedded" showStatementsLink={false} showMonthlyReportsLink={false} />
      </div>
    </div>
  );
}
