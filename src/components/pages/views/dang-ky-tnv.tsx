import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { getStaticPageHero, getUiLabel, volunteerContent } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function VolunteerView({ locale }: { locale: Locale }) {
  const content = volunteerContent[locale];

  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("volunteer", locale)} />
      <div className="mx-auto max-w-4xl px-4 text-center">
        <a
          href={content.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 font-bold text-white hover:bg-brand-green/90"
        >
          {getUiLabel(locale, "registerNow")}
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>
      <section className="mx-auto mt-12 max-w-4xl px-4">
        <h2 className="font-heading text-xl font-bold text-brand-blue">{content.roles.title}</h2>
        <p className="mb-4 text-gray-500">
          {locale === "vi" ? "Những việc làm nhỏ bé nhưng mang lại ý nghĩa lớn lao" : "Small acts with great meaning"}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.roles.items.map((item) => (
            <li key={item} className="brand-card p-4 text-gray-600">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto mt-12 max-w-5xl px-4">
        <h2 className="mb-6 text-center font-heading text-xl font-bold text-brand-blue">
          {locale === "vi" ? "Thành phần tham gia" : "Who can join"}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {content.audiences.map((audience) => (
            <article key={audience.title} className="brand-card p-6">
              <h3 className="font-semibold text-brand-green">{audience.title}</h3>
              <p className="mt-3 text-gray-600">{audience.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-gray-600">{content.commitment}</p>
      </section>
    </article>
  );
}
