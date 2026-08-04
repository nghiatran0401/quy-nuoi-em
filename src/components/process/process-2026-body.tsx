import Link from "next/link";
import { publicCatalog, publicCatalogLinksEnabled } from "@/config/public-catalog";
import { ProcessStepsList } from "@/components/process/process-steps-list";
import { TransferInfoSection } from "@/components/shared/transfer-info-section";
import {
  resolveProcess2026ImageSrc,
  type Process2026Note,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";

type Process2026BodyProps = {
  content: Process2026PageContent;
};

function NoteBody({ note }: { note: Process2026Note }) {
  return (
    <div className="min-w-0 leading-relaxed text-brand-muted">
      <p className="text-brand-ink/90">{note.text}</p>
      {note.bullets?.length ? (
        <ul className="mt-2 list-disc space-y-1.5 pl-4">
          {note.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {note.afterBullets ? <p className="mt-2">{note.afterBullets}</p> : null}
      {note.examples?.length ? (
        <div className="mt-2 space-y-1 text-brand-ink">
          <p className="font-semibold">Ví dụ:</p>
          <ul className="space-y-1">
            {note.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {note.footnote ? (
        <p className="mt-2 font-semibold text-brand-accent-dark">{note.footnote}</p>
      ) : null}
    </div>
  );
}

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
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-2 lg:items-stretch">
          {c.costTiers.map((tier) => (
            <div
              key={tier.label}
              className="flex h-full flex-col rounded-2xl border border-brand-border/70 bg-white p-6 text-left"
            >
              <div className="flex flex-1 flex-col">
                <p className="overflow-x-auto text-xs font-semibold leading-snug whitespace-nowrap text-brand-green [-ms-overflow-style:none] [scrollbar-width:none] sm:text-sm [&::-webkit-scrollbar]:hidden">
                  {tier.label}
                </p>
              </div>
              <div className="mt-4">
                <p className="font-heading text-2xl font-bold text-brand-accent sm:text-3xl">{tier.amount}</p>
                {tier.breakdown.trim() ? (
                  <p className="mt-2 text-sm text-brand-muted">{tier.breakdown}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TransferInfoSection transfer={c.transfer} qrImageSrc={qrImageSrc} fanpageUrl={fanpageUrl} />

      <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-6 sm:p-8">
        <p className="eyebrow">{c.timelineIntro.eyebrow}</p>
        <h3 className="heading-section mt-2">{c.timelineIntro.title}</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {c.timeline.map((item) => (
            <div
              key={`${item.when}-${item.what}`}
              className="flex flex-col rounded-2xl border border-brand-border/70 bg-brand-warm px-5 py-4"
            >
              <p className="text-sm font-bold text-brand-accent">{item.when}</p>
              <p className="mt-2 flex-1 text-balance text-sm font-semibold leading-snug text-brand-ink sm:text-base">
                {item.what}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow">{c.notesIntro.eyebrow}</p>
        <h3 className="heading-section mt-2">{c.notesIntro.title}</h3>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-soft)]">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">
              So sánh lưu ý mã NE giữa các năm học trước đến 2025-2026 và từ năm học 2026-2027
            </caption>
            <thead>
              <tr className="border-b border-brand-border/60">
                <th
                  scope="col"
                  className="w-14 bg-brand-warm/80 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-brand-muted sm:w-16"
                >
                  #
                </th>
                {c.noteGroups.map((group, groupIndex) => (
                  <th
                    key={group.title}
                    scope="col"
                    className={`px-4 py-4 align-bottom sm:px-5 ${
                      groupIndex === 0
                        ? "w-1/2 border-r border-brand-border/60 bg-brand-warm/80"
                        : "w-1/2 bg-brand-accent/10"
                    }`}
                  >
                    <span
                      className={`block text-[11px] font-bold uppercase tracking-[0.14em] ${
                        groupIndex === 0 ? "text-brand-muted" : "text-brand-accent-dark"
                      }`}
                    >
                      {group.shortLabel}
                    </span>
                    <span className="mt-1 block font-heading text-sm font-bold leading-snug text-brand-ink sm:text-base">
                      {group.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({
                length: Math.max(...c.noteGroups.map((group) => group.notes.length), 0),
              }).map((_, rowIndex) => (
                <tr
                  key={`note-row-${rowIndex}`}
                  className="border-t border-brand-border/50 align-top odd:bg-brand-warm/15"
                >
                  <th
                    scope="row"
                    className="bg-brand-warm/40 px-3 py-4 text-center text-sm font-bold text-brand-accent-dark sm:px-4"
                  >
                    {String(rowIndex + 1).padStart(2, "0")}
                  </th>
                  {c.noteGroups.map((group, groupIndex) => {
                    const note = group.notes[rowIndex];
                    return (
                      <td
                        key={`${group.title}-${rowIndex}`}
                        className={`px-4 py-4 text-sm leading-relaxed sm:px-5 sm:text-[0.95rem] ${
                          groupIndex === 0 ? "border-r border-brand-border/50" : ""
                        }`}
                      >
                        {note ? (
                          <NoteBody note={note} />
                        ) : (
                          <span className="text-brand-muted/60">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        {publicCatalogLinksEnabled ? (
          <p className="mt-4 border-t border-brand-border/60 pt-4 text-sm text-brand-muted">
            Danh mục em nuôi & tra cứu mã NE:{" "}
            <a href={publicCatalog.url} target="_blank" rel="noreferrer" className="link-accent">
              {publicCatalog.ctaLabel}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
