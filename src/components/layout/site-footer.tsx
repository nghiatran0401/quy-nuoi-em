import type { ReactNode } from "react";
import Link from "next/link";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { brandVisual } from "@/config/brand-visual";
import { siteCopy } from "@/content/site-copy";
import { footerResourceItems } from "@/lib/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const t = siteCopy.footer;
  const { contact, office, social, companyRegistration: reg } = brandVisual;
  const licenseDisplay = `${reg.enterpriseCode}/${t.enterpriseTypeSuffix}`;

  return (
    <footer className="site-footer">
      <div className="page-container py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <FooterBrandBlock
            name={brandVisual.name}
            legalName={reg.legalName}
            tagline={t.tagline}
            coverage={t.coverage}
          />

          <FooterSection
            title={t.registrationSection}
            className="md:border-l md:border-brand-border/50 md:pl-8 lg:pl-10"
          >
            <div className="space-y-3">
              <FooterDefinition label={t.businessLicense} value={licenseDisplay} />
              <p className="text-sm leading-relaxed text-brand-muted">
                {t.issuedOn}{" "}
                <span className="font-medium text-brand-ink">{reg.firstRegisteredAt}</span> {t.issuedBy}{" "}
                <span className="text-brand-ink">{reg.issuedBy}</span>
              </p>
              <p className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                <span>
                  <span className="font-medium text-brand-ink">{t.registeredAddress}:</span>{" "}
                  {office.address}
                </span>
              </p>
            </div>
          </FooterSection>

          <FooterSection
            title={t.contactSection}
            className="md:border-l md:border-brand-border/50 md:pl-8 lg:pl-10"
          >
            <ul className="space-y-3">
              <FooterContactItem
                href={`mailto:${contact.email}`}
                icon={Mail}
                label={contact.email}
              />
              <FooterContactItem
                href={`tel:${contact.phone}`}
                icon={Phone}
                label={contact.phoneDisplay}
              />
              <FooterContactItem
                href={social.facebook}
                icon={Facebook}
                label={t.facebookPage}
                external
              />
            </ul>
          </FooterSection>
        </div>

        <nav
          aria-label={t.resourcesSection}
          className="mt-10 border-t border-brand-border/50 pt-8"
        >
          <p className="mb-4 text-sm font-bold text-brand-green">{t.resourcesSection}</p>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {footerResourceItems.map((item) => (
              <li key={item.href}>
                <FooterResourceLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-border/60">
        <div className="page-container py-6 text-center text-sm text-brand-muted">
          <p>
            © {year} {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterBrandBlock({
  name,
  legalName,
  tagline,
  coverage,
}: {
  name: string;
  legalName: string;
  tagline: string;
  coverage: string;
}) {
  return (
    <div className="flex flex-col gap-4 lg:pr-6">
      <Link href="/" className="block w-fit transition-opacity hover:opacity-90">
        <BrandLogo variant="default" className="h-11 w-auto object-contain object-left" />
      </Link>
      <div className="space-y-1.5">
        <p className="text-lg font-bold tracking-tight text-brand-ink">{name}</p>
        <p className="text-xs leading-relaxed text-brand-muted">{legalName}</p>
      </div>
      <div className="space-y-1 text-sm leading-relaxed text-brand-muted">
        <p>{tagline}</p>
        <p className="font-medium text-brand-ink/80">{coverage}</p>
      </div>
    </div>
  );
}

function FooterDefinition({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{label}</p>
      <p className="mt-0.5 text-sm font-medium tabular-nums text-brand-ink">{value}</p>
    </div>
  );
}

function FooterContactItem({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  external?: boolean;
}) {
  const className =
    "flex items-center gap-2.5 text-sm text-brand-muted transition-colors hover:text-brand-accent";

  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          <Icon className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />
          <span>{label}</span>
        </a>
      </li>
    );
  }

  return (
    <li>
      <a href={href} className={className}>
        <Icon className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />
        <span>{label}</span>
      </a>
    </li>
  );
}

function FooterResourceLink({ item }: { item: (typeof footerResourceItems)[number] }) {
  const className =
    "text-sm font-medium text-brand-ink transition-colors hover:text-brand-accent";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

function FooterSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h3 className="text-base font-bold text-brand-green">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}
