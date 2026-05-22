import { DataPageBanner } from "@/components/pages/data-page-banner";
import { getDataPageHero } from "@/content/pages/data-pages";
import type { Locale } from "@/i18n/config";

const EMBED_URL = "https://thiennguyen.app/doi-tac/minh-bach-tai-khoan/2010";

type ThienNguyenEmbedProps = {
  locale: Locale;
};

export function ThienNguyenEmbed({ locale }: ThienNguyenEmbedProps) {
  return (
    <article className="min-h-screen bg-brand-warm pb-10">
      <DataPageBanner {...getDataPageHero("statements", locale)} />
      <div className="mx-auto h-[calc(100vh-12rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="brand-card h-full overflow-hidden p-1">
          <iframe
            src={EMBED_URL}
            title="Sao kê tài chính Dự án Nuôi Em"
            className="h-full w-full rounded-xl border-0"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
