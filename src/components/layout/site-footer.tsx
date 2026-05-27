import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { brandVisual } from "@/config/brand-visual";
import { siteCopy } from "@/content/site-copy";
import {
  footerDocumentLinks,
  footerInfoLinks,
  footerLabel,
  footerLibraryLinks,
} from "@/lib/navigation";

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const t = siteCopy.footer;
  const { contact, office, financeUrl } = brandVisual;

  return (
    <footer className="site-footer py-12">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="block w-fit transition-opacity hover:opacity-90">
            <BrandLogo variant="default" className="h-11 w-auto object-contain object-left" />
          </Link>
          <div className="space-y-4 text-sm leading-relaxed text-brand-muted">
            <div className="space-y-1">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-ink">{t.companyName}</p>
              <p>{t.tagline}</p>
              <p>
                {t.financePrefix}{" "}
                <a
                  href={financeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-accent"
                >
                  taichinh.nuoiem.com
                </a>
              </p>
              <p>{t.coverage}</p>
            </div>
            <div className="space-y-2.5">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-start gap-3 transition-colors hover:text-brand-accent"
              >
                <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-green" aria-hidden />
                <span>{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-start gap-3 transition-colors hover:text-brand-accent"
              >
                <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-green" aria-hidden />
                <span>{contact.phoneDisplay}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-green" aria-hidden />
                <span>{office.address}</span>
              </div>
            </div>
          </div>
        </div>

        <FooterColumn title={t.info} links={footerInfoLinks} />
        <FooterColumn title={t.documents} links={footerDocumentLinks} />
        <FooterColumn title={t.library} links={footerLibraryLinks} />
      </div>

      <div className="container mx-auto mt-12 border-t border-brand-border/60 px-4 pt-8 text-center text-sm text-brand-muted">
        <p>
          © {year} {t.rights}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; labelKey: Parameters<typeof footerLabel>[0] }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-brand-green">{title}</h3>
      <ul className="space-y-2 text-sm text-brand-muted">
        {links.map((link) => (
          <li key={link.href + link.labelKey}>
            <Link
              href={link.href}
              className="transition-colors hover:text-brand-accent"
              target={isExternalHref(link.href) ? "_blank" : undefined}
              rel={isExternalHref(link.href) ? "noreferrer" : undefined}
            >
              {footerLabel(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
