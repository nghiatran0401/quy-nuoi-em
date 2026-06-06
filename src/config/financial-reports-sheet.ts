/** Monthly financial reports catalog — public Google Sheet (source for /bao-cao sync). */
export const financialReportsSheetConfig = {
  sheetId: process.env.FINANCIAL_REPORTS_SHEET_ID ?? "",
  gid: process.env.FINANCIAL_REPORTS_SHEET_GID ?? "0",
  /** Default cover when a report is first inserted (admin can replace via /admin/bao-cao). */
  defaultImageUrl: "/logo.webp",
} as const;

export function financialReportsCsvExportUrl(): string {
  const { sheetId, gid } = financialReportsSheetConfig;
  if (!sheetId) {
    throw new Error("FINANCIAL_REPORTS_SHEET_ID is not configured.");
  }
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

export function financialReportsSheetUrl(): string {
  const { sheetId, gid } = financialReportsSheetConfig;
  if (!sheetId) {
    throw new Error("FINANCIAL_REPORTS_SHEET_ID is not configured.");
  }
  return `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=${gid}`;
}
