import { ExternalLink } from "lucide-react";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero, getUiLabel, volunteerContent } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function VolunteerView({ locale }: { locale: Locale }) {
  const content = volunteerContent[locale];

  return (
    <StaticPageShell {...getStaticPageHero("volunteer", locale)} contentClassName="max-w-5xl">
      <div className="text-center">
        <a
          href={content.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-8 py-4"
        >
          {getUiLabel(locale, "registerNow")}
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>
      <section className="mt-12">
        <h2 className="heading-section text-xl">{content.roles.title}</h2>
        <p className="mb-4 text-brand-muted">
          {locale === "vi" ? "Những việc làm nhỏ bé nhưng mang lại ý nghĩa lớn lao" : "Small acts with great meaning"}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.roles.items.map((item) => (
            <li key={item} className="brand-card p-4 text-brand-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="heading-section mb-6 text-center text-xl">
          {locale === "vi" ? "Thành phần tham gia" : "Who can join"}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {content.audiences.map((audience) => (
            <article key={audience.title} className="brand-card p-6">
              <h3 className="font-semibold text-brand-accent">{audience.title}</h3>
              <p className="mt-3 text-brand-muted">{audience.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-brand-muted">{content.commitment}</p>
      </section>
    </StaticPageShell>
  );
}
