"use server";

import { revalidatePath } from "next/cache";
import { adminActionError, type AdminActionResult, type AdminActionState } from "@/lib/admin/action-state";
import { getFormText } from "@/lib/admin/form-utils";
import { ADMIN_SUCCESS_MESSAGES } from "@/lib/admin/messages";
import { runAdminSave } from "@/lib/admin/run-save";
import {
  deleteStoredImageIfManaged,
  uploadAdminImage,
} from "@/lib/admin/storage-upload";
import { FINANCIAL_REPORTS_STORAGE_FOLDER } from "@/lib/data/financial-reports";

const ADMIN_PATH = "/admin/bao-cao";

export async function updateReportCover(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  const id = getFormText(formData, "id").trim();
  if (!id) {
    return adminActionError("Thiếu mã báo cáo.");
  }

  const result = await runAdminSave(
    ADMIN_SUCCESS_MESSAGES.report_cover_saved,
    "Không thể cập nhật ảnh báo cáo.",
    async ({ supabase }) => {
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
    },
  );

  if (result.ok) {
    revalidatePath("/bao-cao");
    revalidatePath(ADMIN_PATH);
  }

  return result;
}
