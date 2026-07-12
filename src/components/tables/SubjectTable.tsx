import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Subject } from "@/types/subject";

interface SubjectTableProps {
  subjects: Subject[];
  onView?: (subject: Subject) => void;
  onEdit?: (subject: Subject) => void;
  onDelete?: (subject: Subject) => void;
  showActions?: boolean;
}

export function SubjectTable({ subjects, onView, onEdit, onDelete, showActions = false }: SubjectTableProps) {
  const columns: TableColumn<Subject>[] = [
    { key: "code", header: "Kode", render: (subject) => <span className="font-mono text-xs">{subject.code}</span> },
    { key: "name", header: "Mata Pelajaran", render: (subject) => <span className="font-medium text-slate-900">{subject.name}</span> },
    { key: "kkm", header: "KKM", render: (subject) => subject.kkm },
    { key: "status", header: "Status", render: (subject) => <Badge status={subject.status} /> }
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      header: "Aksi",
      render: (subject) => (
        <div className="flex gap-1">
          <Button variant="outline" size="sm" aria-label="Detail" onClick={() => onView?.(subject)}><Eye className="h-3.5 w-3.5" /></Button>
          <Button variant="secondary" size="sm" aria-label="Edit" onClick={() => onEdit?.(subject)}><Pencil className="h-3.5 w-3.5" /></Button>
          <Button variant="danger" size="sm" aria-label="Hapus" onClick={() => onDelete?.(subject)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      )
    });
  }

  return <Table columns={columns} data={subjects} emptyText="Belum ada mata pelajaran." />;
}
