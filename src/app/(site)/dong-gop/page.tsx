import type { Metadata } from "next";
import { DonateView } from "@/components/pages/views/dong-gop";
import { JsonLd } from "@/components/seo/json-ld";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import { getDonateInfo } from "@/lib/data/donate-info";
import { getHomeMedia } from "@/lib/data/home-media";
import { createStaticPageMetadata } from "@/lib/page-metadata";
import { donatePageJsonLd, siteBreadcrumb } from "@/lib/seo/json-ld";

export const metadata: Metadata = createStaticPageMetadata("donate", {
  keywords: [
    "đóng góp Nuôi Em",
    "quyên góp trẻ vùng cao",
    "ủng hộ trẻ vùng cao",
    "tài khoản thiện nguyện Ngân hàng Quân đội",
    "mã NE",
    "chuyển khoản Ngân hàng Quân đội",
    "QUY NUOI EM",
  ],
});

export default async function Page() {
  const meta = getStaticPageMeta("donate");
  const [donateInfo, homeMedia] = await Promise.all([getDonateInfo(), getHomeMedia()]);

  return (
    <>
      <JsonLd
        data={[
          donatePageJsonLd({
            title: meta.title,
            description: meta.description,
            pathname: "/dong-gop",
          }),
          siteBreadcrumb([{ name: meta.title, pathname: "/dong-gop" }]),
        ]}
      />
      <DonateView info={donateInfo} donateQrUrl={homeMedia.donateQr} />
    </>
  );
}
