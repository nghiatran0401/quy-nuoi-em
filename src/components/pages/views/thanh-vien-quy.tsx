import Image from "next/image";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { nuoiEmMediaLogos } from "@/lib/images";

export function MembersView({ locale }: { locale: Locale }) {
  return (
    <StaticPageShell {...getStaticPageHero("members", locale)}>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {nuoiEmMediaLogos.map((logo) => (
          <li
            key={logo.src}
            className="brand-card flex aspect-square items-center justify-center p-4"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
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
