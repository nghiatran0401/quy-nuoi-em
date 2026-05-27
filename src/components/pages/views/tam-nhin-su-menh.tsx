import Link from "next/link";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { ValueCards } from "@/components/pages/value-cards";
import {
  getStaticPageHero,
  getUiLabel,
  visionMission,
  visionValues,
} from "@/content/pages/static-pages";

export function VisionView() {
  const hero = getStaticPageHero("vision");
  const mission = visionMission;
  const values = visionValues;

  return (
    <StaticPageShell {...hero} contentClassName="max-w-3xl">
      <div className="text-body space-y-6 text-lg">
        {mission.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{mission.sponsorship}</p>
        <p>
          Những đứa trẻ này lớn lên sẽ biết quý trọng mọi thứ mình có được, sống có trách nhiệm và trở thành người có ích cho cộng đồng.
        </p>
      </div>
      <p className="mt-10 text-center text-sm font-bold uppercase tracking-widest text-brand-accent">
        Giá trị cốt lõi
      </p>
      <ValueCards heading={values.heading} items={values.items} footer={values.cta} />
      <p className="text-center">
        <Link
          href="/bao-cao"
          className="btn-primary"
        >
          {getUiLabel("viewReports")}
        </Link>
      </p>
    </StaticPageShell>
  );
}
