import { HomeCampaignLogos } from "@/components/home/home-campaign-logos";
import { HomeStatsGrid } from "@/components/home/home-stats-grid";
import { campaignSectionCopy } from "@/content/homepage-content";
import type { StatItem } from "@/content/types";

type HomeStatsSectionProps = {
  stats: StatItem[];
  logos?: typeof campaignSectionCopy.logos;
};

export function HomeStatsSection({
  stats,
  logos = campaignSectionCopy.logos,
}: HomeStatsSectionProps) {
  const items = stats;

  return (
    <section
      className="relative overflow-hidden border-y border-brand-border/60 bg-gradient-to-b from-brand-surface via-brand-warm to-brand-surface"
      aria-labelledby="home-stats-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgb(255 232 214 / 0.55), transparent 42%), radial-gradient(circle at 88% 80%, rgb(216 236 248 / 0.5), transparent 38%)",
        }}
        aria-hidden
      />

      <div className="page-container relative py-8 sm:py-10 lg:py-12">
        <header className="mx-auto mb-6 max-w-5xl text-center sm:mb-8">
          <HomeCampaignLogos logos={logos} className="mb-5 sm:mb-6" />
          <h2
            id="home-stats-heading"
            className="heading-display mx-auto max-w-4xl scroll-mt-24 text-[clamp(1.35rem,4vw+0.5rem,2.35rem)] font-extrabold leading-tight tracking-tight text-brand-accent"
          >
            Thống kê tổng quan
          </h2>
          <p className="mt-3 font-heading text-sm font-semibold tracking-wide text-brand-green md:text-base">
            Cảm ơn anh chị đã đồng hành cùng Quỹ Nuôi Em
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-brand-muted md:text-base">
            Khi đồng ý nuôi em, cũng có nghĩa bạn đã hoàn toàn nắm rõ thông tin về Dự án, uỷ quyền, đồng
            thuận, tin tưởng về cách thức quản lý tài chính, triển khai thực hiện do Dự án Nuôi Em đang vận hành,
            triển khai, đồng thời trao quyền để Dự án quyết định những vấn đề liên quan đến Dự án.
          </p>
        </header>

        <HomeStatsGrid stats={items} />
      </div>
    </section>
  );
}
