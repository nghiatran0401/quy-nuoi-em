import { ContactSection } from "@/components/pages/contact-section";
import { PageHero } from "@/components/pages/page-hero";
import { contactInfo, getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function ContactView({ locale }: { locale: Locale }) {
  const info = contactInfo[locale];

  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("contact", locale)} />
      <ContactSection
        heading={getUiLabel(locale, "contactInfo")}
        address={info.address}
        email={info.email}
        phone={info.phone}
        donationNote={info.donationNote}
        warning={info.warning}
        donateWarningLabel={getUiLabel(locale, "donateWarning")}
      />
    </article>
  );
}
