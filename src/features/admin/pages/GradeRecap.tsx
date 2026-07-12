import { Card } from "@/components/common/Card";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { dummyGrades } from "@/data/dummyGrades";
import { calculateAverage } from "@/utils/calculateGrade";

export function GradeRecap() {
  const scores = dummyGrades.map((grade) => grade.score);
  return (
    <div>
      <PageHeader title="Rekap Nilai" description="Rekap sederhana berdasarkan data dummy." />
      <div className="grid gap-4 sm:grid-cols-4">
        <SummaryCard label="Rata-rata" value={calculateAverage(scores).toFixed(1)} />
        <SummaryCard label="Nilai Tertinggi" value={Math.max(...scores)} tone="success" />
        <SummaryCard label="Nilai Terendah" value={Math.min(...scores)} tone="danger" />
        <SummaryCard label="Jumlah Nilai" value={scores.length} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <SimpleChart title="Rata-rata Kelas" data={[{ label: "7A", value: 84 }, { label: "7B", value: 76 }, { label: "8A", value: 83 }, { label: "8B", value: 74 }, { label: "9A", value: 82 }]} />
        <Card>
          <h3 className="mb-3 font-semibold text-slate-900">Catatan Rekap</h3>
          <p className="text-sm leading-6 text-slate-500">Export PDF/Excel belum dibuat pada tahap ini. Rekap masih menggunakan dummy data dan siap diganti query Supabase.</p>
        </Card>
      </div>
    </div>
  );
}
