import type { Metadata } from "next";
import { DieuKhoanThamGiaView } from "@/components/pages/views/dieu-khoan-tham-gia";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("dieuKhoanThamGia");

export default function Page() {
  return <DieuKhoanThamGiaView />;
}
