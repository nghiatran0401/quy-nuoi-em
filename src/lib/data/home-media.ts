import { brandVisual } from "@/config/brand-visual";
import { resolveCmsImageUrl } from "@/lib/cms/resolve-image-url";
import { nuoiEmImage, nuoiEmMemberGallery } from "@/lib/images";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type HomeMediaContent = {
  heroImage: string;
  ctaImage: string;
  donateQr: string;
  memberImages: string[];
};

export const HOME_MEMBER_IMAGE_COUNT = 5;

export const defaultHomeMedia: HomeMediaContent = {
  heroImage: brandVisual.heroImage,
  ctaImage: nuoiEmImage("ctaVisit"),
  donateQr: brandVisual.donateQrPath,
  memberImages: nuoiEmMemberGallery.slice(0, HOME_MEMBER_IMAGE_COUNT),
};

export function resolveHomeMedia(raw: HomeMediaContent | null | undefined): HomeMediaContent {
  if (!raw) {
    return defaultHomeMedia;
  }

  const members =
    Array.isArray(raw.memberImages) && raw.memberImages.length >= HOME_MEMBER_IMAGE_COUNT
      ? raw.memberImages.slice(0, HOME_MEMBER_IMAGE_COUNT)
      : defaultHomeMedia.memberImages;

  return {
    heroImage: raw.heroImage?.trim() || defaultHomeMedia.heroImage,
    ctaImage: raw.ctaImage?.trim() || defaultHomeMedia.ctaImage,
    donateQr: raw.donateQr?.trim() || defaultHomeMedia.donateQr,
    memberImages: members.map((url, i) => url?.trim() || defaultHomeMedia.memberImages[i]!),
  };
}

export function homeMediaImageSrc(url: string): string {
  return resolveCmsImageUrl(url, url);
}

export async function getHomeMedia(): Promise<HomeMediaContent> {
  if (!isSupabaseConfigured()) {
    return defaultHomeMedia;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("homepage_content")
      .select("media")
      .eq("locale", "vi")
      .maybeSingle();

    if (error || !data) {
      return defaultHomeMedia;
    }

    return resolveHomeMedia(data.media as HomeMediaContent | null);
  } catch {
    return defaultHomeMedia;
  }
}

export const HOME_MEDIA_STORAGE_FOLDER = "trang-chu";
