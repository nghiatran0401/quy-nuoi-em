import { donateInfo as staticDonateInfo } from "@/content/pages/static-pages";

export type DonateInfoContent = {
  bank: string;
  branch: string;
  accountName: string;
  accountNumber: string;
  /** Dòng mô tả phía trên số tài khoản lớn (khối FAQ). */
  accountHighlight: string;
  /** Dòng số tài khoản đầy đủ trên trang Đóng góp. */
  publicAccountLine: string;
  transferFormat: string;
  transferExample: string;
};

export const defaultDonateInfo: DonateInfoContent = {
  bank: staticDonateInfo.bank,
  branch: staticDonateInfo.branch,
  accountName: staticDonateInfo.accountName,
  accountNumber: staticDonateInfo.accountNumber,
  accountHighlight: "Số tài khoản minh bạch công khai 4 số QUY NUOI EM tại Ngân hàng Quân đội (MB)",
  publicAccountLine: staticDonateInfo.publicAccountLine,
  transferFormat: staticDonateInfo.transferFormat,
  transferExample: staticDonateInfo.transferExample,
};

const LEGACY_TRANSFER_FORMAT = "“Mã bé nhận nuôi” + Tên anh chị (bắt buộc có mã NE)";
const LEGACY_TRANSFER_FORMAT_SDT =
  "Mã NE + số điện thoại + Tên anh chị (bắt buộc có mã NE mới chuyển khoản)";
const LEGACY_TRANSFER_EXAMPLE = "NE00123 Nguyen Van A";

function expandDonateAbbreviations(text: string): string {
  return text
    .replace(/\bSTK\b/g, "Số tài khoản")
    .replace(/\bSĐT\b/g, "số điện thoại")
    .replace(/\btại MB Bank\b/g, "tại Ngân hàng Quân đội (MB)")
    .replace(/\btại MB:/g, "tại Ngân hàng Quân đội (MB):")
    .replace(/\bTên bạn\b/g, "tên anh chị")
    .replace(/\btên bạn\b/g, "tên anh chị");
}

function isInvalidDonateInfo(value: DonateInfoContent | null | undefined): boolean {
  if (!value?.bank?.trim() || !value.accountNumber?.trim()) return true;
  if (value.accountNumber === "1" && value.bank === "TEST") return true;
  return false;
}

export function resolveDonateInfo(raw: DonateInfoContent | null | undefined): DonateInfoContent {
  if (!raw || isInvalidDonateInfo(raw)) {
    return defaultDonateInfo;
  }

  const trimmedTransferFormat = raw.transferFormat?.trim();
  const normalizedTransferFormat =
    trimmedTransferFormat === LEGACY_TRANSFER_FORMAT ||
    trimmedTransferFormat === LEGACY_TRANSFER_FORMAT_SDT
      ? defaultDonateInfo.transferFormat
      : trimmedTransferFormat
        ? expandDonateAbbreviations(trimmedTransferFormat)
        : defaultDonateInfo.transferFormat;

  const normalizedTransferExample =
    raw.transferExample?.trim() === LEGACY_TRANSFER_EXAMPLE
      ? defaultDonateInfo.transferExample
      : raw.transferExample?.trim() || defaultDonateInfo.transferExample;

  const accountHighlight = raw.accountHighlight?.trim()
    ? expandDonateAbbreviations(raw.accountHighlight.trim())
    : defaultDonateInfo.accountHighlight;

  const publicAccountLine = raw.publicAccountLine?.trim()
    ? expandDonateAbbreviations(raw.publicAccountLine.trim())
    : defaultDonateInfo.publicAccountLine;

  return {
    ...defaultDonateInfo,
    ...raw,
    bank: raw.bank.trim(),
    branch: raw.branch.trim(),
    accountName: raw.accountName.trim(),
    accountNumber: raw.accountNumber.trim(),
    accountHighlight,
    publicAccountLine,
    transferFormat: normalizedTransferFormat,
    transferExample: normalizedTransferExample,
  };
}

export async function getDonateInfo(): Promise<DonateInfoContent> {
  return defaultDonateInfo;
}
