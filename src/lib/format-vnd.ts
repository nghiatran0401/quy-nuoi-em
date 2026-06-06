/** Vietnamese dong unit used across the site (not VNĐ / ₫). */
export const VND_UNIT = "đ";

/** Dotted grouping, e.g. 13.354.056.693 */
export function formatVndDots(amount: number): string {
  return amount.toLocaleString("vi-VN").replace(/\s/g, ".");
}

/** Standard amount display, e.g. 1.900.000 đ */
export function formatVnd(amount: number | null): string {
  if (amount === null) return "—";
  return `${new Intl.NumberFormat("vi-VN").format(amount)} ${VND_UNIT}`;
}

/** Attached unit for compact detail lines, e.g. 71.159.937.110đ */
export function formatVndAttached(amount: number): string {
  return `${formatVndDots(amount)}${VND_UNIT}`;
}

/** Compact billions, e.g. 71,2 tỷ đ */
export function formatVndCompactBillions(amount: number): string {
  const billions = amount / 1_000_000_000;
  const formatted = billions.toLocaleString("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${formatted} tỷ ${VND_UNIT}`;
}

/** Normalize stored/display labels (₫, VNĐ, VND) to đ. */
export function normalizeVndUnit(label: string): string {
  const trimmed = label.trim();
  if (!trimmed) return trimmed;

  return trimmed
    .replace(/\s*₫\s*$/u, ` ${VND_UNIT}`)
    .replace(/\s*VNĐ\s*$/iu, ` ${VND_UNIT}`)
    .replace(/\s*VND\s*$/iu, ` ${VND_UNIT}`);
}

/** Format a numeric string from documents/spreadsheets with đ suffix. */
export function formatVndLabelFromText(amount: string): string {
  return `${amount.trim()} ${VND_UNIT}`;
}
