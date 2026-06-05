import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeCampaignBanner } from "@/components/home/home-campaign-banner";
import { publicCatalog } from "@/config/public-catalog";
import { HomeStatsGrid } from "@/components/home/home-stats-grid";
import { campaignSectionCopy, type HomeCampaignBlock } from "@/content/homepage-content";
import type { StatItem } from "@/content/types";

type HomeStatsSectionProps = {
  stats: StatItem[];
  directoryUrl?: string;
  campaign?: HomeCampaignBlock;
  logos?: typeof campaignSectionCopy.logos;
};

export function HomeStatsSection({
  stats,
  directoryUrl,
  campaign = campaignSectionCopy.campaign,
  logos = campaignSectionCopy.logos,
}: HomeStatsSectionProps) {
  const items = stats;
  const catalogUrl = directoryUrl?.trim() || publicCatalog.url;

  return (
    <section
      className="relative overflow-hidden border-y border-brand-border/60 bg-gradient-to-b from-brand-surface via-brand-warm to-brand-surface"
      aria-labelledby="home-stats-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgb(255 232 214 / 0.55), transparent 42%), radial-gradient(circle at 88% 80%, rgb(216 236 248 / 0.5), transparent 38%)",
        }}
        aria-hidden
      />

      <div className="container relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <HomeCampaignBanner
          campaign={campaign}
          logos={logos}
          headingId="home-stats-heading"
          className="mb-5 sm:mb-6"
        />

        <HomeStatsGrid stats={items} />

        <div className="mx-auto mt-5 max-w-xl text-center sm:mt-6">
          <p className="text-xs text-brand-muted sm:text-sm">
            Số liệu tổng hợp từ danh mục em nuôi công khai
          </p>
          <Link
            href={catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-3 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold shadow-[var(--shadow-brand-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-brand-card)]"
          >
            {publicCatalog.statsCtaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
