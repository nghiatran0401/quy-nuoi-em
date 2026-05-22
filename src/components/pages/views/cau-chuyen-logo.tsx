import { BrandLogo } from "@/components/brand/logo";
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
            <h2 className="heading-section text-2xl">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-brand-muted">
                {p}
              </p>
            ))}
            {section.bullets?.map((group) => (
              <div key={group.title} className="mt-6">
                <h3 className="font-semibold text-brand-accent">{group.title}</h3>
                <ul className="mt-3 list-inside list-disc space-y-2 text-brand-muted">
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
                    <p className="font-semibold text-brand-ink">{color.name}</p>
                    <p className="mt-2 text-sm text-brand-muted">{color.meaning}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <div className="flex justify-center py-8">
          <BrandLogo className="h-auto w-48 max-w-[200px]" />
        </div>
      </div>
    </StaticPageShell>
  );
}
