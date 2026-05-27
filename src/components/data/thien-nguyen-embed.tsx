import { DataPageBanner } from "@/components/pages/data-page-banner";
import { ThienNguyenProfileSection } from "@/components/shared/thien-nguyen-profile-section";
import { thienNguyen } from "@/config/thien-nguyen";
import { getDataPageHero, getDataUiLabel } from "@/content/pages/data-pages";

export function ThienNguyenEmbed() {
  return (
    <article className="min-h-screen bg-brand-warm pb-10">
      <DataPageBanner {...getDataPageHero("statements")} />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ThienNguyenProfileSection showStatementsLink={false} />
        <p className="text-center text-sm text-brand-muted">{getDataUiLabel("embedNote")}</p>
        <div className="brand-card h-[calc(100vh-20rem)] min-h-[480px] overflow-hidden p-1">
          <iframe
            src={thienNguyen.statementsEmbedUrl}
            title="Sao kê tài chính Dự án Nuôi Em"
            className="h-full w-full rounded-xl border-0"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
