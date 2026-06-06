import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLabel } from "@/lib/navigation";

const MESSENGER_URL = siteConfig.social.messenger;

const messengerButtonClass =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0084FF] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_10px_-2px_rgb(0_132_255/0.4)] transition duration-200 hover:bg-[#0078EB] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0084FF]";

type ReceiveCodeButtonProps = {
  variant: "desktop" | "mobile-menu";
  onNavigate?: () => void;
};

export function ReceiveCodeButton({ variant, onNavigate }: ReceiveCodeButtonProps) {
  const label = navLabel("receiveCode");

  if (variant === "mobile-menu") {
    return (
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${messengerButtonClass} w-full px-5 py-3 text-base`}
        onClick={onNavigate}
      >
        <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={messengerButtonClass}
      title={label}
      onClick={onNavigate}
    >
      <MessageCircle className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} aria-hidden />
      <span className="hidden min-[1280px]:inline">{label}</span>
      <span className="min-[1280px]:hidden">{navLabel("receiveCodeShort")}</span>
    </a>
  );
}
