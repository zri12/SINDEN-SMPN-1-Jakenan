import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Input } from "@/components/common/Input";
import { Loading } from "@/components/common/Loading";
import { Modal } from "@/components/common/Modal";
import { SearchBar } from "@/components/common/SearchBar";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeacherTable } from "@/components/tables/TeacherTable";
import { useClasses } from "@/hooks/useClasses";
import { useSubjects } from "@/hooks/useSubjects";
import { useTeachers } from "@/hooks/useTeachers";
import { createTeacher, deleteTeacher as removeTeacher, updateTeacher } from "@/services/teacherService";
import type { ClassRoom } from "@/types/class";
import type { Subject } from "@/types/subject";
import type { Teacher } from "@/types/teacher";

type ModalMode = "create" | "view" | "edit" | "delete";

export function ManageTeachers() {
  const { teachers, isLoading, error, refetch } = useTeachers();
  const { classes } = useClasses();
  const { subjects } = useSubjects();
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [form, setForm] = useState<Teacher>(emptyTeacher());
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const filtered = useMemo(
    () => teachers.filter((teacher) => `${teacher.fullName} ${teacher.subjectName} ${teacher.classNames.join(" ")}`.toLowerCase().includes(search.toLowerCase())),
    [teachers, search]
  );

  const openCreate = () => {
    setSelected(null);
    setForm(emptyTeacher(classes[0], subjects[0]));
    setActionError("");
    setModalMode("create");
  };

  const openEdit = (teacher: Teacher) => {
    setSelected(teacher);
    setForm(teacher);
    setActionError("");
    setModalMode("edit");
  };

  const saveTeacher = async () => {
    setIsSaving(true);
    setActionError("");
    try {
      if (modalMode === "edit" && selected) {
        await updateTeacher(selected.id, form);
      } else {
        await createTeacher(form);
      }
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Data guru gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTeacher = async () => {
    if (!selected) return;
    setIsSaving(true);
    setActionError("");
    try {
      await removeTeacher(selected.id);
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Data guru gagal dihapus.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Data Guru" actions={<Button onClick={openCreate}><Plus className="h-4 w-4" />Tambah Guru</Button>} />
      <Card>
        <div className="mb-5"><SearchBar value={search} onChange={setSearch} placeholder="Cari guru, mapel, atau kelas..." /></div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <TeacherTable
            teachers={filtered}
            onView={(teacher) => {
              setSelected(teacher);
              setModalMode("view");
            }}
            onEdit={openEdit}
            onDelete={(teacher) => {
              setSelected(teacher);
              setActionError("");
              setModalMode("delete");
            }}
          />
        )}
      </Card>
      {(modalMode === "create" || modalMode === "edit") && (
        <Modal title={modalMode === "create" ? "Tambah Guru" : "Edit Guru"} onClose={() => setModalMode(null)}>
          <TeacherEditor classes={classes} subjects={subjects} form={form} setForm={setForm} error={actionError} isSaving={isSaving} onCancel={() => setModalMode(null)} onSave={saveTeacher} />
        </Modal>
      )}
      {modalMode === "view" && selected && (
        <Modal title="Detail Guru" onClose={() => setModalMode(null)}>
          <DetailGrid items={[
            { label: "Nama", value: selected.fullName },
            { label: "NIP/NUPTK", value: selected.nip || selected.nuptk || "-" },
            { label: "Mata Pelajaran", value: selected.subjectName },
            { label: "Kelas Diajar", value: selected.classNames.join(", ") || "-" },
            { label: "Username", value: selected.username || "-" },
            { label: "Status", value: selected.status === "active" ? "Aktif" : "Nonaktif" }
          ]} />
        </Modal>
      )}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Guru" onClose={() => setModalMode(null)}>
          {actionError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{actionError}</p>}
          <ConfirmDelete label={selected.fullName} onCancel={() => setModalMode(null)} onConfirm={deleteTeacher} />
        </Modal>
      )}
    </div>
  );
}

function emptyTeacher(classRoom?: ClassRoom, subject?: Subject): Teacher {
  return { id: "", nip: "", fullName: "", subjectName: subject?.name ?? "", classNames: classRoom?.name ? [classRoom.name] : [], username: "", status: "active" };
}

function TeacherEditor({ classes, subjects, form, setForm, error, isSaving, onCancel, onSave }: { classes: ClassRoom[]; subjects: Subject[]; form: Teacher; setForm: (teacher: Teacher) => void; error: string; isSaving: boolean; onCancel: () => void; onSave: () => void }) {
  const selectedSubjects = splitNames(form.subjectName);

  const toggleSubject = (name: string) => {
    const next = selectedSubjects.includes(name) ? selectedSubjects.filter((item) => item !== name) : [...selectedSubjects, name];
    setForm({ ...form, subjectName: next.join(", ") });
  };

  const toggleClass = (name: string) => {
    const next = form.classNames.includes(name) ? form.classNames.filter((item) => item !== name) : [...form.classNames, name];
    setForm({ ...form, classNames: next });
  };

  return (
    <div className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <Input label="Nama Guru" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="NIP/NUPTK" value={form.nip ?? ""} onChange={(event) => setForm({ ...form, nip: event.target.value })} />
        <Input label="Username Akun" value={form.username} disabled className="text-slate-400" />
        <Select label="Status" value={form.status} options={[{ value: "active", label: "Aktif" }, { value: "inactive", label: "Nonaktif" }]} onChange={(event) => setForm({ ...form, status: event.target.value as Teacher["status"] })} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Mata Pelajaran</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {subjects.map((subject) => (
            <label key={subject.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <input type="checkbox" checked={selectedSubjects.includes(subject.name)} onChange={() => toggleSubject(subject.name)} />
              {subject.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Kelas Diajar</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {classes.map((classRoom) => (
            <label key={classRoom.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.classNames.includes(classRoom.name)} onChange={() => toggleClass(classRoom.name)} />
              {classRoom.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan"}</Button>
      </div>
    </div>
  );
}

function splitNames(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
