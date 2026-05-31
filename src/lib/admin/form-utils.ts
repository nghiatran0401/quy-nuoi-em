/** Shared helpers for admin server actions and tests. */

export function getFormText(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

export function parseFormJson<T>(value: string, label: string): T {
  if (!value) {
    throw new Error(`${label} thiếu dữ liệu. Hãy tải lại trang và thử lại.`);
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(`${label} phải là JSON hợp lệ.`);
  }
}

export function isNavigationRedirect(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const digest = "digest" in error ? String((error as { digest?: string }).digest) : "";
  return digest.startsWith("NEXT_REDIRECT") || digest.startsWith("NEXT_NOT_FOUND");
}

export function toUserFacingDbError(message: string): string {
  if (message.includes("Could not find the table") || message.includes("PGRST205")) {
    return "Bảng dữ liệu chưa được tạo trên Supabase. Vui lòng chạy migration SQL mới nhất rồi thử lại.";
  }
  if (message.includes("Invalid API key") || message.includes("JWT")) {
    return "Khóa Supabase không hợp lệ trên server. Kiểm tra SUPABASE_SERVICE_ROLE_KEY trong biến môi trường.";
  }
  return message;
}

export function getActionErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return toUserFacingDbError(error.message);
  }
  return fallback;
}
