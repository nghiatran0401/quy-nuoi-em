import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PublicCatalogPromo } from "@/components/shared/public-catalog-promo";
import { TransferInfoSection } from "@/components/shared/transfer-info-section";
import { brandVisual } from "@/config/brand-visual";
import { process2026PageContent } from "@/content/process-2026-content";
import { getStaticPageHero } from "@/content/pages/static-pages";

type DonateViewProps = {
  donateQrUrl: string;
};

export function DonateView({ donateQrUrl }: DonateViewProps) {
  const hero = getStaticPageHero("donate");

  return (
    <article className="min-h-screen bg-brand-warm page-bottom-pad">
      <section className="banner-primary">
        <div className="page-container py-10 sm:py-12">
          <p className="eyebrow mb-3">
            {hero.eyebrow ?? "CHUNG TAY GÓP SỨC"}
          </p>
          <h1 className="heading-page mb-4">{hero.title}</h1>
          {hero.description ? (
            <p className="text-body max-w-2xl text-base sm:text-lg">{hero.description}</p>
          ) : null}
        </div>
      </section>

      <section className="page-container py-8 sm:py-10">
        <TransferInfoSection
          transfer={process2026PageContent.transfer}
          qrImageSrc={donateQrUrl}
          fanpageUrl={brandVisual.social.messenger}
        />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
          <Link
            href="/dang-ky-tnv"
            className="brand-card-interactive group flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-ink">Đăng ký tình nguyện</h3>
              <p className="mt-2 text-sm text-brand-muted">Cùng tham gia vào các hoạt động ý nghĩa.</p>
            </div>
            <ArrowRight className="h-6 w-6 text-brand-accent transition-transform group-hover:translate-x-1" />
          </Link>
          <PublicCatalogPromo variant="card" />
        </div>
      </section>
    </article>
  );
}
