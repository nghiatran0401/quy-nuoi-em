import type { Metadata } from "next";
import { VolunteerView } from "@/components/pages/views/dang-ky-tnv";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("volunteer");

export default function Page() {
  return <VolunteerView />;
}
