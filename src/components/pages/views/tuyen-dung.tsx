import { Mail } from "lucide-react";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { careersContent, getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function CareersView({ locale }: { locale: Locale }) {
  const content = careersContent[locale];

  return (
    <StaticPageShell {...getStaticPageHero("careers", locale)} contentClassName="max-w-3xl">
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        <span className="rounded-full bg-white px-4 py-2 shadow-sm">{content.location}</span>
        <span className="rounded-full bg-brand-green/20 px-4 py-2 font-medium text-brand-blue">
          {content.deadline}
        </span>
      </div>
      <div className="mt-10 space-y-10">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-xl font-bold text-brand-blue">{section.title}</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-12 text-center">
        <a
          href="mailto:bandieuhanh@quytnbs.com"
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3 font-bold text-white hover:bg-brand-blue/90"
        >
          <Mail className="h-5 w-5" />
          {getUiLabel(locale, "applyNow")}
        </a>
      </p>
    </StaticPageShell>
  );
}
