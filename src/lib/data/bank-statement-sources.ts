import { mbStatementsConfig } from "@/config/mb-statements";
import { vcbStatementsConfig } from "@/config/vcb-statements";
import { vpStatementsConfig } from "@/config/vp-statements";
import type { VcbStatementRow } from "@/lib/data/vcb-statements";

export type BankStatementSource = NonNullable<VcbStatementRow["source"]>;

type BankSourceMeta = {
  shortLabel: string;
  bankName: string;
  accountNumber: string | null;
  badgeClassName: string;
};

export const bankStatementSourceMeta: Record<BankStatementSource, BankSourceMeta> = {
  vcb: {
    shortLabel: "VCB",
    bankName: vcbStatementsConfig.bankName,
    accountNumber: vcbStatementsConfig.accountNumber,
    badgeClassName: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  },
  vp: {
    shortLabel: "VP",
    bankName: vpStatementsConfig.bankName,
    accountNumber: vpStatementsConfig.accountNumber,
    badgeClassName: "bg-sky-100 text-sky-800 ring-sky-200",
  },
  mb: {
    shortLabel: "MB",
    bankName: mbStatementsConfig.bankName,
    accountNumber: mbStatementsConfig.accountNumber,
    badgeClassName: "bg-amber-100 text-amber-900 ring-amber-200",
  },
};

export const bankStatementAccounts = [
  bankStatementSourceMeta.vcb,
  bankStatementSourceMeta.vp,
  bankStatementSourceMeta.mb,
] as const;

export function resolveStatementSource(row: VcbStatementRow): BankStatementSource {
  return row.source ?? "vcb";
}

export function formatBankAccountLabel(meta: BankSourceMeta): string {
  if (meta.accountNumber) {
    return `${meta.bankName} · ${meta.accountNumber}`;
  }
  return meta.bankName;
}

export function bankStatementSourceSummary(year: number, mergeMbFromYear: number): string {
  const parts = [
    formatBankAccountLabel(bankStatementSourceMeta.vcb),
    formatBankAccountLabel(bankStatementSourceMeta.vp),
  ];

  if (year >= mergeMbFromYear) {
    parts.push(formatBankAccountLabel(bankStatementSourceMeta.mb));
  }

  return parts.join(" · ");
}
