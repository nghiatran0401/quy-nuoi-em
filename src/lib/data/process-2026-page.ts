import { brandVisual } from "@/config/brand-visual";
import {
  CODE_MEANING_URL,
  costTiers,
  importantNotes,
  paymentScenarios,
  processSteps2026,
  SCHOOL_BUILD_URL,
  timelineMilestones,
} from "@/content/quy-trinh-cap-ma-2026";
import {
  isTestOrEnglishProcess2026CostTiers,
  isTestOrEnglishProcess2026Cta,
  isTestOrEnglishProcess2026Finance,
  isTestOrEnglishProcess2026Hero,
  isTestOrEnglishProcess2026Intro,
  isTestOrEnglishProcess2026Links,
  isTestOrEnglishProcess2026Notes,
  isTestOrEnglishProcess2026Row,
  isTestOrEnglishProcess2026Steps,
  isTestOrEnglishProcess2026Timeline,
  isTestOrEnglishProcess2026Transfer,
} from "@/lib/cms/sanitize-cms";
import { siteImage } from "@/lib/images";
import { nuoiEmImage } from "@/lib/nuoiem-images";
import { getHomeMedia } from "@/lib/data/home-media";
import { getStaticMediaMap } from "@/lib/data/static-media";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type Process2026Step = {
  number: string;
  title: string;
  timing: string;
  summary: string;
  bullets: string[];
};

export type Process2026PaymentScenario = {
  label: string;
  tag: string | null;
  detail: string;
};

export type Process2026CostTier = {
  label: string;
  amount: string;
  breakdown: string;
};

export type Process2026TimelineItem = {
  when: string;
  what: string;
};

export type Process2026PageMedia = {
  heroImage: string;
  qrImage: string;
};

export type Process2026PageLinks = {
  messenger: string;
  group: string;
};

export type Process2026PageFinance = {
  eyebrow: string;
  title: string;
  bodyBefore: string;
  reportLinkLabel: string;
  reportLinkUrl: string;
  bodyAfter: string;
  footnoteBefore: string;
  schoolBuildLinkLabel: string;
  footnoteAfter: string;
};

/** @deprecated Legacy CMS rows may still include these keys. */
type LegacyProcess2026Finance = Process2026PageFinance & {
  body?: string;
  footnote?: string;
};

export type Process2026PageContent = {
  meta: { title: string; description: string };
  media: Process2026PageMedia;
  links: Process2026PageLinks;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    messengerCta: string;
    groupCta: string;
  };
  stepsIntro: { eyebrow: string; title: string; description: string };
  steps: Process2026Step[];
  costIntro: { eyebrow: string; title: string; description: string };
  costTiers: Process2026CostTier[];
  transfer: {
    eyebrow: string;
    title: string;
    warning: string;
    accountNumber: string;
    bank: string;
    accountName: string;
    phone: string;
    phoneDisplay: string;
    scenariosTitle: string;
    scenariosFootnote: string;
    qrCaption: string;
    qrCta: string;
  };
  paymentScenarios: Process2026PaymentScenario[];
  timelineIntro: { eyebrow: string; title: string };
  timeline: Process2026TimelineItem[];
  notesIntro: { eyebrow: string; title: string };
  importantNotes: string[];
  codeMeaningLabel: string;
  codeMeaningUrl: string;
  finance: Process2026PageFinance;
  schoolBuildUrl: string;
  cta: {
    title: string;
    description: string;
    messengerCta: string;
    contactLinkLabel: string;
    referenceLabel: string;
    referenceLinkLabel: string;
    referenceUrl: string;
  };
};

export function resolveProcess2026ImageSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return siteImage(path);
}

function normalizeFinance(
  finance: LegacyProcess2026Finance | undefined,
  fallback: Process2026PageFinance,
): Process2026PageFinance {
  if (!finance) {
    return fallback;
  }

  if (finance.bodyBefore?.trim()) {
    return { ...fallback, ...finance };
  }

  if (finance.body?.trim()) {
    const label = fallback.reportLinkLabel;
    if (label && finance.body.includes(label)) {
      const [before = "", after = ""] = finance.body.split(label);
      return {
        ...fallback,
        ...finance,
        bodyBefore: before,
        reportLinkLabel: label,
        reportLinkUrl: finance.reportLinkUrl || fallback.reportLinkUrl,
        bodyAfter: after,
      };
    }
    return { ...fallback, ...finance, bodyBefore: finance.body, bodyAfter: "" };
  }

  return { ...fallback, ...finance };
}

function normalizeFinanceFootnote(
  finance: Process2026PageFinance,
  legacyFootnote: string | undefined,
): Process2026PageFinance {
  if (!legacyFootnote?.trim()) {
    return finance;
  }

  const label = finance.schoolBuildLinkLabel || "Sức mạnh 2000";
  if (legacyFootnote.includes(label)) {
    const [before = "", after = ""] = legacyFootnote.split(label);
    return {
      ...finance,
      footnoteBefore: before,
      schoolBuildLinkLabel: label,
      footnoteAfter: after,
    };
  }

  return { ...finance, footnoteBefore: legacyFootnote, footnoteAfter: "" };
}

const viDefaults: Process2026PageContent = {
  meta: {
    title: "Quy trình cấp và nhận mã Nuôi Em 2026",
    description:
      "Hướng dẫn đầy đủ cho anh/chị nuôi mới: nhận mã NE qua Fanpage, chuyển khoản đúng cú pháp, vào group, tra mã, nhận ảnh hàng tháng và lịch thăm em.",
  },
  media: {
    heroImage: nuoiEmImage("processGuide"),
    qrImage: brandVisual.donateQrPath,
  },
  links: {
    messenger: brandVisual.social.messenger,
    group: brandVisual.social.group,
  },
  hero: {
    eyebrow: "Mùa nuôi 2025 – 2026",
    title: "Quy trình cấp và nhận mã",
    titleAccent: " cho anh/chị nuôi mới",
    description:
      "Khi đã có mã NE, làm đúng 6 bước dưới đây để giữ mã, chuyển khoản đúng cú pháp, nhận thông tin bé và theo dõi suốt năm học. Nội dung tham chiếu từ quy trình chính thức của dự án.",
    messengerCta: "Nhận mã qua Messenger",
    groupCta: "Tham gia group Nuôi Em",
  },
  stepsIntro: {
    eyebrow: "6 bước cốt lõi",
    title: "Từ nhận mã đến thăm em",
    description: "Làm lần lượt — không bỏ bước. Mốc thời gian ghi trên từng bước để anh/chị chủ động theo dõi.",
  },
  steps: processSteps2026.map((step) => ({
    number: step.number,
    title: step.title,
    timing: step.timing,
    summary: step.summary,
    bullets: [...step.bullets],
  })),
  costIntro: {
    eyebrow: "Mức đóng góp",
    title: "Chi phí nuôi một em / một năm học",
    description:
      "Bữa ăn ~8.500đ/suất (tiểu học), mầm non ~6.800đ/suất. Khoản cơ sở vật chất 100.000đ/mã dùng cho các dự án bổ trợ (không đóng thêm).",
  },
  costTiers: costTiers.map((tier) => ({ ...tier })),
  transfer: {
    eyebrow: "Chuyển khoản",
    title: "Thông tin tài khoản & kịch bản gửi tiền",
    warning:
      "Bắt buộc ghi nội dung: «Mã bé nhận nuôi» + tên anh/chị. Không có mã NE → không hoàn lại, chuyển quỹ vô danh (xây trường).",
    accountNumber: "1805",
    bank: "MB — Ngân hàng TMCP Quân đội",
    accountName: "CTCP DNXH QUY NUOI EM",
    phone: brandVisual.contact.phone,
    phoneDisplay: brandVisual.contact.phoneDisplay,
    scenariosTitle: "Kịch bản chuyển tiền",
    scenariosFootnote:
      "Dù chọn kịch bản nào, cần hoàn tất 100% tiền ăn trước 31/12 mỗi năm học để dự án vận hành ổn định (trường ký hợp đồng thực phẩm từ tháng 7).",
    qrCaption: "Quét mã chuyển khoản",
    qrCta: "Nhận mã NE",
  },
  paymentScenarios: paymentScenarios.map((item) => ({ ...item, tag: item.tag ?? null })),
  timelineIntro: {
    eyebrow: "Mốc thời gian",
    title: "Lịch quan trọng trong năm học",
  },
  timeline: timelineMilestones.map((item) => ({ ...item })),
  notesIntro: {
    eyebrow: "Lưu ý quan trọng",
    title: "Về mã NE và thông tin bé",
  },
  importantNotes: [...importantNotes],
  codeMeaningLabel: "Mã mỗi em có ý nghĩa gì?",
  codeMeaningUrl: CODE_MEANING_URL,
  finance: {
    eyebrow: "Minh bạch tài chính",
    title: "Xác nhận chuyển khoản",
    bodyBefore: "Báo cáo công khai tại ",
    reportLinkLabel: "taichinh.nuoiem.com",
    reportLinkUrl: brandVisual.financeUrl,
    bodyAfter:
      ". Team tài chính xác nhận chuyển khoản thành công qua tin nhắn Facebook sau khoảng 7 ngày, kèm mã giao dịch.",
    footnoteBefore: "Số tiền chuyển dư hoặc chưa dùng hết có thể chuyển sang dự án xây trường ",
    schoolBuildLinkLabel: "Sức mạnh 2000",
    footnoteAfter: ".",
  },
  schoolBuildUrl: SCHOOL_BUILD_URL,
  cta: {
    title: "Cần hỗ trợ?",
    description:
      "Chỉ hỏi qua Messenger Fanpage Nuôi Em — không hỏi ở comment để tránh bỏ lỡ tin. Hotline khi cần gấp.",
    messengerCta: "Inbox Fanpage",
    contactLinkLabel: "Trang liên hệ Quỹ",
    referenceLabel: "Tham khảo thêm tại",
    referenceLinkLabel: "nuoiem.com",
    referenceUrl: "https://www.nuoiem.com/",
  },
};

function getFallback(): Process2026PageContent {
  return viDefaults;
}

export type Process2026PageRow = {
  meta: Process2026PageContent["meta"] | null;
  content: Partial<Process2026PageContent> | null;
};

/** Same sanitize rules as the public page — admin editor uses this. */
export function resolveProcess2026PageContentForAdmin(
  row: Process2026PageRow | null | undefined,
): Process2026PageContent {
  const fallback = getFallback();
  if (!row || isTestOrEnglishProcess2026Row(row)) {
    return fallback;
  }
  return mergeProcess2026PageContent(fallback, row.meta, row.content);
}

export function mergeProcess2026PageContent(
  fallback: Process2026PageContent,
  meta: Process2026PageContent["meta"] | null,
  content: Partial<Process2026PageContent> | null,
): Process2026PageContent {
  if (!content) {
    return { ...fallback, meta: fallback.meta };
  }

  const legacyFinance = content.finance as LegacyProcess2026Finance | undefined;
  const finance = normalizeFinanceFootnote(
    normalizeFinance(legacyFinance, fallback.finance),
    legacyFinance?.footnote,
  );

  const notesPoisoned = isTestOrEnglishProcess2026Notes(
    content.notesIntro,
    content.importantNotes,
    content.codeMeaningUrl,
  );

  return {
    meta: fallback.meta,
    media: content.media?.heroImage || content.media?.qrImage ? { ...fallback.media, ...content.media } : fallback.media,
    links: isTestOrEnglishProcess2026Links(content.links)
      ? fallback.links
      : { ...fallback.links, ...content.links },
    hero: isTestOrEnglishProcess2026Hero(content.hero) ? fallback.hero : { ...fallback.hero, ...content.hero },
    stepsIntro: isTestOrEnglishProcess2026Intro(content.stepsIntro, "s", "st")
      ? fallback.stepsIntro
      : { ...fallback.stepsIntro, ...content.stepsIntro },
    steps: isTestOrEnglishProcess2026Steps(content.steps) ? fallback.steps : (content.steps ?? fallback.steps),
    costIntro: isTestOrEnglishProcess2026Intro(content.costIntro, "c", "ct")
      ? fallback.costIntro
      : { ...fallback.costIntro, ...content.costIntro },
    costTiers: isTestOrEnglishProcess2026CostTiers(content.costTiers)
      ? fallback.costTiers
      : (content.costTiers ?? fallback.costTiers),
    transfer: isTestOrEnglishProcess2026Transfer(content.transfer)
      ? fallback.transfer
      : { ...fallback.transfer, ...content.transfer },
    paymentScenarios: content.paymentScenarios ?? fallback.paymentScenarios,
    timelineIntro: isTestOrEnglishProcess2026Intro(content.timelineIntro, "t", "tl")
      ? fallback.timelineIntro
      : { ...fallback.timelineIntro, ...content.timelineIntro },
    timeline: isTestOrEnglishProcess2026Timeline(content.timeline)
      ? fallback.timeline
      : (content.timeline ?? fallback.timeline),
    notesIntro: notesPoisoned ? fallback.notesIntro : { ...fallback.notesIntro, ...content.notesIntro },
    importantNotes: notesPoisoned ? fallback.importantNotes : (content.importantNotes ?? fallback.importantNotes),
    codeMeaningLabel: notesPoisoned
      ? fallback.codeMeaningLabel
      : (content.codeMeaningLabel ?? fallback.codeMeaningLabel),
    codeMeaningUrl: notesPoisoned ? fallback.codeMeaningUrl : (content.codeMeaningUrl ?? fallback.codeMeaningUrl),
    finance: isTestOrEnglishProcess2026Finance(legacyFinance) ? fallback.finance : finance,
    schoolBuildUrl: content.schoolBuildUrl ?? fallback.schoolBuildUrl,
    cta: isTestOrEnglishProcess2026Cta(content.cta) ? fallback.cta : { ...fallback.cta, ...content.cta },
  };
}

/** Upsert payload for restoring Vietnamese process page content (admin/scripts). */
export function getDefaultProcess2026UpsertPayload() {
  const content = getFallback();
  return {
    locale: "vi" as const,
    meta: content.meta,
    content,
  };
}

export async function getProcess2026PageContent(): Promise<Process2026PageContent> {
  const fallback = getFallback();

  if (!isSupabaseConfigured()) {
    return applyProcess2026MediaOverrides(fallback);
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("process_2026_page_content")
      .select("meta, content")
      .eq("locale", "vi")
      .maybeSingle();

    if (error || !data) {
      return applyProcess2026MediaOverrides(fallback);
    }

    const row = data as Process2026PageRow;
    const merged = resolveProcess2026PageContentForAdmin(row);
    return applyProcess2026MediaOverrides(merged);
  } catch {
    return applyProcess2026MediaOverrides(fallback);
  }
}

async function applyProcess2026MediaOverrides(content: Process2026PageContent): Promise<Process2026PageContent> {
  const [staticMap, homeMedia] = await Promise.all([getStaticMediaMap(), getHomeMedia()]);
  return {
    ...content,
    media: {
      heroImage: staticMap.process_2026_diagram ?? content.media.heroImage,
      qrImage: homeMedia.donateQr,
    },
  };
}

export function getProcess2026PageFallback(): Process2026PageContent {
  return getFallback();
}
