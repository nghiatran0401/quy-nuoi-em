"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildProcess2026UpsertPayload } from "@/lib/admin/parsers/process-2026";
import { runAdminSave } from "@/lib/admin/run-save";
import { resolveImageUrlFromForm } from "@/lib/admin/storage-upload";
import { getProcess2026PageFallback } from "@/lib/data/process-2026-page";

const PROCESS_2026_STORAGE_FOLDER = "quy-trinh-2026";

export async function saveProcess2026PageContent(formData: FormData) {
  await runAdminSave(
    "/admin/quy-trinh-cap-ma-2026",
    "Không thể lưu nội dung trang quy trình cấp mã.",
    async ({ supabase }) => {
      const fallback = getProcess2026PageFallback();

      const heroImage =
        (await resolveImageUrlFromForm(formData, supabase, {
          fileField: "vi_hero_image_file",
          urlField: "vi_hero_image_url",
          existingUrlField: "vi_hero_image_existing",
          storageFolder: PROCESS_2026_STORAGE_FOLDER,
        })) ?? fallback.media.heroImage;

      const qrImage =
        (await resolveImageUrlFromForm(formData, supabase, {
          fileField: "vi_qr_image_file",
          urlField: "vi_qr_image_url",
          existingUrlField: "vi_qr_image_existing",
          storageFolder: PROCESS_2026_STORAGE_FOLDER,
        })) ?? fallback.media.qrImage;

      const payload = buildProcess2026UpsertPayload(formData, { heroImage, qrImage });
      const { error } = await supabase.from("process_2026_page_content").upsert([payload], {
        onConflict: "locale",
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  );

  revalidatePath("/quy-trinh-cap-ma-2026");
  revalidatePath("/admin/quy-trinh-cap-ma-2026");
  redirect("/admin/quy-trinh-cap-ma-2026?message=process_2026_saved");
}
