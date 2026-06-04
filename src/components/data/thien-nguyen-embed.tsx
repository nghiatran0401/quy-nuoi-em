import { thienNguyen } from "@/config/thien-nguyen";

export function ThienNguyenEmbed() {
  return (
    <article className="bg-white">
      <iframe
        src={thienNguyen.statementsEmbedUrl}
        title="Sao kê tài chính Quỹ Nuôi Em"
        className="block h-[calc(100vh-5rem)] w-full border-0"
        loading="lazy"
      />
    </article>
  );
}
