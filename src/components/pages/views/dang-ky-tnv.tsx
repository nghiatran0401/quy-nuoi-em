import { ArrowRight } from "lucide-react";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero, getUiLabel, volunteerRegisterPath } from "@/content/pages/static-pages";

export function VolunteerView() {
  return (
    <StaticPageShell {...getStaticPageHero("volunteer")} contentClassName="max-w-3xl">
      <div className="text-center">
        <a
          href={volunteerRegisterPath}
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-8 py-4"
        >
          {getUiLabel("registerNow")}
          <ArrowRight className="h-5 w-5" />
        </a>
        <p className="mt-4 text-sm text-brand-muted">
          Gửi tin nhắn qua Fanpage Nuôi Em — Ban điều hành Quỹ sẽ phản hồi sớm nhất.
        </p>
      </div>
    </StaticPageShell>
  );
}
