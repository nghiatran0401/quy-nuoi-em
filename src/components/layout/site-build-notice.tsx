import { brandVisual } from "@/config/brand-visual";
import { siteCopy } from "@/content/site-copy";

export function SiteBuildNotice() {
  const { buildNotice } = siteCopy;
  const fanpageUrl = brandVisual.social.facebook;

  return (
    <aside className="site-build-notice" role="status" aria-live="polite">
      <div className="page-container py-3 sm:py-3.5">
        <p className="text-[0.8125rem] leading-snug text-brand-ink/85 sm:text-sm sm:leading-relaxed">
          <span className="block md:whitespace-nowrap">
            <span className="font-semibold text-brand-ink">{buildNotice.prefix}</span>{" "}
            {buildNotice.body}{" "}
            <span className="whitespace-nowrap">{buildNotice.line1Closing}</span>
          </span>
          <span className="block">
            <a
              href={fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-ink no-underline hover:text-brand-ink/80"
            >
              {buildNotice.linkLabel}
            </a>{" "}
            {buildNotice.suffix}
          </span>
        </p>
      </div>
    </aside>
  );
}
