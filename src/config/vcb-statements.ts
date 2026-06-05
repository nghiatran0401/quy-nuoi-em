/** Vietcombank sao kê — public Google Sheet (source of truth for finance team). */
export const vcbStatementsConfig = {
  sheetId: process.env.VCB_STATEMENTS_SHEET_ID ?? "1boFEZqKH6k3FInRddydMpFXs2MaSlSa794OEFyoWgHg",
  gid: process.env.VCB_STATEMENTS_SHEET_GID ?? "0",
  accountNumber: "0711000280294",
  bankName: "Vietcombank (VCB)",
  /** ISR / fetch cache for CSV export (seconds). */
  revalidateSeconds: 3600,
  pageSize: 50,
} as const;

export function vcbStatementsCsvExportUrl(): string {
  const { sheetId, gid } = vcbStatementsConfig;
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

export function vcbStatementsSheetUrl(): string {
  const { sheetId, gid } = vcbStatementsConfig;
  return `https://docs.google.com/spreadsheets/d/${sheetId}/edit?gid=${gid}`;
}
