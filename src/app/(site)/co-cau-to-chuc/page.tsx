import type { Metadata } from "next";
import { OrganizationView } from "@/components/pages/views/co-cau-to-chuc";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("organization");

export default function Page() {
  return <OrganizationView />;
}
