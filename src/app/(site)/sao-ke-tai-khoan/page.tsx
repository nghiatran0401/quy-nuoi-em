import type { Metadata } from "next";
import { ThienNguyenEmbed } from "@/components/data/thien-nguyen-embed";
import { createDataPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createDataPageMetadata("statements");

export default function Page() {
  return <ThienNguyenEmbed />;
}
