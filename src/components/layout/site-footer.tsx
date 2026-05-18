import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  footerDocumentLinks,
  footerInfoLinks,
  footerLibraryLinks,
} from "@/lib/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue py-12 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <Link href="/" className="block w-fit pb-3">
            <Image
              src="/logo/logo-quytnbs-white.svg"
              alt="Quỹ Tony Buổi Sáng"
              width={100}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            <div>
              <p className="font-bold uppercase text-white">{t("companyName")}</p>
              <p>{t("registration")}</p>
              <p>{t("issued")}</p>
              <p>{t("registeredAddress")}</p>
            </div>
            <div className="space-y-2.5">
              <a
                href="mailto:bandieuhanh@quytnbs.com"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden />
                <span>bandieuhanh@quytnbs.com</span>
              </a>
              <a
                href="tel:0989501287"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden />
                <span>0989 501 287</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden />
                <span>{t("office")}</span>
              </div>
            </div>
          </div>
        </div>

        <FooterColumn title={t("info")} links={footerInfoLinks} t={t} />
        <FooterColumn title={t("documents")} links={footerDocumentLinks} t={t} />
        <FooterColumn title={t("library")} links={footerLibraryLinks} t={t} />
      </div>

      <div className="container mx-auto mt-12 border-t border-white/20 px-4 pt-8 text-center text-sm text-white/60">
        <p>
          © {year} {t("rights")}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  t,
}: {
  title: string;
  links: { href: string; labelKey: string }[];
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-brand-green">{title}</h3>
      <ul className="space-y-2 text-sm text-white/80">
        {links.map((link) => (
          <li key={link.href + link.labelKey}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
