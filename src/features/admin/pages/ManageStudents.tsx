import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { DetailGrid } from "@/components/common/DetailGrid";
import { FilterDropdown } from "@/components/common/FilterDropdown";
import { Input } from "@/components/common/Input";
import { Loading } from "@/components/common/Loading";
import { Modal } from "@/components/common/Modal";
import { SearchBar } from "@/components/common/SearchBar";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentTable } from "@/components/tables/StudentTable";
import { useClasses } from "@/hooks/useClasses";
import { useStudents } from "@/hooks/useStudents";
import { createStudent, deleteStudent as removeStudent, updateStudent } from "@/services/studentService";
import type { ClassRoom } from "@/types/class";
import type { Student } from "@/types/student";

type ModalMode = "create" | "view" | "edit" | "delete";

export function ManageStudents() {
  const { students, isLoading, error, refetch } = useStudents();
  const { classes } = useClasses();
  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selected, setSelected] = useState<Student | null>(null);
  const [form, setForm] = useState<Student>(emptyStudent());
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const filtered = useMemo(
    () => students.filter((student) => (student.fullName.toLowerCase().includes(search.toLowerCase()) || student.nis.includes(search) || student.nisn.includes(search)) && (!className || student.className === className)),
    [students, search, className]
  );

  const openCreate = () => {
    setForm(emptyStudent(classes[0]));
    setSelected(null);
    setActionError("");
    setModalMode("create");
  };

  const openEdit = (student: Student) => {
    setForm(student);
    setSelected(student);
    setActionError("");
    setModalMode("edit");
  };

  const saveStudent = async () => {
    setIsSaving(true);
    setActionError("");
    try {
      if (modalMode === "edit" && selected) {
        await updateStudent(selected.id, form);
      } else {
        await createStudent(form);
      }
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Data siswa gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteStudent = async () => {
    if (!selected) return;
    setIsSaving(true);
    setActionError("");
    try {
      await removeStudent(selected.id);
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Data siswa gagal dihapus.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Data Siswa" actions={<Button onClick={openCreate}><Plus className="h-4 w-4" />Tambah Siswa</Button>} />
      <Card>
        <div className="mb-5 flex flex-wrap gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Cari nama, NIS, atau NISN..." />
          <FilterDropdown value={className} onChange={setClassName} options={classes.map((item) => ({ value: item.name, label: item.name }))} placeholder="Semua Kelas" />
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <StudentTable
            students={filtered}
            onView={(student) => {
              setSelected(student);
              setModalMode("view");
            }}
            onEdit={openEdit}
            onDelete={(student) => {
              setSelected(student);
              setActionError("");
              setModalMode("delete");
            }}
          />
        )}
        <p className="mt-4 text-sm text-slate-500">Menampilkan {filtered.length} dari {students.length} siswa</p>
      </Card>
      {(modalMode === "create" || modalMode === "edit") && (
        <Modal title={modalMode === "create" ? "Tambah Siswa" : "Edit Siswa"} onClose={() => setModalMode(null)}>
          <StudentEditor classes={classes} form={form} setForm={setForm} error={actionError} isSaving={isSaving} onCancel={() => setModalMode(null)} onSave={saveStudent} />
        </Modal>
      )}
      {modalMode === "view" && selected && (
        <Modal title="Detail Siswa" onClose={() => setModalMode(null)}>
          <DetailGrid items={[
            { label: "Nama", value: selected.fullName },
            { label: "NIS", value: selected.nis },
            { label: "NISN", value: selected.nisn },
            { label: "Kelas", value: selected.className },
            { label: "Jenis Kelamin", value: selected.gender === "L" ? "Laki-laki" : "Perempuan" },
            { label: "Username", value: selected.username || "-" },
            { label: "Status", value: selected.status === "active" ? "Aktif" : "Nonaktif" }
          ]} />
        </Modal>
      )}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Siswa" onClose={() => setModalMode(null)}>
          {actionError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{actionError}</p>}
          <ConfirmDelete label={selected.fullName} onCancel={() => setModalMode(null)} onConfirm={deleteStudent} />
        </Modal>
      )}
    </div>
  );
}

function emptyStudent(classRoom?: ClassRoom): Student {
  return { id: "", nis: "", nisn: "", fullName: "", classId: classRoom?.id ?? "", className: classRoom?.name ?? "", gender: "L", username: "", status: "active" };
}

function StudentEditor({ classes, form, setForm, error, isSaving, onCancel, onSave }: { classes: ClassRoom[]; form: Student; setForm: (student: Student) => void; error: string; isSaving: boolean; onCancel: () => void; onSave: () => void }) {
  const classOptions = classes.map((item) => ({ value: item.id, label: item.name }));

  return (
    <div className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <Input label="Nama Siswa" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="NIS" value={form.nis} onChange={(event) => setForm({ ...form, nis: event.target.value })} />
        <Input label="NISN" value={form.nisn} onChange={(event) => setForm({ ...form, nisn: event.target.value })} />
        <Select label="Kelas" value={form.classId} options={classOptions} placeholder="Pilih kelas" onChange={(event) => {
          const classRoom = classes.find((item) => item.id === event.target.value);
          setForm({ ...form, classId: event.target.value, className: classRoom?.name ?? "" });
        }} />
        <Select label="Jenis Kelamin" value={form.gender} options={[{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }]} onChange={(event) => setForm({ ...form, gender: event.target.value as "L" | "P" })} />
        <Input label="Username Akun" value={form.username} disabled className="text-slate-400" />
        <Select label="Status" value={form.status} options={[{ value: "active", label: "Aktif" }, { value: "inactive", label: "Nonaktif" }]} onChange={(event) => setForm({ ...form, status: event.target.value as Student["status"] })} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan"}</Button>
      </div>
    </div>
  );
}
