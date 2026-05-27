import type { SchoolSummary as SchoolSummaryData } from "@/lib/data/schools";

type SchoolsSummaryProps = {
  summary: SchoolSummaryData;
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function SchoolsSummary({ summary }: SchoolsSummaryProps) {
  const cards = [
    { label: "Điểm trường", value: formatNumber(summary.totalSchools) },
    { label: "Học sinh", value: formatNumber(summary.totalStudents) },
    { label: "Mã đã được cấp", value: formatNumber(summary.totalIssuedCodes) },
    { label: "Tỉnh", value: formatNumber(summary.totalProvinces) },
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
