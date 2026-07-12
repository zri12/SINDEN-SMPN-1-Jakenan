import { useEffect, useState } from "react";
import { Building2, GraduationCap, Image, Save } from "lucide-react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import type { AppSettings } from "@/types/user";

export function Settings() {
  const { settings, isLoading, error, saveSettings } = useAppSettings();
  const [form, setForm] = useState<AppSettings>(settings);
  const [actionError, setActionError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const save = async () => {
    setIsSaving(true);
    setActionError("");
    setSuccess("");
    try {
      const saved = await saveSettings(form);
      setForm(saved);
      setSuccess("Pengaturan berhasil disimpan.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Pengaturan gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoChange = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setActionError("File logo harus berupa gambar.");
      return;
    }
    const logoUrl = await readFileAsDataUrl(file);
    setForm((value) => ({ ...value, logoUrl }));
  };

  return (
    <div>
      <PageHeader
        title="Pengaturan"
        description="Kelola identitas aplikasi, akademik aktif, dan aset sekolah."
        actions={<Button onClick={save} disabled={isSaving}><Save className="h-4 w-4" />{isSaving ? "Menyimpan..." : "Simpan Pengaturan"}</Button>}
      />

      {(error || actionError || success) && (
        <Card className="mb-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {actionError && <p className="text-sm text-red-600">{actionError}</p>}
          {success && <p className="text-sm text-emerald-700">{success}</p>}
        </Card>
      )}

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              {form.logoUrl ? <img src={form.logoUrl} alt="Logo sekolah" className="h-7 w-7 object-contain" /> : <GraduationCap className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Identitas Aplikasi</h3>
              <p className="text-sm text-slate-500">{isLoading ? "Memuat pengaturan..." : "Informasi utama yang tampil di login dan dashboard."}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nama Aplikasi" value={form.appName} onChange={(event) => setForm({ ...form, appName: event.target.value })} />
            <Input label="Nama Sekolah" value={form.schoolName} onChange={(event) => setForm({ ...form, schoolName: event.target.value })} />
            <Input label="Subjudul Aplikasi" value={form.appSubtitle} onChange={(event) => setForm({ ...form, appSubtitle: event.target.value })} />
            <Input label="Tahun Ajaran" value={form.academicYear} onChange={(event) => setForm({ ...form, academicYear: event.target.value })} />
            <Select label="Semester Aktif" value={form.semester} options={[{ value: "ganjil", label: "Semester 1" }, { value: "genap", label: "Semester 2" }]} onChange={(event) => setForm({ ...form, semester: event.target.value })} />
            <Input label="KKM Default" type="number" min={0} max={100} value={form.defaultKkm} onChange={(event) => setForm({ ...form, defaultKkm: Number(event.target.value) })} />
          </div>
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Browser title</p>
                <p className="truncate font-semibold text-slate-900">{form.appName} | {form.schoolName}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Image className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">Logo Sekolah</h3>
                <p className="text-sm text-slate-500">PNG/JPG untuk login, sidebar, dan favicon browser.</p>
              </div>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 hover:bg-slate-100">
              {form.logoUrl ? <img src={form.logoUrl} alt="Preview logo" className="mb-3 h-20 w-20 object-contain" /> : <Image className="mb-2 h-8 w-8 text-slate-400" />}
              Pilih file logo
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" onChange={(event) => void handleLogoChange(event.target.files?.[0])} />
            </label>
            {form.logoUrl && (
              <Button variant="secondary" className="mt-3 w-full" onClick={() => setForm({ ...form, logoUrl: undefined })}>
                Hapus Logo
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Logo gagal dibaca."));
    reader.readAsDataURL(file);
  });
}
