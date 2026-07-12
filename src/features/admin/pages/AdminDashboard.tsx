import { BookOpen, ClipboardList, FileText, School, UserCheck, Users } from "lucide-react";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { dummyAssignments } from "@/data/dummyAssignments";
import { dummyClasses } from "@/data/dummyClasses";
import { dummyGrades } from "@/data/dummyGrades";
import { dummyStudents } from "@/data/dummyStudents";
import { dummySubjects } from "@/data/dummySubjects";
import { dummyTeachers } from "@/data/dummyTeachers";
import { calculateAverage } from "@/utils/calculateGrade";

export function AdminDashboard() {
  const average = calculateAverage(dummyGrades.map((grade) => grade.score)).toFixed(1);
  const complete = dummyGrades.filter((grade) => grade.score >= grade.kkm).length;
  const incomplete = dummyGrades.length - complete;

  return (
    <div>
      <PageHeader title="Dashboard Admin" description="Ringkasan sistem akademik SMP Negeri 1 Jakenan" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Siswa" value={dummyStudents.length} icon={Users} color="#2563eb" subtitle="Data dummy aktif" />
        <StatCard title="Total Guru" value={dummyTeachers.length} icon={UserCheck} color="#16a34a" subtitle="Guru pengajar" />
        <StatCard title="Total Kelas" value={dummyClasses.length} icon={School} color="#d97706" subtitle="Kelas 7-9" />
        <StatCard title="Mata Pelajaran" value={dummySubjects.length} icon={BookOpen} color="#7c3aed" subtitle="Mapel aktif" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Rata-rata Nilai" value={average} />
        <SummaryCard label="Tugas Aktif" value={dummyAssignments.filter((item) => item.status === "active").length} />
        <SummaryCard label="Siswa Tuntas" value={complete} tone="success" />
        <SummaryCard label="Belum Tuntas" value={incomplete} tone="danger" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <SimpleChart
          title="Rata-rata Nilai per Kelas"
          data={[
            { label: "7A", value: 82 },
            { label: "7B", value: 76 },
            { label: "8A", value: 85 },
            { label: "8B", value: 74 },
            { label: "9A", value: 84 },
            { label: "9B", value: 81 }
          ]}
        />
        <ActivityList
          items={[
            { id: "activity-1", type: "assignment", description: "Bapak Fauzan menambahkan tugas Matematika Bab Pecahan.", time: "2 jam lalu" },
            { id: "activity-2", type: "grade", description: "Nilai kelas 8A mapel IPA diperbarui.", time: "3 jam lalu" },
            { id: "activity-3", type: "submission", description: "Siti Aisyah mengumpulkan tugas Matematika.", time: "4 jam lalu" },
            { id: "activity-4", type: "student", description: "Data siswa baru ditambahkan ke kelas 7C.", time: "1 hari lalu" }
          ]}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <SummaryCard label="Nilai Masuk" value={dummyGrades.length} />
        <SummaryCard label="Tugas Terdata" value={dummyAssignments.length} />
      </div>
    </div>
  );
}
