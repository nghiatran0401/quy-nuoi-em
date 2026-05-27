import type { PageHero, PageMeta, StatItem } from "@/content/types";
import { getFormText, parseFormJson } from "@/lib/admin/form-utils";

export function buildAboutUpsertPayload(formData: FormData) {
  const locale = "vi" as const;
  const meta: PageMeta = {
    title: getFormText(formData, `${locale}_meta_title`),
    description: getFormText(formData, `${locale}_meta_description`),
  };

  const hero: PageHero = {
    eyebrow: getFormText(formData, `${locale}_hero_eyebrow`) || undefined,
    title: getFormText(formData, `${locale}_hero_title`),
    description: getFormText(formData, `${locale}_hero_description`) || undefined,
  };

  const stats = parseFormJson<StatItem[]>(
    getFormText(formData, `${locale}_stats_json`),
    "Thống kê trang about",
  );

  return {
    locale,
    meta,
    hero,
    stats,
    partners_title: getFormText(formData, `${locale}_partners_title`),
    hero_image: getFormText(formData, `${locale}_hero_image`) || "/images/about/digital-heart-hero.png",
  };
}
