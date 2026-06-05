import type { ReactNode } from "react";
import Link from "next/link";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { brandVisual } from "@/config/brand-visual";
import { publicCatalog, publicCatalogHost } from "@/config/public-catalog";
import { siteCopy } from "@/content/site-copy";
import { footerResourceItems } from "@/lib/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const t = siteCopy.footer;
  const { contact, office, financeUrl, social, companyRegistration: reg } = brandVisual;
  const licenseDisplay = `${reg.enterpriseCode}/${t.enterpriseTypeSuffix}`;

  return (
    <footer className="site-footer py-10 sm:py-12">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          <FooterBrandBlock
            name={brandVisual.name}
            legalName={reg.legalName}
            tagline={t.tagline}
            coverage={t.coverage}
          />

          <FooterSection
            title={t.registrationSection}
            className="sm:max-lg:border-l sm:max-lg:border-brand-border/50 sm:max-lg:pl-8"
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
            className="sm:col-span-2 lg:col-span-1 lg:border-l lg:border-brand-border/50 lg:pl-10"
          >
            <ul className="space-y-2.5">
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

            <div className="mt-6 border-t border-brand-border/50 pt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-green">
                {t.resourcesSection}
              </p>
              <ul className="space-y-2.5 text-sm leading-relaxed text-brand-muted">
                {footerResourceItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-medium text-brand-ink transition-colors hover:text-brand-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  {t.financePrefix}{" "}
                  <a
                    href={financeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-ink transition-colors hover:text-brand-accent"
                  >
                    taichinh.nuoiem.com
                  </a>
                </li>
                <li>
                  {t.catalogPrefix}{" "}
                  <a
                    href={publicCatalog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-ink transition-colors hover:text-brand-accent"
                  >
                    {publicCatalogHost()}
                  </a>
                </li>
              </ul>
            </div>
          </FooterSection>
        </div>
      </div>

      <div className="page-container mt-10 border-t border-brand-border/60 pt-8 text-center text-sm text-brand-muted">
        <p>
          © {year} {t.rights}
        </p>
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
    <div className="flex flex-col gap-5 lg:pr-4">
      <Link href="/" className="block w-fit transition-opacity hover:opacity-90">
        <BrandLogo variant="default" className="h-11 w-auto object-contain object-left" />
      </Link>
      <div className="space-y-2">
        <p className="text-lg font-bold tracking-tight text-brand-ink">{name}</p>
        <p className="text-xs leading-relaxed text-brand-muted">{legalName}</p>
      </div>
      <div className="space-y-1.5 text-sm leading-relaxed text-brand-muted">
        <p>{tagline}</p>
        <p className="text-brand-ink/75">{coverage}</p>
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
      <h3 className="text-base font-bold text-brand-green sm:text-lg">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}
