import { CalendarClock, Clock3, Quote, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StatItem } from "@/content/types";

type FinanceOpeningProps = {
  paragraphs: readonly string[];
  stats: readonly StatItem[];
  stewardNote: string;
};

type StatTone = "deep" | "cyan" | "warm";

const statMeta: { icon: LucideIcon; tone: StatTone }[] = [
  { icon: CalendarClock, tone: "deep" },
  { icon: Clock3, tone: "cyan" },
  { icon: Users, tone: "warm" },
];

const toneStyles: Record<
  StatTone,
  { icon: string; value: string; bg: string; ring: string; label: string }
> = {
  deep: {
    icon: "text-brand-deep",
    value: "text-brand-deep",
    bg: "bg-brand-green-light/70",
    ring: "ring-brand-deep/15",
    label: "text-brand-deep",
  },
  cyan: {
    icon: "text-brand-cyan",
    value: "text-brand-cyan",
    bg: "bg-brand-sky-soft",
    ring: "ring-brand-cyan/15",
    label: "text-brand-cyan",
  },
  warm: {
    icon: "text-brand-accent-dark",
    value: "text-brand-accent-dark",
    bg: "bg-brand-peach/60",
    ring: "ring-brand-accent/20",
    label: "text-brand-accent-dark",
  },
};

function TrustStatCard({
  stat,
  icon: Icon,
  tone,
  index,
}: {
  stat: StatItem;
  icon: LucideIcon;
  tone: StatTone;
  index: number;
}) {
  const styles = toneStyles[tone];

  return (
    <li
      className={`relative flex flex-col overflow-hidden rounded-xl p-4 ring-1 ring-inset ${styles.bg} ${styles.ring}`}
    >
      <div
        className="pointer-events-none absolute -right-3 -top-3 h-14 w-14 rounded-full bg-white/50 blur-2xl"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-2">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/90 shadow-sm ${styles.icon}`}
          aria-hidden
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <span className="font-heading text-2xl font-extrabold leading-none text-brand-border/70 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className={`relative mt-3 text-[10px] font-bold uppercase tracking-[0.12em] ${styles.label}`}>
        {stat.label}
      </p>
      <p className={`relative mt-1.5 font-heading text-xl font-extrabold leading-tight tracking-tight ${styles.value}`}>
        {stat.value}
      </p>
      {stat.hint ? (
        <p className="relative mt-1.5 text-xs leading-snug text-brand-muted">{stat.hint}</p>
      ) : null}
    </li>
  );
}

export function FinanceOpening({ paragraphs, stats, stewardNote }: FinanceOpeningProps) {
  const [leadParagraph, ...supportingParagraphs] = paragraphs;

  return (
    <section aria-labelledby="finance-intro-heading" className="relative">
      <div
        className="pointer-events-none absolute -left-8 top-8 h-40 w-40 rounded-full bg-brand-sky/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 bottom-12 h-36 w-36 rounded-full bg-brand-peach/50 blur-3xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-brand-border/55 bg-gradient-to-br from-white via-brand-warm to-brand-sky-soft/35 shadow-[var(--shadow-brand-soft)]">
        <div className="grid gap-0 lg:grid-cols-2 lg:items-stretch lg:divide-x lg:divide-brand-border/45">
          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
            <h2 id="finance-intro-heading" className="sr-only">
              Giới thiệu minh bạch tài chính
            </h2>

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green-light/50 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-deep" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-deep">
                Cam kết minh bạch
              </span>
            </div>

            {leadParagraph ? (
              <div className="relative pl-5">
                <Quote
                  className="absolute left-0 top-0 h-8 w-8 text-brand-accent/25"
                  aria-hidden
                />
                <p className="text-lg font-medium leading-relaxed text-brand-ink sm:text-xl sm:leading-relaxed">
                  {leadParagraph}
                </p>
              </div>
            ) : null}

            {supportingParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                {paragraph}
              </p>
            ))}

            <div className="mt-auto rounded-2xl border border-brand-border/50 bg-gradient-to-br from-brand-sky-soft/80 via-white to-brand-peach/25 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-[var(--shadow-brand-soft)] ring-1 ring-brand-green/15"
                  aria-hidden
                >
                  <Users className="h-5 w-5 text-brand-deep" strokeWidth={2.25} />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold text-brand-ink">
                    Cập nhật bởi cộng đồng Nuôi Em
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                    {stewardNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t border-brand-border/45 bg-white/45 p-6 sm:p-7 lg:border-t-0 lg:p-8">
            <p className="mb-3 font-heading text-sm font-bold text-brand-ink">Nhịp cập nhật & giám sát</p>
            <ul className="flex flex-col gap-2.5 lg:gap-3">
              {stats.map((stat, index) => {
                const meta = statMeta[index] ?? statMeta[0];
                return (
                  <TrustStatCard
                    key={stat.label}
                    stat={stat}
                    icon={meta.icon}
                    tone={meta.tone}
                    index={index}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
