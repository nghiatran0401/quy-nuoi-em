import type { SchoolsDirectorySummaryCards } from "@/lib/data/schools-directory";

type SchoolsSummaryProps = {
  summary: SchoolsDirectorySummaryCards;
};

export function SchoolsSummary({ summary }: SchoolsSummaryProps) {
  return (
    <div className="flex flex-wrap gap-3 self-stretch sm:self-start lg:self-auto">
      <article className="min-w-[5.5rem] flex-1 rounded-xl border border-brand-border/60 bg-white px-3 py-3 shadow-sm sm:min-w-[6.5rem] sm:flex-none sm:px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-muted">Tổng</p>
        <p className="mt-0.5 font-heading text-xl font-bold tabular-nums text-brand-ink sm:text-2xl">
          {summary.schoolCount}
        </p>
      </article>
    </div>
  );
}
