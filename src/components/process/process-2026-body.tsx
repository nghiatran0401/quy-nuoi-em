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
  /** Hide timeline on homepage embed — steps already cover the same milestones. */
  showTimeline?: boolean;
};

function NoteBody({ note }: { note: Process2026Note }) {
  return (
    <div className="min-w-0 leading-relaxed text-brand-muted">
      <p className="text-pretty text-brand-ink/90">{note.text}</p>
      {note.bullets?.length ? (
        <ul className="mt-2 list-disc space-y-1.5 pl-4">
          {note.bullets.map((bullet) => (
            <li key={bullet} className="text-pretty">
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
      {note.afterBullets ? <p className="mt-2 text-pretty">{note.afterBullets}</p> : null}
      {note.examples?.length ? (
        <div className="mt-3 space-y-2 rounded-xl border border-brand-border/60 bg-brand-warm/50 px-3.5 py-3 text-sm text-brand-ink">
          <p className="font-semibold">Ví dụ:</p>
          <ul className="space-y-1.5">
            {note.examples.map((example) => (
              <li key={example} className="text-pretty">
                {example}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {note.footnote ? (
        <p className="mt-3 rounded-lg bg-brand-accent/10 px-3 py-2 text-sm font-semibold text-brand-accent-dark">
          {note.footnote}
        </p>
      ) : null}
    </div>
  );
}

function NotesCompareMobile({
  groups,
}: {
  groups: Process2026PageContent["noteGroups"];
}) {
  return (
    <div className="space-y-4 lg:hidden">
      {groups.map((group, groupIndex) => {
        const isPast = groupIndex === 0;
        return (
          <article
            key={group.title}
            className={`rounded-2xl border p-4 sm:p-5 ${
              isPast
                ? "border-brand-border/70 bg-brand-warm/45"
                : "border-brand-accent/25 bg-gradient-to-b from-brand-accent/[0.07] to-white"
            }`}
          >
            <header className="mb-4 border-b border-brand-border/50 pb-3">
              <p
                className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                  isPast ? "text-brand-muted" : "text-brand-accent-dark"
                }`}
              >
                {group.shortLabel}
              </p>
              <h4 className="mt-1 font-heading text-base font-bold leading-snug text-brand-ink">
                {group.title}
              </h4>
            </header>
            <ul className="space-y-4">
              {group.notes.map((note, i) => (
                <li key={`${group.title}-${i}`} className="flex gap-3">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isPast
                        ? "bg-brand-border/55 text-brand-muted"
                        : "bg-brand-accent/15 text-brand-accent-dark"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <NoteBody note={note} />
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function NotesCompareTable({
  groups,
}: {
  groups: Process2026PageContent["noteGroups"];
}) {
  const rowCount = Math.max(...groups.map((group) => group.notes.length), 0);

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-soft)] lg:block">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          So sánh lưu ý mã NE giữa các năm học trước đến 2025-2026 và từ năm học 2026-2027
        </caption>
        <thead>
          <tr className="border-b border-brand-border/60">
            <th
              scope="col"
              className="w-14 bg-brand-warm/80 px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-brand-muted"
            >
              #
            </th>
            {groups.map((group, groupIndex) => (
              <th
                key={group.title}
                scope="col"
                className={`px-5 py-4 align-bottom xl:px-6 ${
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
                <span className="mt-1 block font-heading text-base font-bold leading-snug text-brand-ink">
                  {group.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr
              key={`note-row-${rowIndex}`}
              className="border-t border-brand-border/50 align-top odd:bg-brand-warm/15"
            >
              <th
                scope="row"
                className="bg-brand-warm/40 px-3 py-5 text-center text-sm font-bold text-brand-accent-dark"
              >
                {String(rowIndex + 1).padStart(2, "0")}
              </th>
              {groups.map((group, groupIndex) => {
                const note = group.notes[rowIndex];
                return (
                  <td
                    key={`${group.title}-${rowIndex}`}
                    className={`px-5 py-5 text-[15px] leading-relaxed xl:px-6 ${
                      groupIndex === 0 ? "border-r border-brand-border/50" : ""
                    }`}
                  >
                    {note ? <NoteBody note={note} /> : <span className="text-brand-muted/55">—</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Process2026Body({ content: c, showTimeline = true }: Process2026BodyProps) {
  const qrImageSrc = resolveProcess2026ImageSrc(c.media.qrImage);
  const fanpageUrl = c.links.messenger;

  return (
    <div className="mx-auto max-w-6xl space-y-10 lg:space-y-12">
      <div>
        <ProcessStepsList steps={c.steps} />
      </div>

      <div id="muc-tai-tro" className="scroll-mt-24 rounded-2xl border border-brand-border/60 bg-brand-surface/80 p-5 text-center sm:p-7 lg:p-8">
        <p className="eyebrow">{c.costIntro.eyebrow}</p>
        <h3 className="heading-section mt-2 text-balance">{c.costIntro.title}</h3>
        <p className="text-body home-prose mx-auto mt-3 max-w-3xl text-pretty text-[15px] sm:text-base">
          {c.costIntro.description}
        </p>
        <div className="mx-auto mt-6 grid max-w-6xl gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2 lg:items-stretch">
          {c.costTiers.map((tier) => (
            <div
              key={tier.label}
              className="flex h-full flex-col rounded-2xl border border-brand-border/70 bg-white p-5 text-left sm:p-6"
            >
              <p className="text-sm font-semibold leading-snug text-balance text-brand-green sm:text-[0.95rem]">
                {tier.label}
              </p>
              <p className="mt-3 font-heading text-2xl font-bold tabular-nums text-brand-accent sm:mt-4 sm:text-3xl">
                {tier.amount}
              </p>
              {tier.breakdown.trim() ? (
                <p className="mt-2 text-sm text-brand-muted">{tier.breakdown}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <TransferInfoSection transfer={c.transfer} qrImageSrc={qrImageSrc} fanpageUrl={fanpageUrl} />

      {showTimeline ? (
        <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-5 sm:p-7 lg:p-8">
          <p className="eyebrow">{c.timelineIntro.eyebrow}</p>
          <h3 className="heading-section mt-2 text-balance">{c.timelineIntro.title}</h3>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
            {c.timeline.map((item) => (
              <div
                key={`${item.when}-${item.what}`}
                className="flex flex-col rounded-2xl border border-brand-border/70 bg-brand-warm px-4 py-4 sm:px-5"
              >
                <p className="text-sm font-bold text-brand-accent">{item.when}</p>
                <p className="mt-2 flex-1 text-pretty text-sm font-semibold leading-snug text-brand-ink sm:text-base">
                  {item.what}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div id="luu-y-ma-ne" className="scroll-mt-24">
        <p className="eyebrow">{c.notesIntro.eyebrow}</p>
        <h3 className="heading-section mt-2 text-balance">{c.notesIntro.title}</h3>

        {c.sharedNotes.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-brand-accent/35 bg-gradient-to-r from-brand-warm/80 via-white to-brand-sky-soft/40 px-4 py-4 sm:mt-6 sm:px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-accent-dark">
              Quy tắc chung
            </p>
            <ul className="mt-3 space-y-3">
              {c.sharedNotes.map((note, i) => (
                <li key={note.text} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <NoteBody note={note} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-5 sm:mt-6">
          <NotesCompareMobile groups={c.noteGroups} />
          <NotesCompareTable groups={c.noteGroups} />
        </div>
      </div>

      <div className="surface-info rounded-2xl p-5 sm:p-6">
        <p className="eyebrow">{c.finance.eyebrow}</p>
        <h3 className="mt-2 text-xl font-bold text-balance text-brand-ink">{c.finance.title}</h3>
        <p className="home-prose mt-3 text-pretty leading-relaxed text-brand-muted">
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
        <p className="mt-3 text-pretty text-sm text-brand-muted">
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
