import { Card } from "@/components/common/Card";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { GradeTable } from "@/components/tables/GradeTable";
import { dummyGrades } from "@/data/dummyGrades";

export function TeacherGradeRecap() {
  return (
    <div>
      <PageHeader title="Rekap Nilai" description="Rekap nilai kelas dan mapel yang diajar." />
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Rata-rata" value="80.1" />
        <SummaryCard label="Tuntas" value={4} tone="success" />
        <SummaryCard label="Belum Tuntas" value={2} tone="danger" />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_2fr]">
        <SimpleChart title="Nilai per Kelas" data={[{ label: "7A", value: 84 }, { label: "7B", value: 76 }, { label: "8A", value: 83 }]} />
        <Card><GradeTable grades={dummyGrades} /></Card>
      </div>
    </div>
  );
}
