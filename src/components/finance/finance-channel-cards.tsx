import type { ReactNode } from "react";
import { ArrowRight, BarChart3, FileSpreadsheet, Radio } from "lucide-react";
import Link from "next/link";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import type { FinanceChannel } from "@/content/tai-chinh-content";

const channelIcons = {
  archive: FileSpreadsheet,
  live: Radio,
  reports: BarChart3,
} as const;

type FinanceChannelCardsProps = {
  eyebrow: string;
  title: string;
  description?: string;
  channels: readonly FinanceChannel[];
};

function ChannelCard({
  channel,
  children,
}: {
  channel: FinanceChannel;
  children: ReactNode;
}) {
  const className =
    "group flex h-full flex-col rounded-2xl border border-brand-border/70 bg-white/90 p-5 transition hover:border-brand-green/35 hover:bg-brand-sky-soft/40 sm:p-6";

  if (channel.href.startsWith("#")) {
    return (
      <a href={channel.href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={channel.href} className={className}>
      {children}
    </Link>
  );
}

export function FinanceChannelCards({
  eyebrow,
  title,
  description,
  channels,
}: FinanceChannelCardsProps) {
  return (
    <section id="kenh-minh-bach" aria-labelledby="finance-channels-heading" className="scroll-mt-32">
      <FinanceSectionHeader eyebrow={eyebrow} title={title} description={description} headingId="finance-channels-heading" />

      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {channels.map((channel) => {
          const Icon = channelIcons[channel.id as keyof typeof channelIcons] ?? FileSpreadsheet;

          return (
            <li key={channel.id}>
              <ChannelCard channel={channel}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border/70 bg-brand-sky-soft text-brand-green">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-bold leading-snug text-brand-ink sm:text-lg">
                  {channel.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{channel.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-green transition group-hover:text-brand-accent">
                  {channel.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </ChannelCard>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
