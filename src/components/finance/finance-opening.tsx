import type { StatItem } from "@/content/types";

type FinanceOpeningProps = {
  paragraphs: readonly string[];
  stats: readonly StatItem[];
  stewardNote: string;
};

export function FinanceOpening({ paragraphs, stats, stewardNote }: FinanceOpeningProps) {
  return (
    <section aria-labelledby="finance-intro-heading" className="space-y-8">
      <div className="max-w-3xl space-y-4 home-prose">
        <h2 id="finance-intro-heading" className="sr-only">
          Giới thiệu minh bạch tài chính
        </h2>
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`text-body leading-relaxed text-brand-muted ${index === 0 ? "text-[15px] sm:text-base" : "text-sm sm:text-[15px]"}`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl border border-brand-border/60 bg-white/80 px-5 py-6 text-center shadow-[var(--shadow-brand-soft)]"
          >
            <p className="eyebrow mb-2 normal-case tracking-[0.12em]">{stat.label}</p>
            <p className="font-heading text-xl font-extrabold tracking-tight text-brand-ink sm:text-2xl">
              {stat.value}
            </p>
            {stat.hint ? <p className="mt-2 text-xs leading-relaxed text-brand-muted">{stat.hint}</p> : null}
          </li>
        ))}
      </ul>

      <p className="surface-info max-w-3xl rounded-2xl px-5 py-4 text-sm leading-relaxed text-brand-muted">
        {stewardNote}
      </p>
    </section>
  );
}
