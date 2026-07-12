import { Bell, ClipboardList, FileText, TrendingUp } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { StatCard } from "@/components/dashboard/StatCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useAssignments } from "@/hooks/useAssignments";
import { useGrades } from "@/hooks/useGrades";
import { calculateAverage } from "@/utils/calculateGrade";

export function StudentDashboard() {
  const { grades } = useGrades();
  const { assignments } = useAssignments();
  const { announcements } = useAnnouncements();
  const scores = grades.map((grade) => grade.score);

  return (
    <div>
      <PageHeader title="Dashboard Siswa" description="Ringkasan nilai, tugas, dan informasi terbaru." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Rata-rata Nilai" value={scores.length ? calculateAverage(scores).toFixed(1) : "0"} icon={TrendingUp} color="#2563eb" />
        <StatCard title="Mapel Tuntas" value={grades.filter((grade) => grade.score >= grade.kkm).length} icon={ClipboardList} color="#16a34a" />
        <StatCard title="Tugas Aktif" value={assignments.filter((assignment) => assignment.status === "active").length} icon={FileText} color="#d97706" />
        <StatCard title="Informasi Baru" value={announcements.length} icon={Bell} color="#7c3aed" />
      </div>
      <Card className="mt-4">
        <h3 className="mb-4 font-semibold text-slate-900">Informasi Terbaru</h3>
        {announcements.length === 0 ? (
          <EmptyState title="Belum ada informasi" description="Informasi sekolah akan tampil ketika sudah ditambahkan di Supabase." />
        ) : (
          <div className="space-y-3">
            {announcements.slice(0, 3).map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.content}</p>
                </div>
                <Badge status={item.status} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
