import { financialReportsDriveConfig } from "@/config/financial-reports-drive";

export type FinancialReportDriveFile = {
  month: number;
  year: number;
  fileId: string;
};

const REPORT_FILE_PATTERN =
  /data-id="([^"]+)" jsname="vtaz5c" data-tooltip="Báo cáo tình hình tài chính Dự án Nuôi em_T(\d{2})\/(\d{4})\.docx/g;

export function parseFinancialReportDriveFiles(html: string): FinancialReportDriveFile[] {
  const files: FinancialReportDriveFile[] = [];

  for (const match of html.matchAll(REPORT_FILE_PATTERN)) {
    const [, fileId, monthText, yearText] = match;
    if (!fileId || !monthText || !yearText) continue;

    files.push({
      month: Number(monthText),
      year: Number(yearText),
      fileId,
    });
  }

  return files.sort((a, b) => b.year - a.year || b.month - a.month);
}

export async function discoverFinancialReportDriveFiles(
  folderId = financialReportsDriveConfig.folderId,
): Promise<FinancialReportDriveFile[]> {
  const response = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Drive folder fetch failed (${folderId}): ${response.status}`);
  }

  const files = parseFinancialReportDriveFiles(await response.text());
  if (files.length === 0) {
    throw new Error(`No monthly financial report documents found in Drive folder (${folderId}).`);
  }

  return files;
}
