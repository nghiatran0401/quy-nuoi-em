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
    <article className="min-h-screen bg-gray-50 pb-20">
      <DataPageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${contentClassName}`.trim()}>
        {children}
      </div>
    </article>
  );
}
