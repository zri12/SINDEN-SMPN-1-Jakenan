import { useEffect, useState } from "react";
import { Check, Mail, Phone, School, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Input } from "@/components/common/Input";
import { PageHeader } from "@/components/layout/PageHeader";
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
  nip: "",
  nuptk: "",
  gender: "",
  employmentStatus: "",
  teacherType: "",
  subjectIds: [],
  subjectNames: [],
  classIds: [],
  classNames: [],
  academicYear: "",
  semester: "genap",
  isActive: true
};

export function TeacherProfile() {
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

  const selectedSubjectNames = profile.subjectNames;
  const selectedClassNames = profile.classNames;

  const saveProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateCurrentTeacherProfile({
        fullName: draft.fullName,
        username: draft.username,
        phone: draft.phone
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
      {isLoading ? (
        <TeacherProfileSkeleton />
      ) : (
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
              </div>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                Kelas dan mata pelajaran diampu dikelola oleh admin. Hubungi admin jika relasi mengajar perlu diubah.
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
                { label: "NIP", value: profile.nip || "-" },
                { label: "NUPTK", value: profile.nuptk || "-" },
                { label: "Jenis Kelamin", value: profile.gender === "P" ? "Perempuan" : profile.gender === "L" ? "Laki-laki" : "-" },
                { label: "Status Kepegawaian", value: profile.employmentStatus || "-" },
                { label: "Jenis PTK", value: profile.teacherType || "-" },
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
      )}
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

function TeacherProfileSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card className="text-center">
        <div className="mx-auto h-24 w-24 animate-pulse rounded-full bg-slate-100" />
        <div className="mx-auto mt-4 h-6 w-40 animate-pulse rounded bg-slate-100" />
        <div className="mx-auto mt-3 h-4 w-32 animate-pulse rounded bg-slate-100" />
        <div className="mt-5 space-y-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <div className="h-4 w-4 animate-pulse rounded bg-slate-200" />
              <div className="flex-1">
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-4 w-36 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="mb-4 h-5 w-28 animate-pulse rounded bg-slate-100" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
              <div className="mt-3 h-5 w-40 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
