import { ClipboardCheck, FileText, School, Users } from "lucide-react";
import { Card } from "@/components/common/Card";
import { StatCard } from "@/components/dashboard/StatCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignmentTable } from "@/components/tables/AssignmentTable";
import { dummyAssignments } from "@/data/dummyAssignments";
import { dummySubmissions } from "@/data/dummySubmissions";

export function TeacherDashboard() {
  return (
    <div>
      <PageHeader title="Dashboard Guru" description="Ringkasan kelas, nilai, dan tugas yang sedang berjalan." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Kelas Diajar" value={3} icon={School} color="#2563eb" />
        <StatCard title="Tugas Aktif" value={dummyAssignments.filter((item) => item.status === "active").length} icon={FileText} color="#16a34a" />
        <StatCard title="Sudah Mengumpulkan" value={dummySubmissions.filter((item) => item.status === "submitted").length} icon={ClipboardCheck} color="#d97706" />
        <StatCard title="Belum Mengumpulkan" value={dummySubmissions.filter((item) => item.status === "not_submitted").length} icon={Users} color="#dc2626" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card><AssignmentTable assignments={dummyAssignments.slice(0, 4)} /></Card>
        <div className="grid gap-4">
          <SummaryCard label="Siswa Perlu Perhatian" value={2} tone="danger" />
          <SummaryCard label="Rata-rata Kelas" value="81.5" />
        </div>
      </div>
    </div>
  );
}
