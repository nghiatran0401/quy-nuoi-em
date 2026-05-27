import { StatCard } from "@/components/shared/stat-card";
import type { StatItem } from "@/content/types";

type StatsRowProps = {
  stats: StatItem[];
  className?: string;
};

export function StatsRow({ stats, className = "" }: StatsRowProps) {
  return (
    <ul
      className={`flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-5 lg:grid-cols-3 lg:items-stretch xl:flex xl:flex-row xl:items-stretch xl:gap-4 ${className}`}
    >
      {stats.map((stat) => (
        <li key={stat.label} className="min-w-0 flex-1 list-none">
          <StatCard stat={stat} />
        </li>
      ))}
    </ul>
  );
}
