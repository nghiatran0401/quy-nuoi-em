import type { Metadata } from "next";
import { CareersView } from "@/components/pages/views/tuyen-dung";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("careers");

export default function Page() {
  return <CareersView />;
}
