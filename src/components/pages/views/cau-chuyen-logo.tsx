import Image from "next/image";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero, logoStorySections } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function LogoStoryView({ locale }: { locale: Locale }) {
  const sections = logoStorySections[locale];

  return (
    <StaticPageShell {...getStaticPageHero("logoStory", locale)} contentClassName="max-w-4xl">
      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-2xl font-bold text-brand-blue">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-gray-600">
                {p}
              </p>
            ))}
            {section.bullets?.map((group) => (
              <div key={group.title} className="mt-6">
                <h3 className="font-semibold text-brand-green">{group.title}</h3>
                <ul className="mt-3 list-inside list-disc space-y-2 text-gray-600">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            {section.colors ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {section.colors.map((color) => (
                  <li key={color.name} className="brand-card p-4">
                    <p className="font-semibold text-brand-blue">{color.name}</p>
                    <p className="mt-2 text-sm text-gray-600">{color.meaning}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <div className="flex justify-center py-8">
          <Image src="/logo/logo-quytnbs.svg" alt="Logo" width={280} height={120} className="h-auto w-64" />
        </div>
      </div>
    </StaticPageShell>
  );
}
