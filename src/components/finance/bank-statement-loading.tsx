import { Loader2 } from "lucide-react";

type BankStatementLoadingProps = {
  title?: string;
  hint?: string;
  variant?: "banner" | "inline" | "page";
};

const defaultCopy = {
  title: "Đang tải sao kê…",
  hint: "Dữ liệu nhiều, lần đầu có thể mất vài chục giây. Xin anh chị chờ chút nhé.",
};

export function BankStatementLoading({
  title = defaultCopy.title,
  hint = defaultCopy.hint,
  variant = "inline",
}: BankStatementLoadingProps) {
  if (variant === "banner") {
    return (
      <div
        className="flex items-start gap-3 rounded-xl border-2 border-brand-green/35 bg-brand-green-light px-4 py-3.5 shadow-sm"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-brand-green" aria-hidden />
        <div className="min-w-0 text-left">
          <p className="text-sm font-semibold text-brand-ink sm:text-base">{title}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{hint}</p>
        </div>
      </div>
    );
  }

  const containerClass =
    variant === "page"
      ? "flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-brand-border/60 bg-white px-6 py-16 text-center shadow-sm"
      : "absolute inset-0 z-30 flex flex-col items-center justify-center rounded-xl border-2 border-brand-green/25 bg-white px-6 py-12 text-center shadow-lg";

  return (
    <div
      className={containerClass}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 className="h-12 w-12 animate-spin text-brand-green" aria-hidden />
      <p className="mt-4 font-heading text-base font-semibold text-brand-ink sm:text-lg">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-muted">{hint}</p>
    </div>
  );
}

export const bankStatementLoadingCopy = defaultCopy;
