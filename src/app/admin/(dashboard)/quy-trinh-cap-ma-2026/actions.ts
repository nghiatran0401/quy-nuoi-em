"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import type {
  Process2026CostTier,
  Process2026PageContent,
  Process2026PaymentScenario,
  Process2026Step,
  Process2026TimelineItem,
} from "@/lib/data/process-2026-page";
import { createAdminClient } from "@/lib/supabase/admin";

function getText(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function parseJson<T>(value: string, label: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(`${label} phải là JSON hợp lệ.`);
  }
}

function parseLocalePayload(formData: FormData, locale: "vi" | "en") {
  const prefix = locale;
  const meta = {
    title: getText(formData, `${prefix}_meta_title`),
    description: getText(formData, `${prefix}_meta_description`),
  };

  const content: Process2026PageContent = {
    meta,
    hero: {
      eyebrow: getText(formData, `${prefix}_hero_eyebrow`),
      title: getText(formData, `${prefix}_hero_title`),
      titleAccent: getText(formData, `${prefix}_hero_title_accent`),
      description: getText(formData, `${prefix}_hero_description`),
      messengerCta: getText(formData, `${prefix}_hero_messenger_cta`),
      groupCta: getText(formData, `${prefix}_hero_group_cta`),
    },
    stepsIntro: {
      eyebrow: getText(formData, `${prefix}_steps_eyebrow`),
      title: getText(formData, `${prefix}_steps_title`),
      description: getText(formData, `${prefix}_steps_description`),
    },
    steps: parseJson<Process2026Step[]>(
      getText(formData, `${prefix}_steps_json`),
      `${prefix.toUpperCase()} bước quy trình`,
    ),
    costIntro: {
      eyebrow: getText(formData, `${prefix}_cost_eyebrow`),
      title: getText(formData, `${prefix}_cost_title`),
      description: getText(formData, `${prefix}_cost_description`),
    },
    costTiers: parseJson<Process2026CostTier[]>(
      getText(formData, `${prefix}_cost_tiers_json`),
      `${prefix.toUpperCase()} mức chi phí`,
    ),
    transfer: {
      eyebrow: getText(formData, `${prefix}_transfer_eyebrow`),
      title: getText(formData, `${prefix}_transfer_title`),
      warning: getText(formData, `${prefix}_transfer_warning`),
      accountNumber: getText(formData, `${prefix}_transfer_account_number`),
      bank: getText(formData, `${prefix}_transfer_bank`),
      accountName: getText(formData, `${prefix}_transfer_account_name`),
      scenariosTitle: getText(formData, `${prefix}_transfer_scenarios_title`),
      scenariosFootnote: getText(formData, `${prefix}_transfer_scenarios_footnote`),
      qrCaption: getText(formData, `${prefix}_transfer_qr_caption`),
      qrCta: getText(formData, `${prefix}_transfer_qr_cta`),
    },
    paymentScenarios: parseJson<Process2026PaymentScenario[]>(
      getText(formData, `${prefix}_payment_scenarios_json`),
      `${prefix.toUpperCase()} kịch bản chuyển tiền`,
    ),
    timelineIntro: {
      eyebrow: getText(formData, `${prefix}_timeline_eyebrow`),
      title: getText(formData, `${prefix}_timeline_title`),
    },
    timeline: parseJson<Process2026TimelineItem[]>(
      getText(formData, `${prefix}_timeline_json`),
      `${prefix.toUpperCase()} mốc thời gian`,
    ),
    notesIntro: {
      eyebrow: getText(formData, `${prefix}_notes_eyebrow`),
      title: getText(formData, `${prefix}_notes_title`),
    },
    importantNotes: parseJson<string[]>(
      getText(formData, `${prefix}_important_notes_json`),
      `${prefix.toUpperCase()} lưu ý quan trọng`,
    ),
    codeMeaningLabel: getText(formData, `${prefix}_code_meaning_label`),
    codeMeaningUrl: getText(formData, `${prefix}_code_meaning_url`),
    finance: {
      eyebrow: getText(formData, `${prefix}_finance_eyebrow`),
      title: getText(formData, `${prefix}_finance_title`),
      body: getText(formData, `${prefix}_finance_body`),
      footnote: getText(formData, `${prefix}_finance_footnote`),
    },
    schoolBuildUrl: getText(formData, `${prefix}_school_build_url`),
    cta: {
      title: getText(formData, `${prefix}_cta_title`),
      description: getText(formData, `${prefix}_cta_description`),
      messengerCta: getText(formData, `${prefix}_cta_messenger`),
      contactLinkLabel: getText(formData, `${prefix}_cta_contact_label`),
      referenceLabel: getText(formData, `${prefix}_cta_reference_label`),
      referenceUrl: getText(formData, `${prefix}_cta_reference_url`),
    },
  };

  return { locale, meta, content };
}

export async function saveProcess2026PageContent(formData: FormData) {
  try {
    await requireAdminSession();
    const supabase = createAdminClient();
    const payload = [parseLocalePayload(formData, "vi"), parseLocalePayload(formData, "en")];
    const { error } = await supabase.from("process_2026_page_content").upsert(payload, {
      onConflict: "locale",
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể lưu nội dung trang quy trình cấp mã.";
    redirect(`/admin/quy-trinh-cap-ma-2026?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/quy-trinh-cap-ma-2026");
  revalidatePath("/en/quy-trinh-cap-ma-2026");
  revalidatePath("/admin/quy-trinh-cap-ma-2026");
  redirect("/admin/quy-trinh-cap-ma-2026?message=process_2026_saved");
}
