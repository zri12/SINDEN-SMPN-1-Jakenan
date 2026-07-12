import { BookOpen, ClipboardList, FileText, School, UserCheck, Users } from "lucide-react";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAssignments } from "@/hooks/useAssignments";
import { useClasses } from "@/hooks/useClasses";
import { useGrades } from "@/hooks/useGrades";
import { useStudents } from "@/hooks/useStudents";
import { useSubjects } from "@/hooks/useSubjects";
import { useTeachers } from "@/hooks/useTeachers";
import { calculateAverage } from "@/utils/calculateGrade";

export function AdminDashboard() {
  const { students } = useStudents();
  const { teachers } = useTeachers();
  const { classes } = useClasses();
  const { subjects } = useSubjects();
  const { grades } = useGrades();
  const { assignments } = useAssignments();

  const scores = grades.map((grade) => grade.score);
  const average = scores.length ? calculateAverage(scores).toFixed(1) : "0";
  const complete = grades.filter((grade) => grade.score >= grade.kkm).length;
  const incomplete = grades.length - complete;
  const chartData = classes.map((classRoom) => {
    const classGrades = grades.filter((grade) => grade.classId === classRoom.id).map((grade) => grade.score);
    return { label: classRoom.name, value: classGrades.length ? Number(calculateAverage(classGrades).toFixed(1)) : 0 };
  });

  return (
    <div>
      <PageHeader title="Dashboard Admin" description="Ringkasan sistem akademik SMP Negeri 1 Jakenan" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Siswa" value={students.length} icon={Users} color="#2563eb" subtitle="Data aktif" />
        <StatCard title="Total Guru" value={teachers.length} icon={UserCheck} color="#16a34a" subtitle="Guru pengajar" />
        <StatCard title="Total Kelas" value={classes.length} icon={School} color="#d97706" subtitle="Kelas aktif" />
        <StatCard title="Mata Pelajaran" value={subjects.length} icon={BookOpen} color="#7c3aed" subtitle="Mapel aktif" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Rata-rata Nilai" value={average} />
        <SummaryCard label="Tugas Aktif" value={assignments.filter((item) => item.status === "active").length} />
        <SummaryCard label="Siswa Tuntas" value={complete} tone="success" />
        <SummaryCard label="Belum Tuntas" value={incomplete} tone="danger" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <SimpleChart title="Rata-rata Nilai per Kelas" data={chartData} />
        <ActivityList
          items={[
            { id: "activity-assignments", type: "assignment", description: `${assignments.length} tugas tersimpan di database.`, time: "Realtime" },
            { id: "activity-grades", type: "grade", description: `${grades.length} nilai sudah masuk.`, time: "Realtime" },
            { id: "activity-students", type: "student", description: `${students.length} siswa aktif terdata.`, time: "Realtime" }
          ]}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <SummaryCard label="Nilai Masuk" value={grades.length} />
        <SummaryCard label="Tugas Terdata" value={assignments.length} />
      </div>
    </div>
  );
}
