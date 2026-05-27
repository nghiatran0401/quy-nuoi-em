import manifest from "@/data/nuoiem-images.json";

export type NuoiEmImageAlias = keyof typeof manifest.aliases;

export function nuoiEmImage(alias: NuoiEmImageAlias): string {
  return manifest.aliases[alias];
}

export const nuoiEmMemberGallery = manifest.memberGallery;

export const nuoiEmAwardsGallery = manifest.awardsGallery;

export const nuoiEmMediaLogos = manifest.mediaLogos;

/** Paths scraped from nuoiem.com (Ladipage CDN → public/images/nuoiem). */
export const nuoiEmImageCatalog = manifest.files;
