import type { ReactNode } from "react";
import { DataPageHeader } from "@/components/pages/data-page-header";
import type { PageHero } from "@/content/types";

type StaticPageShellProps = PageHero & {
  children: ReactNode;
  contentClassName?: string;
};

export function StaticPageShell({
  eyebrow,
  title,
  description,
  children,
  contentClassName = "",
}: StaticPageShellProps) {
  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <DataPageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className={`page-container py-6 sm:py-8 ${contentClassName}`.trim()}>
        {children}
      </div>
    </article>
  );
}
