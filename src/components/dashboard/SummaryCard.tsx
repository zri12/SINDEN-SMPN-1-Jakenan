import { Card } from "@/components/common/Card";

export function SummaryCard({ label, value, tone = "default" }: { label: string; value: string | number; tone?: "default" | "success" | "danger" }) {
  const color = tone === "success" ? "text-green-600" : tone === "danger" ? "text-red-600" : "text-slate-900";
  return (
    <Card className="p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    </Card>
  );
}
