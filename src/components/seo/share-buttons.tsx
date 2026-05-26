"use client";

import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Link2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

type ShareButtonsProps = {
  url: string;
  title: string;
  locale: Locale;
  className?: string;
  /** Optional UTM source override (defaults to `share-button`). */
  utmSource?: string;
};

const labels = {
  vi: {
    share: "Chia sẻ",
    facebook: "Facebook",
    messenger: "Messenger",
    zalo: "Zalo",
    twitter: "X",
    linkedin: "LinkedIn",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "Gửi email",
    projectPage: "Trang dự án",
    copy: "Sao chép liên kết",
    copied: "Đã sao chép",
    shareOn: (network: string) => `Chia sẻ qua ${network}`,
  },
  en: {
    share: "Share",
    facebook: "Facebook",
    messenger: "Messenger",
    zalo: "Zalo",
    twitter: "X",
    linkedin: "LinkedIn",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "Email",
    projectPage: "Project page",
    copy: "Copy link",
    copied: "Copied",
    shareOn: (network: string) => `Share on ${network}`,
  },
} as const;

function encode(value: string) {
  return encodeURIComponent(value);
}

function withUtm(url: string, source: string, medium: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", "share");
    return u.toString();
  } catch {
    return url;
  }
}

type ShareLink = {
  key: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "neutral";
};

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M12.05 3.2c4.95 0 8.95 3.39 8.95 7.57 0 2.49-1.43 4.69-3.62 6.04l.46 2.95-3.06-1.72c-.85.2-1.78.31-2.73.31-4.95 0-8.95-3.39-8.95-7.58S7.1 3.2 12.05 3.2Z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M18.244 3H21.5l-7.55 8.625L23 21h-7.092l-5.553-7.114L4.06 21H.8l8.07-9.221L.5 3h7.27l5.005 6.46L18.244 3Zm-1.244 16.2h1.85L7.075 4.7H5.1l11.9 14.5Z" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M9.41 14.78l-.39 4.32c.56 0 .8-.24 1.09-.52l2.6-2.48 5.4 3.95c.99.55 1.7.26 1.96-.92l3.56-16.7c.32-1.45-.53-2.03-1.49-1.68L1.3 9.5C-.13 10.05-.1 10.84 1.07 11.2l5.05 1.58 11.74-7.39c.55-.36 1.06-.16.64.2L9.41 14.78Z" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.45 0 .08 5.37.08 11.96c0 2.11.55 4.16 1.6 5.97L0 24l6.24-1.64a11.92 11.92 0 005.79 1.47h.01c6.59 0 11.96-5.37 11.96-11.96 0-3.19-1.24-6.19-3.48-8.39ZM12.04 21.8h-.01a9.83 9.83 0 01-5.01-1.37l-.36-.21-3.7.97.99-3.6-.23-.37a9.81 9.81 0 01-1.51-5.26c0-5.43 4.42-9.85 9.86-9.85a9.81 9.81 0 016.97 2.88 9.78 9.78 0 012.88 6.97c0 5.43-4.42 9.84-9.86 9.84Zm5.4-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.66-.51l-.56-.01a1.08 1.08 0 00-.78.36c-.27.3-1.02 1-1.02 2.44 0 1.44 1.04 2.82 1.18 3.02.15.2 2.06 3.14 4.98 4.4.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.08-.12-.27-.2-.57-.34Z" />
  </svg>
);

export function ShareButtons({
  url,
  title,
  locale,
  className = "",
  utmSource = "share-button",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const t = labels[locale];

  const links = useMemo<ShareLink[]>(() => {
    const fbUrl = withUtm(url, utmSource, "facebook");
    const messengerUrl = withUtm(url, utmSource, "messenger");
    const zaloUrl = withUtm(url, utmSource, "zalo");
    const xUrl = withUtm(url, utmSource, "x");
    const linkedinUrl = withUtm(url, utmSource, "linkedin");
    const telegramUrl = withUtm(url, utmSource, "telegram");
    const whatsappUrl = withUtm(url, utmSource, "whatsapp");
    const emailUrl = withUtm(url, utmSource, "email");

    const emailBody =
      locale === "vi"
        ? `${title}\n\nXem chi tiết: ${emailUrl}`
        : `${title}\n\nRead more: ${emailUrl}`;

    return [
      {
        key: "facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encode(fbUrl)}`,
        label: t.facebook,
        icon: Facebook,
      },
      {
        key: "messenger",
        href: `https://www.facebook.com/dialog/send?link=${encode(messengerUrl)}&app_id=0&redirect_uri=${encode(messengerUrl)}`,
        label: t.messenger,
        icon: MessageCircle,
      },
      {
        key: "zalo",
        href: `https://zalo.me/share/link?url=${encode(zaloUrl)}`,
        label: t.zalo,
        icon: ZaloIcon,
      },
      {
        key: "x",
        href: `https://twitter.com/intent/tweet?url=${encode(xUrl)}&text=${encode(title)}`,
        label: t.twitter,
        icon: XIcon,
      },
      {
        key: "linkedin",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encode(linkedinUrl)}`,
        label: t.linkedin,
        icon: Linkedin,
      },
      {
        key: "telegram",
        href: `https://t.me/share/url?url=${encode(telegramUrl)}&text=${encode(title)}`,
        label: t.telegram,
        icon: TelegramIcon,
      },
      {
        key: "whatsapp",
        href: `https://api.whatsapp.com/send?text=${encode(`${title} ${whatsappUrl}`)}`,
        label: t.whatsapp,
        icon: WhatsappIcon,
      },
      {
        key: "email",
        href: `mailto:?subject=${encode(title)}&body=${encode(emailBody)}`,
        label: t.email,
        icon: Mail,
      },
    ];
  }, [locale, title, t, url, utmSource]);

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
        {links.map(({ key, href, label, icon: Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={t.shareOn(label)}
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-accent/40 hover:text-brand-accent"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-ink transition hover:border-brand-green/50 hover:text-brand-green"
        >
          <Link2 className="h-4 w-4" aria-hidden />
          {t.projectPage}
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={t.copy}
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
