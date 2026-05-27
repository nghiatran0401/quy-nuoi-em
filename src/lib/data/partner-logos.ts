import { nuoiEmMediaLogos, siteImage } from "@/lib/images";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { createPublicClient } from "@/lib/supabase/public";

export type PartnerLogoDisplay = {
  id?: string;
  src: string;
  alt: string;
  href?: string;
};

export type PartnerLogoRecord = {
  id: string;
  name: string;
  image_url: string;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const STORAGE_FOLDER = "doi-tac";

function manifestFallback(): PartnerLogoDisplay[] {
  return nuoiEmMediaLogos.map((logo) => ({
    src: logo.src,
    alt: logo.alt,
  }));
}

export function resolvePartnerLogoSrc(imageUrl: string): string {
  const trimmed = imageUrl.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return siteImage(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
}

export function toPartnerLogoDisplay(row: Pick<PartnerLogoRecord, "id" | "name" | "image_url" | "website_url">): PartnerLogoDisplay {
  const href = row.website_url?.trim();
  return {
    id: row.id,
    src: resolvePartnerLogoSrc(row.image_url),
    alt: row.name,
    ...(href ? { href } : {}),
  };
}

export async function getPartnerLogos(): Promise<PartnerLogoDisplay[]> {
  if (!isSupabaseConfigured()) {
    return manifestFallback();
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("partner_logos")
      .select("id, name, image_url, website_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data?.length) {
      return manifestFallback();
    }

    return (data as Pick<PartnerLogoRecord, "id" | "name" | "image_url" | "website_url">[]).map(toPartnerLogoDisplay);
  } catch {
    return manifestFallback();
  }
}

export async function listPartnerLogosForAdmin(): Promise<PartnerLogoRecord[]> {
  if (!isSupabaseConfigured()) {
    return manifestFallback().map((logo, index) => ({
      id: `fallback-${index}`,
      name: logo.alt,
      image_url: logo.src,
      website_url: null,
      sort_order: (index + 1) * 10,
      is_active: true,
      created_at: "",
      updated_at: "",
    }));
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("partner_logos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as PartnerLogoRecord[];
}

export const PARTNER_LOGO_STORAGE_FOLDER = STORAGE_FOLDER;
