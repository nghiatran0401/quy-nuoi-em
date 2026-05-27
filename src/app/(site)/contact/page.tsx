import type { Metadata } from "next";
import { ContactView } from "@/components/pages/views/contact";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("contact");

export default function Page() {
  return <ContactView />;
}
