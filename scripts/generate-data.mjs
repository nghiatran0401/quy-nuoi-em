/**
 * Regenerates src/data/*.json from .firecrawl crawl artifacts.
 * Run: npm run generate:data
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const crawlPath = path.join(root, ".firecrawl/crawl-result.json");
const data = JSON.parse(fs.readFileSync(crawlPath, "utf8")).data;

function parseChildren(md) {
  const children = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\| (QTN\d+) \| ([^|]+) \| (\d{4}) \| (Nam|Nữ) \| ([^|]+) \| ([^|]+) \|/);
    if (m) {
      children.push({
        code: m[1],
        name: m[2].trim(),
        birthYear: Number(m[3]),
        gender: m[4],
        province: m[5].trim(),
        status: m[6].trim(),
      });
    }
  }
  return children;
}

function parseReports(md) {
  const reports = [];
  for (const block of md.split(/!\[Báo cáo /).slice(1)) {
    const titleMatch = block.match(/^([^\]]+)\]/);
    if (!titleMatch) continue;
    const periodMatch = block.match(/\n\n(Tháng [^\n]+)\n\n/);
    const title = periodMatch?.[1] ?? titleMatch[1];
    const imgMatch = block.match(/url=([^&)]+)/);
    const totalThu = block.match(/Tổng thu\n\n([^\n]+)/);
    const totalChi = block.match(/Tổng chi\n\n([^\n]+)/);
    const docMatch = block.match(/\[Tải báo cáo chi tiết\]\((https:\/\/docs\.google\.com[^)]+)\)/);
    const yearMatch = title.match(/(\d{4})/);
    let imageUrl = "";
    if (imgMatch) {
      try {
        imageUrl = decodeURIComponent(imgMatch[1]);
      } catch {
        imageUrl = imgMatch[1];
      }
    }
    reports.push({
      id: title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase(),
      title,
      year: yearMatch ? Number(yearMatch[1]) : 2025,
      imageUrl,
      totalIncome: totalThu?.[1]?.trim() ?? "",
      totalExpense: totalChi?.[1]?.trim() ?? "",
      documentUrl: docMatch?.[1],
    });
  }
  return reports;
}

const childMd =
  data.find((d) => d.metadata?.sourceURL?.endsWith("/danh-sach-bao-tro"))?.markdown ?? "";
const reportMd = data.find((d) => d.metadata?.sourceURL?.endsWith("/bao-cao"))?.markdown ?? "";

const outDir = path.join(root, "src/data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "children.json"), JSON.stringify(parseChildren(childMd), null, 2));
fs.writeFileSync(path.join(outDir, "reports.json"), JSON.stringify(parseReports(reportMd), null, 2));

console.log("Generated data in src/data/");
