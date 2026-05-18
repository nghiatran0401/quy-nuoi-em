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

export function SponsorshipChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sponsorshipRoundData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="round" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} domain={[0, 60]} />
        <Tooltip
          cursor={{ fill: "rgba(27, 79, 156, 0.08)" }}
          contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
        />
        <Bar dataKey="count" fill="#1b4f9c" radius={[4, 4, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
