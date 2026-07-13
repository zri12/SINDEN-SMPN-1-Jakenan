import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { GradeTable } from "@/components/tables/GradeTable";
import { useClasses } from "@/hooks/useClasses";
import { useGrades } from "@/hooks/useGrades";
import { calculateAverage } from "@/utils/calculateGrade";

export function TeacherGradeRecap() {
  const { grades, isLoading: gradesLoading, error: gradesError } = useGrades();
  const { classes, isLoading: classesLoading, error: classesError } = useClasses();
  const isLoading = gradesLoading || classesLoading;
  const error = gradesError || classesError;
  const scores = grades.map((grade) => grade.score);
  const chartData = classes.map((classRoom) => {
    const classScores = grades.filter((grade) => grade.classId === classRoom.id).map((grade) => grade.score);
    return { label: classRoom.name, value: classScores.length ? Number(calculateAverage(classScores).toFixed(1)) : 0 };
  });

  return (
    <div>
      <PageHeader title="Rekap Nilai" description="Rekap nilai kelas dan mapel yang diajar." />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Card><p className="text-sm text-red-600">{error}</p></Card>
      ) : (
        <>
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Rata-rata" value={scores.length ? calculateAverage(scores).toFixed(1) : "0"} />
        <SummaryCard label="Tuntas" value={grades.filter((grade) => grade.score >= grade.kkm).length} tone="success" />
        <SummaryCard label="Belum Tuntas" value={grades.filter((grade) => grade.score < grade.kkm).length} tone="danger" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_2fr]">
        <SimpleChart title="Nilai per Kelas" data={chartData} />
        <Card><GradeTable grades={grades} /></Card>
      </div>
        </>
      )}
    </div>
  );
}
