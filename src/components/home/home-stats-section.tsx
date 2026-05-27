import { StatsSection } from "@/components/shared/stats-section";
import { homeStats } from "@/content/shared/site-stats";
import type { StatItem } from "@/content/types";

type HomeStatsSectionProps = {
  stats?: StatItem[];
};

export function HomeStatsSection({ stats }: HomeStatsSectionProps) {
  return <StatsSection stats={stats ?? homeStats} variant="band" />;
}
