import { donateInfo as staticDonateInfo } from "@/content/pages/static-pages";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type DonateInfoContent = {
  bank: string;
  branch: string;
  accountName: string;
  accountNumber: string;
  /** Dòng mô tả phía trên số tài khoản lớn (khối FAQ). */
  accountHighlight: string;
  /** Dòng STK đầy đủ trên trang Đóng góp. */
  publicAccountLine: string;
  transferFormat: string;
  transferExample: string;
};

export const defaultDonateInfo: DonateInfoContent = {
  bank: staticDonateInfo.bank,
  branch: staticDonateInfo.branch,
  accountName: staticDonateInfo.accountName,
  accountNumber: staticDonateInfo.accountNumber,
  accountHighlight: "STK Minh bạch công khai 4 số QUY NUOI EM tại MB Bank",
  publicAccountLine: staticDonateInfo.publicAccountLine,
  transferFormat: staticDonateInfo.transferFormat,
  transferExample: staticDonateInfo.transferExample,
};

function isInvalidDonateInfo(value: DonateInfoContent | null | undefined): boolean {
  if (!value?.bank?.trim() || !value.accountNumber?.trim()) return true;
  if (value.accountNumber === "1" && value.bank === "TEST") return true;
  return false;
}

export function resolveDonateInfo(raw: DonateInfoContent | null | undefined): DonateInfoContent {
  if (!raw || isInvalidDonateInfo(raw)) {
    return defaultDonateInfo;
  }
  return {
    ...defaultDonateInfo,
    ...raw,
    bank: raw.bank.trim(),
    branch: raw.branch.trim(),
    accountName: raw.accountName.trim(),
    accountNumber: raw.accountNumber.trim(),
    accountHighlight: raw.accountHighlight?.trim() || defaultDonateInfo.accountHighlight,
    publicAccountLine: raw.publicAccountLine?.trim() || defaultDonateInfo.publicAccountLine,
    transferFormat: raw.transferFormat.trim(),
    transferExample: raw.transferExample.trim(),
  };
}

export async function getDonateInfo(): Promise<DonateInfoContent> {
  if (!isSupabaseConfigured()) {
    return defaultDonateInfo;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("homepage_content")
      .select("donate_info")
      .eq("locale", "vi")
      .maybeSingle();

    if (error || !data) {
      return defaultDonateInfo;
    }

    return resolveDonateInfo(data.donate_info as DonateInfoContent | null);
  } catch {
    return defaultDonateInfo;
  }
}
