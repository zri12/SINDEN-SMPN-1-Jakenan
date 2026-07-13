import { Eye, KeyRound, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Table, type TableColumn } from "@/components/common/Table";
import type { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
  onResetPassword?: (student: Student) => void;
  showActions?: boolean;
}

export function StudentTable({ students, onView, onEdit, onDelete, onResetPassword, showActions = true }: StudentTableProps) {
  const columns: TableColumn<Student>[] = [
    { key: "no", header: "No", render: (_student, index) => index + 1 },
    { key: "nisn", header: "NISN", render: (student) => <span className="font-mono text-xs">{student.nisn || "-"}</span> },
    { key: "nis", header: "NIS / NIPD", render: (student) => <span className="font-mono text-xs">{student.nis || "-"}</span> },
    { key: "name", header: "Nama Siswa", render: (student) => <span className="font-medium text-slate-900">{student.fullName}</span> },
    { key: "class", header: "Kelas", render: (student) => <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{student.className}</span> },
    { key: "gender", header: "Jenis Kelamin", render: (student) => (student.gender === "L" ? "Laki-laki" : "Perempuan") },
    { key: "birth", header: "Tempat/Tanggal Lahir", render: (student) => formatBirth(student) },
    { key: "status", header: "Status Akun", render: (student) => <Badge status={student.status} /> }
  ];

  if (showActions) {
    columns.push({ key: "actions", header: "Aksi", render: (student) => <ActionButtons onView={() => onView?.(student)} onEdit={() => onEdit?.(student)} onDelete={() => onDelete?.(student)} onResetPassword={() => onResetPassword?.(student)} /> });
  }

  return <Table columns={columns} data={students} emptyText="Belum ada data siswa." />;
}

function ActionButtons({ onView, onEdit, onDelete, onResetPassword }: { onView: () => void; onEdit: () => void; onDelete: () => void; onResetPassword: () => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      <Button variant="outline" size="sm" aria-label="Detail" onClick={onView}><Eye className="h-3.5 w-3.5" /></Button>
      <Button variant="secondary" size="sm" aria-label="Edit" onClick={onEdit}><Pencil className="h-3.5 w-3.5" /></Button>
      <Button variant="outline" size="sm" aria-label="Reset Password" onClick={onResetPassword}><KeyRound className="h-3.5 w-3.5" /></Button>
      <Button variant="danger" size="sm" aria-label="Hapus" onClick={onDelete}><Trash2 className="h-3.5 w-3.5" /></Button>
    </div>
  );
}

function formatBirth(student: Student) {
  const place = student.birthPlace || "-";
  const date = student.birthDate ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(student.birthDate)) : "-";
  return `${place}, ${date}`;
}
