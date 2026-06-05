export function MaGhepDirectoryUnavailable() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
      <p className="font-semibold text-brand-ink">Không tải được bảng mã ghép</p>
      <p className="mt-2 text-sm text-brand-muted">
        Dữ liệu đang được cập nhật từ danh mục công khai. Vui lòng thử lại sau vài phút.
      </p>
    </div>
  );
}
