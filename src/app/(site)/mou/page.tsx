import type { Metadata } from "next";
import { MouView } from "@/components/pages/views/mou";
import { getStaticMediaUrl } from "@/lib/data/static-media";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("mou");

export default async function Page() {
  const galleryImages = await Promise.all([
    getStaticMediaUrl("mou_1"),
    getStaticMediaUrl("mou_2"),
    getStaticMediaUrl("mou_3"),
  ]);

  return <MouView galleryImages={galleryImages} />;
}
