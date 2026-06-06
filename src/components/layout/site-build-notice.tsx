"use client";

import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brandVisual } from "@/config/brand-visual";
import { siteCopy } from "@/content/site-copy";

const STORAGE_KEY = "qne-build-notice-dismissed";

export function SiteBuildNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sessionStorage.getItem(STORAGE_KEY) !== "1");
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const { buildNotice } = siteCopy;
  const email = brandVisual.contact.email;

  return (
    <aside className="site-build-notice" role="status" aria-live="polite">
      <div className="page-container flex items-start gap-2 py-2 sm:items-center sm:justify-center sm:gap-2.5 sm:py-2.5">
        <Info
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green/80 sm:mt-0"
          aria-hidden
        />
        <p className="min-w-0 flex-1 text-center text-[0.8125rem] leading-snug text-brand-muted sm:text-sm sm:leading-relaxed">
          <span className="font-medium text-brand-ink/90">{buildNotice.prefix}</span>{" "}
          {buildNotice.body}{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 transition hover:decoration-brand-accent"
          >
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="focus-ring -mr-1 shrink-0 rounded-md p-1 text-brand-muted/70 transition hover:bg-white/60 hover:text-brand-ink"
          aria-label={buildNotice.dismissLabel}
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
