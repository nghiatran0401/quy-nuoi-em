"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { brandVisual } from "@/config/brand-visual";
import { siteCopy } from "@/content/site-copy";

export function SiteBuildNotice() {
  const [dismissed, setDismissed] = useState(false);
  const { buildNotice } = siteCopy;
  const fanpageUrl = brandVisual.social.facebook;

  if (dismissed) {
    return null;
  }

  return (
    <aside className="site-build-notice" role="status" aria-live="polite">
      <div className="page-container flex items-center gap-2 py-2.5 sm:gap-3 sm:py-3">
        <p className="min-w-0 flex-1 text-pretty text-[0.8125rem] leading-snug text-brand-ink/85 sm:text-sm sm:leading-relaxed">
          <span className="font-semibold text-brand-ink">{buildNotice.prefix}</span>{" "}
          {buildNotice.body} {buildNotice.line1Closing}{" "}
          <a
            href={fanpageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-ink no-underline hover:text-brand-ink/80"
          >
            {buildNotice.linkLabel}
          </a>{" "}
          {buildNotice.suffix}
        </p>
        <button
          type="button"
          aria-label={buildNotice.closeLabel}
          onClick={() => setDismissed(true)}
          className="focus-ring -mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-brand-ink/55 transition hover:bg-brand-ink/5 hover:text-brand-ink sm:h-8 sm:w-8"
        >
          <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </aside>
  );
}
