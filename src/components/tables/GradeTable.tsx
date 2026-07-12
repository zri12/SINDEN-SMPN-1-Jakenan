import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Grade } from "@/types/grade";
import { calculateGradeStatus } from "@/utils/calculateGrade";

interface GradeTableProps {
  grades: Grade[];
  onView?: (grade: Grade) => void;
  onEdit?: (grade: Grade) => void;
  onDelete?: (grade: Grade) => void;
  showActions?: boolean;
}

export function GradeTable({ grades, onView, onEdit, onDelete, showActions = false }: GradeTableProps) {
  const columns: TableColumn<Grade>[] = [
    { key: "student", header: "Nama Siswa", render: (grade) => <span className="font-medium text-slate-900">{grade.studentName}</span> },
    { key: "class", header: "Kelas", render: (grade) => grade.className },
    { key: "subject", header: "Mapel", render: (grade) => grade.subjectName },
    { key: "type", header: "Jenis Nilai", render: (grade) => grade.gradeType.replace("_", " ") },
    { key: "score", header: "Nilai", render: (grade) => <span className="font-semibold">{grade.score}</span> },
    { key: "kkm", header: "KKM", render: (grade) => grade.kkm },
    { key: "status", header: "Status", render: (grade) => <Badge status={calculateGradeStatus(grade.score, grade.kkm)} /> },
    { key: "teacher", header: "Guru", render: (grade) => grade.teacherName }
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      header: "Aksi",
      render: (grade) => (
        <div className="flex gap-1">
          <Button variant="outline" size="sm" aria-label="Detail" onClick={() => onView?.(grade)}><Eye className="h-3.5 w-3.5" /></Button>
          <Button variant="secondary" size="sm" aria-label="Edit" onClick={() => onEdit?.(grade)}><Pencil className="h-3.5 w-3.5" /></Button>
          <Button variant="danger" size="sm" aria-label="Hapus" onClick={() => onDelete?.(grade)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      )
    });
  }

  return <Table columns={columns} data={grades} emptyText="Belum ada data nilai." />;
}
