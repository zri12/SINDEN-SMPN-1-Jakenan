import { useMemo, useState } from "react";
import { Check, Mail, Phone, School, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { dummyClasses } from "@/data/dummyClasses";
import { dummySubjects } from "@/data/dummySubjects";

interface TeacherProfileForm {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  subjectIds: string[];
  classNames: string[];
  academicYear: string;
}

const initialProfile: TeacherProfileForm = {
  fullName: "Bapak Fauzan",
  username: "guru",
  email: "guru@smp1jakenan.sch.id",
  phone: "08xx-xxxx-xxxx",
  subjectIds: ["subject-mtk", "subject-ipa"],
  classNames: ["7A", "7B", "8A"],
  academicYear: "2026/2027"
};

export function TeacherProfile() {
  const [profile, setProfile] = useState<TeacherProfileForm>(initialProfile);
  const [draft, setDraft] = useState<TeacherProfileForm>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const academicYearOptions = useMemo(() => {
    const years = Array.from(new Set(dummyClasses.map((classRoom) => classRoom.academicYear)));
    return [...years, "2027/2028"].map((year) => ({ value: year, label: year }));
  }, []);

  const selectedSubjects = dummySubjects.filter((subject) => profile.subjectIds.includes(subject.id));
  const draftSubjects = dummySubjects.filter((subject) => draft.subjectIds.includes(subject.id));

  const toggleClass = (className: string) => {
    const exists = draft.classNames.includes(className);
    setDraft({
      ...draft,
      classNames: exists ? draft.classNames.filter((item) => item !== className) : [...draft.classNames, className]
    });
  };

  const toggleSubject = (subjectId: string) => {
    const exists = draft.subjectIds.includes(subjectId);
    setDraft({
      ...draft,
      subjectIds: exists ? draft.subjectIds.filter((item) => item !== subjectId) : [...draft.subjectIds, subjectId]
    });
  };

  const saveProfile = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setIsEditing(false);
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
              <Button onClick={saveProfile}><Check className="h-4 w-4" />Simpan Profile</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )
        }
      />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserCircle className="h-14 w-14" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-900">{profile.fullName}</h2>
          <p className="text-sm text-slate-500">Guru {selectedSubjects.map((subject) => subject.name).join(", ") || "-"}</p>
          <div className="mt-5 space-y-3 text-left text-sm">
            <ProfileLine icon={Mail} label="Email" value={profile.email} />
            <ProfileLine icon={Phone} label="No. HP" value={profile.phone} />
            <ProfileLine icon={School} label="Kelas" value={profile.classNames.join(", ")} />
          </div>
        </Card>
        <Card>
          {isEditing ? (
            <div>
              <div className="mb-5 border-b border-slate-100 pb-4">
                <h3 className="font-semibold text-slate-900">Edit Profile Guru</h3>
                <p className="mt-1 text-sm text-slate-500">Data masih dummy lokal dan siap disambungkan ke Supabase pada tahap berikutnya.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Nama Lengkap" value={draft.fullName} onChange={(event) => setDraft({ ...draft, fullName: event.target.value })} />
                <Input label="Username" value={draft.username} onChange={(event) => setDraft({ ...draft, username: event.target.value })} />
                <Input label="Gmail Guru" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
                <Input label="No HP" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
                <Select
                  label="Tahun Ajaran"
                  value={draft.academicYear}
                  options={academicYearOptions}
                  onChange={(event) => setDraft({ ...draft, academicYear: event.target.value })}
                />
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">Mata Pelajaran Diampu</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {dummySubjects.map((subject) => {
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
                  {dummyClasses.map((classRoom) => {
                    const active = draft.classNames.includes(classRoom.name);
                    return (
                      <button
                        key={classRoom.id}
                        type="button"
                        onClick={() => toggleClass(classRoom.name)}
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
                { label: "Nama Lengkap", value: profile.fullName },
                { label: "Username", value: profile.username },
                { label: "Email / Gmail", value: profile.email },
                { label: "No HP", value: profile.phone },
                { label: "Role", value: "Guru" },
                { label: "Mata Pelajaran", value: selectedSubjects.map((subject) => subject.name).join(", ") },
                { label: "Kelas Diajar", value: profile.classNames.join(", ") },
                { label: "Tahun Ajaran", value: profile.academicYear },
                { label: "Status Akun", value: "Aktif" }
              ]} />
            </>
          )}
        </Card>
      </div>
      {isEditing && (
        <Card className="mt-4 border-blue-100 bg-blue-50">
          <p className="text-sm text-blue-800">
            Preview: {draft.fullName} mengajar {draftSubjects.map((subject) => subject.name).join(", ") || "belum pilih mapel"} untuk kelas {draft.classNames.length ? draft.classNames.join(", ") : "belum dipilih"} pada tahun ajaran {draft.academicYear}.
          </p>
        </Card>
      )}
    </div>
  );
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
