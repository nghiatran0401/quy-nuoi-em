import Image from "next/image";
import { Building2, CircleAlert } from "lucide-react";
import { TransferQrCta } from "@/components/shared/transfer-qr-cta";

export type TransferInfoContent = {
  eyebrow: string;
  title: string;
  intro?: string;
  transferReminder: string;
  codeExpiryNote: string;
  warning: string;
  transferFormat: string;
  transferExample: string;
  accountNumber: string;
  bank: string;
  accountName: string;
  phone: string;
  phoneDisplay: string;
  phoneContactName: string;
  scenariosFootnote?: string;
  qrCaption: string;
  qrCta: string;
};

type TransferInfoSectionProps = {
  transfer: TransferInfoContent;
  qrImageSrc: string;
  fanpageUrl: string;
};

export function TransferInfoSection({ transfer, qrImageSrc, fanpageUrl }: TransferInfoSectionProps) {
  const intro = transfer.intro?.trim();

  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">{transfer.eyebrow}</p>
        <h2 className="heading-section mt-2">{transfer.title}</h2>
        {intro ? <p className="text-body home-prose mt-3 max-w-3xl">{intro}</p> : null}
      </header>

      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-brand-green/25 bg-brand-green/5 p-4 sm:p-5">
            <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
              {transfer.transferReminder}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-accent/25 bg-brand-peach/35 p-4 sm:p-5">
            <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-dark" aria-hidden />
              {transfer.codeExpiryNote}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-danger/25 bg-brand-danger-soft/60 p-4 sm:p-5">
            <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-danger" aria-hidden />
              {transfer.warning}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <div className="brand-card flex h-full flex-col overflow-hidden p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-green">
              <Building2 className="h-4 w-4 shrink-0" aria-hidden />
              Tài khoản nhận quyên góp
            </p>
            <div className="mt-4 grid flex-1 gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-border/60 bg-brand-warm px-4 py-4 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Số tài khoản</p>
                <p className="mt-1 break-all font-mono text-2xl font-bold tabular-nums text-brand-accent sm:text-3xl">
                  {transfer.accountNumber}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Ngân hàng</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-ink">{transfer.bank}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Điện thoại ({transfer.phoneContactName})
                </p>
                <p className="mt-1">
                  <a href={`tel:${transfer.phone}`} className="link-accent text-sm font-semibold">
                    {transfer.phoneDisplay}
                  </a>
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Chủ tài khoản</p>
                <p className="mt-1 text-sm font-medium text-brand-ink">{transfer.accountName}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 rounded-xl border border-brand-border/70 bg-white px-4 py-3 text-sm">
              <p>
                <span className="font-semibold text-brand-ink">Cú pháp chuyển khoản:</span>{" "}
                {transfer.transferFormat}
              </p>
              <p className="text-brand-muted">
                <span className="font-semibold text-brand-ink">Ví dụ:</span>{" "}
                <span className="font-mono text-brand-ink">{transfer.transferExample}</span>
              </p>
            </div>
          </div>

          <aside className="flex h-full flex-col">
            <div className="flex h-full flex-col rounded-3xl border border-brand-border bg-white p-6 shadow-[var(--shadow-brand-card)]">
              <p className="text-center text-sm font-semibold text-brand-ink">{transfer.qrCaption}</p>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[240px] flex-1">
                <Image
                  src={qrImageSrc}
                  alt="Mã QR chuyển khoản Quỹ Nuôi Em"
                  fill
                  className="object-contain"
                  sizes="240px"
                />
              </div>
              <TransferQrCta label={transfer.qrCta} fanpageUrl={fanpageUrl} />
            </div>
          </aside>
        </div>

        {transfer.scenariosFootnote?.trim() ? (
          <p className="text-sm leading-relaxed text-brand-muted">{transfer.scenariosFootnote}</p>
        ) : null}
      </div>
    </div>
  );
}
