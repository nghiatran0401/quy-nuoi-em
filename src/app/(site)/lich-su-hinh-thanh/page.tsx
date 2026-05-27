import type { Metadata } from "next";
import { HistoryView } from "@/components/pages/views/lich-su-hinh-thanh";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("history");

export default function Page() {
  return <HistoryView />;
}
