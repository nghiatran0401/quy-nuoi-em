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
    { value: summary.total, label: labels.totalChildren, color: "text-gray-900" },
    { value: summary.active, label: labels.active, color: "text-green-700" },
    { value: summary.completed, label: labels.completed, color: "text-blue-700" },
    { value: summary.terminated, label: labels.terminated, color: "text-red-700" },
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
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className={`mt-1 text-3xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-base font-semibold text-gray-900">{labels.statusBreakdown}</h3>
        <div className="flex h-4 overflow-hidden rounded-full">
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${activePct}%` }}
            title={`${labels.active}: ${summary.active} (${activePct}%)`}
          />
          <div
            className="bg-blue-500 transition-all"
            style={{ width: `${completedPct}%` }}
            title={`${labels.completed}: ${summary.completed} (${completedPct}%)`}
          />
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${terminatedPct}%` }}
            title={`${labels.terminated}: ${summary.terminated} (${terminatedPct}%)`}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
          <span className="flex items-center gap-1.5 text-gray-600">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
            {labels.active}: {summary.active} ({activePct}%)
          </span>
          <span className="flex items-center gap-1.5 text-gray-600">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
            {labels.completed}: {summary.completed} ({completedPct}%)
          </span>
          <span className="flex items-center gap-1.5 text-gray-600">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
            {labels.terminated}: {summary.terminated} ({terminatedPct}%)
          </span>
        </div>
      </div>
    </section>
  );
}
