import { useEffect, useMemo, useState } from "react";
import { Check, Mail, Phone, School, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { useClasses } from "@/hooks/useClasses";
import { useSubjects } from "@/hooks/useSubjects";
import { getCurrentTeacherProfile, updateCurrentTeacherProfile } from "@/services/profileService";
import type { TeacherProfileData, TeacherProfileUpdate } from "@/services/profileService";

type TeacherProfileForm = TeacherProfileUpdate & {
  email: string;
};

const emptyProfile: TeacherProfileData = {
  teacherId: "",
  profileId: "",
  fullName: "",
  username: "",
  email: "",
  phone: "",
  subjectIds: [],
  subjectNames: [],
  classIds: [],
  classNames: [],
  academicYear: "",
  semester: "genap",
  isActive: true
};

export function TeacherProfile() {
  const { classes } = useClasses();
  const { subjects } = useSubjects();
  const [profile, setProfile] = useState<TeacherProfileData>(emptyProfile);
  const [draft, setDraft] = useState<TeacherProfileForm>(toDraft(emptyProfile));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    getCurrentTeacherProfile()
      .then((result) => {
        if (ignore) return;
        setProfile(result);
        setDraft(toDraft(result));
        setError(null);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : "Profile guru gagal dimuat.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const academicYearOptions = useMemo(() => {
    const years = Array.from(new Set([profile.academicYear, ...classes.map((classRoom) => classRoom.academicYear)].filter(Boolean)));
    return years.map((year) => ({ value: year, label: year }));
  }, [classes, profile.academicYear]);

  const selectedSubjectNames = profile.subjectNames.length ? profile.subjectNames : subjects.filter((subject) => profile.subjectIds.includes(subject.id)).map((subject) => subject.name);
  const selectedClassNames = profile.classNames.length ? profile.classNames : classes.filter((classRoom) => profile.classIds.includes(classRoom.id)).map((classRoom) => classRoom.name);

  const toggleClass = (classId: string) => {
    const exists = draft.classIds.includes(classId);
    setDraft({
      ...draft,
      classIds: exists ? draft.classIds.filter((item) => item !== classId) : [...draft.classIds, classId]
    });
  };

  const toggleSubject = (subjectId: string) => {
    const exists = draft.subjectIds.includes(subjectId);
    setDraft({
      ...draft,
      subjectIds: exists ? draft.subjectIds.filter((item) => item !== subjectId) : [...draft.subjectIds, subjectId]
    });
  };

  const saveProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateCurrentTeacherProfile({
        fullName: draft.fullName,
        username: draft.username,
        phone: draft.phone,
        subjectIds: draft.subjectIds,
        classIds: draft.classIds,
        academicYear: draft.academicYear,
        semester: draft.semester
      });
      setProfile(updated);
      setDraft(toDraft(updated));
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile guru gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setDraft(toDraft(profile));
    setIsEditing(false);
    setError(null);
  };

  return (
    <div>
      <PageHeader
        title="Profile Guru"
        description="Informasi akun guru yang sedang login."
        actions={
          isEditing ? (
            <>
              <Button variant="secondary" onClick={cancelEdit}>Batal</Button>
              <Button onClick={saveProfile} disabled={isSaving}><Check className="h-4 w-4" />Simpan Profile</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} disabled={isLoading}>Edit Profile</Button>
          )
        }
      />
      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserCircle className="h-14 w-14" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-900">{profile.fullName || "Guru"}</h2>
          <p className="text-sm text-slate-500">Guru {selectedSubjectNames.join(", ") || "-"}</p>
          <div className="mt-5 space-y-3 text-left text-sm">
            <ProfileLine icon={Mail} label="Email" value={profile.email || "-"} />
            <ProfileLine icon={Phone} label="No. HP" value={profile.phone || "-"} />
            <ProfileLine icon={School} label="Kelas" value={selectedClassNames.join(", ") || "-"} />
          </div>
        </Card>
        <Card>
          {isEditing ? (
            <div>
              <div className="mb-5 border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-900">Edit Profile Guru</h3>
                <p className="mt-1 text-sm text-slate-500">Perubahan disimpan langsung ke Supabase dan tetap ada setelah halaman di-refresh.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Nama Lengkap" value={draft.fullName} onChange={(event) => setDraft({ ...draft, fullName: event.target.value })} />
                <Input label="Username" value={draft.username} onChange={(event) => setDraft({ ...draft, username: event.target.value })} />
                <Input label="Gmail Guru" type="email" value={draft.email} disabled />
                <Input label="No HP" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
                <Select
                  label="Tahun Ajaran"
                  value={draft.academicYear}
                  options={academicYearOptions}
                  onChange={(event) => setDraft({ ...draft, academicYear: event.target.value })}
                />
                <Select
                  label="Semester"
                  value={draft.semester}
                  options={[
                    { value: "ganjil", label: "Semester 1" },
                    { value: "genap", label: "Semester 2" }
                  ]}
                  onChange={(event) => setDraft({ ...draft, semester: event.target.value as "ganjil" | "genap" })}
                />
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">Mata Pelajaran Diampu</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects.map((subject) => {
                    const active = draft.subjectIds.includes(subject.id);
                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => toggleSubject(subject.id)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                          active ? "border-blue-300 bg-blue-50 font-semibold text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200"
                        }`}
                      >
                        {subject.name}
                        <span className="ml-2 text-xs text-slate-400">KKM {subject.kkm}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">Kelas Diajar</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {classes.map((classRoom) => {
                    const active = draft.classIds.includes(classRoom.id);
                    return (
                      <button
                        key={classRoom.id}
                        type="button"
                        onClick={() => toggleClass(classRoom.id)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                          active ? "border-blue-300 bg-blue-50 font-semibold text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200"
                        }`}
                      >
                        {classRoom.name}
                        <span className="ml-2 text-xs text-slate-400">Kelas {classRoom.gradeLevel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3 className="mb-4 font-semibold text-slate-900">Detail Akun</h3>
              <DetailGrid items={[
                { label: "Nama Lengkap", value: profile.fullName || "-" },
                { label: "Username", value: profile.username || "-" },
                { label: "Email / Gmail", value: profile.email || "-" },
                { label: "No HP", value: profile.phone || "-" },
                { label: "Role", value: "Guru" },
                { label: "Mata Pelajaran", value: selectedSubjectNames.join(", ") || "-" },
                { label: "Kelas Diajar", value: selectedClassNames.join(", ") || "-" },
                { label: "Tahun Ajaran", value: profile.academicYear || "-" },
                { label: "Status Akun", value: profile.isActive ? "Aktif" : "Tidak Aktif" }
              ]} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function toDraft(profile: TeacherProfileData): TeacherProfileForm {
  return {
    fullName: profile.fullName,
    username: profile.username,
    email: profile.email,
    phone: profile.phone,
    subjectIds: profile.subjectIds,
    classIds: profile.classIds,
    academicYear: profile.academicYear,
    semester: profile.semester
  };
}

function ProfileLine({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
      <Icon className="h-4 w-4 text-blue-600" />
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
