import Image from "next/image";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero } from "@/content/pages/static-pages";
import type { PartnerLogoDisplay } from "@/lib/data/partner-logos";

type MembersViewProps = {
  partnerLogos: PartnerLogoDisplay[];
};

export function MembersView({ partnerLogos }: MembersViewProps) {
  return (
    <StaticPageShell {...getStaticPageHero("members")}>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
        {partnerLogos.map((logo) => (
          <li
            key={logo.id ?? logo.src}
            className="brand-card flex aspect-square items-center justify-center p-4"
          >
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.alt}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </a>
            ) : (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={80}
                className="max-h-16 w-auto object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </li>
        ))}
      </ul>
    </StaticPageShell>
  );
}
