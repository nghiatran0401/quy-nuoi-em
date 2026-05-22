import { Link } from "@/i18n/navigation";
import { StaticPageShell } from "@/components/pages/static-page-shell";
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
    <StaticPageShell {...hero} contentClassName="max-w-3xl">
      <div className="text-body space-y-6 text-lg">
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
      <p className="mt-10 text-center text-sm font-bold uppercase tracking-widest text-brand-accent">
        {locale === "vi" ? "Giá trị cốt lõi" : "Core values"}
      </p>
      <ValueCards heading={values.heading} items={values.items} footer={values.cta} />
      <p className="text-center">
        <Link
          href="/bao-cao"
          className="btn-primary"
        >
          {getUiLabel(locale, "viewReports")}
        </Link>
      </p>
    </StaticPageShell>
  );
}
