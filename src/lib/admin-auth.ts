import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SESSION_COOKIE = "admin_session";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "change-me-in-env";
}

function makeToken(username: string, password: string): string {
  return createHash("sha256")
    .update(`${username}:${password}:${getSessionSecret()}`)
    .digest("hex");
}

export function isValidAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = getRequiredEnv("ADMIN_USERNAME");
  const expectedPassword = getRequiredEnv("ADMIN_PASSWORD");
  return username === expectedUsername && password === expectedPassword;
}

export async function createAdminSession() {
  const store = await cookies();
  const token = makeToken(getRequiredEnv("ADMIN_USERNAME"), getRequiredEnv("ADMIN_PASSWORD"));
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export async function hasAdminSession(): Promise<boolean> {
  const store = await cookies();
  const current = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!current) return false;
  const expected = makeToken(getRequiredEnv("ADMIN_USERNAME"), getRequiredEnv("ADMIN_PASSWORD"));
  return current === expected;
}

export async function requireAdminSession() {
  const ok = await hasAdminSession();
  if (!ok) {
    redirect("/admin/login");
  }
}
