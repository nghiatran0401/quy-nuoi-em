import { siteStats } from "@/content/shared/site-stats";
import type { Locale } from "@/i18n/config";

type HomeStatsSectionProps = {
  locale: Locale;
};

export function HomeStatsSection({ locale }: HomeStatsSectionProps) {
  const stats = siteStats[locale];

  return (
    <section className="bg-gray-50 px-4 py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="brand-card rounded-xl p-8 text-center">
              <div className="mb-2 font-heading text-4xl font-bold text-brand-blue md:text-5xl">
                {stat.value}
              </div>
              <div className="mb-1 font-heading text-lg font-bold text-gray-900">{stat.label}</div>
              {stat.hint ? <div className="font-body text-sm text-gray-500">{stat.hint}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
