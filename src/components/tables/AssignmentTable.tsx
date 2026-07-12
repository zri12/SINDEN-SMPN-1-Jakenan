import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Assignment } from "@/types/assignment";
import { formatDate } from "@/utils/formatDate";

interface AssignmentTableProps {
  assignments: Assignment[];
  showActions?: boolean;
  onView?: (assignment: Assignment) => void;
  onEdit?: (assignment: Assignment) => void;
  onDelete?: (assignment: Assignment) => void;
}

export function AssignmentTable({ assignments, showActions = false, onView, onEdit, onDelete }: AssignmentTableProps) {
  const columns: TableColumn<Assignment>[] = [
    { key: "title", header: "Judul Tugas", render: (item) => <span className="font-medium text-slate-900">{item.title}</span> },
    { key: "teacher", header: "Guru", render: (item) => item.teacherName },
    { key: "subject", header: "Mapel", render: (item) => item.subjectName },
    { key: "class", header: "Kelas", render: (item) => item.className },
    { key: "publish", header: "Publish", render: (item) => item.publishAt ? formatDate(item.publishAt) : "-" },
    { key: "deadline", header: "Deadline", render: (item) => formatDate(item.deadline) },
    { key: "status", header: "Status", render: (item) => <Badge status={item.status} /> },
    { key: "submitted", header: "Pengumpulan", render: (item) => item.submittedCount }
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onView?.(item)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50" aria-label="Lihat detail">
            <Eye className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => onEdit?.(item)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50" aria-label="Edit tugas">
            <Pencil className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => onDelete?.(item)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50" aria-label="Hapus tugas">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    });
  }

  return <Table columns={columns} data={assignments} emptyText="Belum ada tugas." />;
}
