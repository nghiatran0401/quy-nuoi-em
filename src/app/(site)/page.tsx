import type { Metadata } from "next";
import { HomeStorySection } from "@/components/home/home-story-section";
import { ImpactJourneySection } from "@/components/home/impact-journey-section";
import { MealProgramSection } from "@/components/home/meal-program-section";
import { ProcessOverviewSection } from "@/components/home/process-overview-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeEcosystemSection } from "@/components/home/home-ecosystem-section";
import { HomeNewsSection } from "@/components/home/home-news-section";
import { HomeStatsSection } from "@/components/home/home-stats-section";
// import { MembersSection } from "@/components/home/members-section";
// import { SponsoredChildrenSection } from "@/components/home/sponsored-children-section";
import { JsonLd } from "@/components/seo/json-ld";
import { siteCopy } from "@/content/site-copy";
import { getLiveHomeStats } from "@/lib/data/home-metrics";
import { getHomePageContent, resolveHomeCampaignContent } from "@/lib/data/homepage";
import { getHomeMedia } from "@/lib/data/home-media";
import { getHomeSectionsContent } from "@/lib/data/homepage-sections";
import { getLatestNews } from "@/lib/data/news";
import { getProcess2026PageContent } from "@/lib/data/process-2026-page";
import { itemListJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

/** Match directory home-metrics API cache (max-age=300). */
export const revalidate = 300;

export function generateMetadata(): Metadata {
  const { metadata } = siteCopy;
  return buildMetadata({
    title: metadata.title,
    ogTitle: metadata.ogTitle,
    description: metadata.description,
    pathname: "/",
    keywords: metadata.keywords.split(",").map((k) => k.trim()),
    ogImageAlt: `${metadata.ogTitle} — Nuôi cơm trưa, giúp trẻ tới trường`,
    ogType: "website",
  });
}

export default async function HomePage() {
  const [homeContent, homeSections, homeMedia, liveHomeStats, processContent] = await Promise.all([
    getHomePageContent(),
    getHomeSectionsContent(),
    getHomeMedia(),
    getLiveHomeStats(),
    getProcess2026PageContent(),
  ]);

  const latestNews = await getLatestNews(6);
  const { metadata } = siteCopy;
  const campaignContent = resolveHomeCampaignContent(homeContent.cta);

  return (
    <div className="relative home-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: metadata.title,
            description: metadata.description,
            pathname: "/",
          }),
          ...(latestNews.length > 0
            ? [
                itemListJsonLd({
                  name: "Bản tin & hoạt động mới nhất",
                  description: "Những hoạt động mới nhất của Quỹ Nuôi Em.",
                  items: latestNews.map((article) => ({
                    name: article.title,
                    pathname: `/news/${article.slug}`,
                    description: article.excerpt,
                  })),
                }),
              ]
            : []),
        ]}
      />
      <HeroSection content={homeContent.hero} heroImageUrl={homeMedia.heroImage} />
      <HomeStatsSection
        stats={liveHomeStats.stats}
        directoryUrl={liveHomeStats.directoryUrl}
        campaign={campaignContent.campaign}
        logos={campaignContent.logos}
      />
      <ProcessOverviewSection
        header={homeSections.process}
        processContent={processContent}
      />
      <HomeStorySection content={homeContent.cta} />
      <MealProgramSection content={homeSections.meal} />
      <ImpactJourneySection content={homeSections.impact} />
      {/* <MembersSection content={homeContent.members} memberImageUrls={homeMedia.memberImages} /> */}
      {/* <SponsoredChildrenSection content={homeSections.sponsored} /> */}
      <HomeNewsSection content={homeSections.news} />
      <HomeEcosystemSection ecosystem={campaignContent.ecosystem} />
    </div>
  );
}
