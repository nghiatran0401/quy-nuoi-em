import { StatsRow } from "@/components/shared/stats-row";
import type { StatItem } from "@/content/types";

type StatsSectionProps = {
  stats: StatItem[];
  /** Full-width band with top/bottom border (homepage). */
  variant?: "band" | "inline";
};

export function StatsSection({ stats, variant = "band" }: StatsSectionProps) {
  const row = <StatsRow stats={stats} />;

  if (variant === "inline") {
    return row;
  }

  return (
    <section className="section-surface border-y border-brand-border px-4 py-16">
      <div className="container mx-auto max-w-7xl">{row}</div>
    </section>
  );
}
