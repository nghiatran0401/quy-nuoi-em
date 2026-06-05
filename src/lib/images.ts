import { brandVisual } from "@/config/brand-visual";
import {
  nuoiEmImage,
  nuoiEmMediaLogos,
  nuoiEmMemberGallery,
} from "@/lib/nuoiem-images";
import manifest from "@/data/nuoiem-images.json";

const legacyPathMap: Record<string, string> = {
  "/images/scoring/reference.png": nuoiEmImage("processGuide"),
};

/** Resolve a site asset path to a local public URL. */
export function siteImage(path: string): string {
  if (path.startsWith("/")) {
    return legacyPathMap[path] ?? path;
  }
  return `/${path.replace(/^\//, "")}`;
}

export function partnerLogo(slug: string) {
  return siteImage(`/logo-doi-tac/${slug}.jpg`);
}

export const siteImages = {
  hero: nuoiEmImage("hero"),
  heroHomepage: nuoiEmImage("hero"),
  ctaBackground: nuoiEmImage("ctaVisit"),
  donateQr: brandVisual.donateQrPath,
  member: (index: number) => {
    const src = nuoiEmMemberGallery[index - 1];
    return src ?? nuoiEmMemberGallery[0] ?? nuoiEmImage("hero");
  },
  mou: (index: number) => {
    const gallery = manifest.mouGallery;
    return gallery[index - 1] ?? gallery[0] ?? nuoiEmImage("hero");
  },
};

export { nuoiEmMediaLogos, nuoiEmMemberGallery, nuoiEmImage };
