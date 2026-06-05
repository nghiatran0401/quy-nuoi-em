import type { DonorsDirectorySummaryCards } from "@/lib/data/donors-directory";

type DonorsSummaryProps = {
  summary: DonorsDirectorySummaryCards;
  variant?: "cards" | "compact";
};

export function DonorsSummary({ summary, variant = "cards" }: DonorsSummaryProps) {
  const items = [
    { label: "Tổng", value: summary.total, valueClassName: "text-brand-ink" },
    { label: "Tỉnh", value: summary.provinceCount, valueClassName: "text-brand-accent" },
  ];

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-3 self-stretch sm:self-start lg:self-auto">
        {items.map((item) => (
          <article
            key={item.label}
            className="min-w-[5.5rem] flex-1 rounded-xl border border-brand-border/60 bg-white px-3 py-3 shadow-sm sm:min-w-[6.5rem] sm:flex-none sm:px-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-muted">
              {item.label}
            </p>
            <p className={`mt-0.5 font-heading text-xl font-bold tabular-nums sm:text-2xl ${item.valueClassName}`}>
              {item.value}
            </p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.label} className="brand-card p-4">
          <p className="text-xs uppercase tracking-wide text-brand-muted">{item.label}</p>
          <p className={`mt-1 text-2xl font-bold ${item.valueClassName}`}>{item.value}</p>
        </article>
      ))}
    </section>
  );
}
