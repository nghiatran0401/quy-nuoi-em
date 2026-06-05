import type { DonorsDirectoryResponse } from "@/lib/data/donors-directory";

type DonorsProvinceStatsProps = {
  provinceStats: DonorsDirectoryResponse["provinceStats"];
  provinceCount: string;
};

export function DonorsProvinceStats({ provinceStats, provinceCount }: DonorsProvinceStatsProps) {
  if (provinceStats.length === 0) {
    return null;
  }

  return (
    <section className="brand-card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-base font-bold text-brand-ink sm:text-lg">
          Thống kê nhà tài trợ theo tỉnh
        </h2>
        <span className="rounded-full border border-brand-border/70 bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-muted">
          {provinceCount} tỉnh
        </span>
      </div>
      <ul className="flex flex-wrap gap-2.5">
        {provinceStats.map((item) => (
          <li
            key={item.province}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-border/70 bg-white px-3 py-2 text-sm shadow-sm"
          >
            <span className="font-semibold text-brand-ink">{item.province}</span>
            <span className="tabular-nums text-brand-muted">{item.display.donorCount}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
