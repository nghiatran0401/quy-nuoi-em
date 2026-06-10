import { thienNguyen } from "@/config/thien-nguyen";

/** MB Bank sao kê via App Thiện Nguyện public API. */
export const mbStatementsConfig = {
  bankAccountId: thienNguyen.accountNumber,
  bankName: "Ngân hàng Quân đội (MB)",
  accountNumber: thienNguyen.accountNumber,
  apiBaseUrl: process.env.THIENNGUYEN_API_BASE_URL ?? "https://api.thiennguyen.app",
  /** VCB archive ends; MB Thiện Nguyện data is merged from this year onward. */
  mergeFromYear: 2026,
  pageSize: 500,
} as const;

export function mbStatementsTransactionsUrl(bankAccountId: string): string {
  const { apiBaseUrl } = mbStatementsConfig;
  return `${apiBaseUrl}/api/v2/bank-account-transaction/${bankAccountId}/transactionsV2`;
}
