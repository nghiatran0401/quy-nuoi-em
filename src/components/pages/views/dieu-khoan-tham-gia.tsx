import { ArticleContent } from "@/components/data/article-content";
import { DieuKhoanToc } from "@/components/pages/dieu-khoan-toc";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { dieuKhoanThamGiaContent } from "@/content/dieu-khoan-tham-gia";
import { getStaticPageHero } from "@/content/pages/static-pages";
import { sanitizeBrandText } from "@/lib/brand-sanitize";
import { extractMarkdownH2Toc } from "@/lib/dieu-khoan-toc";

function stripLeadingSubtitle(body: string, subtitle: string): string {
  const cleanedSubtitle = sanitizeBrandText(subtitle).trim();
  if (!cleanedSubtitle) return body;

  return sanitizeBrandText(body)
    .split("\n")
    .filter((line) => line.trim() !== cleanedSubtitle)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function DieuKhoanThamGiaView() {
  const body = stripLeadingSubtitle(
    dieuKhoanThamGiaContent.body,
    dieuKhoanThamGiaContent.subtitle,
  );
  const tocItems = extractMarkdownH2Toc(body);

  return (
    <StaticPageShell {...getStaticPageHero("dieuKhoanThamGia")} contentClassName="max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-10 lg:gap-10">
        <aside className="lg:col-span-3">
          <DieuKhoanToc items={tocItems} />
        </aside>
        <div className="min-w-0 lg:col-span-7">
          <ArticleContent content={body} skipTopHeading anchorHeadings />
        </div>
      </div>
    </StaticPageShell>
  );
}
