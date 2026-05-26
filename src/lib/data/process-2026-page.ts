import {
  CODE_MEANING_URL,
  costTiers,
  importantNotes,
  paymentScenarios,
  processSteps2026,
  SCHOOL_BUILD_URL,
  timelineMilestones,
} from "@/content/quy-trinh-cap-ma-2026";
import type { Locale } from "@/i18n/config";
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

export type Process2026PageContent = {
  meta: { title: string; description: string };
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
  finance: {
    eyebrow: string;
    title: string;
    body: string;
    footnote: string;
  };
  schoolBuildUrl: string;
  cta: {
    title: string;
    description: string;
    messengerCta: string;
    contactLinkLabel: string;
    referenceLabel: string;
    referenceUrl: string;
  };
};

type Process2026PageRow = {
  locale: Locale;
  meta: Process2026PageContent["meta"] | null;
  content: Process2026PageContent | null;
};

const viDefaults: Process2026PageContent = {
  meta: {
    title: "Quy trình cấp và nhận mã Nuôi Em 2026",
    description:
      "Hướng dẫn đầy đủ cho anh/chị nuôi mới: nhận mã NE qua Fanpage, chuyển khoản đúng cú pháp, vào group, tra mã, nhận ảnh hàng tháng và lịch thăm em.",
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
    accountNumber: "0711000280294",
    bank: "Vietcombank — Chi nhánh Thanh Xuân, Hà Nội",
    accountName: "Hoàng Hoa Trung",
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
    body: "Báo cáo công khai tại taichinh.nuoiem.com. Team tài chính xác nhận chuyển khoản thành công qua tin nhắn Facebook sau khoảng 7 ngày, kèm mã giao dịch.",
    footnote:
      "Số tiền chuyển dư hoặc chưa dùng hết có thể chuyển sang dự án xây trường Sức mạnh 2000.",
  },
  schoolBuildUrl: SCHOOL_BUILD_URL,
  cta: {
    title: "Cần hỗ trợ?",
    description:
      "Chỉ hỏi qua Messenger Fanpage Nuôi Em — không hỏi ở comment để tránh bỏ lỡ tin. Hotline khi cần gấp.",
    messengerCta: "Inbox Fanpage",
    contactLinkLabel: "Trang liên hệ Quỹ",
    referenceLabel: "Tham khảo thêm tại",
    referenceUrl: "https://www.nuoiem.com/",
  },
};

const enDefaults: Process2026PageContent = {
  ...viDefaults,
  meta: {
    title: "Nuoi Em code issuance & onboarding process 2026",
    description:
      "Complete guide for new sponsors: receive an NE code via Fanpage, transfer with the correct note, join the group, look up your code, receive monthly photos, and visit schedules.",
  },
  hero: {
    eyebrow: "2025 – 2026 sponsorship season",
    title: "Code issuance & onboarding",
    titleAccent: " for new sponsors",
    description:
      "Once you have an NE code, follow these 6 steps to keep your code, transfer correctly, receive child information, and stay updated throughout the school year.",
    messengerCta: "Get code via Messenger",
    groupCta: "Join Nuoi Em group",
  },
  stepsIntro: {
    eyebrow: "6 core steps",
    title: "From code to visit",
    description: "Follow in order — do not skip steps. Timing notes on each step help you plan ahead.",
  },
  costIntro: {
    eyebrow: "Contribution levels",
    title: "Cost per child / school year",
    description:
      "Lunch ~8,500 VND/meal (primary), kindergarten ~6,800 VND/meal. Infrastructure fee 100,000 VND/code supports supplementary projects (no extra payment).",
  },
  transfer: {
    ...viDefaults.transfer,
    eyebrow: "Bank transfer",
    title: "Account details & payment scenarios",
    warning:
      "Required transfer note: child sponsorship code + your name. Without NE code → no refund, funds go to anonymous pool (school building).",
    scenariosTitle: "Payment scenarios",
    scenariosFootnote:
      "Whichever scenario you choose, complete 100% of meal funds before Dec 31 each school year for stable operations.",
    qrCaption: "Scan to transfer",
    qrCta: "Get NE code",
  },
  timelineIntro: {
    eyebrow: "Timeline",
    title: "Important milestones in the school year",
  },
  notesIntro: {
    eyebrow: "Important notes",
    title: "About NE codes and child information",
  },
  codeMeaningLabel: "What does each child's code mean?",
  finance: {
    eyebrow: "Financial transparency",
    title: "Transfer confirmation",
    body: "Public reports at taichinh.nuoiem.com. Finance team confirms successful transfers via Facebook message after ~7 days with transaction ID.",
    footnote: "Unused surplus may be transferred to the Suc Manh 2000 school-building project.",
  },
  cta: {
    title: "Need help?",
    description: "Ask only via Nuoi Em Fanpage Messenger — not in comments. Hotline for urgent cases.",
    messengerCta: "Message Fanpage",
    contactLinkLabel: "Fund contact page",
    referenceLabel: "Learn more at",
    referenceUrl: "https://www.nuoiem.com/",
  },
};

function getFallback(locale: Locale): Process2026PageContent {
  return locale === "en" ? enDefaults : viDefaults;
}

function mergeContent(
  fallback: Process2026PageContent,
  meta: Process2026PageContent["meta"] | null,
  content: Partial<Process2026PageContent> | null,
): Process2026PageContent {
  if (!content) {
    return { ...fallback, meta: meta ?? fallback.meta };
  }

  return {
    meta: meta ?? content.meta ?? fallback.meta,
    hero: { ...fallback.hero, ...content.hero },
    stepsIntro: { ...fallback.stepsIntro, ...content.stepsIntro },
    steps: content.steps ?? fallback.steps,
    costIntro: { ...fallback.costIntro, ...content.costIntro },
    costTiers: content.costTiers ?? fallback.costTiers,
    transfer: { ...fallback.transfer, ...content.transfer },
    paymentScenarios: content.paymentScenarios ?? fallback.paymentScenarios,
    timelineIntro: { ...fallback.timelineIntro, ...content.timelineIntro },
    timeline: content.timeline ?? fallback.timeline,
    notesIntro: { ...fallback.notesIntro, ...content.notesIntro },
    importantNotes: content.importantNotes ?? fallback.importantNotes,
    codeMeaningLabel: content.codeMeaningLabel ?? fallback.codeMeaningLabel,
    codeMeaningUrl: content.codeMeaningUrl ?? fallback.codeMeaningUrl,
    finance: { ...fallback.finance, ...content.finance },
    schoolBuildUrl: content.schoolBuildUrl ?? fallback.schoolBuildUrl,
    cta: { ...fallback.cta, ...content.cta },
  };
}

export async function getProcess2026PageContent(locale: Locale): Promise<Process2026PageContent> {
  const fallback = getFallback(locale);

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("process_2026_page_content")
      .select("locale, meta, content")
      .eq("locale", locale)
      .maybeSingle();

    if (error || !data) {
      return fallback;
    }

    const row = data as Process2026PageRow;
    return mergeContent(fallback, row.meta, row.content);
  } catch {
    return fallback;
  }
}

export function getProcess2026PageFallback(locale: Locale): Process2026PageContent {
  return getFallback(locale);
}
