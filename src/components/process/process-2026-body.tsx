import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CircleAlert,
} from "lucide-react";
import { publicCatalog } from "@/config/public-catalog";
import { ProcessStepsList } from "@/components/process/process-steps-list";
import {
  resolveProcess2026ImageSrc,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";

type Process2026BodyProps = {
  content: Process2026PageContent;
};

export function Process2026Body({ content: c }: Process2026BodyProps) {
  const qrImageSrc = resolveProcess2026ImageSrc(c.media.qrImage);
  const fanpageUrl = c.links.messenger;

  return (
    <div className="mx-auto max-w-6xl space-y-10 lg:space-y-12">
      <div>
        <ProcessStepsList steps={c.steps} />
      </div>

      <div className="rounded-2xl border border-brand-border/60 bg-brand-surface/80 p-6 text-center sm:p-8">
        <p className="eyebrow">{c.costIntro.eyebrow}</p>
        <h3 className="heading-section mt-2">{c.costIntro.title}</h3>
        <p className="text-body home-prose mx-auto mt-3 max-w-3xl">{c.costIntro.description}</p>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          {c.costTiers.map((tier) => (
            <div key={tier.label} className="rounded-2xl border border-brand-border/70 bg-white p-6 text-left">
              <p className="text-sm font-semibold text-brand-green">{tier.label}</p>
              <p className="mt-2 font-heading text-3xl font-bold text-brand-accent">{tier.amount}</p>
              <p className="mt-2 text-sm text-brand-muted">{tier.breakdown}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <header className="mb-8 max-w-2xl">
          <p className="eyebrow">{c.transfer.eyebrow}</p>
          <h3 className="heading-section mt-2">{c.transfer.title}</h3>
          <p className="text-body home-prose mt-3 max-w-3xl">{c.transfer.intro}</p>
        </header>

        <div className="space-y-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-brand-green/25 bg-brand-green/5 p-4 sm:p-5">
              <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                {c.transfer.transferReminder}
              </p>
            </div>

            <div className="rounded-2xl border border-brand-accent/25 bg-brand-peach/35 p-4 sm:p-5">
              <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-dark" aria-hidden />
                {c.transfer.codeExpiryNote}
              </p>
            </div>

            <div className="rounded-2xl border border-brand-danger/25 bg-brand-danger-soft/60 p-4 sm:p-5">
              <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-danger" aria-hidden />
                {c.transfer.warning}
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
                  <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-brand-accent">
                    {c.transfer.accountNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Ngân hàng</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-ink">{c.transfer.bank}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    Điện thoại ({c.transfer.phoneContactName})
                  </p>
                  <p className="mt-1">
                    <a href={`tel:${c.transfer.phone}`} className="link-accent text-sm font-semibold">
                      {c.transfer.phoneDisplay}
                    </a>
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Chủ tài khoản</p>
                  <p className="mt-1 text-sm font-medium text-brand-ink">{c.transfer.accountName}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 rounded-xl border border-brand-border/70 bg-white px-4 py-3 text-sm">
                <p>
                  <span className="font-semibold text-brand-ink">Cú pháp nội dung CK:</span>{" "}
                  {c.transfer.transferFormat}
                </p>
                <p className="text-brand-muted">
                  <span className="font-semibold text-brand-ink">Ví dụ:</span>{" "}
                  <span className="font-mono text-brand-ink">{c.transfer.transferExample}</span>
                </p>
              </div>
            </div>

            <aside className="flex h-full flex-col">
              <div className="flex h-full flex-col rounded-3xl border border-brand-border bg-white p-6 shadow-[var(--shadow-brand-card)]">
                <p className="text-center text-sm font-semibold text-brand-ink">{c.transfer.qrCaption}</p>
                <div className="relative mx-auto mt-4 aspect-square w-full max-w-[240px] flex-1">
                  <Image
                    src={qrImageSrc}
                    alt="Mã QR chuyển khoản Quỹ Nuôi Em"
                    fill
                    className="object-contain"
                    sizes="240px"
                  />
                </div>
                <a href={fanpageUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
                  {c.transfer.qrCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </a>
              </div>
            </aside>
          </div>

          {c.transfer.scenariosFootnote.trim() ? (
            <p className="text-sm leading-relaxed text-brand-muted">{c.transfer.scenariosFootnote}</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-6 sm:p-8">
        <p className="eyebrow">{c.timelineIntro.eyebrow}</p>
        <h3 className="heading-section mt-2">{c.timelineIntro.title}</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.timeline.map((item) => (
            <div
              key={`${item.when}-${item.what}`}
              className="rounded-2xl border border-brand-border/70 bg-brand-warm px-5 py-4"
            >
              <p className="text-sm font-bold text-brand-accent">{item.when}</p>
              <p className="mt-2 font-semibold text-brand-ink">{item.what}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{c.notesIntro.eyebrow}</p>
          <h3 className="heading-section mt-2">{c.notesIntro.title}</h3>
          <ul className="mt-6 space-y-4">
            {c.importantNotes.map((note, i) => (
              <li key={note} className="flex gap-3 text-brand-muted">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent-dark">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-info rounded-2xl p-6">
          <p className="eyebrow">{c.finance.eyebrow}</p>
          <h3 className="mt-2 text-xl font-bold text-brand-ink">{c.finance.title}</h3>
          <p className="home-prose mt-3 leading-relaxed text-brand-muted">
            {c.finance.bodyBefore}
            {c.finance.reportLinkLabel && c.finance.reportLinkUrl ? (
              <a href={c.finance.reportLinkUrl} target="_blank" rel="noreferrer" className="link-accent">
                {c.finance.reportLinkLabel}
              </a>
            ) : null}
            {c.finance.bodyAfter}
          </p>
          <p className="mt-3 text-sm text-brand-muted">
            {c.finance.footnoteBefore}
            {c.finance.schoolBuildLinkLabel ? (
              <a href={c.schoolBuildUrl} target="_blank" rel="noreferrer" className="link-accent">
                {c.finance.schoolBuildLinkLabel}
              </a>
            ) : null}
            {c.finance.footnoteAfter}
          </p>
          <p className="mt-4 border-t border-brand-border/60 pt-4 text-sm text-brand-muted">
            Danh mục em nuôi & tra cứu mã NE:{" "}
            <a href={publicCatalog.url} target="_blank" rel="noreferrer" className="link-accent">
              {publicCatalog.ctaLabel}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
