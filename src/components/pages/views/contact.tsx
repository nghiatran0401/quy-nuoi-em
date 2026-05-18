import { ContactSection } from "@/components/pages/contact-section";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { contactInfo, getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function ContactView({ locale }: { locale: Locale }) {
  const info = contactInfo[locale];

  return (
    <StaticPageShell {...getStaticPageHero("contact", locale)}>
      <ContactSection
        heading={getUiLabel(locale, "contactInfo")}
        address={info.address}
        email={info.email}
        phone={info.phone}
        donationNote={info.donationNote}
        warning={info.warning}
        donateWarningLabel={getUiLabel(locale, "donateWarning")}
      />
    </StaticPageShell>
  );
}
