import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import type {
  DonorsDirectoryDonor,
  DonorsDirectoryQuery,
  DonorsDirectoryResponse,
} from "@/lib/data/donors-directory";
import { donorsDirectoryQueryString } from "@/lib/data/donors-directory";

type DonorsTableProps = {
  basePath: string;
  data: DonorsDirectoryResponse;
  activeFilters: DonorsDirectoryQuery;
};

const selectClassName =
  "min-h-11 w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-base text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm lg:w-auto";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function codeStatusBadgeClass(status: string): string {
  if (status === "Đã cấp" || status === "Đang nuôi") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
  }
  if (status.includes("chờ") || status.includes("Chờ")) {
    return "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200";
  }
  return "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-200";
}

function DonorRowCells({ row, stt }: { row: DonorsDirectoryDonor; stt: number }) {
  return (
    <>
      <td className="px-4 py-3 font-medium text-brand-muted">{stt}</td>
      <td className="px-4 py-3">
        <a
          href={row.detailUrl}
          target="_blank"
          rel="noreferrer"
          className="link-accent inline-flex items-center gap-1 font-mono text-sm font-semibold"
        >
          {row.code}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </td>
      <td className="px-4 py-3 text-brand-ink">{row.display.representativeName}</td>
      <td className="px-4 py-3 text-brand-muted">{row.display.phone}</td>
      <td className="px-4 py-3 text-brand-muted">{row.display.email}</td>
      <td className="px-4 py-3 text-brand-muted">{row.display.province}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${codeStatusBadgeClass(row.display.codeStatus)}`}
        >
          {row.display.codeStatus}
        </span>
      </td>
    </>
  );
}

function DonorCard({ row, stt }: { row: DonorsDirectoryDonor; stt: number }) {
  return (
    <li className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <a
          href={row.detailUrl}
          target="_blank"
          rel="noreferrer"
          className="link-accent inline-flex items-center gap-1 font-mono text-sm font-semibold"
        >
          {row.code}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${codeStatusBadgeClass(row.display.codeStatus)}`}
        >
          {row.display.codeStatus}
        </span>
      </div>
      <p className="mt-2 font-medium text-brand-ink">{row.display.representativeName}</p>
      <p className="text-sm text-brand-muted">{row.display.province}</p>
      <dl className="mt-3 grid gap-2 border-t border-brand-border/50 pt-3 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Liên hệ SĐT
          </dt>
          <dd className="text-brand-muted">{row.display.phone}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            Liên hệ email
          </dt>
          <dd className="break-all text-brand-muted">{row.display.email}</dd>
        </div>
      </dl>
      <p className="mt-2 font-mono text-xs text-brand-muted/80">{stt}.</p>
    </li>
  );
}

export function DonorsTable({ basePath, data, activeFilters }: DonorsTableProps) {
  const { donors, pagination, filters } = data;
  const filterDefaults = {
    q: activeFilters.query ?? "",
    province: activeFilters.province ?? "",
    codeStatus: activeFilters.codeStatus ?? "",
  };

  const pageHref = (page: number) =>
    `${basePath}${donorsDirectoryQueryString({ ...activeFilters, page })}`;

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-ink sm:text-xl">
          {formatNumber(pagination.total)} dòng phù hợp
        </h2>
        <p className="text-sm text-brand-muted">
          Hiển thị {pagination.rangeStart}–{pagination.rangeEnd} trên tổng{" "}
          {formatNumber(pagination.total)} nhà tài trợ
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
            placeholder="Tìm mã NE, tên, SĐT, email..."
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
          name="codeStatus"
          defaultValue={filterDefaults.codeStatus}
          className={selectClassName}
          aria-label="Lọc theo trạng thái mã"
        >
          <option value="">Tất cả trạng thái</option>
          {filters.codeStatuses.map((item) => (
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

      <ul className="space-y-3 lg:hidden" aria-label="Danh sách nhà tài trợ">
        {donors.map((row, index) => (
          <DonorCard key={row.code} row={row} stt={pagination.rangeStart + index} />
        ))}
      </ul>
      {donors.length === 0 ? (
        <p className="rounded-xl border border-brand-border/60 bg-white p-8 text-center text-brand-muted lg:hidden">
          Không tìm thấy nhà tài trợ phù hợp.
        </p>
      ) : null}

      <div className="table-scroll hidden rounded-xl border border-brand-border/60 bg-white shadow-sm lg:block">
        <table className="w-full divide-y divide-brand-border text-left text-sm">
          <thead className="bg-brand-sky-soft text-xs font-bold uppercase tracking-wide text-brand-ink">
            <tr>
              <th className="px-4 py-3">STT</th>
              <th className="px-4 py-3">Mã NE</th>
              <th className="px-4 py-3">Đại diện đăng ký</th>
              <th className="px-4 py-3">Liên hệ SĐT</th>
              <th className="px-4 py-3">Liên hệ email</th>
              <th className="px-4 py-3">Tỉnh</th>
              <th className="px-4 py-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {donors.map((row, index) => (
              <tr key={row.code} className="hover:bg-brand-surface">
                <DonorRowCells row={row} stt={pagination.rangeStart + index} />
              </tr>
            ))}
          </tbody>
        </table>
        {donors.length === 0 ? (
          <p className="p-8 text-center text-brand-muted">Không tìm thấy nhà tài trợ phù hợp.</p>
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
