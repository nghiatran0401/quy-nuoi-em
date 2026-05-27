import { resolveCmsImageUrl } from "@/lib/cms/resolve-image-url";
import { nuoiEmImage, siteImages } from "@/lib/images";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type StaticMediaKey =
  | "process_2026_diagram"
  | "scoring_reference"
  | "mou_1"
  | "mou_2"
  | "mou_3"
  | "process_step_1"
  | "process_step_2"
  | "process_step_3"
  | "process_step_4"
  | "process_step_5"
  | "process_step_6";

const defaults: Record<StaticMediaKey, string> = {
  process_2026_diagram: nuoiEmImage("processGuide"),
  scoring_reference: nuoiEmImage("processGuide"),
  mou_1: siteImages.mou(1),
  mou_2: siteImages.mou(2),
  mou_3: siteImages.mou(3),
  process_step_1: nuoiEmImage("processStep1"),
  process_step_2: nuoiEmImage("processStep2"),
  process_step_3: nuoiEmImage("processStep3"),
  process_step_4: nuoiEmImage("processStep4"),
  process_step_5: nuoiEmImage("processStep5"),
  process_step_6: nuoiEmImage("processStep6"),
};

export function staticMediaSrc(key: StaticMediaKey, url?: string | null): string {
  return resolveCmsImageUrl(url, defaults[key]);
}

export async function getStaticMediaUrl(key: StaticMediaKey): Promise<string> {
  const map = await getStaticMediaMap();
  return staticMediaSrc(key, map[key]);
}

export async function getStaticMediaMap(): Promise<Partial<Record<StaticMediaKey, string>>> {
  if (!isSupabaseConfigured()) {
    return {};
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("static_media").select("key, image_url");

    if (error || !data) {
      return {};
    }

    return Object.fromEntries(data.map((row) => [row.key, row.image_url])) as Partial<
      Record<StaticMediaKey, string>
    >;
  } catch {
    return {};
  }
}
