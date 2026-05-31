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
import { PARTNER_LOGO_STORAGE_FOLDER } from "@/lib/data/partner-logos";

const ADMIN_PATH = "/admin/about";

function revalidatePartnerLogoPaths() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/thanh-vien-quy");
  revalidatePath(ADMIN_PATH);
}

function altTextFromFileName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return base || "Đối tác";
}

export async function createPartnerLogo(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  const result = await runAdminSave(
    ADMIN_SUCCESS_MESSAGES.partner_logo_created,
    "Không thể thêm logo.",
    async ({ supabase }) => {
      const file = formData.get("logo_image");
      if (!(file instanceof File) || file.size === 0) {
        throw new Error("Vui lòng chọn ảnh logo.");
      }

      const image_url = await uploadAdminImage(supabase, file, PARTNER_LOGO_STORAGE_FOLDER);

      const { data: last } = await supabase
        .from("partner_logos")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const sort_order = (last?.sort_order ?? 0) + 10;

      const { error } = await supabase.from("partner_logos").insert({
        name: altTextFromFileName(file.name),
        image_url,
        website_url: null,
        sort_order,
        is_active: true,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  );

  if (result.ok) {
    revalidatePartnerLogoPaths();
  }

  return result;
}

export async function deletePartnerLogo(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  const normalizedId = getFormText(formData, "partner_logo_id").trim();
  if (!normalizedId) {
    return adminActionError("Thiếu mã logo.");
  }

  const result = await runAdminSave(
    ADMIN_SUCCESS_MESSAGES.partner_logo_deleted,
    "Không thể xóa logo.",
    async ({ supabase }) => {
      const { data: existing, error: readError } = await supabase
        .from("partner_logos")
        .select("image_url")
        .eq("id", normalizedId)
        .maybeSingle();

      if (readError || !existing) {
        throw new Error("Không tìm thấy logo.");
      }

      const { error } = await supabase.from("partner_logos").delete().eq("id", normalizedId);
      if (error) {
        throw new Error(error.message);
      }

      await deleteStoredImageIfManaged(supabase, existing.image_url, PARTNER_LOGO_STORAGE_FOLDER);
    },
  );

  if (result.ok) {
    revalidatePartnerLogoPaths();
  }

  return result;
}
