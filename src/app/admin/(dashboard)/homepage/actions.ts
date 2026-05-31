"use server";

import { revalidatePath } from "next/cache";
import { buildHomeMediaFromForm } from "@/lib/admin/build-home-media";
import { ADMIN_SUCCESS_MESSAGES } from "@/lib/admin/messages";
import { buildHomepageUpsertPayload } from "@/lib/admin/parsers/homepage";
import { runAdminSave } from "@/lib/admin/run-save";
import type { AdminActionResult, AdminActionState } from "@/lib/admin/action-state";
import { resolveHomeMedia } from "@/lib/data/home-media";

export async function saveHomepageContent(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  const result = await runAdminSave(
    ADMIN_SUCCESS_MESSAGES.homepage_saved,
    "Không thể lưu nội dung trang chủ.",
    async ({ supabase }) => {
      const { data: existing } = await supabase
        .from("homepage_content")
        .select("media")
        .eq("locale", "vi")
        .maybeSingle();

      const currentMedia = resolveHomeMedia(existing?.media as Parameters<typeof resolveHomeMedia>[0]);
      const media = await buildHomeMediaFromForm(formData, supabase, currentMedia);
      const payload = buildHomepageUpsertPayload(formData, media);

      const { error } = await supabase.from("homepage_content").upsert([payload], {
        onConflict: "locale",
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  );

  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/dong-gop");
    revalidatePath("/quy-trinh-cap-ma-2026");
    revalidatePath("/admin/homepage");
  }

  return result;
}
