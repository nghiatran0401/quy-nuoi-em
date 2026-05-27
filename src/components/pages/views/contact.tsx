import { ContactSection } from "@/components/pages/contact-section";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { contactInfo, getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";

export function ContactView() {
  const info = contactInfo;

  return (
    <StaticPageShell {...getStaticPageHero("contact")}>
      <ContactSection
        heading={getUiLabel("contactInfo")}
        address={info.address}
        email={info.email}
        phone={info.phone}
        donationNote={info.donationNote}
        warning={info.warning}
        donateWarningLabel={getUiLabel("donateWarning")}
      />
    </StaticPageShell>
  );
}
