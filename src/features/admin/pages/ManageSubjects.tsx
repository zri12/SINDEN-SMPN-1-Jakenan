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
import { SubjectTable } from "@/components/tables/SubjectTable";
import { useSubjects } from "@/hooks/useSubjects";
import { createSubject, deleteSubject as removeSubject, updateSubject } from "@/services/subjectService";
import type { Subject } from "@/types/subject";

type ModalMode = "create" | "view" | "edit" | "delete";

export function ManageSubjects() {
  const { subjects, isLoading, error, refetch } = useSubjects();
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selected, setSelected] = useState<Subject | null>(null);
  const [form, setForm] = useState<Subject>(emptySubject());
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    setSelected(null);
    setForm(emptySubject());
    setActionError("");
    setModalMode("create");
  };

  const saveSubject = async () => {
    setIsSaving(true);
    setActionError("");
    try {
      if (modalMode === "edit" && selected) {
        await updateSubject(selected.id, form);
      } else {
        await createSubject(form);
      }
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Mata pelajaran gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteSubject = async () => {
    if (!selected) return;
    setIsSaving(true);
    setActionError("");
    try {
      await removeSubject(selected.id);
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Mata pelajaran gagal dihapus.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Mata Pelajaran" actions={<Button onClick={openCreate}><Plus className="h-4 w-4" />Tambah Mapel</Button>} />
      <Card>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <SubjectTable
            subjects={subjects}
            showActions
            onView={(item) => { setSelected(item); setModalMode("view"); }}
            onEdit={(item) => { setSelected(item); setForm(item); setActionError(""); setModalMode("edit"); }}
            onDelete={(item) => { setSelected(item); setActionError(""); setModalMode("delete"); }}
          />
        )}
      </Card>
      {(modalMode === "create" || modalMode === "edit") && (
        <Modal title={modalMode === "create" ? "Tambah Mata Pelajaran" : "Edit Mata Pelajaran"} onClose={() => setModalMode(null)}>
          <SubjectEditor form={form} setForm={setForm} error={actionError} isSaving={isSaving} onCancel={() => setModalMode(null)} onSave={saveSubject} />
        </Modal>
      )}
      {modalMode === "view" && selected && (
        <Modal title="Detail Mata Pelajaran" onClose={() => setModalMode(null)}>
          <DetailGrid items={[
            { label: "Kode", value: selected.code },
            { label: "Nama", value: selected.name },
            { label: "KKM", value: selected.kkm },
            { label: "Status", value: selected.status === "active" ? "Aktif" : "Nonaktif" }
          ]} />
        </Modal>
      )}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Mata Pelajaran" onClose={() => setModalMode(null)}>
          {actionError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{actionError}</p>}
          <ConfirmDelete label={selected.name} onCancel={() => setModalMode(null)} onConfirm={deleteSubject} />
        </Modal>
      )}
    </div>
  );
}

function emptySubject(): Subject {
  return { id: "", code: "", name: "", kkm: 75, status: "active" };
}

function SubjectEditor({ form, setForm, error, isSaving, onCancel, onSave }: { form: Subject; setForm: (subject: Subject) => void; error: string; isSaving: boolean; onCancel: () => void; onSave: () => void }) {
  return (
    <div className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Kode Mapel" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
        <Input label="Nama Mapel" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <Input label="KKM" type="number" min={0} max={100} value={form.kkm} onChange={(event) => setForm({ ...form, kkm: Number(event.target.value) })} />
        <Select label="Status" value={form.status} options={[{ value: "active", label: "Aktif" }, { value: "inactive", label: "Nonaktif" }]} onChange={(event) => setForm({ ...form, status: event.target.value as Subject["status"] })} />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan"}</Button>
      </div>
    </div>
  );
}
