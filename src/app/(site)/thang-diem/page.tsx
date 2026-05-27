import type { Metadata } from "next";
import { ScoringView } from "@/components/pages/views/thang-diem";
import { getStaticMediaUrl } from "@/lib/data/static-media";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("scoring");

export default async function Page() {
  const referenceImageUrl = await getStaticMediaUrl("scoring_reference");
  return <ScoringView referenceImageUrl={referenceImageUrl} />;
}
