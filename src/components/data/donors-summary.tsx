import type { DonorsDirectorySummaryCards } from "@/lib/data/donors-directory";

type DonorsSummaryProps = {
  summary: DonorsDirectorySummaryCards;
};

export function DonorsSummary({ summary }: DonorsSummaryProps) {
  const cards = [
    { label: "Tổng nhà tài trợ", value: summary.total },
    { label: "Tỉnh", value: summary.provinceCount },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {cards.map((card) => (
        <article key={card.label} className="brand-card p-4">
          <p className="text-xs uppercase tracking-wide text-brand-muted">{card.label}</p>
          <p className="mt-1 text-2xl font-bold text-brand-ink">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
