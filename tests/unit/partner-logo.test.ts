import { describe, expect, it } from "vitest";
import { storageObjectPathFromPublicUrl } from "@/lib/admin/storage-upload";
import { toPartnerLogoDisplay } from "@/lib/data/partner-logos";

describe("storageObjectPathFromPublicUrl", () => {
  it("extracts object path from public URL", () => {
    const url =
      "https://example.supabase.co/storage/v1/object/public/images/doi-tac/abc.png";
    expect(storageObjectPathFromPublicUrl(url)).toBe("doi-tac/abc.png");
  });
});

describe("toPartnerLogoDisplay", () => {
  it("maps row to display shape", () => {
    const display = toPartnerLogoDisplay({
      id: "1",
      name: "VOV",
      image_url: "/images/nuoiem/logo-vov.png",
      website_url: null,
    });

    expect(display.alt).toBe("VOV");
    expect(display.src).toContain("logo-vov");
    expect(display.href).toBeUndefined();
  });
});
