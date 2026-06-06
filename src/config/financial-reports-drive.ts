/** Published monthly reports in Google Drive (Báo cáo công bố). */
export const financialReportsDriveConfig = {
  folderId: process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_ID ?? "1tlzUAOJrMtL5pZtvTSwPAMNFqz7OlPoK",
  folderUrl:
    process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_URL ??
    "https://drive.google.com/drive/folders/1tlzUAOJrMtL5pZtvTSwPAMNFqz7OlPoK",
  defaultImageUrl: "/logo.webp",
  reports: [
    { month: 1, year: 2026, fileId: "15aDgrQ7HXDtFZ_roswCjRjxqlQlLDu0q" },
    { month: 2, year: 2026, fileId: "1T_zlURriSbb72w-grKtpa5wsKxnb-8S-" },
    { month: 3, year: 2026, fileId: "1hD_s7_XsIsxtKP624onubj_woC2RcL_7" },
    { month: 4, year: 2026, fileId: "1qMuH3UUmjgqhw286dU6GNEvI7Lf2uJ-2" },
    { month: 5, year: 2026, fileId: "1l0D-8UW4i62MEOsA4iK7O-SZHO9sxj6k" },
  ],
} as const;

export function financialReportDocumentUrl(fileId: string): string {
  return `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`;
}

export function financialReportDocumentExportUrl(fileId: string): string {
  return `https://docs.google.com/document/d/${fileId}/export?format=txt`;
}
