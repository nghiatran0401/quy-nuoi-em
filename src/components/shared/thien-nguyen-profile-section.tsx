import { ArrowRight, BadgeCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { brandVisual } from "@/config/brand-visual";
import { thienNguyen } from "@/config/thien-nguyen";
import { thienNguyenCopy } from "@/content/thien-nguyen";

type ThienNguyenProfileSectionProps = {
  variant?: "card" | "compact" | "embedded";
  showStatementsLink?: boolean;
  showMonthlyReportsLink?: boolean;
  className?: string;
};

export function ThienNguyenProfileSection({
  variant = "card",
  showStatementsLink = true,
  showMonthlyReportsLink = true,
  className = "",
}: ThienNguyenProfileSectionProps) {
  if (variant === "compact" || variant === "embedded") {
    const wrapperClass =
      variant === "compact" ? `surface-info mt-3 p-4 ${className}` : className;
    return (
      <div className={wrapperClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
              <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
              {thienNguyenCopy.verified}
            </p>
            <p className="mt-1 text-sm text-brand-muted">{thienNguyenCopy.compactHint}</p>
          </div>
          <a
            href={thienNguyen.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-sm inline-flex w-full items-center justify-center gap-1.5 sm:w-auto"
          >
            {thienNguyenCopy.openProfile}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`brand-card overflow-hidden border-brand-accent/20 bg-gradient-to-br from-brand-surface-raised to-brand-warm p-6 md:p-8 ${className}`}
      aria-labelledby="thien-nguyen-profile-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-2">{thienNguyenCopy.eyebrow}</p>
          <h2 id="thien-nguyen-profile-heading" className="font-heading text-xl font-bold text-brand-ink md:text-2xl">
            {thienNguyenCopy.title}
          </h2>
          <p className="text-body mt-3 text-brand-muted">{thienNguyenCopy.description}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
            {thienNguyenCopy.verified} · {thienNguyen.displayName} ({thienNguyen.handle})
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-muted">
            {thienNguyenCopy.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
          <a
            href={thienNguyen.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            {thienNguyenCopy.openProfile}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          {showStatementsLink ? (
            <Link
              href="/sao-ke-tai-khoan"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border/80 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-accent/40"
            >
              {thienNguyenCopy.viewStatementsOnSite}
              <ArrowRight className="h-4 w-4 text-brand-accent" aria-hidden />
            </Link>
          ) : null}
          {showMonthlyReportsLink ? (
            brandVisual.financeUrl.startsWith("/") ? (
              <Link
                href={brandVisual.financeUrl}
                className="text-center text-sm font-medium text-brand-muted transition hover:text-brand-accent"
              >
                {thienNguyenCopy.monthlyReports}
              </Link>
            ) : (
              <a
                href={brandVisual.financeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm font-medium text-brand-muted transition hover:text-brand-accent"
              >
                {thienNguyenCopy.monthlyReports}
              </a>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
