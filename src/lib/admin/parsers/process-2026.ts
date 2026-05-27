import { getFormText, parseFormJson } from "@/lib/admin/form-utils";
import type {
  Process2026CostTier,
  Process2026PageContent,
  Process2026PaymentScenario,
  Process2026Step,
  Process2026TimelineItem,
} from "@/lib/data/process-2026-page";
import { getProcess2026PageFallback } from "@/lib/data/process-2026-page";

export type Process2026MediaOverrides = {
  heroImage: string;
  qrImage: string;
};

function sanitizeSteps(steps: Process2026Step[]): Process2026Step[] {
  return steps
    .filter((step) => step.title.trim() || step.summary.trim() || step.timing.trim())
    .map((step) => ({
      ...step,
      bullets: step.bullets.map((bullet) => bullet.trim()).filter(Boolean),
    }));
}

function sanitizeStringList(items: string[]): string[] {
  return items.map((item) => item.trim()).filter(Boolean);
}

export function parseProcess2026LocalePayload(
  formData: FormData,
  locale: "vi" | "en",
  mediaOverrides?: Process2026MediaOverrides,
) {
  const prefix = locale;
  const codeMeta = getProcess2026PageFallback().meta;

  const heroImage =
    mediaOverrides?.heroImage ?? getFormText(formData, `${prefix}_hero_image_url`);
  const qrImage = mediaOverrides?.qrImage ?? getFormText(formData, `${prefix}_qr_image_url`);

  const content: Process2026PageContent = {
    meta: codeMeta,
    media: {
      heroImage,
      qrImage,
    },
    links: {
      messenger: getFormText(formData, `${prefix}_links_messenger`),
      group: getFormText(formData, `${prefix}_links_group`),
    },
    hero: {
      eyebrow: getFormText(formData, `${prefix}_hero_eyebrow`),
      title: getFormText(formData, `${prefix}_hero_title`),
      titleAccent: getFormText(formData, `${prefix}_hero_title_accent`),
      description: getFormText(formData, `${prefix}_hero_description`),
      messengerCta: getFormText(formData, `${prefix}_hero_messenger_cta`),
      groupCta: getFormText(formData, `${prefix}_hero_group_cta`),
    },
    stepsIntro: {
      eyebrow: getFormText(formData, `${prefix}_steps_eyebrow`),
      title: getFormText(formData, `${prefix}_steps_title`),
      description: getFormText(formData, `${prefix}_steps_description`),
    },
    steps: sanitizeSteps(
      parseFormJson<Process2026Step[]>(
        getFormText(formData, `${prefix}_steps_json`),
        `${prefix.toUpperCase()} bước quy trình`,
      ),
    ),
    costIntro: {
      eyebrow: getFormText(formData, `${prefix}_cost_eyebrow`),
      title: getFormText(formData, `${prefix}_cost_title`),
      description: getFormText(formData, `${prefix}_cost_description`),
    },
    costTiers: parseFormJson<Process2026CostTier[]>(
      getFormText(formData, `${prefix}_cost_tiers_json`),
      `${prefix.toUpperCase()} mức chi phí`,
    ),
    transfer: {
      eyebrow: getFormText(formData, `${prefix}_transfer_eyebrow`),
      title: getFormText(formData, `${prefix}_transfer_title`),
      warning: getFormText(formData, `${prefix}_transfer_warning`),
      accountNumber: getFormText(formData, `${prefix}_transfer_account_number`),
      bank: getFormText(formData, `${prefix}_transfer_bank`),
      accountName: getFormText(formData, `${prefix}_transfer_account_name`),
      phone: getFormText(formData, `${prefix}_transfer_phone`),
      phoneDisplay: getFormText(formData, `${prefix}_transfer_phone_display`),
      scenariosTitle: getFormText(formData, `${prefix}_transfer_scenarios_title`),
      scenariosFootnote: getFormText(formData, `${prefix}_transfer_scenarios_footnote`),
      qrCaption: getFormText(formData, `${prefix}_transfer_qr_caption`),
      qrCta: getFormText(formData, `${prefix}_transfer_qr_cta`),
    },
    paymentScenarios: parseFormJson<Process2026PaymentScenario[]>(
      getFormText(formData, `${prefix}_payment_scenarios_json`),
      `${prefix.toUpperCase()} kịch bản chuyển tiền`,
    ),
    timelineIntro: {
      eyebrow: getFormText(formData, `${prefix}_timeline_eyebrow`),
      title: getFormText(formData, `${prefix}_timeline_title`),
    },
    timeline: parseFormJson<Process2026TimelineItem[]>(
      getFormText(formData, `${prefix}_timeline_json`),
      `${prefix.toUpperCase()} mốc thời gian`,
    ),
    notesIntro: {
      eyebrow: getFormText(formData, `${prefix}_notes_eyebrow`),
      title: getFormText(formData, `${prefix}_notes_title`),
    },
    importantNotes: sanitizeStringList(
      parseFormJson<string[]>(
        getFormText(formData, `${prefix}_important_notes_json`),
        `${prefix.toUpperCase()} lưu ý quan trọng`,
      ),
    ),
    codeMeaningLabel: getFormText(formData, `${prefix}_code_meaning_label`),
    codeMeaningUrl: getFormText(formData, `${prefix}_code_meaning_url`),
    finance: {
      eyebrow: getFormText(formData, `${prefix}_finance_eyebrow`),
      title: getFormText(formData, `${prefix}_finance_title`),
      bodyBefore: getFormText(formData, `${prefix}_finance_body_before`),
      reportLinkLabel: getFormText(formData, `${prefix}_finance_report_link_label`),
      reportLinkUrl: getFormText(formData, `${prefix}_finance_report_link_url`),
      bodyAfter: getFormText(formData, `${prefix}_finance_body_after`),
      footnoteBefore: getFormText(formData, `${prefix}_finance_footnote_before`),
      schoolBuildLinkLabel: getFormText(formData, `${prefix}_finance_school_build_link_label`),
      footnoteAfter: getFormText(formData, `${prefix}_finance_footnote_after`),
    },
    schoolBuildUrl: getFormText(formData, `${prefix}_school_build_url`),
    cta: {
      title: getFormText(formData, `${prefix}_cta_title`),
      description: getFormText(formData, `${prefix}_cta_description`),
      messengerCta: getFormText(formData, `${prefix}_cta_messenger`),
      contactLinkLabel: getFormText(formData, `${prefix}_cta_contact_label`),
      referenceLabel: getFormText(formData, `${prefix}_cta_reference_label`),
      referenceLinkLabel: getFormText(formData, `${prefix}_cta_reference_link_label`),
      referenceUrl: getFormText(formData, `${prefix}_cta_reference_url`),
    },
  };

  return { locale, meta: codeMeta, content };
}

export function buildProcess2026UpsertPayload(
  formData: FormData,
  mediaOverrides?: Process2026MediaOverrides,
) {
  return parseProcess2026LocalePayload(formData, "vi", mediaOverrides);
}
