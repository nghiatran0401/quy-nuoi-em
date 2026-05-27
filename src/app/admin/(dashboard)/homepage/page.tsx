import { Save } from "lucide-react";
import { AdminAlert } from "@/components/admin/admin-alert";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminImageField } from "@/components/admin/admin-image-field";
import { DonateInfoEditor } from "@/components/admin/donate-info-editor";
import { HomepageFaqEditor } from "@/components/admin/homepage-faq-editor";
import { ParagraphListEditor } from "@/components/admin/paragraph-list-editor";
import { StatsListEditor } from "@/components/admin/stats-list-editor";
import { formatAdminMessage, decodeAdminParam } from "@/lib/admin/messages";
import { resolveDonateInfo, type DonateInfoContent } from "@/lib/data/donate-info";
import { HOME_MEMBER_IMAGE_COUNT, resolveHomeMedia, type HomeMediaContent } from "@/lib/data/home-media";
import { resolveHomePageContent, type HomePageContent } from "@/lib/data/homepage";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveHomepageContent } from "./actions";

type HomePageAdminProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

type HomePageContentRow = {
  locale: string;
  hero: HomePageContent["hero"] | null;
  stats: HomePageContent["stats"] | null;
  cta: HomePageContent["cta"] | null;
  members: HomePageContent["members"] | null;
  faq: HomePageContent["faq"] | null;
  donate_info: DonateInfoContent | null;
  media: HomeMediaContent | null;
};

function HomepageEditorForm({
  content,
  donateInfo,
  media,
}: {
  content: HomePageContent;
  donateInfo: DonateInfoContent;
  media: HomeMediaContent;
}) {
  const locale = "vi" as const;
  const { hero, stats, cta, members, faq } = content;

  return (
    <div className="admin-card space-y-6 p-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Nội dung tiếng Việt</h2>
        <p className="mt-1 text-sm text-slate-600">
          Các mục bên dưới theo đúng thứ tự hiển thị trên trang chủ. Giá trị đã được đồng bộ với nội dung
          công khai (kể cả khi cơ sở dữ liệu còn dữ liệu thử).
        </p>
      </div>

      <AdminFormSection
        title="1. Hero — đầu trang"
        description="Banner lớn với tiêu đề Dự án Nuôi Em và hai nút hành động phía trên."
      >
        <AdminImageField
          label="Ảnh Hero (bên phải)"
          fileName={`${locale}_media_hero_file`}
          existingFieldName={`${locale}_media_hero_existing`}
          currentUrl={media.heroImage}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${locale}_hero_eyebrow`}>
              Nhãn phụ Hero
            </label>
            <input
              id={`${locale}_hero_eyebrow`}
              name={`${locale}_hero_eyebrow`}
              defaultValue={hero.eyebrow}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${locale}_hero_title`}>
              Tiêu đề Hero
            </label>
            <input
              id={`${locale}_hero_title`}
              name={`${locale}_hero_title`}
              defaultValue={hero.title}
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label className="admin-label" htmlFor={`${locale}_hero_description`}>
            Mô tả Hero
          </label>
          <textarea
            id={`${locale}_hero_description`}
            name={`${locale}_hero_description`}
            defaultValue={hero.description}
            rows={3}
            className="admin-input resize-y"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${locale}_hero_sponsor_now`}>
              Nút chính Hero (Đóng góp ngay)
            </label>
            <input
              id={`${locale}_hero_sponsor_now`}
              name={`${locale}_hero_sponsor_now`}
              defaultValue={hero.sponsorNow}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${locale}_hero_learn_more`}>
              Nút phụ Hero (Tìm hiểu thêm)
            </label>
            <input
              id={`${locale}_hero_learn_more`}
              name={`${locale}_hero_learn_more`}
              defaultValue={hero.learnMore}
              className="admin-input"
            />
          </div>
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="2. Thống kê"
        description="Dải số liệu ngay dưới Hero (tổng em nuôi, thu chi, v.v.). Phần Đợt bảo trợ không chỉnh ở đây."
      >
        <StatsListEditor name={`${locale}_stats_json`} initialStats={stats} />
      </AdminFormSection>

      <AdminFormSection
        title="3. Hệ sinh thái & Mở mã mùa 12"
        description="Khối 3 thẻ dự án + tiêu đề mùa mở mã + câu chuyện (nuoiem.com), trước Thành viên Quỹ. Thẻ hệ sinh thái cố định trong mã nguồn; chỉnh tiêu đề, các đoạn chuyện, ảnh và nút tại đây."
      >
        <p className="text-sm text-brand-muted">
          Cột phải hiển thị video YouTube cố định (Nuôi Em / Niềm Tin). Trường ảnh CTA bên dưới không còn dùng cho
          khối này.
        </p>
        <div>
          <label className="admin-label" htmlFor={`${locale}_cta_title`}>
            Tiêu đề mở mã (ví dụ: MỞ MÃ NUÔI EM MÙA 12 — ĐANG MỞ)
          </label>
          <input
            id={`${locale}_cta_title`}
            name={`${locale}_cta_title`}
            defaultValue={cta.title}
            className="admin-input"
          />
        </div>

        <ParagraphListEditor
          name={`${locale}_cta_paragraphs_json`}
          label="Các đoạn câu chuyện (ô cam bên trái)"
          initialItems={cta.paragraphs}
          emptyItemPlaceholder="Nhập đoạn văn..."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${locale}_cta_donate`}>
              Nút Tìm hiểu thêm → /quy-trinh-cap-ma-2026
            </label>
            <input
              id={`${locale}_cta_donate`}
              name={`${locale}_cta_donate`}
              defaultValue={cta.donate}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${locale}_cta_reports`}>
              Nút phụ CTA → /bao-cao
            </label>
            <input
              id={`${locale}_cta_reports`}
              name={`${locale}_cta_reports`}
              defaultValue={cta.reports}
              className="admin-input"
            />
          </div>
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="4. Tham khảo — Bằng khen & giải thưởng"
        description="Khối THAM KHẢO trên trang chủ: tiêu đề + đoạn giới thiệu bên trái, 5 ảnh bằng khen bên phải. Để trống nhãn phụ / nút nếu không cần."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: HOME_MEMBER_IMAGE_COUNT }, (_, i) => i + 1).map((index) => (
            <AdminImageField
              key={index}
              label={`Ảnh collage ${index}`}
              fileName={`${locale}_media_member_${index}_file`}
              existingFieldName={`${locale}_media_member_${index}_existing`}
              currentUrl={media.memberImages[index - 1]!}
            />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${locale}_members_eyebrow`}>
              Nhãn phụ (tùy chọn, để trống nếu không dùng)
            </label>
            <input
              id={`${locale}_members_eyebrow`}
              name={`${locale}_members_eyebrow`}
              defaultValue={members.eyebrow}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor={`${locale}_members_title`}>
              Tiêu đề chính
            </label>
            <input
              id={`${locale}_members_title`}
              name={`${locale}_members_title`}
              defaultValue={members.title}
              className="admin-input"
            />
          </div>
        </div>

        <ParagraphListEditor
          name={`${locale}_members_paragraphs_json`}
          label="Đoạn văn mô tả"
          initialItems={members.paragraphs}
          emptyItemPlaceholder="Nhập đoạn văn..."
        />

        <div>
          <label className="admin-label" htmlFor={`${locale}_members_cta`}>
            Nút kêu gọi (tùy chọn, để trống nếu không dùng)
          </label>
          <input
            id={`${locale}_members_cta`}
            name={`${locale}_members_cta`}
            defaultValue={members.cta}
            className="admin-input"
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="5. Câu hỏi thường gặp (FAQ)"
        description="Mỗi câu hỏi có kiểu trả lời riêng. Chỉ câu loại Tài khoản ngân hàng dùng mục 6 bên dưới."
      >
        <HomepageFaqEditor locale={locale} initialFaq={faq} donateInfo={donateInfo} />
      </AdminFormSection>

      <div id="donate-info-section">
        <AdminFormSection
          title="6. Thông tin chuyển khoản & QR"
          description="Hiển thị trong FAQ ngân hàng, /dong-gop và quy trình cấp mã 2026."
        >
          <AdminImageField
            label="Ảnh mã QR chuyển khoản"
            fileName={`${locale}_media_qr_file`}
            existingFieldName={`${locale}_media_qr_existing`}
            currentUrl={media.donateQr}
            hint="Dùng chung trên toàn site (Đóng góp, FAQ, Quy trình 2026)."
          />
          <DonateInfoEditor locale={locale} initial={donateInfo} />
        </AdminFormSection>
      </div>
    </div>
  );
}

export default async function HomepageAdminPage({ searchParams }: HomePageAdminProps) {
  const params = await searchParams;
  const message = formatAdminMessage(params.message);
  const error = decodeAdminParam(params.error);

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("homepage_content")
    .select("locale, hero, stats, cta, members, faq, donate_info, media")
    .eq("locale", "vi")
    .maybeSingle();

  const row = (data as HomePageContentRow | null) ?? null;
  const content = resolveHomePageContent(row);
  const donateInfo = resolveDonateInfo(row?.donate_info);
  const media = resolveHomeMedia(row?.media);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Nội dung trang chủ"
        description="Chỉnh sửa theo từng khối trên trang chủ. Thứ tự và nhãn trường khớp với giao diện công khai."
      />

      <div className="space-y-3">
        {message ? <AdminAlert variant="success" message={message} /> : null}
        {error ? <AdminAlert variant="error" message={error} /> : null}
      </div>

      <form action={saveHomepageContent} encType="multipart/form-data" className="space-y-6">
        <HomepageEditorForm content={content} donateInfo={donateInfo} media={media} />

        <div className="sticky bottom-4 z-10 flex justify-end">
          <button type="submit" className="admin-btn-primary">
            <Save className="h-4 w-4" />
            Lưu nội dung trang chủ
          </button>
        </div>
      </form>
    </div>
  );
}
