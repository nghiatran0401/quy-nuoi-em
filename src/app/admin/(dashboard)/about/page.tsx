import { Save } from "lucide-react";
import { AdminAlert } from "@/components/admin/admin-alert";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatsListEditor } from "@/components/admin/stats-list-editor";
import { getStaticPageHero, getStaticPageMeta, getUiLabel } from "@/content/pages/static-pages";
import { siteStats } from "@/content/shared/site-stats";
import type { StatItem } from "@/content/types";
import { decodeAdminParam, formatAdminMessage } from "@/lib/admin/messages";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveAboutPageContent } from "./actions";

type AboutAdminProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

type AboutPageRow = {
  locale: "vi" | "en";
  meta: {
    title: string;
    description: string;
  } | null;
  hero: {
    eyebrow?: string;
    title: string;
    description?: string;
  } | null;
  stats: unknown;
  partners_title: string | null;
  hero_image: string | null;
};

function localeCard(locale: "vi" | "en", row: AboutPageRow | null) {
  const fallbackMeta = getStaticPageMeta("about", locale);
  const fallbackHero = getStaticPageHero("about", locale);
  const fallbackStats = siteStats[locale];
  const fallbackPartnersTitle = getUiLabel(locale, "partners");
  const fallbackImage = "/images/about/digital-heart-hero.png";

  const meta = row?.meta ?? fallbackMeta;
  const hero = row?.hero ?? fallbackHero;
  const stats = (row?.stats as StatItem[] | null) ?? fallbackStats;
  const partnersTitle = row?.partners_title ?? fallbackPartnersTitle;
  const heroImage = row?.hero_image ?? fallbackImage;

  return (
    <div className="admin-card space-y-5 p-5" key={locale}>
      <h2 className="text-lg font-semibold text-slate-900">
        Ngôn ngữ: <span className="uppercase">{locale}</span>
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_meta_title`}>
            Tiêu đề SEO
          </label>
          <input id={`${locale}_meta_title`} name={`${locale}_meta_title`} defaultValue={meta.title} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_partners_title`}>
            Tiêu đề đối tác
          </label>
          <input id={`${locale}_partners_title`} name={`${locale}_partners_title`} defaultValue={partnersTitle} className="admin-input" />
        </div>
      </div>

      <div>
        <label className="admin-label" htmlFor={`${locale}_meta_description`}>
          Mô tả SEO
        </label>
        <textarea
          id={`${locale}_meta_description`}
          name={`${locale}_meta_description`}
          defaultValue={meta.description}
          rows={3}
          className="admin-input resize-y"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_hero_eyebrow`}>
            Nhãn phụ Hero
          </label>
          <input id={`${locale}_hero_eyebrow`} name={`${locale}_hero_eyebrow`} defaultValue={hero.eyebrow ?? ""} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_hero_title`}>
            Tiêu đề Hero
          </label>
          <input id={`${locale}_hero_title`} name={`${locale}_hero_title`} defaultValue={hero.title} className="admin-input" />
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

      <div>
        <label className="admin-label" htmlFor={`${locale}_hero_image`}>
          Ảnh Hero (đường dẫn hoặc URL)
        </label>
        <input id={`${locale}_hero_image`} name={`${locale}_hero_image`} defaultValue={heroImage} className="admin-input" />
      </div>

      <StatsListEditor
        name={`${locale}_stats_json`}
        initialStats={stats}
        label="Thống kê trang Giới thiệu"
      />
    </div>
  );
}

export default async function AboutAdminPage({ searchParams }: AboutAdminProps) {
  const params = await searchParams;
  const message = formatAdminMessage(params.message);
  const error = decodeAdminParam(params.error);

  const supabase = createAdminClient();
  const { data } = await supabase.from("about_page_content").select("*").in("locale", ["vi", "en"]);
  const rows = (data ?? []) as AboutPageRow[];
  const viRow = rows.find((row) => row.locale === "vi") ?? null;
  const enRow = rows.find((row) => row.locale === "en") ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Trang Giới thiệu (/about)"
        description="Chỉnh sửa trực tiếp nội dung trang giới thiệu: SEO, Hero, thống kê và tiêu đề đối tác."
      />

      <div className="space-y-3">
        {message ? <AdminAlert variant="success" message={message} /> : null}
        {error ? <AdminAlert variant="error" message={error} /> : null}
      </div>

      <form action={saveAboutPageContent} className="space-y-6">
        {localeCard("vi", viRow)}
        {localeCard("en", enRow)}
        <div className="sticky bottom-4 z-10 flex justify-end">
          <button type="submit" className="admin-btn-primary">
            <Save className="h-4 w-4" />
            Lưu nội dung trang giới thiệu
          </button>
        </div>
      </form>
    </div>
  );
}
