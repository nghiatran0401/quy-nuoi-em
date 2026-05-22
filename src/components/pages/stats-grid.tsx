import type { StatItem } from "@/content/types";

type StatsGridProps = {
  stats: StatItem[];
  columns?: 2 | 4;
};

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridClass = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="brand-card p-6 text-center">
          <p className="heading-display text-3xl font-bold md:text-4xl">{stat.value}</p>
          <p className="mt-1 font-semibold text-brand-ink">{stat.label}</p>
          {stat.hint ? <p className="mt-1 text-sm text-brand-muted">{stat.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}
