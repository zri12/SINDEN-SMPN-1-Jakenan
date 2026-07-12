import { Card } from "@/components/common/Card";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { useClasses } from "@/hooks/useClasses";
import { useGrades } from "@/hooks/useGrades";
import { calculateAverage } from "@/utils/calculateGrade";

export function GradeRecap() {
  const { grades } = useGrades();
  const { classes } = useClasses();
  const scores = grades.map((grade) => grade.score);
  const highest = scores.length ? Math.max(...scores) : 0;
  const lowest = scores.length ? Math.min(...scores) : 0;
  const chartData = classes.map((classRoom) => {
    const classScores = grades.filter((grade) => grade.classId === classRoom.id).map((grade) => grade.score);
    return { label: classRoom.name, value: classScores.length ? Number(calculateAverage(classScores).toFixed(1)) : 0 };
  });

  return (
    <div>
      <PageHeader title="Rekap Nilai" description="Rekap nilai berdasarkan data Supabase." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Rata-rata" value={scores.length ? calculateAverage(scores).toFixed(1) : "0"} />
        <SummaryCard label="Nilai Tertinggi" value={highest} tone="success" />
        <SummaryCard label="Nilai Terendah" value={lowest} tone="danger" />
        <SummaryCard label="Jumlah Nilai" value={scores.length} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <SimpleChart title="Rata-rata Kelas" data={chartData} />
        <Card>
          <h3 className="mb-3 font-semibold text-slate-900">Catatan Rekap</h3>
          <p className="text-sm leading-6 text-slate-500">Data rekap mengikuti tabel grades. Perubahan nilai akan tetap tersimpan dan tampil lagi setelah refresh.</p>
        </Card>
      </div>
    </div>
  );
}
