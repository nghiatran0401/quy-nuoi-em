import { Clock3, ExternalLink } from "lucide-react";
import type { ProcessStepContent } from "@/content/process-2026-content";

type ProcessStepsListProps = {
  steps: readonly ProcessStepContent[];
  className?: string;
};

export function ProcessStepsList({ steps, className = "" }: ProcessStepsListProps) {
  return (
    <ol className={`grid gap-3 sm:gap-4 sm:grid-cols-2 ${className}`.trim()}>
      {steps.map((step) => (
        <li
          key={step.number}
          className="flex h-full flex-col rounded-xl border border-brand-border/70 bg-white p-4 shadow-[var(--shadow-brand-soft)] sm:p-5"
        >
          <div className="flex items-start gap-3">
            <span
              className="font-heading text-3xl font-extrabold leading-none tracking-tight text-brand-accent"
              aria-hidden
            >
              {step.number}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-base font-bold leading-snug text-brand-ink">{step.title}</h3>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-sky-soft px-2.5 py-0.5 text-[11px] font-semibold text-brand-muted">
                  <Clock3 className="h-3 w-3 text-brand-accent" aria-hidden />
                  {step.timing}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-brand-muted">{step.summary}</p>
            </div>
          </div>

          {step.bullets.length > 0 ? (
            <ul className="mt-3 space-y-1.5 border-t border-brand-border/50 pt-3">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-xs leading-relaxed text-brand-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-accent" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}

          {step.link ? (
            <p className="mt-auto border-t border-brand-border/50 pt-3">
              <a
                href={step.link.href}
                target="_blank"
                rel="noreferrer"
                className="link-accent inline-flex items-center gap-1 text-xs font-semibold"
              >
                {step.link.label}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </p>
          ) : null}

          <span className="sr-only">Bước {step.number}</span>
        </li>
      ))}
    </ol>
  );
}
