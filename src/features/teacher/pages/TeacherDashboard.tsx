import { ClipboardCheck, FileText, School, Users } from "lucide-react";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { StatCard } from "@/components/dashboard/StatCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignmentTable } from "@/components/tables/AssignmentTable";
import { useAssignments } from "@/hooks/useAssignments";
import { useClasses } from "@/hooks/useClasses";
import { useGrades } from "@/hooks/useGrades";
import { useSubmissionStatuses } from "@/hooks/useSubmissionStatuses";
import { calculateAverage } from "@/utils/calculateGrade";

export function TeacherDashboard() {
  const { classes, isLoading: classesLoading, error: classesError } = useClasses();
  const { assignments, isLoading: assignmentsLoading, error: assignmentsError } = useAssignments();
  const { submissions, isLoading: submissionsLoading, error: submissionsError } = useSubmissionStatuses();
  const { grades, isLoading: gradesLoading, error: gradesError } = useGrades();
  const isLoading = classesLoading || assignmentsLoading || submissionsLoading || gradesLoading;
  const error = classesError || assignmentsError || submissionsError || gradesError;
  const activeAssignments = assignments.filter((item) => item.status === "active");
  const submitted = submissions.filter((item) => item.status === "submitted" || item.status === "late").length;
  const pending = submissions.filter((item) => item.status === "not_submitted").length;
  const average = grades.length ? calculateAverage(grades.map((grade) => grade.score)).toFixed(1) : "0";

  return (
    <div>
      <PageHeader title="Dashboard Guru" description="Ringkasan kelas, nilai, dan tugas yang sedang berjalan." />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Card><p className="text-sm text-red-600">{error}</p></Card>
      ) : (
        <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Kelas Diajar" value={classes.length} icon={School} color="#2563eb" />
        <StatCard title="Tugas Aktif" value={activeAssignments.length} icon={FileText} color="#16a34a" />
        <StatCard title="Sudah Mengumpulkan" value={submitted} icon={ClipboardCheck} color="#d97706" />
        <StatCard title="Belum Mengumpulkan" value={pending} icon={Users} color="#dc2626" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card><AssignmentTable assignments={assignments.slice(0, 4)} /></Card>
        <div className="grid gap-4">
          <SummaryCard label="Siswa Perlu Perhatian" value={grades.filter((grade) => grade.score < grade.kkm).length} tone="danger" />
          <SummaryCard label="Rata-rata Kelas" value={average} />
        </div>
      </div>
        </>
      )}
    </div>
  );
}
