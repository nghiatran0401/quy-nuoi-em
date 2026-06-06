/** Published monthly reports in Google Drive (Báo cáo công bố). */
export const financialReportsDriveConfig = {
  folderId: process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_ID ?? "1tlzUAOJrMtL5pZtvTSwPAMNFqz7OlPoK",
  folderUrl:
    process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_URL ??
    "https://drive.google.com/drive/folders/1tlzUAOJrMtL5pZtvTSwPAMNFqz7OlPoK",
  defaultImageUrl: "/logo.webp",
} as const;

export function financialReportDocumentUrl(fileId: string): string {
  return `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`;
}

export function financialReportDocumentExportUrl(fileId: string): string {
  return `https://docs.google.com/document/d/${fileId}/export?format=txt`;
}
