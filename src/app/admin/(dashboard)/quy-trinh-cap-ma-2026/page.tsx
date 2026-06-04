import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Save } from "lucide-react";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  CostTiersEditor,
  PaymentScenariosEditor,
  TimelineEditor,
} from "@/components/admin/process-2026-lists-editor";
import { ProcessStepsEditor } from "@/components/admin/process-steps-editor";
import { StringListEditor } from "@/components/admin/string-list-editor";
import {
  resolveProcess2026ImageSrc,
  resolveProcess2026PageContentForAdmin,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveProcess2026PageContent } from "./actions";

type Process2026Row = {
  locale: "vi" | "en";
  meta: Process2026PageContent["meta"] | null;
  content: Process2026PageContent | null;
};

const PROCESS_2026_SECTIONS = [
  { id: "section-images", label: "1. Hình ảnh" },
  { id: "section-links", label: "2. Liên kết ngoài" },
  { id: "section-hero", label: "3. Hero đầu trang" },
  { id: "section-steps", label: "4. 6 bước quy trình" },
  { id: "section-cost", label: "5. Mức chi phí" },
  { id: "section-transfer", label: "6. Chuyển khoản" },
  { id: "section-timeline", label: "7. Mốc thời gian" },
  { id: "section-notes", label: "8. Lưu ý & liên kết" },
  { id: "section-finance-cta", label: "9. Tài chính & CTA" },
] as const;

function processEditorCard(row: Process2026Row | null) {
  const c = resolveProcess2026PageContentForAdmin(row);
  const p = "vi";
  const heroPreview = resolveProcess2026ImageSrc(c.media.heroImage);
  const qrPreview = resolveProcess2026ImageSrc(c.media.qrImage);

  return (
    <div className="admin-card space-y-6 p-5" key="vi">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Nội dung tiếng Việt</h2>
          <p className="mt-1 text-sm text-slate-600">
            Các mục theo thứ tự hiển thị trên{" "}
            <Link href="/quy-trinh-cap-ma-2026" target="_blank" className="font-medium text-[var(--admin-accent)] hover:underline">
              /quy-trinh-cap-ma-2026
            </Link>
            .
          </p>
        </div>
        <Link
          href="/quy-trinh-cap-ma-2026"
          target="_blank"
          className="admin-btn-secondary text-sm"
        >
          <ExternalLink className="h-4 w-4" />
          Xem trang công khai
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Đi nhanh đến mục cần sửa</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROCESS_2026_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>

      <section id="section-images" className="scroll-mt-24">
        <AdminFormSection
          title="Hình ảnh"
          description="Ảnh sơ đồ 6 bước (hero) và mã QR chuyển khoản. Có thể dùng đường dẫn /public, URL Supabase hoặc tải file mới."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold text-slate-700">Sơ đồ 6 bước (Hero)</p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white">
                <Image src={heroPreview} alt="" fill className="object-contain p-2" sizes="280px" />
              </div>
              <input type="hidden" name={`${p}_hero_image_existing`} value={c.media.heroImage} />
              <div>
                <label className="admin-label" htmlFor={`${p}_hero_image_url`}>
                  URL hoặc đường dẫn ảnh hero
                </label>
                <input
                  id={`${p}_hero_image_url`}
                  name={`${p}_hero_image_url`}
                  defaultValue={c.media.heroImage}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label" htmlFor={`${p}_hero_image_file`}>
                  Hoặc tải ảnh mới
                </label>
                <input
                  id={`${p}_hero_image_file`}
                  name={`${p}_hero_image_file`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="max-w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium"
                />
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold text-slate-700">Mã QR chuyển khoản</p>
              <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border border-slate-200 bg-white">
                <Image src={qrPreview} alt="" fill className="object-contain p-2" sizes="200px" />
              </div>
              <input type="hidden" name={`${p}_qr_image_existing`} value={c.media.qrImage} />
              <div>
                <label className="admin-label" htmlFor={`${p}_qr_image_url`}>
                  URL hoặc đường dẫn QR (mặc định /qr.png)
                </label>
                <input
                  id={`${p}_qr_image_url`}
                  name={`${p}_qr_image_url`}
                  defaultValue={c.media.qrImage}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label" htmlFor={`${p}_qr_image_file`}>
                  Hoặc tải QR mới
                </label>
                <input
                  id={`${p}_qr_image_file`}
                  name={`${p}_qr_image_file`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="max-w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium"
                />
              </div>
            </div>
          </div>
        </AdminFormSection>
      </section>

      <section id="section-links" className="scroll-mt-24">
        <AdminFormSection title="Liên kết ngoài" description="URL cho nút Messenger, nhóm Facebook và báo cáo tài chính.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="admin-label" htmlFor={`${p}_links_messenger`}>
                URL Messenger / trang Facebook
              </label>
              <input
                id={`${p}_links_messenger`}
                name={`${p}_links_messenger`}
                defaultValue={c.links.messenger}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label" htmlFor={`${p}_links_group`}>
                URL nhóm Facebook
              </label>
              <input
                id={`${p}_links_group`}
                name={`${p}_links_group`}
                defaultValue={c.links.group}
                className="admin-input"
              />
            </div>
          </div>
        </AdminFormSection>
      </section>

      <section id="section-hero" className="scroll-mt-24">
        <AdminFormSection
          title="Hero — đầu trang"
          description="Tiêu đề lớn, mô tả và hai nút Messenger / nhóm Facebook bên cạnh sơ đồ 6 bước."
        >
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
              Nút nhóm Facebook
            </label>
            <input id={`${p}_hero_group_cta`} name={`${p}_hero_group_cta`} defaultValue={c.hero.groupCta} className="admin-input" />
          </div>
        </div>
        </AdminFormSection>
      </section>

      <section id="section-steps" className="scroll-mt-24">
        <AdminFormSection title="Phần 6 bước" description="Danh sách bước từ nhận mã đến thăm em.">
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
        </AdminFormSection>
      </section>

      <section id="section-cost" className="scroll-mt-24">
        <AdminFormSection title="Mức chi phí" description="Các mức đóng góp nuôi em trong năm học.">
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
        </AdminFormSection>
      </section>

      <section id="section-transfer" className="scroll-mt-24">
        <AdminFormSection
          title="Chuyển khoản"
          description="Tài khoản, quy định chuyển một lần và khối QR (trang chỉ hiển thị mục đầu nếu CMS còn nhiều kịch bản cũ)."
        >
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_phone`}>
              Số điện thoại (tel:)
            </label>
            <input
              id={`${p}_transfer_phone`}
              name={`${p}_transfer_phone`}
              defaultValue={c.transfer.phone}
              className="admin-input font-mono"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_transfer_phone_display`}>
              Số điện thoại hiển thị
            </label>
            <input
              id={`${p}_transfer_phone_display`}
              name={`${p}_transfer_phone_display`}
              defaultValue={c.transfer.phoneDisplay}
              className="admin-input"
            />
          </div>
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
            Tiêu đề quy định gửi tiền (không dùng trên trang công khai)
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
            Ghi chú hạn chót chuyển khoản
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
        </AdminFormSection>
      </section>

      <section id="section-timeline" className="scroll-mt-24">
        <AdminFormSection title="Mốc thời gian" description="Lịch quan trọng trong năm học.">
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
        </AdminFormSection>
      </section>

      <section id="section-notes" className="scroll-mt-24">
        <AdminFormSection title="Lưu ý & liên kết" description="Lưu ý về mã NE và link giải thích mã.">
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
        </AdminFormSection>
      </section>

      <section id="section-finance-cta" className="scroll-mt-24">
        <AdminFormSection title="Minh bạch tài chính & CTA cuối trang" description="Khối tài chính và kêu gọi hỗ trợ phía dưới.">
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
          <label className="admin-label" htmlFor={`${p}_finance_body_before`}>
            Đoạn trước link báo cáo
          </label>
          <input
            id={`${p}_finance_body_before`}
            name={`${p}_finance_body_before`}
            defaultValue={c.finance.bodyBefore}
            className="admin-input"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_finance_report_link_label`}>
              Nhãn link báo cáo
            </label>
            <input
              id={`${p}_finance_report_link_label`}
              name={`${p}_finance_report_link_label`}
              defaultValue={c.finance.reportLinkLabel}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${p}_finance_report_link_url`}>
              URL báo cáo tài chính
            </label>
            <input
              id={`${p}_finance_report_link_url`}
              name={`${p}_finance_report_link_url`}
              defaultValue={c.finance.reportLinkUrl}
              className="admin-input"
            />
          </div>
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_finance_body_after`}>
            Đoạn sau link báo cáo
          </label>
          <textarea
            id={`${p}_finance_body_after`}
            name={`${p}_finance_body_after`}
            defaultValue={c.finance.bodyAfter}
            rows={2}
            className="admin-input resize-y"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_finance_footnote_before`}>
            Ghi chú — trước link xây trường
          </label>
          <input
            id={`${p}_finance_footnote_before`}
            name={`${p}_finance_footnote_before`}
            defaultValue={c.finance.footnoteBefore}
            className="admin-input"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${p}_finance_school_build_link_label`}>
              Nhãn link dự án xây trường
            </label>
            <input
              id={`${p}_finance_school_build_link_label`}
              name={`${p}_finance_school_build_link_label`}
              defaultValue={c.finance.schoolBuildLinkLabel}
              className="admin-input"
            />
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
        </div>
        <div>
          <label className="admin-label" htmlFor={`${p}_finance_footnote_after`}>
            Ghi chú — sau link xây trường
          </label>
          <input
            id={`${p}_finance_footnote_after`}
            name={`${p}_finance_footnote_after`}
            defaultValue={c.finance.footnoteAfter}
            className="admin-input"
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
        <div className="grid gap-4 sm:grid-cols-3">
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
            <label className="admin-label" htmlFor={`${p}_cta_reference_link_label`}>
              Chữ link tham khảo
            </label>
            <input
              id={`${p}_cta_reference_link_label`}
              name={`${p}_cta_reference_link_label`}
              defaultValue={c.cta.referenceLinkLabel}
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
        </AdminFormSection>
      </section>
    </div>
  );
}

export default async function Process2026AdminPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("process_2026_page_content")
    .select("*")
    .eq("locale", "vi")
    .maybeSingle();
  const viRow = (data as Process2026Row | null) ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quy trình cấp mã 2026"
        description="Chỉnh sửa nội dung và hình ảnh trên /quy-trinh-cap-ma-2026. SEO do code quản lý."
      />

      <AdminActionForm action={saveProcess2026PageContent} className="space-y-6">
        {processEditorCard(viRow)}
        <div className="sticky bottom-4 z-10">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-sm text-slate-600">Kiểm tra lại các mục vừa chỉnh sửa trước khi lưu.</p>
            <button type="submit" className="admin-btn-primary shrink-0">
              <Save className="h-4 w-4" />
              Lưu nội dung quy trình cấp mã
            </button>
          </div>
        </div>
      </AdminActionForm>
    </div>
  );
}
