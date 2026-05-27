import type { SupabaseClient } from "@supabase/supabase-js";
import {
  defaultHomeMedia,
  HOME_MEMBER_IMAGE_COUNT,
  HOME_MEDIA_STORAGE_FOLDER,
  type HomeMediaContent,
} from "@/lib/data/home-media";
import {
  deleteStoredImageIfManaged,
  resolveImageUrlFromForm,
} from "@/lib/admin/storage-upload";

function getExisting(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function buildHomeMediaFromForm(
  formData: FormData,
  supabase: SupabaseClient,
  current: HomeMediaContent,
): Promise<HomeMediaContent> {
  const locale = "vi";
  const folder = HOME_MEDIA_STORAGE_FOLDER;

  const heroImage = await resolveImageUrlFromForm(formData, supabase, {
    fileField: `${locale}_media_hero_file`,
    urlField: `${locale}_media_hero_url`,
    existingUrlField: `${locale}_media_hero_existing`,
    storageFolder: folder,
  });

  const ctaImage = await resolveImageUrlFromForm(formData, supabase, {
    fileField: `${locale}_media_cta_file`,
    urlField: `${locale}_media_cta_url`,
    existingUrlField: `${locale}_media_cta_existing`,
    storageFolder: folder,
  });

  const donateQr = await resolveImageUrlFromForm(formData, supabase, {
    fileField: `${locale}_media_qr_file`,
    urlField: `${locale}_media_qr_url`,
    existingUrlField: `${locale}_media_qr_existing`,
    storageFolder: folder,
  });

  const memberImages: string[] = [];
  for (let i = 1; i <= HOME_MEMBER_IMAGE_COUNT; i += 1) {
    const existing = getExisting(formData, `${locale}_media_member_${i}_existing`) || current.memberImages[i - 1]!;
    const next = await resolveImageUrlFromForm(formData, supabase, {
      fileField: `${locale}_media_member_${i}_file`,
      urlField: `${locale}_media_member_${i}_url`,
      existingUrlField: `${locale}_media_member_${i}_existing`,
      storageFolder: folder,
    });
    memberImages.push(next ?? existing);
  }

  const result: HomeMediaContent = {
    heroImage: heroImage ?? current.heroImage ?? defaultHomeMedia.heroImage,
    ctaImage: ctaImage ?? current.ctaImage ?? defaultHomeMedia.ctaImage,
    donateQr: donateQr ?? current.donateQr ?? defaultHomeMedia.donateQr,
    memberImages,
  };

  const pairs: Array<[string | undefined, string | undefined]> = [
    [result.heroImage, current.heroImage],
    [result.ctaImage, current.ctaImage],
    [result.donateQr, current.donateQr],
    ...result.memberImages.map(
      (url, i) => [url, current.memberImages[i]] as [string | undefined, string | undefined],
    ),
  ];

  for (const [next, prev] of pairs) {
    if (prev && next && prev !== next) {
      await deleteStoredImageIfManaged(supabase, prev, folder);
    }
  }

  return result;
}
