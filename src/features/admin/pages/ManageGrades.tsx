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
import { GradeTable } from "@/components/tables/GradeTable";
import { useGrades } from "@/hooks/useGrades";
import { useStudents } from "@/hooks/useStudents";
import { useSubjects } from "@/hooks/useSubjects";
import { useTeachers } from "@/hooks/useTeachers";
import { createGrade, deleteGrade as removeGrade, updateGrade } from "@/services/gradeService";
import type { Grade } from "@/types/grade";

type ModalMode = "create" | "view" | "edit" | "delete";

export function ManageGrades() {
  const { grades, isLoading, error, refetch } = useGrades();
  const { students } = useStudents();
  const { teachers } = useTeachers();
  const { subjects } = useSubjects();
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selected, setSelected] = useState<Grade | null>(null);
  const [form, setForm] = useState<Grade>(emptyGrade());
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    setSelected(null);
    setForm(emptyGrade({
      student: students[0],
      teacher: teachers[0],
      subject: subjects[0]
    }));
    setActionError("");
    setModalMode("create");
  };

  const saveGrade = async () => {
    setIsSaving(true);
    setActionError("");
    try {
      if (modalMode === "edit" && selected) {
        await updateGrade(selected.id, form);
      } else {
        await createGrade(form);
      }
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Nilai gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteGrade = async () => {
    if (!selected) return;
    setIsSaving(true);
    setActionError("");
    try {
      await removeGrade(selected.id);
      await refetch();
      setModalMode(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Nilai gagal dihapus.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Data Nilai" description="Pantau dan kelola nilai yang sudah diinput guru." actions={<Button onClick={openCreate}><Plus className="h-4 w-4" />Tambah Nilai</Button>} />
      <Card>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <GradeTable
            grades={grades}
            showActions
            onView={(grade) => { setSelected(grade); setModalMode("view"); }}
            onEdit={(grade) => { setSelected(grade); setForm(grade); setActionError(""); setModalMode("edit"); }}
            onDelete={(grade) => { setSelected(grade); setActionError(""); setModalMode("delete"); }}
          />
        )}
      </Card>
      {(modalMode === "create" || modalMode === "edit") && (
        <Modal title={modalMode === "create" ? "Tambah Nilai" : "Edit Nilai"} onClose={() => setModalMode(null)}>
          <GradeEditor
            form={form}
            setForm={setForm}
            students={students}
            teachers={teachers}
            subjects={subjects}
            error={actionError}
            isSaving={isSaving}
            onCancel={() => setModalMode(null)}
            onSave={saveGrade}
          />
        </Modal>
      )}
      {modalMode === "view" && selected && (
        <Modal title="Detail Nilai" onClose={() => setModalMode(null)}>
          <DetailGrid items={[
            { label: "Siswa", value: selected.studentName },
            { label: "Kelas", value: selected.className },
            { label: "Mapel", value: selected.subjectName },
            { label: "Jenis Nilai", value: selected.gradeType.replace("_", " ") },
            { label: "Nilai", value: selected.score },
            { label: "KKM", value: selected.kkm },
            { label: "Guru", value: selected.teacherName }
          ]} />
        </Modal>
      )}
      {modalMode === "delete" && selected && (
        <Modal title="Hapus Nilai" onClose={() => setModalMode(null)}>
          {actionError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{actionError}</p>}
          <ConfirmDelete label={`${selected.studentName} - ${selected.subjectName}`} onCancel={() => setModalMode(null)} onConfirm={deleteGrade} />
        </Modal>
      )}
    </div>
  );
}

function emptyGrade(data?: { student?: any; teacher?: any; subject?: any }): Grade {
  const student = data?.student;
  const teacher = data?.teacher;
  const subject = data?.subject;
  return {
    id: "",
    studentId: student?.id ?? "",
    studentName: student?.fullName ?? "",
    teacherId: teacher?.id ?? "",
    teacherName: teacher?.fullName ?? "",
    classId: student?.classId ?? "",
    className: student?.className ?? "",
    subjectId: subject?.id ?? "",
    subjectName: subject?.name ?? "",
    semester: "Semester 1",
    gradeType: "tugas",
    score: 75,
    kkm: subject?.kkm ?? 75
  };
}

function GradeEditor({ form, setForm, students, teachers, subjects, error, isSaving, onCancel, onSave }: { form: Grade; setForm: (grade: Grade) => void; students: any[]; teachers: any[]; subjects: any[]; error: string; isSaving: boolean; onCancel: () => void; onSave: () => void }) {
  return (
    <div className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Siswa" value={form.studentId} placeholder="Pilih siswa" options={students.map((item) => ({ value: item.id, label: `${item.fullName} - ${item.className}` }))} onChange={(event) => {
          const student = students.find((item) => item.id === event.target.value);
          if (student) setForm({ ...form, studentId: student.id, studentName: student.fullName, classId: student.classId, className: student.className });
        }} />
        <Select label="Guru" value={form.teacherId} placeholder="Pilih guru" options={teachers.map((item) => ({ value: item.id, label: item.fullName }))} onChange={(event) => {
          const teacher = teachers.find((item) => item.id === event.target.value);
          if (teacher) setForm({ ...form, teacherId: teacher.id, teacherName: teacher.fullName });
        }} />
        <Select label="Mapel" value={form.subjectId} placeholder="Pilih mapel" options={subjects.map((item) => ({ value: item.id, label: item.name }))} onChange={(event) => {
          const subject = subjects.find((item) => item.id === event.target.value);
          if (subject) setForm({ ...form, subjectId: subject.id, subjectName: subject.name, kkm: subject.kkm });
        }} />
        <Select label="Semester" value={form.semester} options={[{ value: "Semester 1", label: "Semester 1" }, { value: "Semester 2", label: "Semester 2" }]} onChange={(event) => setForm({ ...form, semester: event.target.value })} />
        <Select label="Jenis Nilai" value={form.gradeType} options={[{ value: "tugas", label: "Tugas" }, { value: "ulangan_harian", label: "Ulangan Harian" }, { value: "pts", label: "PTS" }, { value: "pas", label: "PAS" }, { value: "praktik", label: "Praktik" }, { value: "remedial", label: "Remedial" }]} onChange={(event) => setForm({ ...form, gradeType: event.target.value as Grade["gradeType"] })} />
        <Input label="Nilai" type="number" min={0} max={100} value={form.score} onChange={(event) => setForm({ ...form, score: Number(event.target.value) })} />
        <Input label="KKM" type="number" min={0} max={100} value={form.kkm} onChange={(event) => setForm({ ...form, kkm: Number(event.target.value) })} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan"}</Button>
      </div>
    </div>
  );
}
