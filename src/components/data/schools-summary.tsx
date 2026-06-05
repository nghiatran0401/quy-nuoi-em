import type { SchoolsDirectorySummaryCards } from "@/lib/data/schools-directory";

type SchoolsSummaryProps = {
  summary: SchoolsDirectorySummaryCards;
};

export function SchoolsSummary({ summary }: SchoolsSummaryProps) {
  const cards = [
    { label: "Điểm trường", value: summary.schoolCount },
    { label: "Học sinh", value: summary.studentCount },
    { label: "Đã có người nuôi", value: summary.sponsored },
    { label: "Chưa có người nuôi", value: summary.unsponsored },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="brand-card p-4">
          <p className="text-xs uppercase tracking-wide text-brand-muted">{card.label}</p>
          <p className="mt-1 text-2xl font-bold text-brand-ink">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
