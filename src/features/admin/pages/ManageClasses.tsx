import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Input } from "@/components/common/Input";
import { Loading } from "@/components/common/Loading";
import { Modal } from "@/components/common/Modal";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClassTable } from "@/components/tables/ClassTable";
import { useClasses } from "@/hooks/useClasses";
import { createClass, deleteClass as removeClass, updateClass } from "@/services/classService";
import type { ClassRoom } from "@/types/class";

type ModalMode = "create" | "view" | "edit" | "delete";

export function ManageClasses() {
  const { classes, isLoading, error, refetch } = useClasses();
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selected, setSelected] = useState<ClassRoom | null>(null);
  const [form, setForm] = useState<ClassRoom>(emptyClass());
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    setSelected(null);
    setForm(emptyClass());
    setActionError("");
    setModalMode("create");
  };

  const saveClass = async () => {
    setIsSaving(true);
    setActionError("");
    try {
      if (modalMode === "edit" && selected) {
        await updateClass(selected.id, form);
      } else {
        await createClass(form);
      }
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Data kelas gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteClass = async () => {
    if (!selected) return;
    setIsSaving(true);
    setActionError("");
    try {
      await removeClass(selected.id);
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Data kelas gagal dihapus.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Data Kelas" actions={<Button onClick={openCreate}><Plus className="h-4 w-4" />Tambah Kelas</Button>} />
      <Card>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <ClassTable
            classes={classes}
            showActions
            onView={(item) => { setSelected(item); setModalMode("view"); }}
            onEdit={(item) => { setSelected(item); setForm(item); setActionError(""); setModalMode("edit"); }}
            onDelete={(item) => { setSelected(item); setActionError(""); setModalMode("delete"); }}
          />
        )}
      </Card>
      {(modalMode === "create" || modalMode === "edit") && (
        <Modal title={modalMode === "create" ? "Tambah Kelas" : "Edit Kelas"} onClose={() => setModalMode(null)}>
          <ClassEditor form={form} setForm={setForm} error={actionError} isSaving={isSaving} onCancel={() => setModalMode(null)} onSave={saveClass} />
        </Modal>
      )}
      {modalMode === "view" && selected && (
        <Modal title="Detail Kelas" onClose={() => setModalMode(null)}>
          <DetailGrid items={[
            { label: "Nama Kelas", value: selected.name },
            { label: "Tingkat", value: `Kelas ${selected.gradeLevel}` },
            { label: "Tahun Ajaran", value: selected.academicYear },
            { label: "Jumlah Siswa", value: selected.studentCount }
          ]} />
        </Modal>
      )}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Kelas" onClose={() => setModalMode(null)}>
          {actionError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{actionError}</p>}
          <ConfirmDelete label={selected.name} onCancel={() => setModalMode(null)} onConfirm={deleteClass} />
        </Modal>
      )}
    </div>
  );
}

function emptyClass(): ClassRoom {
  return { id: "", name: "", gradeLevel: 7, academicYear: "2026/2027", studentCount: 0 };
}

function ClassEditor({ form, setForm, error, isSaving, onCancel, onSave }: { form: ClassRoom; setForm: (classRoom: ClassRoom) => void; error: string; isSaving: boolean; onCancel: () => void; onSave: () => void }) {
  return (
    <div className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <Input label="Nama Kelas" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Tingkat" value={String(form.gradeLevel)} options={[7, 8, 9].map((value) => ({ value: String(value), label: `Kelas ${value}` }))} onChange={(event) => setForm({ ...form, gradeLevel: Number(event.target.value) as 7 | 8 | 9 })} />
        <Input label="Tahun Ajaran" value={form.academicYear} onChange={(event) => setForm({ ...form, academicYear: event.target.value })} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan"}</Button>
      </div>
    </div>
  );
}
