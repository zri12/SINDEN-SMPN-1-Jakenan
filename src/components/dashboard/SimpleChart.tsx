import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/common/Card";

interface SimpleChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
}

export function SimpleChart({ title, data }: SimpleChartProps) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold text-slate-900">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} domain={[50, 100]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13 }} />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} name="Rata-rata" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
