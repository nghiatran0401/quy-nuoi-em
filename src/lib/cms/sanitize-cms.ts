import type { HomeCtaContent, HomeFaqContent, HomeHeroContent, HomeMembersContent } from "@/lib/data/homepage";
import type { StatItem } from "@/content/types";

const TEST_TITLE = /^vitest-/i;
const LOCALE_TAG = /^(vi|en)$/i;

/** Integration tests left English placeholders in the vi row — ignore them on the public site. */
export function isTestOrEnglishHero(hero: HomeHeroContent | null | undefined): boolean {
  if (!hero?.title?.trim()) return true;
  if (TEST_TITLE.test(hero.title)) return true;
  if (LOCALE_TAG.test(hero.eyebrow?.trim() ?? "")) return true;
  if (hero.description?.trim() === "desc") return true;
  if (hero.sponsorNow === "Donate" && hero.learnMore === "Learn") return true;
  if (hero.sponsorNow === "Donate EN" || hero.learnMore === "Learn EN") return true;
  return false;
}

export function isTestOrEnglishCta(cta: HomeCtaContent | null | undefined): boolean {
  if (!cta?.title?.trim()) return true;
  if (cta.title === "CTA" || cta.title === "CTA EN") return true;
  if (cta.donate === "D" && cta.reports === "R") return true;
  return false;
}

export function isTestOrEnglishMembers(members: HomeMembersContent | null | undefined): boolean {
  if (!members?.title?.trim()) return true;
  if (members.title === "Members" || members.title === "Members EN") return true;
  if (members.eyebrow === "M" || members.cta === "Join") return true;
  return false;
}

/** CMS still stores the old “Thành viên Quỹ” copy for the awards collage block. */
export function isLegacyMembersSectionContent(
  members: HomeMembersContent | null | undefined,
): boolean {
  if (!members?.title?.trim()) return false;
  const eyebrow = members.eyebrow?.trim() ?? "";
  const title = members.title.trim();
  if (/thành viên quỹ/i.test(eyebrow)) return true;
  if (/gắn kết yêu thương/i.test(title)) return true;
  return (
    members.paragraphs?.some((p) =>
      /20 thành viên quỹ|nhóm sản xuất nuôi em/i.test(p),
    ) ?? false
  );
}

export function isTestOrEnglishStats(stats: StatItem[] | null | undefined): boolean {
  if (!stats?.length) return true;
  if (stats.length === 1 && stats[0]?.label === "A" && stats[0]?.value === "1") return true;
  if (stats.length === 1 && stats[0]?.label === "B" && stats[0]?.value === "2") return true;
  return false;
}

export function isTestOrEnglishFaq(faq: HomeFaqContent | null | undefined): boolean {
  if (!faq?.title?.trim()) return true;
  if (faq.title === "t" && faq.intro === "i") return true;
  if (faq.eyebrow === "f" && !faq.items?.length) return true;
  return false;
}

export function isTestOrEnglishMetaTitle(title: string | null | undefined): boolean {
  if (!title?.trim()) return true;
  if (TEST_TITLE.test(title)) return true;
  if (title === "About VI" || title === "About EN") return true;
  return false;
}

export function isTestOrEnglishMeta(meta: { title?: string; description?: string } | null | undefined): boolean {
  if (isTestOrEnglishMetaTitle(meta?.title)) return true;
  if (meta?.description?.trim() === "desc") return true;
  return false;
}

export function isTestOrEnglishPageHero(hero: { title?: string; description?: string } | null | undefined): boolean {
  if (!hero?.title?.trim()) return true;
  if (isTestOrEnglishMetaTitle(hero.title)) return true;
  if (hero.description?.trim() === "desc") return true;
  return false;
}

export function isTestOrEnglishPartnersTitle(title: string | null | undefined): boolean {
  if (!title?.trim()) return true;
  if (title === "Partners" || title === "Partners EN") return true;
  return false;
}

export function isTestOrEnglishProcess2026Hero(
  hero: {
    title?: string;
    description?: string;
    eyebrow?: string;
    messengerCta?: string;
    groupCta?: string;
  } | null | undefined,
): boolean {
  if (!hero?.title?.trim()) return true;
  if (isTestOrEnglishPageHero(hero)) return true;
  if (hero.title === "t" && hero.description === "d") return true;
  if (hero.messengerCta === "m" && hero.groupCta === "g") return true;
  return false;
}

export function isTestOrEnglishProcess2026Intro(
  intro: { eyebrow?: string; title?: string; description?: string } | null | undefined,
  testEyebrow: string,
  testTitle: string,
): boolean {
  if (!intro?.title?.trim()) return true;
  return intro.eyebrow === testEyebrow && intro.title === testTitle;
}

export function isTestOrEnglishProcess2026Steps(
  steps: { title?: string; timing?: string }[] | null | undefined,
): boolean {
  if (!steps?.length) return true;
  if (steps.length === 1 && steps[0]?.title === "Step" && steps[0]?.timing === "Now") return true;
  return false;
}

export function isTestOrEnglishProcess2026CostTiers(
  tiers: { label?: string; amount?: string }[] | null | undefined,
): boolean {
  if (!tiers?.length) return true;
  if (tiers.length === 1 && tiers[0]?.label === "l" && tiers[0]?.amount === "1") return true;
  return false;
}

export function isTestOrEnglishProcess2026Transfer(
  transfer: {
    eyebrow?: string;
    title?: string;
    accountNumber?: string;
    bank?: string;
  } | null | undefined,
): boolean {
  if (!transfer?.title?.trim()) return true;
  if (transfer.eyebrow === "tr" && transfer.title === "tt") return true;
  if (transfer.accountNumber === "1" && transfer.bank === "b") return true;
  return false;
}

export function isTestOrEnglishProcess2026Timeline(
  timeline: { when?: string; what?: string }[] | null | undefined,
): boolean {
  if (!timeline?.length) return true;
  if (timeline.length === 1 && timeline[0]?.when === "w" && timeline[0]?.what === "x") return true;
  return false;
}

export function isTestOrEnglishProcess2026Notes(
  notesIntro: { eyebrow?: string; title?: string } | null | undefined,
  importantNotes: string[] | null | undefined,
  codeMeaningUrl: string | null | undefined,
): boolean {
  if (notesIntro?.eyebrow === "n" && notesIntro?.title === "nt") return true;
  if (importantNotes?.length === 1 && importantNotes[0] === "note") return true;
  if (codeMeaningUrl === "https://example.com") return true;
  return false;
}

export function isTestOrEnglishProcess2026Finance(
  finance: {
    eyebrow?: string;
    title?: string;
    body?: string;
    bodyBefore?: string;
    reportLinkUrl?: string;
  } | null | undefined,
): boolean {
  if (!finance?.title?.trim()) return true;
  if (finance.eyebrow === "f" && finance.title === "ft") return true;
  if (finance.body === "fb") return true;
  if (finance.bodyBefore === "before " && finance.reportLinkUrl === "https://report.example") return true;
  return false;
}

export function isTestOrEnglishProcess2026Links(
  links: { messenger?: string; group?: string } | null | undefined,
): boolean {
  if (!links?.messenger?.trim()) return true;
  if (links.messenger.includes("example.com") || links.group?.includes("example.com")) return true;
  return false;
}

export function isTestOrEnglishProcess2026Cta(
  cta: { title?: string; description?: string; messengerCta?: string } | null | undefined,
): boolean {
  if (!cta?.title?.trim()) return true;
  if (cta.title === "cta" && cta.description === "cd" && cta.messengerCta === "m") return true;
  return false;
}

/** Vitest integration tests upsert placeholder rows into process_2026_page_content. */
export function isTestOrEnglishProcess2026Row(row: {
  meta?: { title?: string; description?: string } | null;
  content?: {
    meta?: { title?: string; description?: string } | null;
    hero?: { title?: string; description?: string; eyebrow?: string; messengerCta?: string; groupCta?: string } | null;
    notesIntro?: { eyebrow?: string; title?: string } | null;
    finance?: { eyebrow?: string; title?: string; body?: string } | null;
  } | null;
} | null | undefined): boolean {
  if (!row) return false;
  if (isTestOrEnglishMeta(row.meta)) return true;
  if (isTestOrEnglishMeta(row.content?.meta)) return true;
  if (isTestOrEnglishProcess2026Hero(row.content?.hero)) return true;
  if (isTestOrEnglishProcess2026Finance(row.content?.finance)) return true;
  if (
    isTestOrEnglishProcess2026Notes(row.content?.notesIntro, row.content?.importantNotes, row.content?.codeMeaningUrl)
  ) {
    return true;
  }
  return false;
}
