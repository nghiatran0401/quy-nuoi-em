import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/pages/page-hero";
import { ValueCards } from "@/components/pages/value-cards";
import {
  getStaticPageHero,
  getUiLabel,
  visionMission,
  visionValues,
} from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function VisionView({ locale }: { locale: Locale }) {
  const hero = getStaticPageHero("vision", locale);
  const mission = visionMission[locale];
  const values = visionValues[locale];

  return (
    <article className="pb-16">
      <PageHero {...hero} />
      <div className="mx-auto max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-gray-600">
        {mission.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{mission.sponsorship}</p>
        <p>
          {locale === "vi"
            ? "Những đứa trẻ này lớn lên sẽ biết quý trọng mọi thứ mình có được, sống có trách nhiệm và trở thành người có ích cho cộng đồng."
            : "These children will grow up appreciating what they have, living responsibly, and giving back to their communities."}
        </p>
      </div>
      <p className="mt-6 text-center text-sm font-bold uppercase tracking-widest text-brand-green">
        {locale === "vi" ? "Giá trị cốt lõi" : "Core values"}
      </p>
      <ValueCards heading={values.heading} items={values.items} footer={values.cta} />
      <p className="text-center">
        <Link
          href="/bao-cao"
          className="inline-flex rounded-full bg-brand-blue px-8 py-3 font-bold text-white hover:bg-brand-blue/90"
        >
          {getUiLabel(locale, "viewReports")}
        </Link>
      </p>
    </article>
  );
}
