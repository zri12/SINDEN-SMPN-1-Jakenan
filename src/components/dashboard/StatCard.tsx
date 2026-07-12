import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, color = "#2563eb" }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold leading-none text-slate-900">{value}</p>
          {subtitle && <p className="mt-2 text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}15`, color }}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
