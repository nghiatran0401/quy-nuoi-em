import type { Metadata } from "next";
import { ProcessView } from "@/components/pages/views/quy-trinh-xet-duyet";
import { getStaticMediaUrl, type StaticMediaKey } from "@/lib/data/static-media";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("process");

const STEP_KEYS = [
  "process_step_1",
  "process_step_2",
  "process_step_3",
  "process_step_4",
  "process_step_5",
  "process_step_6",
] as const satisfies readonly StaticMediaKey[];

export default async function Page() {
  const stepImageUrls = await Promise.all(STEP_KEYS.map((key) => getStaticMediaUrl(key)));
  return <ProcessView stepImageUrls={stepImageUrls} />;
}
