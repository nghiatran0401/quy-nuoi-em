import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero, getUiLabel, volunteerRegisterPath } from "@/content/pages/static-pages";

export function VolunteerView() {
  return (
    <StaticPageShell {...getStaticPageHero("volunteer")} contentClassName="max-w-3xl">
      <div className="text-center">
        <Link href={volunteerRegisterPath} className="btn-primary inline-flex items-center gap-2 px-8 py-4">
          {getUiLabel("registerNow")}
          <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-4 text-sm text-brand-muted">
          Gửi thông tin qua trang Liên hệ — Ban điều hành Quỹ Nuôi Em sẽ phản hồi sớm nhất.
        </p>
      </div>
    </StaticPageShell>
  );
}
