import type { Metadata } from "next";
import { MembersView } from "@/components/pages/views/thanh-vien-quy";
import { getPartnerLogos } from "@/lib/data/partner-logos";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("members");

export default async function Page() {
  const partnerLogos = await getPartnerLogos();
  return <MembersView partnerLogos={partnerLogos} />;
}
