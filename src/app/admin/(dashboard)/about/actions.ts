"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildAboutUpsertPayload } from "@/lib/admin/parsers/about";
import { runAdminSave } from "@/lib/admin/run-save";
import {
  deleteStoredImageIfManaged,
  resolveImageUrlFromForm,
} from "@/lib/admin/storage-upload";
import { defaultAboutPageContent } from "@/lib/cms/vietnamese-defaults";
import { resolveAboutPageContent } from "@/lib/data/about-page";

const ABOUT_STORAGE_FOLDER = "about";

export async function saveAboutPageContent(formData: FormData) {
  await runAdminSave(
    "/admin/about",
    "Không thể lưu nội dung trang giới thiệu.",
    async ({ supabase }) => {
      const base = defaultAboutPageContent();
      const { data: existingRow } = await supabase
        .from("about_page_content")
        .select("meta, hero, stats, partners_title, hero_image")
        .eq("locale", "vi")
        .maybeSingle();

      const resolved = resolveAboutPageContent((existingRow as Parameters<typeof resolveAboutPageContent>[0]) ?? null);

      const hero_image = await resolveImageUrlFromForm(formData, supabase, {
        fileField: "vi_hero_image_file",
        urlField: "vi_hero_image_existing",
        existingUrlField: "vi_hero_image_existing",
        storageFolder: ABOUT_STORAGE_FOLDER,
        required: false,
      });

      const payload = buildAboutUpsertPayload(formData);
      payload.hero_image = hero_image ?? resolved.heroImage ?? base.heroImage;

      if (
        existingRow?.hero_image &&
        payload.hero_image !== existingRow.hero_image
      ) {
        await deleteStoredImageIfManaged(supabase, existingRow.hero_image, ABOUT_STORAGE_FOLDER);
      }

      const { error } = await supabase.from("about_page_content").upsert([payload], {
        onConflict: "locale",
      });
      if (error) {
        throw new Error(error.message);
      }
    },
  );

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about?message=about_saved");
}
