import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Table, type TableColumn } from "@/components/common/Table";
import type { ClassRoom } from "@/types/class";

interface ClassTableProps {
  classes: ClassRoom[];
  onView?: (classRoom: ClassRoom) => void;
  onEdit?: (classRoom: ClassRoom) => void;
  onDelete?: (classRoom: ClassRoom) => void;
  showActions?: boolean;
}

export function ClassTable({ classes, onView, onEdit, onDelete, showActions = false }: ClassTableProps) {
  const columns: TableColumn<ClassRoom>[] = [
    { key: "name", header: "Nama Kelas", render: (item) => <span className="font-semibold text-blue-700">{item.name}</span> },
    { key: "level", header: "Tingkat", render: (item) => `Kelas ${item.gradeLevel}` },
    { key: "year", header: "Tahun Ajaran", render: (item) => item.academicYear },
    { key: "students", header: "Jumlah Siswa", render: (item) => item.studentCount }
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex gap-1">
          <Button variant="outline" size="sm" aria-label="Detail" onClick={() => onView?.(item)}><Eye className="h-3.5 w-3.5" /></Button>
          <Button variant="secondary" size="sm" aria-label="Edit" onClick={() => onEdit?.(item)}><Pencil className="h-3.5 w-3.5" /></Button>
          <Button variant="danger" size="sm" aria-label="Hapus" onClick={() => onDelete?.(item)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      )
    });
  }

  return <Table columns={columns} data={classes} emptyText="Belum ada data kelas." />;
}
