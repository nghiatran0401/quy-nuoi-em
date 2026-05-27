/** Loại hiển thị câu trả lời FAQ trên trang chủ. */
export const FAQ_ITEM_TYPES = {
  "dia-chi": { label: "Địa chỉ", legacyType: "address", legacyId: "address" },
  "ngan-hang": { label: "Tài khoản ngân hàng", legacyType: "bank", legacyId: "bank" },
  "quy-trinh": { label: "Quy trình (các bước)", legacyType: "process", legacyId: "process" },
} as const;

export type HomeFaqItemType = keyof typeof FAQ_ITEM_TYPES;

export const FAQ_ITEM_TYPE_OPTIONS = Object.entries(FAQ_ITEM_TYPES).map(([value, meta]) => ({
  value: value as HomeFaqItemType,
  label: meta.label,
}));

export function normalizeFaqItemType(type: string): HomeFaqItemType {
  if (type in FAQ_ITEM_TYPES) {
    return type as HomeFaqItemType;
  }
  const match = Object.entries(FAQ_ITEM_TYPES).find(([, meta]) => meta.legacyType === type);
  return (match?.[0] as HomeFaqItemType) ?? "dia-chi";
}

export function normalizeFaqItemId(id: string, type: HomeFaqItemType): string {
  const legacy = FAQ_ITEM_TYPES[type].legacyId;
  if (id === legacy || id in FAQ_ITEM_TYPES) {
    return type;
  }
  return id.trim() || type;
}

export function faqTypeLabel(type: HomeFaqItemType): string {
  return FAQ_ITEM_TYPES[type].label;
}
