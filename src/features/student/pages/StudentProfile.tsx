import { Mail, School, UserCircle } from "lucide-react";
import { Card } from "@/components/common/Card";
import { DetailGrid } from "@/components/common/DetailGrid";
import { PageHeader } from "@/components/layout/PageHeader";

export function StudentProfile() {
  return (
    <div>
      <PageHeader title="Profile Siswa" description="Informasi akun siswa yang sedang login." />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserCircle className="h-14 w-14" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-900">Ahmad Fauzan</h2>
          <p className="text-sm text-slate-500">Siswa Kelas 7A</p>
          <div className="mt-5 space-y-3 text-left text-sm">
            <ProfileLine icon={Mail} label="Email / Gmail" value="siswa@smp1jakenan.sch.id" />
            <ProfileLine icon={School} label="Kelas" value="7A" />
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold text-slate-900">Detail Akun</h3>
          <DetailGrid items={[
            { label: "Nama Lengkap", value: "Ahmad Fauzan" },
            { label: "Username", value: "siswa" },
            { label: "Email / Gmail", value: "siswa@smp1jakenan.sch.id" },
            { label: "Role", value: "Siswa" },
            { label: "Kelas", value: "7A" },
            { label: "NIS", value: "2021001" },
            { label: "NISN", value: "0051234001" },
            { label: "Status Akun", value: "Aktif" }
          ]} />
        </Card>
      </div>
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
