const MESSAGE_LABELS: Record<string, string> = {
  created: "Article created successfully.",
  saved: "Changes saved.",
  archived: "Article archived.",
  deleted: "Article deleted permanently.",
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
