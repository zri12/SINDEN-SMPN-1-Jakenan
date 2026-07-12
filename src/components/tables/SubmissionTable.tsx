import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Submission } from "@/types/submission";
import { formatDate } from "@/utils/formatDate";
import { Eye } from "lucide-react";

interface SubmissionTableProps {
  submissions: Submission[];
  onView?: (submission: Submission) => void;
  showActions?: boolean;
}

export function SubmissionTable({ submissions, onView, showActions = false }: SubmissionTableProps) {
  const columns: TableColumn<Submission>[] = [
    { key: "student", header: "Nama Siswa", render: (item) => <span className="font-medium text-slate-900">{item.studentName}</span> },
    { key: "class", header: "Kelas", render: (item) => item.className },
    { key: "assignment", header: "Judul Tugas", render: (item) => item.assignmentTitle },
    { key: "status", header: "Status", render: (item) => <Badge status={item.status} /> },
    { key: "date", header: "Tanggal Upload", render: (item) => (item.submittedAt ? formatDate(item.submittedAt) : "-") },
    { key: "note", header: "Catatan", render: (item) => item.note ?? "-" }
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <Button variant="outline" size="sm" onClick={() => onView?.(item)}>
          <Eye className="h-3.5 w-3.5" />Lihat & Nilai
        </Button>
      )
    });
  }

  return <Table columns={columns} data={submissions} emptyText="Belum ada pengumpulan tugas." />;
}
