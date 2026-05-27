import { Save } from "lucide-react";
import { AdminAlert } from "@/components/admin/admin-alert";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminSeoEditor } from "@/components/admin/admin-seo-editor";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminImageField } from "@/components/admin/admin-image-field";
import { PartnerLogosEditor } from "@/components/admin/partner-logos-editor";
import { StatsListEditor } from "@/components/admin/stats-list-editor";
import { decodeAdminParam, formatAdminMessage } from "@/lib/admin/messages";
import {
  resolveAboutPageContent,
  type AboutPageContent,
  type AboutPageContentRow,
} from "@/lib/data/about-page";
import { listPartnerLogosForAdmin } from "@/lib/data/partner-logos";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveAboutPageContent } from "./actions";

type AboutAdminProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

function AboutEditorForm({
  content,
  partnerLogos,
}: {
  content: AboutPageContent;
  partnerLogos: Awaited<ReturnType<typeof listPartnerLogosForAdmin>>;
}) {
  const locale = "vi" as const;
  const { meta, hero, stats, partnersTitle, heroImage } = content;

  return (
    <div className="admin-card space-y-6 p-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Nội dung tiếng Việt</h2>
        <p className="mt-1 text-sm text-slate-600">
          Các mục bên dưới theo đúng thứ tự hiển thị trên trang /about. Giá trị đã được đồng bộ với nội dung
          công khai (kể cả khi cơ sở dữ liệu còn dữ liệu thử).
        </p>
      </div>

      <AdminFormSection
        title="SEO — tiêu đề tab trình duyệt & mô tả tìm kiếm"
        description="Không hiển thị trực tiếp trên trang; dùng cho Google và chia sẻ link."
      >
        <AdminSeoEditor
          prefix={locale}
          initialTitle={meta.title}
          initialDescription={meta.description}
          previewPath="/about"
        />
      </AdminFormSection>

      <AdminFormSection
        title="1. Ảnh banner & Hero"
        description="Ảnh lớn phía trên, tiếp theo là nhãn phụ, tiêu đề và đoạn mô tả Dự án Nuôi Em."
      >
        <AdminImageField
          label="Ảnh banner phía trên"
          fileName={`${locale}_hero_image_file`}
          existingFieldName={`${locale}_hero_image_existing`}
          currentUrl={heroImage}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor={`${locale}_hero_eyebrow`}>
              Nhãn phụ Hero
            </label>
            <input
              id={`${locale}_hero_eyebrow`}
              name={`${locale}_hero_eyebrow`}
              defaultValue={hero.eyebrow ?? ""}
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
            defaultValue={hero.description ?? ""}
            rows={3}
            className="admin-input resize-y"
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="2. Thống kê"
        description="Dãy số liệu ngay dưới phần Hero (tổng em nuôi, thu/chi, v.v.)."
      >
        <StatsListEditor name={`${locale}_stats_json`} initialStats={stats} label="Chỉ số thống kê" />
      </AdminFormSection>

      <AdminFormSection
        title="3. Đối tác đồng hành"
        description="Tiêu đề và danh sách logo chạy ngang (trang chủ, giới thiệu, thành viên quỹ)."
      >
        <div>
          <label className="admin-label" htmlFor={`${locale}_partners_title`}>
            Tiêu đề khối
          </label>
          <input
            id={`${locale}_partners_title`}
            name={`${locale}_partners_title`}
            defaultValue={partnersTitle}
            className="admin-input"
          />
        </div>
        <PartnerLogosEditor logos={partnerLogos} />
      </AdminFormSection>
    </div>
  );
}

export default async function AboutAdminPage({ searchParams }: AboutAdminProps) {
  const params = await searchParams;
  const message = formatAdminMessage(params.message);
  const error = decodeAdminParam(params.error);

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("about_page_content")
    .select("meta, hero, stats, partners_title, hero_image")
    .eq("locale", "vi")
    .maybeSingle();

  const content = resolveAboutPageContent((data as AboutPageContentRow | null) ?? null);
  const partnerLogos = await listPartnerLogosForAdmin();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Trang Giới thiệu (/about)"
        description="Chỉnh sửa theo từng khối trên trang giới thiệu. Thứ tự và nhãn trường khớp với giao diện công khai."
      />

      <div className="space-y-3">
        {message ? <AdminAlert variant="success" message={message} /> : null}
        {error ? <AdminAlert variant="error" message={error} /> : null}
      </div>

      <form action={saveAboutPageContent} encType="multipart/form-data" className="space-y-6">
        <AboutEditorForm content={content} partnerLogos={partnerLogos} />

        <div className="flex justify-end">
          <button type="submit" className="admin-btn-primary">
            <Save className="h-4 w-4" />
            Lưu nội dung trang giới thiệu
          </button>
        </div>
      </form>
    </div>
  );
}
