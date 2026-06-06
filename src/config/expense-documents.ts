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

export const expenseDocumentsDriveFolderId =
  process.env.EXPENSE_DOCS_DRIVE_FOLDER_ID ?? "1YJD2fy_dL12yUU4Q6GX8IdeNRgcSWONH";

export function expenseDocumentsDriveFolderUrl(): string {
  return `https://drive.google.com/drive/folders/${expenseDocumentsDriveFolderId}`;
}

function buildExpenseDocumentList(
  year: number,
  month: number,
  sheetId: string,
  gid = "0",
): ExpenseDocumentSheetSource {
  const monthLabel = String(month).padStart(2, "0");
  return {
    id: `${year}-${monthLabel}`,
    year,
    month,
    label: `Tháng ${monthLabel}/${year}`,
    title: `Danh sách điểm trường giải ngân tiền ăn tập trung trong tháng ${monthLabel}/${year}`,
    sheetId,
    gid,
  };
}

export const expenseDocumentsConfig = {
  revalidateSeconds: 3600,
  pageSize: 50,
  driveFolderId: expenseDocumentsDriveFolderId,
  lists: [
    buildExpenseDocumentList(
      2026,
      5,
      process.env.EXPENSE_DOCS_SHEET_MAY_2026_ID ?? "13cljtyGE0FRoTY92intN8cw5zFhLY07FzyOHPnNux0I",
      process.env.EXPENSE_DOCS_SHEET_MAY_2026_GID ?? "0",
    ),
    buildExpenseDocumentList(
      2026,
      4,
      process.env.EXPENSE_DOCS_SHEET_APR_2026_ID ?? "1_QLIHpM2mRYcCKA_D7-nKTP-P5lUuEfWRgl3pnPOB4Q",
      process.env.EXPENSE_DOCS_SHEET_APR_2026_GID ?? "0",
    ),
    buildExpenseDocumentList(
      2026,
      3,
      process.env.EXPENSE_DOCS_SHEET_MAR_2026_ID ?? "1ZVi-R3vbeMs4DHt-AIpc-ouylS1ffeIX2iPMsWUS2a8",
      process.env.EXPENSE_DOCS_SHEET_MAR_2026_GID ?? "0",
    ),
    buildExpenseDocumentList(
      2026,
      2,
      process.env.EXPENSE_DOCS_SHEET_FEB_2026_ID ?? "1QbLJi1MtUV2km08W1C827DvRAOmhU0u7TR-d1buQsh0",
      process.env.EXPENSE_DOCS_SHEET_FEB_2026_GID ?? "0",
    ),
    buildExpenseDocumentList(
      2026,
      1,
      process.env.EXPENSE_DOCS_SHEET_JAN_2026_ID ?? "1KMXRK7iB8lgzuink7m_8JBdeF_W_xoXSUDo4A5SpJ2Y",
      process.env.EXPENSE_DOCS_SHEET_JAN_2026_GID ?? "0",
    ),
  ] satisfies ExpenseDocumentSheetSource[],
} as const;

export function expenseDocumentsCsvExportUrl(source: Pick<ExpenseDocumentSheetSource, "sheetId" | "gid">): string {
  return `https://docs.google.com/spreadsheets/d/${source.sheetId}/export?format=csv&gid=${source.gid}`;
}

export function expenseDocumentsSheetUrl(source: Pick<ExpenseDocumentSheetSource, "sheetId" | "gid">): string {
  return `https://docs.google.com/spreadsheets/d/${source.sheetId}/edit?gid=${source.gid}`;
}
