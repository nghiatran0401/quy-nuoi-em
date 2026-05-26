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
import { JsonLd } from "@/components/seo/json-ld";
import { faqSectionCopy, partnersHomeTitle } from "@/content/home-sections";
import { donateInfo } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { getLatestNews } from "@/lib/data/news";
import { faqPageJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
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

function faqAnswerText(
  item: (typeof faqSectionCopy)["vi"]["items"][number],
  locale: Locale,
): string {
  const bank = donateInfo[locale];
  if (item.type === "address") {
    const body = item.body ?? "";
    const address = item.address ?? "";
    return [body, address].filter(Boolean).join(" — ");
  }
  if (item.type === "bank") {
    return locale === "vi"
      ? `Số tài khoản thiện nguyện ${bank.accountNumber} — Chủ tài khoản ${bank.accountName} — Ngân hàng ${bank.bank} (${bank.branch}). Cú pháp chuyển khoản: ${bank.transferFormat}. Ví dụ: ${bank.transferExample}.`
      : `Charity account number ${bank.accountNumber} — Account holder ${bank.accountName} — ${bank.bank} (${bank.branch}). Transfer memo: ${bank.transferFormat}. Example: ${bank.transferExample}.`;
  }
  if (item.type === "process" && item.steps) {
    return item.steps.map((step, i) => `${i + 1}. ${step}`).join(" ");
  }
  return item.body ?? "";
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const faq = faqSectionCopy[resolvedLocale];
  const faqEntries = faq.items.map((item) => ({
    question: item.question,
    answer: faqAnswerText(item, resolvedLocale),
  }));

  const latestNews = await getLatestNews(6, resolvedLocale);

  return (
    <div className="relative">
      <JsonLd
        data={[
          webPageJsonLd({
            locale: resolvedLocale,
            title: t("title"),
            description: t("description"),
            pathname: "/",
          }),
          faqPageJsonLd(faqEntries, resolvedLocale),
          ...(latestNews.length > 0
            ? [
                itemListJsonLd({
                  locale: resolvedLocale,
                  name:
                    resolvedLocale === "vi"
                      ? "Bản tin & hoạt động mới nhất"
                      : "Latest news & activities",
                  description:
                    resolvedLocale === "vi"
                      ? "Những hoạt động mới nhất của Dự án Nuôi Em."
                      : "Latest stories from the Nuoi Em Project.",
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
