import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { DetailGrid } from "@/components/common/DetailGrid";
import { FormAlert } from "@/components/common/FormAlert";
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
import { createUserAccount, resetUserPassword } from "@/services/adminService";
import { createTeacher, deleteTeacher as removeTeacher, updateTeacher } from "@/services/teacherService";
import type { ClassRoom } from "@/types/class";
import type { Subject } from "@/types/subject";
import type { Teacher } from "@/types/teacher";
import type { TeachingRelation } from "@/types/teachingRelation";

type ModalMode = "create" | "view" | "edit" | "delete" | "reset";

export function ManageTeachers() {
  const { teachers, isLoading, error, refetch } = useTeachers();
  const { classes } = useClasses();
  const { subjects } = useSubjects();
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [form, setForm] = useState<Teacher>(emptyTeacher());
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({ password: "", confirm: "" });
  const [createAccountForm, setCreateAccountForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [isSaving, setIsSaving] = useState(false);

  const filtered = useMemo(
    () => teachers.filter((teacher) => `${teacher.fullName} ${teacher.subjectName} ${teacher.classNames.join(" ")}`.toLowerCase().includes(search.toLowerCase())),
    [teachers, search]
  );

  const openCreate = () => {
    setSelected(null);
    setForm(emptyTeacher(classes[0], subjects[0]));
    setActionError("");
    setActionSuccess("");
    setCreateAccountForm({ username: "", email: "", password: "", confirm: "" });
    setModalMode("create");
  };

  const openEdit = (teacher: Teacher) => {
    setSelected(teacher);
    setForm(teacher);
    setActionError("");
    setActionSuccess("");
    setModalMode("edit");
  };

  const saveTeacher = async () => {
    setIsSaving(true);
    setActionError("");
    try {
      validateTeachingRelations(form.teachingRelations ?? []);
      if (modalMode === "edit" && selected) {
        await updateTeacher(selected.id, form);
      } else {
        if (form.nip && teachers.some((teacher) => teacher.nip === form.nip)) throw new Error("NIP sudah digunakan.");
        if (form.nuptk && teachers.some((teacher) => teacher.nuptk === form.nuptk)) throw new Error("NUPTK sudah digunakan.");
        if (createAccountForm.password.length < 8) throw new Error("Password minimal 8 karakter");
        if (createAccountForm.password !== createAccountForm.confirm) throw new Error("Konfirmasi password harus sama.");
        const account = await createUserAccount({
          role: "teacher",
          fullName: form.fullName,
          username: createAccountForm.username || form.nip || form.nuptk || "",
          email: createAccountForm.email,
          fallbackIdentifier: form.nip || form.nuptk || "",
          password: createAccountForm.password,
          phone: form.phone
        });
        await createTeacher({ ...form, profileId: account.profileId, username: account.username, email: account.email });
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

  const resetPassword = async () => {
    if (!selected?.profileId) {
      setActionError("Guru belum terhubung ke akun login.");
      return;
    }
    if (passwordForm.password.length < 8) {
      setActionError("Password minimal 8 karakter");
      return;
    }
    if (passwordForm.password !== passwordForm.confirm) {
      setActionError("Konfirmasi password harus sama.");
      return;
    }
    setIsSaving(true);
    setActionError("");
    setActionSuccess("");
    try {
      await resetUserPassword(selected.profileId, passwordForm.password);
      setActionSuccess("Password berhasil diperbarui");
      setPasswordForm({ password: "", confirm: "" });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Password gagal diperbarui.");
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
            onResetPassword={(teacher) => {
              setSelected(teacher);
              setPasswordForm({ password: "", confirm: "" });
              setActionError("");
              setActionSuccess("");
              setModalMode("reset");
            }}
          />
        )}
      </Card>
      {(modalMode === "create" || modalMode === "edit") && (
        <Modal title={modalMode === "create" ? "Tambah Data Guru" : "Edit Data Guru"} onClose={() => setModalMode(null)}>
          <TeacherEditor
            mode={modalMode}
            classes={classes}
            subjects={subjects}
            form={form}
            setForm={setForm}
            accountForm={createAccountForm}
            setAccountForm={setCreateAccountForm}
            error={actionError}
            isSaving={isSaving}
            onCancel={() => setModalMode(null)}
            onSave={saveTeacher}
          />
        </Modal>
      )}
      {modalMode === "view" && selected && (
        <Modal title="Detail Guru" onClose={() => setModalMode(null)}>
          <DetailGrid items={[
            { label: "Nama", value: selected.fullName },
            { label: "NIP", value: selected.nip || "-" },
            { label: "NUPTK", value: selected.nuptk || "-" },
            { label: "Jenis Kelamin", value: selected.gender === "P" ? "Perempuan" : selected.gender === "L" ? "Laki-laki" : "-" },
            { label: "Status Kepegawaian", value: selected.employmentStatus || "-" },
            { label: "Jenis PTK", value: selected.teacherType || "-" },
            { label: "Mata Pelajaran", value: selected.subjectName },
            { label: "Kelas Diajar", value: selected.classNames.join(", ") || "-" },
            { label: "No HP", value: selected.phone || "-" },
            { label: "Email / Gmail", value: selected.email || "-" },
            { label: "Username", value: selected.username || "-" },
            { label: "Status", value: selected.status === "active" ? "Aktif" : "Nonaktif" }
          ]} />
        </Modal>
      )}
      {modalMode === "reset" && selected && (
        <Modal title="Reset Password" onClose={() => setModalMode(null)}>
          <ResetPasswordPanel
            name={selected.fullName}
            identifier={[selected.nip, selected.nuptk].filter(Boolean).join(" / ") || "-"}
            password={passwordForm.password}
            confirm={passwordForm.confirm}
            error={actionError}
            success={actionSuccess}
            isSaving={isSaving}
            onChange={setPasswordForm}
            onCancel={() => setModalMode(null)}
            onSave={resetPassword}
          />
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
  const relation = classRoom && subject ? [emptyRelation(classRoom, subject)] : [];
  return {
    id: "",
    nip: "",
    nuptk: "",
    fullName: "",
    gender: "L",
    employmentStatus: "",
    teacherType: "",
    phone: "",
    email: "",
    subjectName: subject?.name ?? "",
    classNames: classRoom?.name ? [classRoom.name] : [],
    teachingRelations: relation,
    username: "",
    status: "active"
  };
}

function emptyRelation(classRoom?: ClassRoom, subject?: Subject): TeachingRelation {
  return {
    teacherId: "",
    classId: classRoom?.id ?? "",
    className: classRoom?.name ?? "",
    subjectId: subject?.id ?? "",
    subjectName: subject?.name ?? "",
    academicYear: classRoom?.academicYear ?? "2026/2027",
    semester: "ganjil",
    studentCount: 0
  };
}

function validateTeachingRelations(relations: TeachingRelation[]) {
  if (relations.length === 0) throw new Error("Relasi mengajar wajib diisi minimal satu baris.");
  const seen = new Set<string>();
  relations.forEach((relation) => {
    if (!relation.classId || !relation.subjectId || !relation.academicYear || !relation.semester) {
      throw new Error("Semua relasi mengajar wajib memilih kelas, mapel, tahun ajaran, dan semester.");
    }
    const key = `${relation.classId}-${relation.subjectId}-${relation.academicYear}-${relation.semester}`;
    if (seen.has(key)) throw new Error("Relasi mengajar tidak boleh duplikat.");
    seen.add(key);
  });
}

function TeacherEditor({
  mode,
  classes,
  subjects,
  form,
  setForm,
  accountForm,
  setAccountForm,
  error,
  isSaving,
  onCancel,
  onSave
}: {
  mode: "create" | "edit";
  classes: ClassRoom[];
  subjects: Subject[];
  form: Teacher;
  setForm: (teacher: Teacher) => void;
  accountForm: { username: string; email: string; password: string; confirm: string };
  setAccountForm: (value: { username: string; email: string; password: string; confirm: string }) => void;
  error: string;
  isSaving: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  const relations = form.teachingRelations?.length ? form.teachingRelations : [];

  const setRelations = (next: TeachingRelation[]) => {
    const classNames = Array.from(new Set(next.map((relation) => relation.className).filter(Boolean)));
    const subjectNames = Array.from(new Set(next.map((relation) => relation.subjectName).filter(Boolean)));
    setForm({ ...form, teachingRelations: next, classNames, subjectName: subjectNames.join(", ") || "-" });
  };

  const updateRelation = (index: number, updates: Partial<TeachingRelation>) => {
    const next = relations.map((relation, relationIndex) => relationIndex === index ? { ...relation, ...updates } : relation);
    setRelations(next);
  };

  const addRelation = () => {
    setRelations([...relations, emptyRelation(classes[0], subjects[0])]);
  };

  const removeRelation = (index: number) => {
    setRelations(relations.filter((_, relationIndex) => relationIndex !== index));
  };

  return (
    <div className="space-y-4">
      <FormAlert message={error} />
      {mode === "create" && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-950">Akun Login Guru</h3>
          <p className="mt-1 text-sm text-blue-800">Admin membuat akun login guru bersamaan dengan data guru.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Username Akun" value={accountForm.username} onChange={(event) => setAccountForm({ ...accountForm, username: event.target.value })} placeholder="Opsional, default NIP/NUPTK" />
            <Input label="Email / Gmail" type="email" value={accountForm.email} onChange={(event) => setAccountForm({ ...accountForm, email: event.target.value })} placeholder="Opsional, otomatis jika kosong" />
            <Input label="Password" type="password" value={accountForm.password} onChange={(event) => setAccountForm({ ...accountForm, password: event.target.value })} />
            <Input label="Konfirmasi Password" type="password" value={accountForm.confirm} onChange={(event) => setAccountForm({ ...accountForm, confirm: event.target.value })} />
          </div>
        </div>
      )}
      <Input label="Nama Guru" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "edit" && <Input label="Username Akun" value={form.username ?? ""} onChange={(event) => setForm({ ...form, username: event.target.value })} />}
        <Input label="NIP" value={form.nip ?? ""} onChange={(event) => setForm({ ...form, nip: event.target.value })} />
        <Input label="NUPTK" value={form.nuptk ?? ""} onChange={(event) => setForm({ ...form, nuptk: event.target.value })} />
        <Select label="Jenis Kelamin" value={form.gender ?? "L"} options={[{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }]} onChange={(event) => setForm({ ...form, gender: event.target.value as "L" | "P" })} />
        <Input label="Status Kepegawaian" value={form.employmentStatus ?? ""} onChange={(event) => setForm({ ...form, employmentStatus: event.target.value })} placeholder="PNS / PPPK / Honorer" />
        <Input label="Jenis PTK" value={form.teacherType ?? ""} onChange={(event) => setForm({ ...form, teacherType: event.target.value })} placeholder="Guru Mata Pelajaran" />
        <Input label="No HP" value={form.phone ?? ""} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        <Input label="Email / Gmail" type="email" value={form.email ?? ""} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <Select label="Status Akun" value={form.status} options={[{ value: "active", label: "Aktif" }, { value: "inactive", label: "Tidak Aktif" }]} onChange={(event) => setForm({ ...form, status: event.target.value as Teacher["status"] })} />
      </div>

      <div className="rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">Relasi Mengajar</p>
            <p className="mt-1 text-sm text-slate-500">Atur per baris agar tidak membuat kombinasi kelas dan mapel yang salah.</p>
          </div>
          <Button variant="outline" size="sm" onClick={addRelation} type="button">
            <Plus className="h-4 w-4" />Tambah Relasi
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {relations.length === 0 && (
            <p className="rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-500">Belum ada relasi. Tambahkan kelas dan mata pelajaran yang diajar guru.</p>
          )}
          {relations.map((relation, index) => (
            <div key={`${relation.id ?? "new"}-${index}`} className="grid gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 lg:grid-cols-[1fr_1fr_150px_130px_auto]">
              <Select
                label="Kelas"
                value={relation.classId}
                options={[{ value: "", label: "Pilih kelas" }, ...classes.map((classRoom) => ({ value: classRoom.id, label: classRoom.name }))]}
                onChange={(event) => {
                  const classRoom = classes.find((item) => item.id === event.target.value);
                  updateRelation(index, { classId: event.target.value, className: classRoom?.name ?? "", academicYear: classRoom?.academicYear ?? relation.academicYear });
                }}
              />
              <Select
                label="Mapel"
                value={relation.subjectId}
                options={[{ value: "", label: "Pilih mapel" }, ...subjects.map((subject) => ({ value: subject.id, label: subject.name }))]}
                onChange={(event) => {
                  const subject = subjects.find((item) => item.id === event.target.value);
                  updateRelation(index, { subjectId: event.target.value, subjectName: subject?.name ?? "" });
                }}
              />
              <Input label="Tahun Ajaran" value={relation.academicYear} onChange={(event) => updateRelation(index, { academicYear: event.target.value })} />
              <Select
                label="Semester"
                value={relation.semester}
                options={[{ value: "ganjil", label: "Ganjil" }, { value: "genap", label: "Genap" }]}
                onChange={(event) => updateRelation(index, { semester: event.target.value as TeachingRelation["semester"] })}
              />
              <div className="flex items-end">
                <Button variant="danger" size="sm" onClick={() => removeRelation(index)} type="button" className="w-full lg:w-auto">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan Guru"}</Button>
      </div>
    </div>
  );
}

function ResetPasswordPanel({ name, identifier, password, confirm, error, success, isSaving, onChange, onCancel, onSave }: { name: string; identifier: string; password: string; confirm: string; error: string; success: string; isSaving: boolean; onChange: (value: { password: string; confirm: string }) => void; onCancel: () => void; onSave: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
        <p className="font-semibold">{name}</p>
        <p>Identifier login: {identifier}</p>
      </div>
      <FormAlert message={error} />
      <FormAlert message={success} tone="success" />
      <Input label="Password Baru" type="password" value={password} onChange={(event) => onChange({ password: event.target.value, confirm })} />
      <Input label="Konfirmasi Password" type="password" value={confirm} onChange={(event) => onChange({ password, confirm: event.target.value })} />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Batal</Button>
        <Button onClick={onSave} disabled={isSaving}>{isSaving ? "Menyimpan..." : "Simpan Password"}</Button>
      </div>
    </div>
  );
}
