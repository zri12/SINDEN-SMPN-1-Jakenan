import { Badge } from "@/components/common/Badge";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Assignment } from "@/types/assignment";
import { formatDate } from "@/utils/formatDate";

export function AssignmentTable({ assignments }: { assignments: Assignment[] }) {
  const columns: TableColumn<Assignment>[] = [
    { key: "title", header: "Judul Tugas", render: (item) => <span className="font-medium text-slate-900">{item.title}</span> },
    { key: "teacher", header: "Guru", render: (item) => item.teacherName },
    { key: "subject", header: "Mapel", render: (item) => item.subjectName },
    { key: "class", header: "Kelas", render: (item) => item.className },
    { key: "deadline", header: "Deadline", render: (item) => formatDate(item.deadline) },
    { key: "status", header: "Status", render: (item) => <Badge status={item.status} /> },
    { key: "submitted", header: "Pengumpulan", render: (item) => item.submittedCount }
  ];

  return <Table columns={columns} data={assignments} emptyText="Belum ada tugas." />;
}
