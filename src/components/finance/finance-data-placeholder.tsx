import type { LucideIcon } from "lucide-react";

type FinanceDataPlaceholderProps = {
  icon: LucideIcon;
  message: string;
  footnote?: string;
  minHeightClass?: string;
};

export function FinanceDataPlaceholder({
  icon: Icon,
  message,
  footnote,
  minHeightClass = "min-h-[280px]",
}: FinanceDataPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-border/80 bg-brand-surface/50 px-6 py-10 text-center ${minHeightClass}`}
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-muted shadow-sm">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="max-w-md text-sm leading-relaxed text-brand-muted">{message}</p>
      {footnote ? <p className="mt-4 max-w-lg text-xs leading-relaxed text-brand-muted/90">{footnote}</p> : null}
    </div>
  );
}
