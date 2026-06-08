"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { siteCopy } from "@/content/site-copy";

const POPUP_ORANGE = "#EE9352";

export function HomeWelcomePopup() {
  const [open, setOpen] = useState(true);
  const [mounted] = useState(() => typeof window !== "undefined");
  const copy = siteCopy.homePopup;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[230] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={copy.closeLabel}
        className="absolute inset-0 bg-brand-ink/45 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-welcome-popup-title"
        className="relative z-[1] w-full max-w-[420px] overflow-hidden rounded-[18px] bg-white shadow-[0_24px_48px_-12px_rgb(58_51_46/0.28)]"
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src="/popup.jpg"
            alt={copy.imageAlt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover"
          />
          <button
            type="button"
            aria-label={copy.closeLabel}
            onClick={() => setOpen(false)}
            className="focus-ring absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-brand-ink shadow-sm transition hover:bg-white active:scale-95"
          >
            <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        <div className="px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          <p
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em]"
            style={{ color: POPUP_ORANGE }}
          >
            {copy.eyebrow}
          </p>

          <h2
            id="home-welcome-popup-title"
            className="mt-2 font-heading text-[1.625rem] font-bold leading-[1.2] tracking-tight text-brand-ink sm:text-[1.75rem]"
          >
            {copy.titlePrefix}{" "}
            <span style={{ color: POPUP_ORANGE }}>{copy.titleHighlight}</span>
          </h2>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-muted sm:text-base">
            {copy.descriptionPrefix}{" "}
            <span className="font-semibold text-brand-ink">{copy.descriptionBold}</span>{" "}
            {copy.descriptionSuffix}
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center rounded-[10px] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.98] sm:text-[0.9375rem]"
              style={{ backgroundColor: POPUP_ORANGE }}
            >
              {copy.fanpageButton}
            </a>
            <a
              href={siteConfig.social.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center rounded-[10px] bg-[#0084FF] px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#0078EB] active:scale-[0.98] sm:text-[0.9375rem]"
            >
              {copy.chatbotButton}
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
