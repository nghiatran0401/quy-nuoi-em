import { Link } from "@/i18n/navigation";
import { sponsorshipSectionCopy } from "@/content/home-sections";
import type { Locale } from "@/i18n/config";
import { SponsorshipChart } from "./sponsorship-chart";

type Props = { locale: Locale };

export function SponsorshipRoundsSection({ locale }: Props) {
  const copy = sponsorshipSectionCopy[locale];

  return (
    <section className="section-elevated py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5">
          <div className="text-center lg:col-span-2 lg:text-left">
            <h2 className="heading-display mb-4 text-3xl md:text-4xl">{copy.title}</h2>
            <p className="text-body mb-6">{copy.description}</p>
            <div className="mb-8 grid grid-cols-3 gap-3">
              <div className="mini-stat">
                <div className="font-heading text-2xl font-bold text-brand-ink md:text-3xl">17</div>
                <p className="text-sm text-brand-muted">{copy.rounds}</p>
              </div>
              <div className="mini-stat ring-1 ring-brand-accent/15">
                <div className="font-heading text-2xl font-bold text-brand-accent md:text-3xl">387</div>
                <p className="text-sm text-brand-muted">{copy.children}</p>
              </div>
              <div className="mini-stat">
                <div className="font-heading text-2xl font-bold text-brand-ink md:text-3xl">5+</div>
                <p className="text-sm text-brand-muted">{copy.years}</p>
              </div>
            </div>
            <Link href="/danh-sach-bao-tro" className="btn-primary px-6 py-3">
              {copy.cta}
            </Link>
          </div>
          <div className="lg:col-span-3" role="img" aria-label={copy.chartLabel}>
            <SponsorshipChart />
          </div>
        </div>
      </div>
    </section>
  );
}
