import type { Metadata } from "next";
import { LogoStoryView } from "@/components/pages/views/cau-chuyen-logo";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("logoStory");

export default function Page() {
  return <LogoStoryView />;
}
