const MESSAGE_LABELS: Record<string, string> = {
  created: "Đã tạo bài viết thành công.",
  saved: "Đã lưu thay đổi.",
  archived: "Đã lưu trữ bài viết.",
  deleted: "Đã xóa vĩnh viễn bài viết.",
  homepage_saved: "Đã lưu nội dung trang chủ.",
  about_saved: "Đã lưu nội dung trang giới thiệu.",
  process_2026_saved: "Đã lưu nội dung quy trình cấp mã 2026.",
};

export function decodeAdminParam(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function formatAdminMessage(code: string | undefined): string | undefined {
  if (!code) return undefined;
  return MESSAGE_LABELS[code] ?? decodeAdminParam(code);
}
