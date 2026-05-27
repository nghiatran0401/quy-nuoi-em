import type { StatItem } from "@/content/types";

type StatCardProps = {
  stat: StatItem;
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="brand-card flex h-full w-full flex-col px-4 py-5 sm:px-5 sm:py-6">
      <div className="flex h-[5.25rem] items-center justify-center sm:h-[5.75rem]">
        <p className="max-w-full text-center font-heading text-[clamp(1.75rem,2.75vw,3.25rem)] font-bold leading-none tracking-tight whitespace-nowrap text-brand-accent tabular-nums">
          {stat.value}
        </p>
      </div>

      <div className="flex h-[3.25rem] items-center justify-center">
        <p className="text-center font-heading text-base font-bold leading-snug text-brand-ink sm:text-lg">
          {stat.label}
        </p>
      </div>

      <div className="mt-auto flex min-h-[2.75rem] items-start justify-center pt-1">
        {stat.hint ? (
          <p className="text-center text-xs leading-snug text-brand-muted sm:text-sm">{stat.hint}</p>
        ) : null}
      </div>
    </article>
  );
}
