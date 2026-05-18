import type { ChildStatus } from "@/lib/data/types";

const statusStyles: Record<ChildStatus, string> = {
  "Đang nhận bảo trợ": "bg-brand-green-light text-brand-blue",
  "Hoàn thành bảo trợ": "bg-blue-50 text-brand-blue",
  "Chấm dứt bảo trợ": "bg-gray-100 text-gray-600",
  "Tạm ngưng": "bg-amber-50 text-amber-800",
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
