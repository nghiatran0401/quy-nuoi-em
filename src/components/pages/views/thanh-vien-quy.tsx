import Image from "next/image";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { partnerSlugs } from "@/content/shared/partners";
import { getStaticPageHero } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { partnerLogo } from "@/lib/images";

export function MembersView({ locale }: { locale: Locale }) {
  return (
    <StaticPageShell {...getStaticPageHero("members", locale)}>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {partnerSlugs.map((slug) => (
          <li
            key={slug}
            className="flex aspect-square items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <Image
              src={partnerLogo(slug)}
              alt={slug}
              width={140}
              height={80}
              className="max-h-16 w-auto object-contain"
            />
          </li>
        ))}
      </ul>
    </StaticPageShell>
  );
}
