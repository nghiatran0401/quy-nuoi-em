import { ArrowUpRight, Search } from "lucide-react";
import { publicCatalog, publicCatalogHost } from "@/config/public-catalog";

type PublicCatalogPromoProps = {
  variant?: "banner" | "card";
  catalogUrl?: string;
};

export function PublicCatalogPromo({ variant = "banner", catalogUrl }: PublicCatalogPromoProps) {
  const href = catalogUrl?.trim() || publicCatalog.url;
  if (variant === "card") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-card-interactive group flex items-center justify-between p-6"
      >
        <div>
          <h3 className="font-heading text-lg font-bold text-brand-ink">{publicCatalog.ctaLabel}</h3>
          <p className="mt-2 text-sm text-brand-muted">{publicCatalog.shortDescription}</p>
        </div>
        <ArrowUpRight
          className="h-6 w-6 shrink-0 text-brand-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </a>
    );
  }

  return (
    <div className="surface-info flex flex-col gap-4 rounded-2xl border border-brand-green/25 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
          <Search className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-green">{publicCatalog.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-muted">{publicCatalog.shortDescription}</p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary inline-flex shrink-0 items-center justify-center gap-2 self-start sm:self-center"
      >
        {publicCatalog.ctaLabel}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
        <span className="sr-only"> ({publicCatalogHost()})</span>
      </a>
    </div>
  );
}
