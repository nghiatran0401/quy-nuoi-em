import { Save } from "lucide-react";
import { AdminAlert } from "@/components/admin/admin-alert";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HomepageLocaleEditor } from "@/components/admin/homepage-locale-editor";
import { ParagraphListEditor } from "@/components/admin/paragraph-list-editor";
import { ctaSectionCopy, faqSectionCopy, membersSectionCopy } from "@/content/home-sections";
import { homeStats } from "@/content/shared/site-stats";
import type { StatItem } from "@/content/types";
import { formatAdminMessage, decodeAdminParam } from "@/lib/admin/messages";
import type { HomeFaqContent } from "@/lib/data/homepage";
import { createAdminClient } from "@/lib/supabase/admin";
import { saveHomepageContent } from "./actions";

type HomePageAdminProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

type HomePageContentRow = {
  locale: "vi" | "en";
  hero: Record<string, string> | null;
  cta: {
    title: string;
    paragraphs: string[];
    donate: string;
    reports: string;
  } | null;
  members: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cta: string;
  } | null;
  stats: unknown;
  faq: unknown;
};

function getFallback(locale: "vi" | "en") {
  return {
    hero: locale === "vi"
      ? {
          eyebrow: "Bữa cơm níu chân trẻ tới trường",
          title: "Dự án Nuôi Em",
          description:
            "150.000đ - 170.000đ mỗi tháng giúp bé vùng cao no bụng, đi học đầy đủ. Biết rõ bé nào, có thể đi thăm — mỗi em một mã NE, mỗi em một người nuôi.",
          sponsorNow: "Đóng góp ngay",
          learnMore: "Tìm hiểu thêm",
        }
      : {
          eyebrow: "Meals that keep children in school",
          title: "Nuoi Em Project",
          description:
            "150,000 VND per month helps highland children eat well and attend school. One child, one NE code, one sponsor — with transparency and visit opportunities.",
          sponsorNow: "Donate now",
          learnMore: "Learn more",
        },
    cta: ctaSectionCopy[locale],
    members: membersSectionCopy[locale],
    stats: homeStats[locale],
    faq: faqSectionCopy[locale],
  };
}

function localeCard(
  locale: "vi" | "en",
  row: HomePageContentRow | null,
) {
  const fallback = getFallback(locale);
  const hero = row?.hero ?? fallback.hero;
  const cta = row?.cta ?? fallback.cta;
  const members = row?.members ?? fallback.members;
  const stats = (row?.stats as StatItem[] | null) ?? fallback.stats;
  const faq = (row?.faq as HomeFaqContent | null) ?? fallback.faq;

  return (
    <div className="admin-card space-y-5 p-5" key={locale}>
      <h2 className="text-lg font-semibold text-slate-900">
        Ngôn ngữ: <span className="uppercase">{locale}</span>
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_hero_eyebrow`}>
            Dòng nhãn Hero
          </label>
          <input id={`${locale}_hero_eyebrow`} name={`${locale}_hero_eyebrow`} defaultValue={hero.eyebrow} className="admin-input" />
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
          defaultValue={hero.description}
          rows={3}
          className="admin-input resize-y"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_hero_sponsor_now`}>
            Nút chính Hero
          </label>
          <input id={`${locale}_hero_sponsor_now`} name={`${locale}_hero_sponsor_now`} defaultValue={hero.sponsorNow} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_hero_learn_more`}>
            Nút phụ Hero
          </label>
          <input id={`${locale}_hero_learn_more`} name={`${locale}_hero_learn_more`} defaultValue={hero.learnMore} className="admin-input" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_cta_title`}>
            Tiêu đề CTA
          </label>
          <input id={`${locale}_cta_title`} name={`${locale}_cta_title`} defaultValue={cta.title} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_members_title`}>
            Tiêu đề mục Thành viên
          </label>
          <input id={`${locale}_members_title`} name={`${locale}_members_title`} defaultValue={members.title} className="admin-input" />
        </div>
      </div>

      <ParagraphListEditor
        name={`${locale}_cta_paragraphs_json`}
        label="Đoạn văn CTA"
        initialItems={cta.paragraphs}
        emptyItemPlaceholder="Nhập đoạn văn CTA..."
      />

      <ParagraphListEditor
        name={`${locale}_members_paragraphs_json`}
        label="Đoạn văn mục Thành viên"
        initialItems={members.paragraphs}
        emptyItemPlaceholder="Nhập đoạn văn mục Thành viên..."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_cta_donate`}>
            Nút chính CTA
          </label>
          <input id={`${locale}_cta_donate`} name={`${locale}_cta_donate`} defaultValue={cta.donate} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_cta_reports`}>
            Nút phụ CTA
          </label>
          <input id={`${locale}_cta_reports`} name={`${locale}_cta_reports`} defaultValue={cta.reports} className="admin-input" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_members_eyebrow`}>
            Nhãn phụ mục Thành viên
          </label>
          <input id={`${locale}_members_eyebrow`} name={`${locale}_members_eyebrow`} defaultValue={members.eyebrow} className="admin-input" />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_members_cta`}>
            Nút mục Thành viên
          </label>
          <input id={`${locale}_members_cta`} name={`${locale}_members_cta`} defaultValue={members.cta} className="admin-input" />
        </div>
      </div>

      <HomepageLocaleEditor locale={locale} initialStats={stats} initialFaq={faq} />
    </div>
  );
}

export default async function HomepageAdminPage({ searchParams }: HomePageAdminProps) {
  const params = await searchParams;
  const message = formatAdminMessage(params.message);
  const error = decodeAdminParam(params.error);

  const supabase = createAdminClient();
  const { data } = await supabase.from("homepage_content").select("*").in("locale", ["vi", "en"]);
  const rows = (data ?? []) as HomePageContentRow[];
  const viRow = rows.find((row) => row.locale === "vi") ?? null;
  const enRow = rows.find((row) => row.locale === "en") ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Nội dung trang chủ"
        description="Trình chỉnh sửa trực tiếp cho Hero, thống kê, CTA, mục thành viên và FAQ. Lưu xong sẽ áp dụng lên trang chủ."
      />

      <div className="space-y-3">
        {message ? <AdminAlert variant="success" message={message} /> : null}
        {error ? <AdminAlert variant="error" message={error} /> : null}
      </div>

      <form action={saveHomepageContent} className="space-y-6">
        {localeCard("vi", viRow)}
        {localeCard("en", enRow)}

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
