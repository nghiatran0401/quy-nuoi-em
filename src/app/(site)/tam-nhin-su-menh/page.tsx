import type { Metadata } from "next";
import { VisionView } from "@/components/pages/views/tam-nhin-su-menh";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("vision");

export default function Page() {
  return <VisionView />;
}
