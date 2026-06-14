/** VPBank chi dự án — tab "VP" in the public sao kê Google Sheet. */
export const vpStatementsConfig = {
  sheetId: process.env.VP_STATEMENTS_SHEET_ID ?? "1boFEZqKH6k3FInRddydMpFXs2MaSlSa794OEFyoWgHg",
  gid: process.env.VP_STATEMENTS_SHEET_GID ?? "33785031",
  bankName: "VPBank (VP)",
  /** VP sheet lists project expenditures; no public account number in source data. */
  accountNumber: null as string | null,
  revalidateSeconds: 3600,
} as const;

export function vpStatementsCsvExportUrl(): string {
  const { sheetId, gid } = vpStatementsConfig;
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}
