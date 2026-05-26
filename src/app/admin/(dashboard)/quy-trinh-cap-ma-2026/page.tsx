import { Save } from "lucide-react";
import { AdminAlert } from "@/components/admin/admin-alert";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  CostTiersEditor,
  PaymentScenariosEditor,
  TimelineEditor,
} from "@/components/admin/process-2026-lists-editor";
import { ProcessStepsEditor } from "@/components/admin/process-steps-editor";
import { StringListEditor } from "@/components/admin/string-list-editor";
import { decodeAdminParam, formatAdminMessage } from "@/lib/admin/messages";
import { getProcess2026PageFallback, type Process2026PageContent } from "@/lib/data/process-2026-page";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveProcess2026PageContent } from "./actions";

type Process2026AdminProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

type Process2026Row = {
  locale: "vi" | "en";
  meta: Process2026PageContent["meta"] | null;
  content: Process2026PageContent | null;
};

function mergeRow(locale: "vi" | "en", row: Process2026Row | null): Process2026PageContent {
  const fallback = getProcess2026PageFallback(locale);
  if (!row?.content) {
    return { ...fallback, meta: row?.meta ?? fallback.meta };
  }
  return {
    ...fallback,
    meta: row.meta ?? row.content.meta ?? fallback.meta,
    hero: { ...fallback.hero, ...row.content.hero },
    stepsIntro: { ...fallback.stepsIntro, ...row.content.stepsIntro },
    steps: row.content.steps ?? fallback.steps,
    costIntro: { ...fallback.costIntro, ...row.content.costIntro },
    costTiers: row.content.costTiers ?? fallback.costTiers,
    transfer: { ...fallback.transfer, ...row.content.transfer },
    paymentScenarios: row.content.paymentScenarios ?? fallback.paymentScenarios,
    timelineIntro: { ...fallback.timelineIntro, ...row.content.timelineIntro },
    timeline: row.content.timeline ?? fallback.timeline,
    notesIntro: { ...fallback.notesIntro, ...row.content.notesIntro },
    importantNotes: row.content.importantNotes ?? fallback.importantNotes,
    codeMeaningLabel: row.content.codeMeaningLabel ?? fallback.codeMeaningLabel,
    codeMeaningUrl: row.content.codeMeaningUrl ?? fallback.codeMeaningUrl,
    finance: { ...fallback.finance, ...row.content.finance },
    schoolBuildUrl: row.content.schoolBuildUrl ?? fallback.schoolBuildUrl,
    cta: { ...fallback.cta, ...row.content.cta },
  };
}

function localeCard(locale: "vi" | "en", row: Process2026Row | null) {
  const c = mergeRow(locale, row);
  const p = locale;

  return (
    <div className="admin-card space-y-6 p-5" key={locale}>
      <h2 className="text-lg font-semibold text-slate-900">
        Ngôn ngữ: <span className="uppercase">{locale}</span>
      </h2>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">SEO</h3>
        <div>
          <label className="admin-label" htmlFor={`${p}_meta_title`}>
            Tiêu đề SEO
          </label>
          <input id={`${p}_meta_title`} name={`${p}_meta_title`} defaultValue={c.meta.title} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_meta_description`}>
            Mô tả SEO
          </label>
          <textarea
            id={`${p}_meta_description`}
            name={`${p}_meta_description`}
            defaultValue={c.meta.description}
            rows={3}
            className="admin-input resize-y"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Hero</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_hero_eyebrow`}>
              Nhãn phụ
            </label>
            <input id={`${p}_hero_eyebrow`} name={`${p}_hero_eyebrow`} defaultValue={c.hero.eyebrow} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_hero_title`}>
              Tiêu đề chính
            </label>
            <input id={`${p}_hero_title`} name={`${p}_hero_title`} defaultValue={c.hero.title} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_hero_title_accent`}>
            Tiêu đề nhấn (màu accent)
          </label>
          <input
            id={`${p}_hero_title_accent`}
            name={`${p}_hero_title_accent`}
            defaultValue={c.hero.titleAccent}
            className="admin-input"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_hero_description`}>
            Mô tả Hero
          </label>
          <textarea
            id={`${p}_hero_description`}
            name={`${p}_hero_description`}
            defaultValue={c.hero.description}
            rows={3}
            className="admin-input resize-y"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_hero_messenger_cta`}>
              Nút Messenger
            </label>
            <input
              id={`${p}_hero_messenger_cta`}
              name={`${p}_hero_messenger_cta`}
              defaultValue={c.hero.messengerCta}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_hero_group_cta`}>
              Nút Group
            </label>
            <input id={`${p}_hero_group_cta`} name={`${p}_hero_group_cta`} defaultValue={c.hero.groupCta} className="admin-input" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Phần 6 bước</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_steps_eyebrow`}>
              Nhãn phụ
            </label>
            <input id={`${p}_steps_eyebrow`} name={`${p}_steps_eyebrow`} defaultValue={c.stepsIntro.eyebrow} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_steps_title`}>
              Tiêu đề
            </label>
            <input id={`${p}_steps_title`} name={`${p}_steps_title`} defaultValue={c.stepsIntro.title} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_steps_description`}>
            Mô tả
          </label>
          <textarea
            id={`${p}_steps_description`}
            name={`${p}_steps_description`}
            defaultValue={c.stepsIntro.description}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <ProcessStepsEditor name={`${p}_steps_json`} initialSteps={c.steps} />
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Mức chi phí</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_cost_eyebrow`}>
              Nhãn phụ
            </label>
            <input id={`${p}_cost_eyebrow`} name={`${p}_cost_eyebrow`} defaultValue={c.costIntro.eyebrow} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_cost_title`}>
              Tiêu đề
            </label>
            <input id={`${p}_cost_title`} name={`${p}_cost_title`} defaultValue={c.costIntro.title} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_cost_description`}>
            Mô tả
          </label>
          <textarea
            id={`${p}_cost_description`}
            name={`${p}_cost_description`}
            defaultValue={c.costIntro.description}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <CostTiersEditor name={`${p}_cost_tiers_json`} initialItems={c.costTiers} />
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Chuyển khoản</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_eyebrow`}>
              Nhãn phụ
            </label>
            <input
              id={`${p}_transfer_eyebrow`}
              name={`${p}_transfer_eyebrow`}
              defaultValue={c.transfer.eyebrow}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_title`}>
              Tiêu đề
            </label>
            <input id={`${p}_transfer_title`} name={`${p}_transfer_title`} defaultValue={c.transfer.title} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_transfer_warning`}>
            Cảnh báo quan trọng
          </label>
          <textarea
            id={`${p}_transfer_warning`}
            name={`${p}_transfer_warning`}
            defaultValue={c.transfer.warning}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_account_number`}>
              Số tài khoản
            </label>
            <input
              id={`${p}_transfer_account_number`}
              name={`${p}_transfer_account_number`}
              defaultValue={c.transfer.accountNumber}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_bank`}>
              Ngân hàng
            </label>
            <input id={`${p}_transfer_bank`} name={`${p}_transfer_bank`} defaultValue={c.transfer.bank} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_account_name`}>
              Chủ tài khoản
            </label>
            <input
              id={`${p}_transfer_account_name`}
              name={`${p}_transfer_account_name`}
              defaultValue={c.transfer.accountName}
              className="admin-input"
            />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_transfer_scenarios_title`}>
            Tiêu đề kịch bản chuyển tiền
          </label>
          <input
            id={`${p}_transfer_scenarios_title`}
            name={`${p}_transfer_scenarios_title`}
            defaultValue={c.transfer.scenariosTitle}
            className="admin-input"
          />
        </div>
        <PaymentScenariosEditor name={`${p}_payment_scenarios_json`} initialItems={c.paymentScenarios} />
        <div>
          <label className="admin-label" htmlFor={`${p}_transfer_scenarios_footnote`}>
            Ghi chú cuối kịch bản
          </label>
          <textarea
            id={`${p}_transfer_scenarios_footnote`}
            name={`${p}_transfer_scenarios_footnote`}
            defaultValue={c.transfer.scenariosFootnote}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_qr_caption`}>
              Chú thích QR
            </label>
            <input
              id={`${p}_transfer_qr_caption`}
              name={`${p}_transfer_qr_caption`}
              defaultValue={c.transfer.qrCaption}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_qr_cta`}>
              Nút QR
            </label>
            <input id={`${p}_transfer_qr_cta`} name={`${p}_transfer_qr_cta`} defaultValue={c.transfer.qrCta} className="admin-input" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Mốc thời gian</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_timeline_eyebrow`}>
              Nhãn phụ
            </label>
            <input
              id={`${p}_timeline_eyebrow`}
              name={`${p}_timeline_eyebrow`}
              defaultValue={c.timelineIntro.eyebrow}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_timeline_title`}>
              Tiêu đề
            </label>
            <input id={`${p}_timeline_title`} name={`${p}_timeline_title`} defaultValue={c.timelineIntro.title} className="admin-input" />
          </div>
        </div>
        <TimelineEditor name={`${p}_timeline_json`} initialItems={c.timeline} />
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Lưu ý & liên kết</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_notes_eyebrow`}>
              Nhãn phụ lưu ý
            </label>
            <input id={`${p}_notes_eyebrow`} name={`${p}_notes_eyebrow`} defaultValue={c.notesIntro.eyebrow} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_notes_title`}>
              Tiêu đề lưu ý
            </label>
            <input id={`${p}_notes_title`} name={`${p}_notes_title`} defaultValue={c.notesIntro.title} className="admin-input" />
          </div>
        </div>
        <StringListEditor
          name={`${p}_important_notes_json`}
          label="Lưu ý quan trọng"
          initialItems={c.importantNotes}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_code_meaning_label`}>
              Nhãn link mã NE
            </label>
            <input
              id={`${p}_code_meaning_label`}
              name={`${p}_code_meaning_label`}
              defaultValue={c.codeMeaningLabel}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_code_meaning_url`}>
              URL giải thích mã
            </label>
            <input
              id={`${p}_code_meaning_url`}
              name={`${p}_code_meaning_url`}
              defaultValue={c.codeMeaningUrl}
              className="admin-input"
            />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_school_build_url`}>
            URL dự án xây trường
          </label>
          <input
            id={`${p}_school_build_url`}
            name={`${p}_school_build_url`}
            defaultValue={c.schoolBuildUrl}
            className="admin-input"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Minh bạch tài chính & CTA</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_finance_eyebrow`}>
              Nhãn phụ tài chính
            </label>
            <input
              id={`${p}_finance_eyebrow`}
              name={`${p}_finance_eyebrow`}
              defaultValue={c.finance.eyebrow}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_finance_title`}>
              Tiêu đề tài chính
            </label>
            <input id={`${p}_finance_title`} name={`${p}_finance_title`} defaultValue={c.finance.title} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_finance_body`}>
            Nội dung tài chính
          </label>
          <textarea
            id={`${p}_finance_body`}
            name={`${p}_finance_body`}
            defaultValue={c.finance.body}
            rows={3}
            className="admin-input resize-y"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_finance_footnote`}>
            Ghi chú tài chính
          </label>
          <textarea
            id={`${p}_finance_footnote`}
            name={`${p}_finance_footnote`}
            defaultValue={c.finance.footnote}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_cta_title`}>
            Tiêu đề CTA cuối trang
          </label>
          <input id={`${p}_cta_title`} name={`${p}_cta_title`} defaultValue={c.cta.title} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_cta_description`}>
            Mô tả CTA
          </label>
          <textarea
            id={`${p}_cta_description`}
            name={`${p}_cta_description`}
            defaultValue={c.cta.description}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_cta_messenger`}>
              Nút Messenger CTA
            </label>
            <input id={`${p}_cta_messenger`} name={`${p}_cta_messenger`} defaultValue={c.cta.messengerCta} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_cta_contact_label`}>
              Nhãn link liên hệ
            </label>
            <input
              id={`${p}_cta_contact_label`}
              name={`${p}_cta_contact_label`}
              defaultValue={c.cta.contactLinkLabel}
              className="admin-input"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_cta_reference_label`}>
              Nhãn tham khảo
            </label>
            <input
              id={`${p}_cta_reference_label`}
              name={`${p}_cta_reference_label`}
              defaultValue={c.cta.referenceLabel}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_cta_reference_url`}>
              URL tham khảo
            </label>
            <input
              id={`${p}_cta_reference_url`}
              name={`${p}_cta_reference_url`}
              defaultValue={c.cta.referenceUrl}
              className="admin-input"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function Process2026AdminPage({ searchParams }: Process2026AdminProps) {
  const params = await searchParams;
  const message = formatAdminMessage(params.message);
  const error = decodeAdminParam(params.error);

  const supabase = createAdminClient();
  const { data } = await supabase.from("process_2026_page_content").select("*").in("locale", ["vi", "en"]);
  const rows = (data ?? []) as Process2026Row[];
  const viRow = rows.find((row) => row.locale === "vi") ?? null;
  const enRow = rows.find((row) => row.locale === "en") ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quy trình cấp mã 2026"
        description="Chỉnh sửa nội dung trang /quy-trinh-cap-ma-2026: hero, 6 bước, chi phí, chuyển khoản, mốc thời gian và lưu ý."
      />

      <div className="space-y-3">
        {message ? <AdminAlert variant="success" message={message} /> : null}
        {error ? <AdminAlert variant="error" message={error} /> : null}
      </div>

      <form action={saveProcess2026PageContent} className="space-y-6">
        {localeCard("vi", viRow)}
        {localeCard("en", enRow)}
        <div className="sticky bottom-4 z-10 flex justify-end">
          <button type="submit" className="admin-btn-primary">
            <Save className="h-4 w-4" />
            Lưu nội dung quy trình cấp mã
          </button>
        </div>
      </form>
    </div>
  );
}
