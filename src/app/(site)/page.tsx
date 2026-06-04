import type { Metadata } from "next";
import { CallToActionSection } from "@/components/home/call-to-action-section";
import { ImpactJourneySection } from "@/components/home/impact-journey-section";
import { MealProgramSection } from "@/components/home/meal-program-section";
import { ProcessOverviewSection } from "@/components/home/process-overview-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeNewsSection } from "@/components/home/home-news-section";
import { HomeStatsSection } from "@/components/home/home-stats-section";
import { MembersSection } from "@/components/home/members-section";
import { SponsoredChildrenSection } from "@/components/home/sponsored-children-section";
import { PartnersMarquee } from "@/components/pages/partners-marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { partnersHomeTitle } from "@/content/home-sections";
import { siteCopy } from "@/content/site-copy";
import { getDonateInfo, type DonateInfoContent } from "@/lib/data/donate-info";
import { getLiveHomeStats } from "@/lib/data/home-metrics";
import { getHomePageContent, type HomeFaqItem } from "@/lib/data/homepage";
import { getHomeMedia } from "@/lib/data/home-media";
import { getHomeSectionsContent } from "@/lib/data/homepage-sections";
import { getPartnerLogos } from "@/lib/data/partner-logos";
import { getLatestNews } from "@/lib/data/news";
import { faqPageJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
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

function faqAnswerText(item: HomeFaqItem, bank: DonateInfoContent): string {
  if (item.type === "dia-chi") {
    const body = item.body ?? "";
    const address = item.address ?? "";
    return [body, address].filter(Boolean).join(" — ");
  }
  if (item.type === "ngan-hang") {
    return `${bank.publicAccountLine} — Chủ tài khoản ${bank.accountName} — ${bank.bank} (${bank.branch}). Cú pháp chuyển khoản: ${bank.transferFormat}. Ví dụ: ${bank.transferExample}.`;
  }
  if (item.type === "quy-trinh" && item.steps) {
    return item.steps.map((step, i) => `${i + 1}. ${step}`).join(" ");
  }
  return item.body ?? "";
}

export default async function HomePage() {
  const [homeContent, homeSections, donateInfo, partnerLogos, homeMedia, liveHomeStats] =
    await Promise.all([
      getHomePageContent(),
      getHomeSectionsContent(),
      getDonateInfo(),
      getPartnerLogos(),
      getHomeMedia(),
      getLiveHomeStats(),
    ]);
  const faq = homeContent.faq;
  const faqEntries = faq.items.map((item) => ({
    question: item.question,
    answer: faqAnswerText(item, donateInfo),
  }));

  const latestNews = await getLatestNews(6);
  const { metadata } = siteCopy;

  return (
    <div className="relative">
      <JsonLd
        data={[
          webPageJsonLd({
            title: metadata.title,
            description: metadata.description,
            pathname: "/",
          }),
          faqPageJsonLd(faqEntries),
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
      />
      <CallToActionSection content={homeContent.cta} ctaImageUrl={homeMedia.ctaImage} />
      <MealProgramSection content={homeSections.meal} />
      <ImpactJourneySection content={homeSections.impact} />
      <ProcessOverviewSection content={homeSections.process} />
      <MembersSection content={homeContent.members} memberImageUrls={homeMedia.memberImages} />
      <SponsoredChildrenSection content={homeSections.sponsored} />
      <HomeNewsSection content={homeSections.news} />
      <FaqSection content={homeContent.faq} donateInfo={donateInfo} donateQrUrl={homeMedia.donateQr} />
      <PartnersMarquee title={homeSections.partnersTitle || partnersHomeTitle} logos={partnerLogos} variant="home" />
    </div>
  );
}
