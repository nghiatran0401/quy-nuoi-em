"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFormText } from "@/lib/admin/form-utils";
import { runAdminSave } from "@/lib/admin/run-save";
import {
  deleteStoredImageIfManaged,
  uploadAdminImage,
} from "@/lib/admin/storage-upload";
import { FINANCIAL_REPORTS_STORAGE_FOLDER } from "@/lib/data/financial-reports";

const ADMIN_PATH = "/admin/bao-cao";

export async function updateReportCover(formData: FormData) {
  const id = getFormText(formData, "id").trim();
  if (!id) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent("Thiếu mã báo cáo.")}`);
  }

  await runAdminSave(ADMIN_PATH, "Không thể cập nhật ảnh báo cáo.", async ({ supabase }) => {
    const file = formData.get("cover_image");
    if (!(file instanceof File) || file.size === 0) {
      throw new Error("Vui lòng chọn ảnh bìa.");
    }

    const { data: existing, error: readError } = await supabase
      .from("financial_reports")
      .select("image_url")
      .eq("id", id)
      .maybeSingle();

    if (readError || !existing) {
      throw new Error("Không tìm thấy báo cáo.");
    }

    const image_url = await uploadAdminImage(supabase, file, FINANCIAL_REPORTS_STORAGE_FOLDER);

    const { error } = await supabase.from("financial_reports").update({ image_url }).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    if (image_url !== existing.image_url) {
      await deleteStoredImageIfManaged(supabase, existing.image_url, FINANCIAL_REPORTS_STORAGE_FOLDER);
    }
  });

  revalidatePath("/bao-cao");
  revalidatePath(ADMIN_PATH);
  redirect(`${ADMIN_PATH}?message=report_cover_saved`);
}
