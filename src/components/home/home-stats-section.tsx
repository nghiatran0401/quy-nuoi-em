import { siteStats } from "@/content/shared/site-stats";
import type { Locale } from "@/i18n/config";

type HomeStatsSectionProps = {
  locale: Locale;
};

export function HomeStatsSection({ locale }: HomeStatsSectionProps) {
  const stats = siteStats[locale];

  return (
    <section className="section-surface border-y border-brand-border px-4 py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <div key={stat.label} className="brand-card p-8 text-center">
              <div className={index % 2 === 0 ? "stat-value mb-2" : "stat-value-muted mb-2"}>
                {stat.value}
              </div>
              <p className="mb-1 font-heading text-lg font-bold text-brand-ink">{stat.label}</p>
              {stat.hint ? <p className="text-sm text-brand-muted">{stat.hint}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
