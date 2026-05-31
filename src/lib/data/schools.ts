import { sponsorshipCounts } from "@/content/shared/site-stats";
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

const records = schoolsData as SchoolRecord[];

export function getAllSchools(): SchoolRecord[] {
  return records;
}

export function getSchoolProvinces(): string[] {
  return [...new Set(records.map((row) => row.province))].sort((a, b) =>
    a.localeCompare(b, "vi"),
  );
}

export function getSchoolsSummary(): SchoolSummary {
  return {
    totalSchools: records.length,
    totalStudents: records.reduce((sum, row) => sum + row.students, 0),
    withSponsor: sponsorshipCounts.withSponsor,
    withoutSponsor: sponsorshipCounts.withoutSponsor,
  };
}
