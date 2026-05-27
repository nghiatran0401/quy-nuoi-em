import type { Metadata } from "next";
import { AboutView } from "@/components/pages/views/about";
import { getAboutPageContent } from "@/lib/data/about-page";
import { getPartnerLogos } from "@/lib/data/partner-logos";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  return createPageMetadata(content.meta, "/about");
}

export default async function Page() {
  const [content, partnerLogos] = await Promise.all([getAboutPageContent(), getPartnerLogos()]);
  return <AboutView content={content} partnerLogos={partnerLogos} />;
}
