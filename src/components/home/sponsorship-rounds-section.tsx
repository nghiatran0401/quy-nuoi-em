import { Link } from "@/i18n/navigation";
import { sponsorshipSectionCopy } from "@/content/home-sections";
import type { Locale } from "@/i18n/config";
import { SponsorshipChart } from "./sponsorship-chart";

type Props = { locale: Locale };

export function SponsorshipRoundsSection({ locale }: Props) {
  const copy = sponsorshipSectionCopy[locale];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5">
          <div className="text-center lg:col-span-2 lg:text-left">
            <h2 className="mb-4 font-heading text-3xl font-bold text-brand-blue md:text-4xl">
              {copy.title}
            </h2>
            <p className="mb-6 font-body leading-relaxed text-gray-600">{copy.description}</p>
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div>
                <div className="font-heading text-2xl font-bold text-brand-blue md:text-3xl">17</div>
                <div className="font-body text-sm text-gray-500">{copy.rounds}</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-brand-green md:text-3xl">387</div>
                <div className="font-body text-sm text-gray-500">{copy.children}</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-brand-blue md:text-3xl">5+</div>
                <div className="font-body text-sm text-gray-500">{copy.years}</div>
              </div>
            </div>
            <Link
              href="/danh-sach-bao-tro"
              className="inline-block rounded-full bg-brand-blue px-6 py-3 font-bold text-white transition-all hover:bg-brand-blue/90 hover:shadow-lg"
            >
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
