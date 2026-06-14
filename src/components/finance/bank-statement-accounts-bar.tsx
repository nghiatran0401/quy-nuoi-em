import {
  bankStatementAccounts,
  bankStatementSourceMeta,
  formatBankAccountLabel,
  resolveStatementSource,
} from "@/lib/data/bank-statement-sources";
import type { VcbStatementRow } from "@/lib/data/vcb-statements";

type BankStatementAccountsBarProps = {
  title: string;
  note?: string;
};

export function BankStatementAccountsBar({ title, note }: BankStatementAccountsBarProps) {
  return (
    <div className="rounded-xl border border-brand-border/60 bg-brand-surface/60 p-4">
      <p className="text-sm font-semibold text-brand-ink">{title}</p>
      {note ? <p className="mt-1 text-xs leading-relaxed text-brand-muted">{note}</p> : null}
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {bankStatementAccounts.map((account) => (
          <li
            key={account.shortLabel}
            className="rounded-lg border border-brand-border/50 bg-white px-3 py-2.5 text-sm"
          >
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${account.badgeClassName}`}
            >
              {account.shortLabel}
            </span>
            <p className="mt-2 font-medium text-brand-ink">{formatBankAccountLabel(account)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BankStatementSourceBadge({ row }: { row: VcbStatementRow }) {
  const source = resolveStatementSource(row);
  const meta = bankStatementSourceMeta[source];

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${meta.badgeClassName}`}
      title={formatBankAccountLabel(meta)}
    >
      {meta.shortLabel}
    </span>
  );
}
