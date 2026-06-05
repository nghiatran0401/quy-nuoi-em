import { thienNguyen } from "@/config/thien-nguyen";
import { getDataUiLabel } from "@/content/pages/data-pages";

export function ThienNguyenEmbed() {
  return (
    <article className="bg-white">
      <header className="border-b border-brand-border/60 bg-brand-warm/40">
        <div className="page-container py-4 sm:py-5">
          <p className="text-center font-heading text-base font-semibold text-brand-ink sm:text-lg">
            {getDataUiLabel("embedNote")}
          </p>
        </div>
      </header>
      <iframe
        src={thienNguyen.statementsEmbedUrl}
        title="Sao kê tài chính Quỹ Nuôi Em"
        className="block h-[calc(100vh-8.5rem)] w-full border-0"
        loading="lazy"
      />
    </article>
  );
}
