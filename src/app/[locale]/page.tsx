import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { CallToActionSection } from "@/components/home/call-to-action-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeNewsSection } from "@/components/home/home-news-section";
import { HomeStatsSection } from "@/components/home/home-stats-section";
import { MembersSection } from "@/components/home/members-section";
import { SponsorshipRoundsSection } from "@/components/home/sponsorship-rounds-section";
import { PartnersMarquee } from "@/components/pages/partners-marquee";
import { partnersHomeTitle } from "@/content/home-sections";
import type { Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    pathname: "/",
    keywords: t("keywords").split(",").map((k) => k.trim()),
    ogType: "website",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale as Locale;

  return (
    <div className="relative">
      <HeroSection />
      <HomeStatsSection locale={resolvedLocale} />
      <SponsorshipRoundsSection locale={resolvedLocale} />
      <CallToActionSection locale={resolvedLocale} />
      <MembersSection locale={resolvedLocale} />
      <HomeNewsSection locale={resolvedLocale} />
      <FaqSection locale={resolvedLocale} />
      <PartnersMarquee title={partnersHomeTitle[resolvedLocale]} variant="home" />
    </div>
  );
}
