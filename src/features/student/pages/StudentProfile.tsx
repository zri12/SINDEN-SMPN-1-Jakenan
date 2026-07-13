import { useEffect, useState } from "react";
import { Mail, School, UserCircle } from "lucide-react";
import { Card } from "@/components/common/Card";
import { DetailGrid } from "@/components/common/DetailGrid";
import { Loading } from "@/components/common/Loading";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCurrentStudent } from "@/services/studentService";
import type { Student } from "@/types/student";

export function StudentProfile() {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    getCurrentStudent()
      .then((result) => {
        if (active) {
          setStudent(result);
          setError("");
        }
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Profile siswa gagal dimuat.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <PageHeader title="Profile Siswa" description="Informasi akun siswa yang sedang login." />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Card><p className="text-sm text-red-600">{error}</p></Card>
      ) : student ? (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <UserCircle className="h-14 w-14" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">{student.fullName || "-"}</h2>
            <p className="text-sm text-slate-500">Siswa Kelas {student.className || "-"}</p>
            <div className="mt-5 space-y-3 text-left text-sm">
              <ProfileLine icon={Mail} label="Email / Gmail" value={student.email || "-"} />
              <ProfileLine icon={School} label="Kelas" value={student.className || "-"} />
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 font-semibold text-slate-900">Detail Akun</h3>
            <DetailGrid items={[
              { label: "Nama Lengkap", value: student.fullName || "-" },
              { label: "Username", value: student.username || "-" },
              { label: "Email / Gmail", value: student.email || "-" },
              { label: "Role", value: "Siswa" },
              { label: "Kelas", value: student.className || "-" },
              { label: "NIS / NIPD", value: student.nis || "-" },
              { label: "NISN", value: student.nisn || "-" },
              { label: "Jenis Kelamin", value: student.gender === "P" ? "Perempuan" : "Laki-laki" },
              { label: "Tempat Lahir", value: student.birthPlace || "-" },
              { label: "Tanggal Lahir", value: student.birthDate || "-" },
              { label: "Status Akun", value: getStatusLabel(student.status) }
            ]} />
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function ProfileLine({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
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

function getStatusLabel(status: Student["status"]) {
  if (status === "graduated") return "Lulus";
  if (status === "active") return "Aktif";
  return "Tidak Aktif";
}
