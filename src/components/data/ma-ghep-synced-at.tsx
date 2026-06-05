"use client";

type MaGhepSyncedAtProps = {
  iso: string;
};

export function MaGhepSyncedAt({ iso }: MaGhepSyncedAtProps) {
  const date = new Date(iso);
  const label = Number.isNaN(date.getTime())
    ? iso
    : new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);

  return <time dateTime={iso}>{label}</time>;
}
