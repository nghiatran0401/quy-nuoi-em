"use client";

import { Check, Copy, Facebook, Link2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

type ShareButtonsProps = {
  url: string;
  title: string;
  locale: Locale;
  className?: string;
};

const labels = {
  vi: {
    share: "Chia sẻ",
    facebook: "Facebook",
    messenger: "Messenger",
    copy: "Sao chép liên kết",
    copied: "Đã sao chép",
  },
  en: {
    share: "Share",
    facebook: "Facebook",
    messenger: "Messenger",
    copy: "Copy link",
    copied: "Copied",
  },
} as const;

function encode(url: string) {
  return encodeURIComponent(url);
}

export function ShareButtons({ url, title, locale, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const t = labels[locale];

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`;
  const messengerHref = `https://www.facebook.com/dialog/send?link=${encode(url)}&app_id=0&redirect_uri=${encode(url)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={className}>
      <p className="mb-3 text-sm font-semibold text-brand-ink">{t.share}</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-accent/40 hover:text-brand-accent"
        >
          <Facebook className="h-4 w-4" aria-hidden />
          {t.facebook}
        </a>
        <a
          href={messengerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-accent/40 hover:text-brand-accent"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {t.messenger}
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-green/50 hover:text-brand-green"
        >
          <Link2 className="h-4 w-4" aria-hidden />
          {locale === "vi" ? "Trang dự án" : "Project page"}
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-accent/40 hover:text-brand-accent"
        >
          {copied ? (
            <Check className="h-4 w-4 text-brand-success" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <p className="sr-only">{title}</p>
    </div>
  );
}
