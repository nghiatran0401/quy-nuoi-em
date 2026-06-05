import Link from "next/link";
import { Search } from "lucide-react";
import { MaGhepSyncedAt } from "@/components/data/ma-ghep-synced-at";
import type {
  MaGhepDirectoryQuery,
  MaGhepRecord,
  MaGhepResponse,
} from "@/lib/data/ma-ghep-directory";
import { maGhepDirectoryQueryString } from "@/lib/data/ma-ghep-directory";

type MaGhepTableProps = {
  basePath: string;
  data: MaGhepResponse;
  activeFilters: MaGhepDirectoryQuery;
};

function rowClassName(index: number): string {
  return index % 2 === 0 ? "bg-white" : "bg-brand-green-light/40";
}

function MaGhepRowCells({ row }: { row: MaGhepRecord }) {
  return (
    <>
      <td className="px-3 py-3 font-mono text-sm font-semibold text-brand-ink">
        {row.representativeCode}
      </td>
      <td className="px-3 py-3 text-center tabular-nums text-brand-muted">
        {row.display.eatingMonths}
      </td>
      <td className="px-3 py-3 text-brand-muted">{row.display.supportStart}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.supportEnd}</td>
      <td className="px-3 py-3 text-right tabular-nums text-brand-muted">
        {row.display.sponsorAmount}
      </td>
      <td className="px-3 py-3 text-right tabular-nums text-brand-muted">
        {row.display.actualMealAmount}
      </td>
      <td className="px-3 py-3 font-mono text-sm font-bold text-brand-accent">
        {row.display.mergedCode}
      </td>
      <td className="px-3 py-3 text-center tabular-nums text-brand-muted">
        {row.display.mergedEatingMonths}
      </td>
      <td className="px-3 py-3 text-right tabular-nums text-brand-muted">
        {row.display.mergedAmount}
      </td>
    </>
  );
}

function MaGhepCard({ row }: { row: MaGhepRecord }) {
  return (
    <li className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-green">Mã NE dư tiền</p>
          <p className="mt-1 font-mono text-sm font-semibold text-brand-ink">
            {row.representativeCode}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800/80">Mã ghép mới</p>
          <p className="mt-1 font-mono text-sm font-bold text-brand-accent">
            {row.display.mergedCode}
          </p>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-brand-border/50 pt-3 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Số tháng ăn
          </dt>
          <dd className="text-brand-muted">{row.display.eatingMonths}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Số tháng ăn ghép
          </dt>
          <dd className="text-brand-muted">{row.display.mergedEatingMonths}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            T.gian b.đầu
          </dt>
          <dd className="text-brand-muted">{row.display.supportStart}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            T.gian k.thúc
          </dt>
          <dd className="text-brand-muted">{row.display.supportEnd}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Số tiền đã đóng
          </dt>
          <dd className="text-brand-muted">{row.display.sponsorAmount}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Số tiền ăn thực tế
          </dt>
          <dd className="text-brand-muted">{row.display.actualMealAmount}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Số tiền ghép mới
          </dt>
          <dd className="text-brand-muted">{row.display.mergedAmount}</dd>
        </div>
      </dl>
    </li>
  );
}

export function MaGhepTable({ basePath, data, activeFilters }: MaGhepTableProps) {
  const { records, pagination, summary, meta } = data;
  const searchQuery = activeFilters.query ?? "";

  const pageHref = (page: number) =>
    `${basePath}${maGhepDirectoryQueryString({ ...activeFilters, page })}`;

  return (
    <section className="brand-card overflow-hidden">
      <div className="border-b border-brand-border/60 p-4 sm:p-6">
        <form
          action={basePath}
          method="get"
          className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="min-w-0 flex-grow space-y-2">
            <label
              htmlFor="ma-ghep-search"
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-muted"
            >
              Tìm mã NE
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-brand-muted/70" aria-hidden />
              </div>
              <input
                id="ma-ghep-search"
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Mã NE dư tiền hoặc mã ghép mới..."
                className="min-h-11 w-full rounded-lg border border-brand-border py-3 pl-10 pr-4 text-base focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <p className="text-left text-xs text-brand-muted sm:text-right">
              Cập nhật <MaGhepSyncedAt iso={meta.lastSyncedAt} />
              <br />
              {summary.display.filteredTotal} dòng
            </p>
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent/90"
            >
              Tìm
            </button>
          </div>
        </form>
      </div>

      <ul className="space-y-3 p-4 sm:p-6 lg:hidden" aria-label="Bảng mã ghép">
        {records.map((row) => (
          <MaGhepCard key={row.representativeCode} row={row} />
        ))}
      </ul>
      {records.length === 0 ? (
        <p className="p-8 text-center text-brand-muted lg:hidden">
          Không tìm thấy mã ghép phù hợp.
        </p>
      ) : null}

      <div className="table-scroll hidden lg:block">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="text-xs font-bold uppercase tracking-wide">
              <th
                colSpan={6}
                className="border-b border-brand-green/20 bg-brand-green-light px-3 py-2.5 text-center text-brand-green"
              >
                Mã NE dư tiền
              </th>
              <th
                colSpan={3}
                className="border-b border-amber-200 bg-amber-50 px-3 py-2.5 text-center text-amber-900"
              >
                Mã ghép mới
              </th>
            </tr>
            <tr className="border-b border-brand-border bg-brand-sky-soft text-[11px] font-bold uppercase tracking-wide text-brand-ink">
              <th className="px-3 py-3">Mã NE dư tiền</th>
              <th className="px-3 py-3 text-center">Số tháng ăn</th>
              <th className="px-3 py-3">T.gian b.đầu</th>
              <th className="px-3 py-3">T.gian k.thúc</th>
              <th className="px-3 py-3 text-right">Số tiền đã đóng</th>
              <th className="px-3 py-3 text-right">Số tiền ăn thực tế</th>
              <th className="px-3 py-3">Mã ghép mới</th>
              <th className="px-3 py-3 text-center">Số tháng ăn</th>
              <th className="px-3 py-3 text-right">Số tiền ghép mới</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/70">
            {records.map((row, index) => (
              <tr key={row.representativeCode} className={rowClassName(index)}>
                <MaGhepRowCells row={row} />
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 ? (
          <p className="p-8 text-center text-brand-muted">Không tìm thấy mã ghép phù hợp.</p>
        ) : null}
      </div>

      {pagination.total > 0 ? (
        <div className="flex flex-col gap-3 border-t border-brand-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-sm text-brand-muted sm:text-left">
            Hiển thị {pagination.rangeStart}–{pagination.rangeEnd} trên {pagination.total} · Trang{" "}
            {pagination.page} / {pagination.totalPages}
          </p>
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            {pagination.page > 1 ? (
              <Link
                href={pageHref(pagination.page - 1)}
                className="min-h-11 flex-1 rounded-md border border-brand-border px-4 py-2 text-center text-sm font-medium text-brand-ink sm:flex-none sm:px-3 sm:py-1.5"
              >
                Trước
              </Link>
            ) : (
              <span className="min-h-11 flex-1 cursor-not-allowed rounded-md border border-brand-border px-4 py-2 text-center text-sm font-medium text-brand-ink opacity-50 sm:flex-none sm:px-3 sm:py-1.5">
                Trước
              </span>
            )}
            {pagination.page < pagination.totalPages ? (
              <Link
                href={pageHref(pagination.page + 1)}
                className="min-h-11 flex-1 rounded-md border border-brand-border px-4 py-2 text-center text-sm font-medium text-brand-ink sm:flex-none sm:px-3 sm:py-1.5"
              >
                Sau
              </Link>
            ) : (
              <span className="min-h-11 flex-1 cursor-not-allowed rounded-md border border-brand-border px-4 py-2 text-center text-sm font-medium text-brand-ink opacity-50 sm:flex-none sm:px-3 sm:py-1.5">
                Sau
              </span>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
