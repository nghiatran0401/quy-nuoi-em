/** Monthly school disbursement lists — public Google Sheets (chứng từ chi). */
export type ExpenseDocumentSheetSource = {
  id: string;
  year: number;
  month: number;
  label: string;
  title: string;
  sheetId: string;
  gid: string;
};

export const expenseDocumentsConfig = {
  revalidateSeconds: 3600,
  pageSize: 50,
  lists: [
    {
      id: "2026-05",
      year: 2026,
      month: 5,
      label: "Tháng 05/2026",
      title: "Danh sách điểm trường chi ra tháng 05.2026",
      sheetId:
        process.env.EXPENSE_DOCS_SHEET_MAY_2026_ID ?? "13cljtyGE0FRoTY92intN8cw5zFhLY07FzyOHPnNux0I",
      gid: process.env.EXPENSE_DOCS_SHEET_MAY_2026_GID ?? "0",
    },
    {
      id: "2026-04",
      year: 2026,
      month: 4,
      label: "Tháng 04/2026",
      title: "Danh sách điểm trường chi ra tháng 04.2026",
      sheetId:
        process.env.EXPENSE_DOCS_SHEET_APR_2026_ID ?? "1_QLIHpM2mRYcCKA_D7-nKTP-P5lUuEfWRgl3pnPOB4Q",
      gid: process.env.EXPENSE_DOCS_SHEET_APR_2026_GID ?? "0",
    },
  ] satisfies ExpenseDocumentSheetSource[],
} as const;

export function expenseDocumentsCsvExportUrl(source: Pick<ExpenseDocumentSheetSource, "sheetId" | "gid">): string {
  return `https://docs.google.com/spreadsheets/d/${source.sheetId}/export?format=csv&gid=${source.gid}`;
}

export function expenseDocumentsSheetUrl(source: Pick<ExpenseDocumentSheetSource, "sheetId" | "gid">): string {
  return `https://docs.google.com/spreadsheets/d/${source.sheetId}/edit?gid=${source.gid}`;
}
