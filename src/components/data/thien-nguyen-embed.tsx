import { ExternalLink } from "lucide-react";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { thienNguyen } from "@/config/thien-nguyen";
import { thienNguyenCopy } from "@/content/thien-nguyen";
import { getDataPageHero, getDataUiLabel } from "@/content/pages/data-pages";

export function ThienNguyenEmbed() {
  return (
    <article className="min-h-screen bg-brand-warm pb-10">
      <DataPageBanner {...getDataPageHero("statements")} />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-brand-muted sm:text-left">{getDataUiLabel("embedNote")}</p>
          <a
            href={thienNguyen.statementsOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-sm inline-flex items-center gap-1.5"
          >
            {getDataUiLabel("openFullPage")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
        <p className="text-center text-xs text-brand-muted">
          Số tài khoản {thienNguyen.accountNumber} · {thienNguyen.accountName} · {thienNguyenCopy.verified}
        </p>
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
