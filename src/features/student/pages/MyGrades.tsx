import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { PageHeader } from "@/components/layout/PageHeader";
import { GradeTable } from "@/components/tables/GradeTable";
import { useGrades } from "@/hooks/useGrades";

export function MyGrades() {
  const { grades, isLoading, error } = useGrades();

  return (
    <div>
      <PageHeader title="Nilai Saya" description="Nilai yang tersimpan untuk akun siswa aktif." />
      <Card>
        {isLoading ? <Loading /> : error ? <p className="text-sm text-red-600">{error}</p> : <GradeTable grades={grades} />}
      </Card>
    </div>
  );
}
