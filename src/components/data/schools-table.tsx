import Link from "next/link";
import { Search } from "lucide-react";
import type {
  SchoolsDirectoryQuery,
  SchoolsDirectoryResponse,
  SchoolsDirectorySchool,
} from "@/lib/data/schools-directory";
import { schoolsDirectoryQueryString } from "@/lib/data/schools-directory";

type SchoolsTableProps = {
  basePath: string;
  data: SchoolsDirectoryResponse;
  activeFilters: SchoolsDirectoryQuery;
};

const selectClassName =
  "min-h-11 w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-base text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm lg:w-auto";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function statusBadgeClass(status: string): string {
  if (status === "Đang ăn") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
  }
  return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
}

function SchoolRowCells({
  row,
  stt,
}: {
  row: SchoolsDirectorySchool;
  stt: number;
}) {
  return (
    <>
      <td className="px-2.5 py-2.5 font-medium text-brand-muted">{stt}</td>
      <td className="px-2.5 py-2.5 font-semibold leading-snug text-brand-ink">{row.school}</td>
      <td className="px-2.5 py-2.5 text-brand-muted">
        <p className="leading-snug">{row.locationLabel}</p>
        {row.campusesDisplay ? (
          <p className="text-xs leading-snug">{row.campusesDisplay}</p>
        ) : null}
      </td>
      <td className="px-2.5 py-2.5 font-semibold tabular-nums text-brand-ink">
        {row.display.studentCount}
      </td>
      <td className="px-2.5 py-2.5 tabular-nums text-brand-muted">{row.display.codesIssued ?? "—"}</td>
      <td className="px-2.5 py-2.5">
        {row.stopLetterUrl ? (
          <a
            href={row.stopLetterUrl}
            target="_blank"
            rel="noreferrer"
            className="link-accent text-xs"
          >
            Xem công văn
          </a>
        ) : (
          <span className="text-brand-muted">—</span>
        )}
      </td>
      <td className="px-2.5 py-2.5">
        <span
          className={`inline-flex max-w-full rounded-full px-2 py-0.5 text-[11px] font-semibold leading-tight ${statusBadgeClass(row.eatingStatus)}`}
        >
          {row.eatingStatus}
        </span>
      </td>
    </>
  );
}

function SchoolCard({ row, stt }: { row: SchoolsDirectorySchool; stt: number }) {
  return (
    <li className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-semibold text-brand-ink">
          <span className="mr-2 font-mono text-xs text-brand-muted">{stt}.</span>
          {row.school}
        </p>
        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(row.eatingStatus)}`}
        >
          {row.eatingStatus}
        </span>
      </div>
      <p className="mt-1 text-sm text-brand-muted">{row.locationLabel}</p>
      {row.campusesDisplay ? (
        <p className="text-xs text-brand-muted/90">{row.campusesDisplay}</p>
      ) : null}
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-brand-border/50 pt-3 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Số học sinh
          </dt>
          <dd className="font-semibold text-brand-ink">{row.display.studentCount}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Mã đã cấp
          </dt>
          <dd className="text-brand-muted">{row.display.codesIssued ?? "—"}</dd>
        </div>
        {row.stopLetterUrl ? (
          <div className="col-span-2">
            <a
              href={row.stopLetterUrl}
              target="_blank"
              rel="noreferrer"
              className="link-accent text-sm"
            >
              Xem công văn dừng ăn
            </a>
          </div>
        ) : null}
      </dl>
    </li>
  );
}

export function SchoolsTable({ basePath, data, activeFilters }: SchoolsTableProps) {
  const { schools, pagination, filters } = data;
  const filterDefaults = {
    q: activeFilters.query ?? "",
    province: activeFilters.province ?? "",
    eatingStatus: activeFilters.eatingStatus ?? "",
  };

  const pageHref = (page: number) =>
    `${basePath}${schoolsDirectoryQueryString({ ...activeFilters, page })}`;

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-ink sm:text-xl">
          {formatNumber(pagination.total)} điểm trường phù hợp
        </h2>
        <p className="text-sm text-brand-muted">
          Hiển thị {pagination.rangeStart}–{pagination.rangeEnd} trên tổng{" "}
          {formatNumber(pagination.total)} điểm trường
        </p>
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
            placeholder="Tìm điểm trường..."
            className="min-h-11 w-full rounded-lg border border-brand-border py-3 pl-10 pr-4 text-base focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm"
          />
        </div>
        <select
          name="province"
          defaultValue={filterDefaults.province}
          className={selectClassName}
          aria-label="Lọc theo tỉnh"
        >
          <option value="">Tất cả tỉnh</option>
          {filters.provinces.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          name="eatingStatus"
          defaultValue={filterDefaults.eatingStatus}
          className={selectClassName}
          aria-label="Lọc theo tình trạng ăn"
        >
          <option value="">Tất cả tình trạng</option>
          {filters.eatingStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="min-h-11 shrink-0 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent/90"
        >
          Lọc
        </button>
      </form>

      <ul className="space-y-3 lg:hidden" aria-label="Danh sách điểm trường">
        {schools.map((row, index) => (
          <SchoolCard
            key={row.schoolIdentity}
            row={row}
            stt={pagination.rangeStart + index}
          />
        ))}
      </ul>
      {schools.length === 0 ? (
        <p className="rounded-xl border border-brand-border/60 bg-white p-8 text-center text-brand-muted lg:hidden">
          Không tìm thấy điểm trường phù hợp.
        </p>
      ) : null}

      <div className="table-scroll hidden rounded-xl border border-brand-border/60 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[56rem] table-auto divide-y divide-brand-border text-left text-sm">
          <thead className="bg-brand-sky-soft text-[10px] font-bold uppercase leading-tight tracking-wide text-brand-ink">
            <tr>
              <th className="whitespace-nowrap px-2.5 py-2.5">STT</th>
              <th className="px-2.5 py-2.5">Tên trường</th>
              <th className="px-2.5 py-2.5">Địa chỉ / Tỉnh</th>
              <th className="whitespace-nowrap px-2.5 py-2.5">Số học sinh</th>
              <th className="whitespace-nowrap px-2.5 py-2.5">Mã đã được cấp</th>
              <th className="whitespace-nowrap px-2.5 py-2.5">Công văn dừng ăn</th>
              <th className="whitespace-nowrap px-2.5 py-2.5">Tình trạng ăn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {schools.map((row, index) => (
              <tr key={row.schoolIdentity} className="hover:bg-brand-surface">
                <SchoolRowCells row={row} stt={pagination.rangeStart + index} />
              </tr>
            ))}
          </tbody>
        </table>
        {schools.length === 0 ? (
          <p className="p-8 text-center text-brand-muted">Không tìm thấy điểm trường phù hợp.</p>
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
