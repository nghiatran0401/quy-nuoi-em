import { ArticleContent } from "@/components/data/article-content";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { dieuKhoanThamGiaContent } from "@/content/dieu-khoan-tham-gia";
import { getStaticPageHero } from "@/content/pages/static-pages";

export function DieuKhoanThamGiaView() {
  return (
    <StaticPageShell {...getStaticPageHero("dieuKhoanThamGia")} contentClassName="max-w-3xl">
      <ArticleContent content={dieuKhoanThamGiaContent.body} skipTopHeading />
    </StaticPageShell>
  );
}
