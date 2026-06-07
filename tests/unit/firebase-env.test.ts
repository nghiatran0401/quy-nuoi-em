import { describe, expect, it } from "vitest";
import { getFirebaseConfig, isFirebaseConfigured } from "@/lib/firebase/env";

describe("firebase env", () => {
  it("returns default public config when env vars are unset", () => {
    expect(isFirebaseConfigured()).toBe(true);

    const config = getFirebaseConfig();
    expect(config).not.toBeNull();
    expect(config?.projectId).toBe("quy-nuoi");
    expect(config?.measurementId).toBe("G-FCWP7SD62N");
  });
});
