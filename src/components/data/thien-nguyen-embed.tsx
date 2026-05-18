const EMBED_URL = "https://thiennguyen.app/doi-tac/minh-bach-tai-khoan/2010";

export function ThienNguyenEmbed() {
  return (
    <div className="min-h-screen pb-10 pt-20">
      <div className="mx-auto h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
        <iframe
          src={EMBED_URL}
          title="Sao kê tài chính Dự án Nuôi Em"
          className="h-full w-full rounded-lg border-0 shadow-sm"
          loading="lazy"
        />
      </div>
    </div>
  );
}
