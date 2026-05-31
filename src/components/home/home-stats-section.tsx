import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publicCatalog } from "@/config/public-catalog";
import { HomeStatsGrid } from "@/components/home/home-stats-grid";
import { homeStats } from "@/content/shared/site-stats";
import type { StatItem } from "@/content/types";

type HomeStatsSectionProps = {
  stats?: StatItem[];
};

export function HomeStatsSection({ stats }: HomeStatsSectionProps) {
  const items = stats ?? homeStats;
  const periodHint = items[0]?.hint;

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

      <div className="container relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-dark">
            Tác động thực tế
          </p>
          <h2 id="home-stats-heading" className="font-heading mt-2 text-2xl font-extrabold text-brand-ink sm:text-3xl">
            Con số nói lên sự tin tưởng
          </h2>
          {periodHint ? (
            <p className="mt-2 text-sm text-brand-muted">{periodHint}</p>
          ) : null}
        </header>

        <HomeStatsGrid stats={items} />

        <p className="mt-8 text-center text-sm text-brand-muted sm:mt-10">
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
