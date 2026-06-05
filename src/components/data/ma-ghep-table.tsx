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

function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function rowClassName(isReduced: boolean): string {
  return isReduced ? "bg-amber-50/90" : "hover:bg-brand-surface";
}

function ReducedBadge({ label }: { label: string | null }) {
  if (!label) return <span className="text-brand-muted">—</span>;
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-amber-200 text-xs font-bold text-amber-950">
      {label}
    </span>
  );
}

function MaGhepRowCells({ row, stt }: { row: MaGhepRecord; stt: number }) {
  return (
    <>
      <td className="px-3 py-3 font-medium text-brand-muted">{stt}</td>
      <td className="px-3 py-3 font-mono text-sm font-semibold text-brand-ink">
        {row.representativeCode}
      </td>
      <td className="px-3 py-3 text-center">
        <ReducedBadge label={row.display.reducedLabel} />
      </td>
      <td className="px-3 py-3 text-brand-muted">{row.display.eatingMonths}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.supportStart}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.supportEnd}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.sponsorAmount}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.actualMealAmount}</td>
      <td className="px-3 py-3 font-mono text-sm text-brand-ink">{row.display.mergedCode}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.mergedEatingMonths}</td>
      <td className="px-3 py-3 text-brand-muted">{row.display.mergedAmount}</td>
    </>
  );
}

function MaGhepCard({ row, stt }: { row: MaGhepRecord; stt: number }) {
  return (
    <li
      className={`rounded-xl border border-brand-border/60 p-4 shadow-sm ${row.isReduced ? "bg-amber-50/90" : "bg-white"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-mono text-sm font-semibold text-brand-ink">
          <span className="mr-2 font-sans text-xs text-brand-muted">{stt}.</span>
          {row.representativeCode}
        </p>
        {row.display.reducedLabel ? (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-200 text-xs font-bold text-amber-950">
            {row.display.reducedLabel}
          </span>
        ) : null}
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
            Tiền Anh Đạt
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
            Mã ghép mới
          </dt>
          <dd className="font-mono text-sm text-brand-ink">{row.display.mergedCode}</dd>
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
  const { records, pagination, filters, summary, meta } = data;
  const filterDefaults = {
    q: activeFilters.query ?? "",
    filterMode: activeFilters.filterMode ?? "all",
  };

  const pageHref = (page: number) =>
    `${basePath}${maGhepDirectoryQueryString({ ...activeFilters, page })}`;

  const filterHref = (filterMode: MaGhepDirectoryQuery["filterMode"]) =>
    `${basePath}${maGhepDirectoryQueryString({
      ...activeFilters,
      page: 1,
      filterMode,
    })}`;

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-ink sm:text-xl">
          {summary.display.filteredTotal} dòng sau lọc
        </h2>
        <p className="text-sm text-brand-muted">
          Hiển thị {pagination.rangeStart}–{pagination.rangeEnd} trên tổng{" "}
          {formatNumber(pagination.total)} dòng
        </p>
        <p className="mt-2 text-xs text-brand-muted">
          Cập nhật <MaGhepSyncedAt iso={meta.lastSyncedAt} />
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.modes.map((mode) => {
          const isActive = filterDefaults.filterMode === mode.value;
          return (
            <Link
              key={mode.value}
              href={filterHref(mode.value)}
              className={`min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-accent text-white"
                  : "border border-brand-border bg-white text-brand-ink hover:bg-brand-surface"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {mode.label}
            </Link>
          );
        })}
      </div>

      <form
        action={basePath}
        method="get"
        className="flex flex-col gap-3 rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm sm:gap-4 lg:flex-row"
      >
        <div className="relative min-w-0 flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-brand-muted/70" aria-hidden />
          </div>
          <input
            type="search"
            name="q"
            defaultValue={filterDefaults.q}
            placeholder="Tìm mã NE đại diện hoặc mã ghép mới..."
            className="min-h-11 w-full rounded-lg border border-brand-border py-3 pl-10 pr-4 text-base focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm"
          />
        </div>
        {filterDefaults.filterMode !== "all" ? (
          <input type="hidden" name="filterMode" value={filterDefaults.filterMode} />
        ) : null}
        <button
          type="submit"
          className="min-h-11 shrink-0 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent/90"
        >
          Tìm
        </button>
      </form>

      <ul className="space-y-3 lg:hidden" aria-label="Bảng mã ghép">
        {records.map((row, index) => (
          <MaGhepCard key={row.representativeCode} row={row} stt={pagination.rangeStart + index} />
        ))}
      </ul>
      {records.length === 0 ? (
        <p className="rounded-xl border border-brand-border/60 bg-white p-8 text-center text-brand-muted lg:hidden">
          Không tìm thấy mã ghép phù hợp.
        </p>
      ) : null}

      <div className="table-scroll hidden rounded-xl border border-brand-border/60 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[1100px] divide-y divide-brand-border text-left text-sm">
          <thead className="bg-brand-sky-soft text-xs font-bold uppercase tracking-wide text-brand-ink">
            <tr>
              <th className="px-3 py-3">STT</th>
              <th className="px-3 py-3">Mã NE đại diện</th>
              <th className="px-3 py-3 text-center">Giảm ăn</th>
              <th className="px-3 py-3">Số tháng ăn</th>
              <th className="px-3 py-3">T.gian b.đầu</th>
              <th className="px-3 py-3">T.gian k.thúc</th>
              <th className="px-3 py-3">Tiền Anh Đạt</th>
              <th className="px-3 py-3">Số tiền ăn thực tế</th>
              <th className="px-3 py-3">Mã ghép mới</th>
              <th className="px-3 py-3">Số tháng ăn ghép</th>
              <th className="px-3 py-3">Số tiền ghép mới</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {records.map((row, index) => (
              <tr key={row.representativeCode} className={rowClassName(row.isReduced)}>
                <MaGhepRowCells row={row} stt={pagination.rangeStart + index} />
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 ? (
          <p className="p-8 text-center text-brand-muted">Không tìm thấy mã ghép phù hợp.</p>
        ) : null}
      </div>

      {pagination.total > 0 ? (
        <div className="flex flex-col gap-3 rounded-xl border border-brand-border/60 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-brand-muted sm:text-left">
            Trang {pagination.page} / {pagination.totalPages}
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
