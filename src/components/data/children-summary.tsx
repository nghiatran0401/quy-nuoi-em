import type { ChildrenSummary } from "@/lib/data/types";

type ChildrenSummaryProps = {
  summary: ChildrenSummary;
  labels: {
    totalChildren: string;
    active: string;
    completed: string;
    terminated: string;
    statusBreakdown: string;
  };
};

export function ChildrenSummaryCards({ summary, labels }: ChildrenSummaryProps) {
  const items = [
    { value: summary.total, label: labels.totalChildren, color: "text-brand-ink" },
    { value: summary.active, label: labels.active, color: "text-brand-success" },
    { value: summary.completed, label: labels.completed, color: "text-brand-cyan" },
    { value: summary.terminated, label: labels.terminated, color: "text-brand-rose" },
  ];

  const activePct = ((summary.active / summary.total) * 100).toFixed(1);
  const completedPct = ((summary.completed / summary.total) * 100).toFixed(1);
  const terminatedPct = ((summary.terminated / summary.total) * 100).toFixed(1);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="brand-card p-5"
          >
            <p className="text-sm text-brand-muted">{item.label}</p>
            <p className={`mt-1 text-3xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="brand-card p-6">
        <h3 className="mb-3 text-base font-semibold text-brand-ink">{labels.statusBreakdown}</h3>
        <div className="flex h-4 overflow-hidden rounded-full">
          <div
            className="bg-brand-success transition-all"
            style={{ width: `${activePct}%` }}
            title={`${labels.active}: ${summary.active} (${activePct}%)`}
          />
          <div
            className="bg-brand-cyan transition-all"
            style={{ width: `${completedPct}%` }}
            title={`${labels.completed}: ${summary.completed} (${completedPct}%)`}
          />
          <div
            className="bg-brand-rose transition-all"
            style={{ width: `${terminatedPct}%` }}
            title={`${labels.terminated}: ${summary.terminated} (${terminatedPct}%)`}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
          <span className="flex items-center gap-1.5 text-brand-muted">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-success" />
            {labels.active}: {summary.active} ({activePct}%)
          </span>
          <span className="flex items-center gap-1.5 text-brand-muted">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-cyan" />
            {labels.completed}: {summary.completed} ({completedPct}%)
          </span>
          <span className="flex items-center gap-1.5 text-brand-muted">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-rose" />
            {labels.terminated}: {summary.terminated} ({terminatedPct}%)
          </span>
        </div>
      </div>
    </section>
  );
}
