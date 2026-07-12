import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Teacher } from "@/types/teacher";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface TeacherTableProps {
  teachers: Teacher[];
  onView?: (teacher: Teacher) => void;
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacher: Teacher) => void;
}

export function TeacherTable({ teachers, onView, onEdit, onDelete }: TeacherTableProps) {
  const columns: TableColumn<Teacher>[] = [
    { key: "nip", header: "NIP/NUPTK", render: (teacher) => <span className="font-mono text-xs">{teacher.nip ?? teacher.nuptk ?? "-"}</span> },
    { key: "name", header: "Nama Guru", render: (teacher) => <span className="font-medium text-slate-900">{teacher.fullName}</span> },
    { key: "subject", header: "Mata Pelajaran", render: (teacher) => teacher.subjectName },
    { key: "classes", header: "Kelas Diajar", render: (teacher) => teacher.classNames.join(", ") },
    { key: "username", header: "Username", render: (teacher) => teacher.username },
    { key: "status", header: "Status", render: (teacher) => <Badge status={teacher.status} /> },
    {
      key: "actions",
      header: "Aksi",
      render: (teacher) => (
        <div className="flex gap-1">
          <Button variant="outline" size="sm" aria-label="Detail" onClick={() => onView?.(teacher)}><Eye className="h-3.5 w-3.5" /></Button>
          <Button variant="secondary" size="sm" aria-label="Edit" onClick={() => onEdit?.(teacher)}><Pencil className="h-3.5 w-3.5" /></Button>
          <Button variant="danger" size="sm" aria-label="Hapus" onClick={() => onDelete?.(teacher)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={teachers} emptyText="Belum ada data guru." />;
}
