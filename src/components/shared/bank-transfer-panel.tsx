import type { ReactNode } from "react";
import Image from "next/image";
import { Building2, CircleAlert } from "lucide-react";
import { getUiLabel } from "@/content/pages/static-pages";
import type { DonateInfoContent } from "@/lib/data/donate-info";

type BankTransferPanelProps = {
  bank: DonateInfoContent;
  donateQrUrl: string;
  variant?: "page" | "embedded";
  embeddedAddon?: ReactNode;
};

export function BankTransferPanel({
  bank,
  donateQrUrl,
  variant = "page",
  embeddedAddon,
}: BankTransferPanelProps) {
  const isEmbedded = variant === "embedded";
  const accountLine = isEmbedded ? bank.accountHighlight : bank.publicAccountLine;

  return (
    <div
      className={
        isEmbedded
          ? "rounded-2xl border border-brand-border/70 bg-brand-surface-raised p-4 sm:p-5"
          : "brand-card overflow-hidden p-6 sm:p-8"
      }
    >
      <div className={isEmbedded ? "grid gap-5 lg:grid-cols-[1fr_auto]" : "grid gap-8 lg:grid-cols-2 lg:gap-10"}>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-green">
            <Building2 className="h-4 w-4 shrink-0" aria-hidden />
            Thông tin chuyển khoản
          </p>

          <div
            className={
              isEmbedded
                ? "mt-3 rounded-xl border border-brand-danger/20 bg-brand-danger-soft/50 p-3"
                : "mt-4 rounded-2xl border border-brand-danger/25 bg-brand-danger-soft/60 p-4"
            }
          >
            <p className="flex items-start gap-2 text-sm font-semibold text-brand-ink">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-danger" aria-hidden />
              {getUiLabel("donateWarning")}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-brand-muted">{accountLine}</p>

          <dl className="mt-4 space-y-3 text-sm text-brand-muted">
            <div>
              <dt className="font-semibold text-brand-ink">Số tài khoản</dt>
              <dd className="mt-0.5 font-mono text-xl font-bold tabular-nums text-brand-accent">
                {bank.accountNumber}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-ink">Ngân hàng</dt>
              <dd>
                {bank.bank} — {bank.branch}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-ink">Chủ tài khoản</dt>
              <dd>{bank.accountName}</dd>
            </div>
          </dl>

          <div className="mt-5 space-y-2 rounded-xl border border-brand-border/70 bg-brand-warm px-4 py-3 text-sm">
            <p>
              <span className="font-semibold text-brand-ink">Cú pháp:</span> {bank.transferFormat}
            </p>
            <p className="text-brand-muted">
              <span className="font-semibold text-brand-ink">Ví dụ:</span>{" "}
              <span className="font-mono text-brand-ink">{bank.transferExample}</span>
            </p>
          </div>

          {embeddedAddon ? <div className="mt-4">{embeddedAddon}</div> : null}
        </div>

        <div className={isEmbedded ? "flex justify-center lg:justify-end" : "flex flex-col items-center lg:items-end"}>
          <div
            className={
              isEmbedded
                ? "w-full max-w-[200px] rounded-2xl border border-brand-border/70 bg-white p-4"
                : "w-full max-w-sm rounded-3xl border border-brand-border bg-white p-6 shadow-[var(--shadow-brand-card)]"
            }
          >
            <p className="text-center text-sm font-semibold text-brand-ink">{getUiLabel("scanQr")}</p>
            <div
              className={`relative mx-auto mt-3 aspect-square w-full ${
                isEmbedded ? "max-w-[168px]" : "max-w-[240px]"
              }`}
            >
              <Image
                src={donateQrUrl}
                alt="Mã QR chuyển khoản Quỹ Nuôi Em"
                fill
                className="object-contain"
                sizes={isEmbedded ? "168px" : "240px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
