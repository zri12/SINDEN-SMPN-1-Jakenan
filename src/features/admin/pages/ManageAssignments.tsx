import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignmentTable } from "@/components/tables/AssignmentTable";
import { useAssignments } from "@/hooks/useAssignments";

export function ManageAssignments() {
  const { assignments, isLoading, error } = useAssignments();

  return (
    <div>
      <PageHeader title="Data Tugas" description="Daftar tugas yang dibuat oleh guru." />
      <Card>
        {isLoading ? <Loading /> : error ? <p className="text-sm text-red-600">{error}</p> : <AssignmentTable assignments={assignments} />}
      </Card>
    </div>
  );
}
