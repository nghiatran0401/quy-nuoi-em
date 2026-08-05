/** Google Doc source for Điều khoản tham gia (public link-share export). */
export const dieuKhoanThamGiaDocConfig = {
  documentId:
    process.env.DIEU_KHOAN_THAM_GIA_DOC_ID ?? "11bNkU9NKZFzDTte2eExnJVcEB3r178Uk9eZ8xgvslMg",
} as const;

export function dieuKhoanThamGiaDocumentUrl(documentId = dieuKhoanThamGiaDocConfig.documentId): string {
  return `https://docs.google.com/document/d/${documentId}/edit?usp=sharing`;
}

export function dieuKhoanThamGiaDocumentExportUrl(
  documentId = dieuKhoanThamGiaDocConfig.documentId,
): string {
  return `https://docs.google.com/document/d/${documentId}/export?format=txt`;
}
