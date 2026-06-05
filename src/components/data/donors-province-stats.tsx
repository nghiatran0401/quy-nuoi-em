import type { DonorsDirectoryResponse } from "@/lib/data/donors-directory";

type DonorsProvinceStatsProps = {
  provinceStats: DonorsDirectoryResponse["provinceStats"];
};

export function DonorsProvinceStats({ provinceStats }: DonorsProvinceStatsProps) {
  if (provinceStats.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
        Thống kê theo tỉnh
      </h2>
      <ul className="flex flex-wrap gap-2">
        {provinceStats.map((item) => (
          <li
            key={item.province}
            className="inline-flex items-center gap-2 rounded-full border border-brand-border/70 bg-white px-3 py-1.5 text-sm shadow-sm"
          >
            <span className="font-medium text-brand-ink">{item.province}</span>
            <span className="font-semibold tabular-nums text-brand-accent">
              {item.display.donorCount}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
