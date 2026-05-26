import type { Metadata } from "next";
import { DonateView } from "@/components/pages/views/dong-gop";
import { JsonLd } from "@/components/seo/json-ld";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { resolveLocale } from "@/lib/locale-page";
import { createStaticPageMetadata } from "@/lib/page-metadata";
import { donatePageJsonLd, siteBreadcrumb } from "@/lib/seo/json-ld";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (await resolveLocale(params)) as Locale;
  return createStaticPageMetadata("donate", locale, {
    keywords:
      locale === "vi"
        ? [
            "đóng góp Nuôi Em",
            "quyên góp trẻ vùng cao",
            "ủng hộ trẻ mồ côi",
            "tài khoản thiện nguyện MB Bank",
            "mã NE",
            "chuyển khoản Vietcombank",
          ]
        : [
            "donate Nuoi Em",
            "donate to highland children Vietnam",
            "support orphan children Vietnam",
            "Vietcombank charity transfer",
            "NE code",
          ],
  });
}

export default async function Page({ params }: PageProps) {
  const locale = (await resolveLocale(params)) as Locale;
  const meta = getStaticPageMeta("donate", locale);

  return (
    <>
      <JsonLd
        data={[
          donatePageJsonLd({
            locale,
            title: meta.title,
            description: meta.description,
            pathname: "/dong-gop",
          }),
          siteBreadcrumb([{ name: meta.title, pathname: "/dong-gop" }], locale),
        ]}
      />
      <DonateView locale={locale} />
    </>
  );
}
