import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { isValidAdminCredentials } from "@/lib/admin-auth";

const ORIGINAL_ENV = { ...process.env };

describe("isValidAdminCredentials", () => {
  beforeEach(() => {
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "admin123";
    process.env.ADMIN_SESSION_SECRET = "test-secret";
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("accepts matching credentials", () => {
    expect(isValidAdminCredentials("admin", "admin123")).toBe(true);
  });

  it("rejects wrong password", () => {
    expect(isValidAdminCredentials("admin", "wrong")).toBe(false);
  });

  it("rejects wrong username", () => {
    expect(isValidAdminCredentials("other", "admin123")).toBe(false);
  });
});
