import { ClipboardList, FileText, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/common/Card";

export interface ActivityItem {
  id: string;
  type: "assignment" | "grade" | "submission" | "student";
  description: string;
  time: string;
}

const iconMap = {
  assignment: FileText,
  grade: ClipboardList,
  submission: TrendingUp,
  student: Users
};

const colorMap = {
  assignment: "#2563eb",
  grade: "#16a34a",
  submission: "#d97706",
  student: "#7c3aed"
};

export function ActivityList({ items }: { items: ActivityItem[] }) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold text-slate-900">Aktivitas Terbaru</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div key={item.id} className="flex items-start gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${colorMap[item.type]}15`, color: colorMap[item.type] }}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm text-slate-700">{item.description}</p>
                <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
