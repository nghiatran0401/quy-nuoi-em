import { Clock } from "lucide-react";

type BankStatementLoadNoticesProps = {
  notices: readonly string[];
};

const noticeStyles = [
  {
    container: "border border-brand-green/15 bg-brand-sky-soft/90",
    icon: "text-brand-green",
  },
  {
    container: "border border-brand-accent/20 bg-brand-peach/70",
    icon: "text-brand-accent",
  },
] as const;

export function BankStatementLoadNotices({ notices }: BankStatementLoadNoticesProps) {
  return (
    <div className="mb-5 space-y-2">
      {notices.map((notice, index) => {
        const style = noticeStyles[index] ?? noticeStyles[0];
        return (
          <div
            key={notice}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs leading-relaxed text-brand-muted sm:text-sm ${style.container}`}
          >
            <Clock className={`h-4 w-4 shrink-0 ${style.icon}`} aria-hidden />
            <p>{notice}</p>
          </div>
        );
      })}
    </div>
  );
}
