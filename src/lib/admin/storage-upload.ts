import type { SupabaseClient } from "@supabase/supabase-js";

export const IMAGE_STORAGE_BUCKET = "images";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export function storageObjectPathFromPublicUrl(
  publicUrl: string,
  bucket = IMAGE_STORAGE_BUCKET,
): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(publicUrl.slice(index + marker.length));
}

export async function uploadAdminImage(
  supabase: SupabaseClient,
  file: File,
  folder: string,
): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Ảnh chỉ hỗ trợ định dạng JPEG, PNG, WebP hoặc AVIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Ảnh phải nhỏ hơn 5 MB.");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Tải ảnh lên thất bại: ${error.message}`);
  }

  const { data } = supabase.storage.from(IMAGE_STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function resolveImageUrlFromForm(
  formData: FormData,
  supabase: SupabaseClient,
  options: {
    fileField: string;
    urlField: string;
    existingUrlField?: string;
    storageFolder: string;
    required?: boolean;
  },
): Promise<string | null> {
  const file = formData.get(options.fileField);
  const urlFromField = formData.get(options.urlField);
  const existing =
    options.existingUrlField !== undefined
      ? String(formData.get(options.existingUrlField) ?? "").trim()
      : "";

  if (file instanceof File && file.size > 0) {
    return uploadAdminImage(supabase, file, options.storageFolder);
  }

  if (typeof urlFromField === "string" && urlFromField.trim()) {
    return urlFromField.trim();
  }

  if (existing) {
    return existing;
  }

  if (options.required) {
    throw new Error("Vui lòng chọn ảnh hoặc nhập URL ảnh.");
  }

  return null;
}

export async function deleteStoredImageIfManaged(
  supabase: SupabaseClient,
  imageUrl: string | null | undefined,
  folderPrefix: string,
): Promise<void> {
  if (!imageUrl) return;

  const path = storageObjectPathFromPublicUrl(imageUrl);
  if (!path?.startsWith(`${folderPrefix}/`)) return;

  const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).remove([path]);
  if (error) {
    console.warn(`Could not delete storage object ${path}:`, error.message);
  }
}
