import Link from "next/link";
import { publicCatalog } from "@/config/public-catalog";
import { ProcessStepsList } from "@/components/process/process-steps-list";
import { TransferInfoSection } from "@/components/shared/transfer-info-section";
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
              <p className="mt-2 font-heading text-2xl font-bold text-brand-accent sm:text-3xl">{tier.amount}</p>
              <p className="mt-2 text-sm text-brand-muted">{tier.breakdown}</p>
            </div>
          ))}
        </div>
      </div>

      <TransferInfoSection transfer={c.transfer} qrImageSrc={qrImageSrc} fanpageUrl={fanpageUrl} />

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
              c.finance.reportLinkUrl.startsWith("/") ? (
                <Link href={c.finance.reportLinkUrl} className="link-accent">
                  {c.finance.reportLinkLabel}
                </Link>
              ) : (
                <a href={c.finance.reportLinkUrl} target="_blank" rel="noreferrer" className="link-accent">
                  {c.finance.reportLinkLabel}
                </a>
              )
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
