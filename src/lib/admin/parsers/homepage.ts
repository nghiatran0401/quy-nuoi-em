import type { StatItem } from "@/content/types";
import type { DonateInfoContent } from "@/lib/data/donate-info";
import type { HomeMediaContent } from "@/lib/data/home-media";
import { campaignSectionCopy } from "@/content/home-campaign";
import type { HomeCtaContent, HomeFaqContent, HomeHeroContent, HomeMembersContent } from "@/lib/data/homepage";
import { getFormText, parseFormJson } from "@/lib/admin/form-utils";

export function buildHomepageUpsertPayload(formData: FormData, media: HomeMediaContent) {
  const locale = "vi" as const;
  const hero: HomeHeroContent = {
    eyebrow: getFormText(formData, `${locale}_hero_eyebrow`),
    title: getFormText(formData, `${locale}_hero_title`),
    description: getFormText(formData, `${locale}_hero_description`),
    sponsorNow: getFormText(formData, `${locale}_hero_sponsor_now`),
    learnMore: getFormText(formData, `${locale}_hero_learn_more`),
  };

  const title = getFormText(formData, `${locale}_cta_title`);
  const paragraphs = parseFormJson<string[]>(
    getFormText(formData, `${locale}_cta_paragraphs_json`),
    "Đoạn văn khối chiến dịch",
  );
  const donate = getFormText(formData, `${locale}_cta_donate`);
  const cta: HomeCtaContent = {
    title,
    paragraphs,
    donate,
    reports: getFormText(formData, `${locale}_cta_reports`),
    campaign: {
      headline: title,
      phase: campaignSectionCopy.campaign.phase,
      goal: campaignSectionCopy.campaign.goal,
    },
    story: {
      paragraphs,
      ctaLabel: donate,
      ctaHref: "/quy-trinh-cap-ma-2026",
    },
  };

  const members: HomeMembersContent = {
    eyebrow: getFormText(formData, `${locale}_members_eyebrow`),
    title: getFormText(formData, `${locale}_members_title`),
    paragraphs: parseFormJson<string[]>(
      getFormText(formData, `${locale}_members_paragraphs_json`),
      "Đoạn văn mục thành viên",
    ),
    cta: getFormText(formData, `${locale}_members_cta`),
  };

  const stats = parseFormJson<StatItem[]>(
    getFormText(formData, `${locale}_stats_json`),
    "Thống kê",
  );
  const faq = parseFormJson<HomeFaqContent>(
    getFormText(formData, `${locale}_faq_json`),
    "FAQ",
  );

  const donate_info: DonateInfoContent = {
    bank: getFormText(formData, `${locale}_donate_bank`),
    branch: getFormText(formData, `${locale}_donate_branch`),
    accountName: getFormText(formData, `${locale}_donate_account_name`),
    accountNumber: getFormText(formData, `${locale}_donate_account_number`),
    accountHighlight: getFormText(formData, `${locale}_donate_account_highlight`),
    publicAccountLine: getFormText(formData, `${locale}_donate_public_line`),
    transferFormat: getFormText(formData, `${locale}_donate_transfer_format`),
    transferExample: getFormText(formData, `${locale}_donate_transfer_example`),
  };

  return { locale, hero, cta, members, stats, faq, donate_info, media };
}
