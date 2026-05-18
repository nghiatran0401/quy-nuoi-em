"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sponsorshipRoundData } from "@/content/home";

const chartInk = "#6f655c";
const chartGrid = "#e6ddd3";
const chartAccent = "#f06520";

export function SponsorshipChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sponsorshipRoundData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
        <XAxis dataKey="round" tick={{ fontSize: 11, fill: chartInk }} axisLine={{ stroke: chartGrid }} />
        <YAxis tick={{ fontSize: 12, fill: chartInk }} axisLine={false} tickLine={false} domain={[0, 60]} />
        <Tooltip
          cursor={{ fill: "rgb(240 101 32 / 0.06)" }}
          contentStyle={{
            borderRadius: 12,
            border: `1px solid ${chartGrid}`,
            boxShadow: "0 8px 24px -8px rgb(45 38 34 / 0.15)",
          }}
        />
        <Bar dataKey="count" fill={chartAccent} radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
