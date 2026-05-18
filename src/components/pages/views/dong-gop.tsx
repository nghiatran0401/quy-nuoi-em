import { DonateSection } from "@/components/pages/donate-section";
import { PageHero } from "@/components/pages/page-hero";
import { donateInfo, getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function DonateView({ locale }: { locale: Locale }) {
  const info = donateInfo[locale];

  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("donate", locale)} />
      <DonateSection
        {...info}
        scanQrLabel={getUiLabel(locale, "scanQr")}
        volunteerLabel={getUiLabel(locale, "registerVolunteer")}
        referChildLabel={getUiLabel(locale, "referChild")}
      />
    </article>
  );
}
