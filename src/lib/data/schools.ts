import { publicCatalog } from "@/config/public-catalog";
import { fetchHomeMetrics } from "@/lib/data/home-metrics";
import schoolsData from "@/data/schools.json";

export type SchoolRecord = {
  stt: number;
  name: string;
  districtProvince: string;
  province: string;
  schoolPointsSummary: string;
  students: number;
  issuedCount: number | null;
  status: string;
  documentUrl: string | null;
  openUrl: string | null;
};

export type SchoolSummary = {
  totalSchools: number;
  totalStudents: number;
  withSponsor: number;
  withoutSponsor: number;
};

function resolveSchoolOpenUrl(openUrl: string | null): string | null {
  if (!openUrl) return null;
  const catalogBase = publicCatalog.url.trim();
  if (!catalogBase) return openUrl;
  try {
    const base = new URL(catalogBase);
    const resolved = openUrl.startsWith("/")
      ? new URL(openUrl, base)
      : new URL(openUrl);
    if (!openUrl.startsWith("/")) {
      resolved.protocol = base.protocol;
      resolved.host = base.host;
    }
    return resolved.toString();
  } catch {
    return openUrl;
  }
}

const records = (schoolsData as SchoolRecord[]).map((row) => ({
  ...row,
  openUrl: resolveSchoolOpenUrl(row.openUrl),
}));

export function getAllSchools(): SchoolRecord[] {
  return records;
}

export function getSchoolProvinces(): string[] {
  return [...new Set(records.map((row) => row.province))].sort((a, b) =>
    a.localeCompare(b, "vi"),
  );
}

export async function getSchoolsSummary(): Promise<SchoolSummary> {
  const metrics = await fetchHomeMetrics();

  return {
    totalSchools: records.length,
    totalStudents: records.reduce((sum, row) => sum + row.students, 0),
    withSponsor: metrics?.children.sponsored ?? 0,
    withoutSponsor: metrics?.children.unsponsored ?? 0,
  };
}
