import type { Metadata } from "next";
import { ContactView } from "@/components/pages/views/lien-he";
import { createStaticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createStaticPageMetadata("contact");

export default function Page() {
  return <ContactView />;
}
