import {
  CircleDollarSign,
  HandHeart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import type { StatItem } from "@/content/types";
import type { LucideIcon } from "lucide-react";

type HomeStatsGridProps = {
  stats: StatItem[];
};

type StatTone = "accent" | "deep" | "cyan" | "success" | "warm";

const toneStyles: Record<
  StatTone,
  { icon: string; value: string; bg: string; ring: string }
> = {
  accent: {
    icon: "text-brand-accent",
    value: "text-brand-accent",
    bg: "bg-gradient-to-br from-brand-peach/80 via-brand-highlight-soft to-white",
    ring: "ring-brand-accent/15",
  },
  deep: {
    icon: "text-brand-deep",
    value: "text-brand-deep",
    bg: "bg-brand-green-light/60",
    ring: "ring-brand-deep/15",
  },
  cyan: {
    icon: "text-brand-cyan",
    value: "text-brand-cyan",
    bg: "bg-brand-sky-soft/80",
    ring: "ring-brand-cyan/15",
  },
  success: {
    icon: "text-brand-success",
    value: "text-brand-success",
    bg: "bg-brand-success-soft/70",
    ring: "ring-brand-success/15",
  },
  warm: {
    icon: "text-brand-accent-dark",
    value: "text-brand-accent-dark",
    bg: "bg-brand-peach/50",
    ring: "ring-brand-accent/20",
  },
};

function parsePercent(hint?: string): number | null {
  if (!hint) return null;
  const match = hint.match(/([\d,]+(?:[.,]\d+)?)\s*%/);
  if (!match) return null;
  return Number.parseFloat(match[1].replace(",", "."));
}

function CompactStat({
  stat,
  tone,
  icon: Icon,
}: {
  stat: StatItem;
  tone: StatTone;
  icon: LucideIcon;
}) {
  const styles = toneStyles[tone];

  return (
    <article className={`rounded-2xl p-4 ring-1 ring-inset sm:p-5 ${styles.bg} ${styles.ring}`}>
      <div className="flex items-start gap-3">
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm ${styles.icon}`}
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`font-heading text-2xl font-bold leading-none tracking-tight tabular-nums sm:text-3xl ${styles.value}`}>
            {stat.value}
          </p>
          <p className="mt-1.5 font-heading text-sm font-bold leading-snug text-brand-ink sm:text-base">
            {stat.label}
          </p>
          {stat.hint ? (
            <p className="mt-1 text-xs leading-snug text-brand-muted">{stat.hint}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function FeaturedStat({ stat }: { stat: StatItem }) {
  const styles = toneStyles.accent;

  return (
    <article
      className={`relative flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl p-6 sm:p-8 ${styles.bg} ring-1 ring-inset ${styles.ring}`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-accent/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex items-center gap-3">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-sm ${styles.icon}`}
          aria-hidden
        >
          <Users className="h-6 w-6" strokeWidth={2.25} />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-accent-dark">
          Quy mô dự án
        </p>
      </div>
      <p
        className={`relative mt-5 font-heading text-[clamp(2.5rem,8vw,4rem)] font-bold leading-none tracking-tight tabular-nums ${styles.value}`}
      >
        {stat.value}
      </p>
      <p className="relative mt-3 font-heading text-lg font-bold leading-snug text-brand-ink sm:text-xl">
        {stat.label}
      </p>
      {stat.hint ? (
        <p className="relative mt-2 text-sm text-brand-muted">{stat.hint}</p>
      ) : null}
    </article>
  );
}

function SponsorshipPanel({ withSponsor, withoutSponsor }: { withSponsor: StatItem; withoutSponsor: StatItem }) {
  const withPct = parsePercent(withSponsor.hint) ?? 50;
  const withoutPct = parsePercent(withoutSponsor.hint) ?? 100 - withPct;

  return (
    <article className="rounded-2xl bg-brand-warm/80 p-5 ring-1 ring-inset ring-brand-border/60 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-brand-success"
              aria-hidden
            >
              <HandHeart className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div>
              <p className="font-heading text-sm font-bold text-brand-ink sm:text-base">Phân bổ người nuôi</p>
              <p className="text-xs text-brand-muted">Tỷ lệ em đã được và đang chờ bảo trợ</p>
            </div>
          </div>

          <div className="mt-5 md:mt-6">
            <div
              className="flex h-3 overflow-hidden rounded-full bg-brand-border/40"
              role="img"
              aria-label={`${withPct}% đã có người nuôi, ${withoutPct}% chưa có người nuôi`}
            >
              <div
                className="bg-brand-success transition-[width] duration-700 ease-out"
                style={{ width: `${withPct}%` }}
              />
              <div
                className="bg-brand-accent/75 transition-[width] duration-700 ease-out"
                style={{ width: `${withoutPct}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-brand-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-success" aria-hidden />
                {withSponsor.label}: {withPct.toLocaleString("vi-VN")}%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-accent/75" aria-hidden />
                {withoutSponsor.label}: {withoutPct.toLocaleString("vi-VN")}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3 sm:gap-4 md:w-[min(100%,22rem)]">
          <div className="rounded-xl bg-white/90 p-3.5 shadow-sm ring-1 ring-brand-success/10 sm:p-4">
            <p className="font-heading text-xl font-bold tabular-nums text-brand-success sm:text-2xl">
              {withSponsor.value}
            </p>
            <p className="mt-1 text-xs font-semibold leading-snug text-brand-ink sm:text-sm">{withSponsor.label}</p>
          </div>
          <div className="rounded-xl bg-white/90 p-3.5 shadow-sm ring-1 ring-brand-accent/15 sm:p-4">
            <p className="font-heading text-xl font-bold tabular-nums text-brand-accent-dark sm:text-2xl">
              {withoutSponsor.value}
            </p>
            <p className="mt-1 text-xs font-semibold leading-snug text-brand-ink sm:text-sm">
              {withoutSponsor.label}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function FinancePanel({ income, expense }: { income: StatItem; expense: StatItem }) {
  return (
    <article className="flex h-full w-full flex-col rounded-2xl bg-white p-5 ring-1 ring-inset ring-brand-border/60 sm:p-6">
      <div className="flex items-center gap-2.5">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-deep"
          aria-hidden
        >
          <CircleDollarSign className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div>
          <p className="font-heading text-sm font-bold text-brand-ink sm:text-base">Minh bạch tài chính</p>
          <p className="text-xs text-brand-muted">Tổng thu và chi theo năm học</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div className={`rounded-xl p-4 ring-1 ring-inset ${toneStyles.deep.bg} ${toneStyles.deep.ring}`}>
          <div className="flex items-center gap-2 text-brand-deep">
            <TrendingUp className="h-4 w-4" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-wide">Thu</span>
          </div>
          <p className="mt-2 font-heading text-2xl font-bold tabular-nums text-brand-deep sm:text-[1.75rem]">
            {income.value}
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-ink">{income.label}</p>
          {income.hint ? <p className="mt-1 text-[11px] leading-snug text-brand-muted">{income.hint}</p> : null}
        </div>

        <div className={`rounded-xl p-4 ring-1 ring-inset ${toneStyles.cyan.bg} ${toneStyles.cyan.ring}`}>
          <div className="flex items-center gap-2 text-brand-cyan">
            <TrendingDown className="h-4 w-4" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-wide">Chi</span>
          </div>
          <p className="mt-2 font-heading text-2xl font-bold tabular-nums text-brand-cyan sm:text-[1.75rem]">
            {expense.value}
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-ink">{expense.label}</p>
          {expense.hint ? <p className="mt-1 text-[11px] leading-snug text-brand-muted">{expense.hint}</p> : null}
        </div>
      </div>
    </article>
  );
}

function FallbackStatsGrid({ stats }: { stats: StatItem[] }) {
  const icons: LucideIcon[] = [Users, TrendingUp, TrendingDown, HandHeart, HandHeart];

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <li key={stat.label} className="list-none">
          <CompactStat
            stat={stat}
            tone={(["accent", "deep", "cyan", "success", "warm"] as const)[index % 5]}
            icon={icons[index % icons.length]}
          />
        </li>
      ))}
    </ul>
  );
}

export function HomeStatsGrid({ stats }: HomeStatsGridProps) {
  const isStandardLayout = stats.length === 5;

  if (!isStandardLayout) {
    return <FallbackStatsGrid stats={stats} />;
  }

  const [total, income, expense, withSponsor, withoutSponsor] = stats;

  return (
    <div className="grid gap-4 lg:gap-5">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="lg:col-span-5 lg:flex">
          <FeaturedStat stat={total} />
        </div>
        <div className="lg:col-span-7 lg:flex">
          <FinancePanel income={income} expense={expense} />
        </div>
      </div>
      <SponsorshipPanel withSponsor={withSponsor} withoutSponsor={withoutSponsor} />
    </div>
  );
}
