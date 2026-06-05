import type { Metadata } from "next";
import { DonateView } from "@/components/pages/views/dong-gop";
import { JsonLd } from "@/components/seo/json-ld";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import { getHomeMedia } from "@/lib/data/home-media";
import { createStaticPageMetadata } from "@/lib/page-metadata";
import { donatePageJsonLd, siteBreadcrumb } from "@/lib/seo/json-ld";

export const metadata: Metadata = createStaticPageMetadata("donate", {
  keywords: [
    "đóng góp Nuôi Em",
    "chuyển khoản mã NE",
    "quyên góp cơm trưa",
    "quyên góp trẻ vùng cao",
    "MB Bank Quỹ Nuôi Em",
    "tài khoản thiện nguyện Ngân hàng Quân đội",
    "QUY NUOI EM",
  ],
});

export default async function Page() {
  const meta = getStaticPageMeta("donate");
  const homeMedia = await getHomeMedia();

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
      <DonateView donateQrUrl={homeMedia.donateQr} />
    </>
  );
}
