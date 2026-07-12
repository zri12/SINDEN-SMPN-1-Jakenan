import { Bell, ClipboardList, FileText, TrendingUp } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { dummyAnnouncements } from "@/data/dummyAnnouncements";

export function StudentDashboard() {
  return (
    <div>
      <PageHeader title="Dashboard Siswa" description="Selamat datang, Ahmad Fauzan - Kelas 7A" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Rata-rata Nilai" value="84.2" icon={TrendingUp} color="#2563eb" />
        <StatCard title="Mapel Tuntas" value="8" icon={ClipboardList} color="#16a34a" />
        <StatCard title="Tugas Aktif" value="3" icon={FileText} color="#d97706" />
        <StatCard title="Informasi Baru" value="4" icon={Bell} color="#7c3aed" />
      </div>
      <Card className="mt-4">
        <h3 className="mb-4 font-semibold text-slate-900">Informasi Terbaru</h3>
        <div className="space-y-3">
          {dummyAnnouncements.slice(0, 3).map((item) => (
            <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.content}</p>
              </div>
              <Badge status={item.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
