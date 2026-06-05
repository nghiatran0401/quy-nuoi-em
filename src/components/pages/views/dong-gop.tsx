import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BankTransferPanel } from "@/components/shared/bank-transfer-panel";
import { PublicCatalogPromo } from "@/components/shared/public-catalog-promo";
import { getStaticPageHero } from "@/content/pages/static-pages";
import type { DonateInfoContent } from "@/lib/data/donate-info";

type DonateViewProps = {
  info: DonateInfoContent;
  donateQrUrl: string;
};

export function DonateView({ info, donateQrUrl }: DonateViewProps) {
  const hero = getStaticPageHero("donate");

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <section className="banner-primary">
        <div className="page-container py-10 sm:py-12">
          <p className="eyebrow mb-3">
            {hero.eyebrow ?? "CHUNG TAY GÓP SỨC"}
          </p>
          <h1 className="heading-display mb-4 text-2xl sm:text-3xl md:text-5xl">{hero.title}</h1>
          {hero.description ? (
            <p className="text-body max-w-2xl text-lg">{hero.description}</p>
          ) : null}
        </div>
      </section>

      <section className="page-container py-8 sm:py-10">
        <BankTransferPanel bank={info} donateQrUrl={donateQrUrl} variant="page" />

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
