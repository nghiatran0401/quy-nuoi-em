import type { MaGhepDirectorySummaryCards } from "@/lib/data/ma-ghep-directory";

type MaGhepSummaryProps = {
  summary: MaGhepDirectorySummaryCards;
  schoolYearLabel?: string;
};

export function MaGhepSummary({ summary, schoolYearLabel }: MaGhepSummaryProps) {
  return (
    <section className="space-y-3">
      {schoolYearLabel ? (
        <p className="text-sm font-medium text-brand-muted">{schoolYearLabel}</p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="brand-card p-4">
          <p className="text-xs uppercase tracking-wide text-brand-muted">Tổng mã ghép</p>
          <p className="mt-1 text-2xl font-bold text-brand-ink">{summary.total}</p>
        </article>
        <article className="brand-card border-amber-200/80 bg-amber-50/60 p-4">
          <p className="text-xs uppercase tracking-wide text-amber-900/70">NE giảm ăn</p>
          <p className="mt-1 text-2xl font-bold text-amber-950">{summary.reducedCount}</p>
        </article>
      </div>
    </section>
  );
}
