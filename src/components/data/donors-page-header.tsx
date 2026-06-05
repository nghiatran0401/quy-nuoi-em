import { DonorsSummary } from "@/components/data/donors-summary";
import type { DonorsDirectorySummaryCards } from "@/lib/data/donors-directory";
import type { PageHero } from "@/content/types";

type DonorsPageHeaderProps = PageHero & {
  summary: DonorsDirectorySummaryCards;
};

export function DonorsPageHeader({ title, description, summary }: DonorsPageHeaderProps) {
  return (
    <section className="banner-primary">
      <div className="page-container py-10 sm:py-12 md:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h1 className="heading-page">{title}</h1>
            {description ? <p className="text-body mt-4 text-base sm:text-lg">{description}</p> : null}
          </div>
          <DonorsSummary summary={summary} variant="compact" />
        </div>
      </div>
    </section>
  );
}
