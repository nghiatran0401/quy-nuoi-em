import type { ChildStatus } from "@/lib/data/types";

const statusStyles: Record<ChildStatus, string> = {
  "Đang nhận bảo trợ": "bg-brand-success-soft text-brand-success",
  "Hoàn thành bảo trợ": "bg-brand-highlight-soft text-brand-ink",
  "Chấm dứt bảo trợ": "bg-brand-surface text-brand-muted",
  "Tạm ngưng": "bg-brand-highlight-soft text-brand-accent-dark",
};

type StatusBadgeProps = {
  status: ChildStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
