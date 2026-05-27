import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publicCatalog } from "@/config/public-catalog";
import { StatsSection } from "@/components/shared/stats-section";
import { homeStats } from "@/content/shared/site-stats";
import type { StatItem } from "@/content/types";

type HomeStatsSectionProps = {
  stats?: StatItem[];
};

export function HomeStatsSection({ stats }: HomeStatsSectionProps) {
  return (
    <section className="section-surface border-y border-brand-border">
      <div className="container mx-auto max-w-7xl space-y-6 px-4 py-16">
        <StatsSection stats={stats ?? homeStats} variant="inline" />
        <p className="text-center text-sm text-brand-muted">
          Số liệu tổng hợp từ danh mục em nuôi công khai —{" "}
          <Link
            href={publicCatalog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent inline-flex items-center gap-1 font-medium"
          >
            {publicCatalog.statsCtaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
