import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-4xl font-bold text-brand-blue">404</h1>
      <p className="mt-4 text-gray-600">Trang bạn tìm chưa có trong giai đoạn 1.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand-accent px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
