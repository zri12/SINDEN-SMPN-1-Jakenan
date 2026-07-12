import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { ROUTES } from "@/constants/routes";
import type { Role } from "@/types/auth";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { login } from "./authService";

const redirectByRole: Record<Role, string> = {
  admin: ROUTES.admin.dashboard,
  teacher: ROUTES.teacher.dashboard,
  student: ROUTES.student.dashboard
};

export function LoginPage() {
  const { settings, refreshSettings } = useAppSettings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const user = await login({ email, password });
      await refreshSettings();
      navigate(redirectByRole[user.role], { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sinden-sidebar via-blue-600 to-blue-800">
      <section className="hidden flex-1 flex-col items-center justify-center p-12 text-center text-white lg:flex">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo sekolah" className="h-14 w-14 object-contain" /> : <GraduationCap className="h-12 w-12" />}
        </div>
        <h1 className="text-5xl font-bold">{settings.appName}</h1>
        <p className="mt-3 text-lg text-white/85">{settings.appSubtitle}</p>
        <p className="mt-1 text-sm text-white/65">{settings.schoolName}</p>
        <div className="mt-16 grid grid-cols-3 gap-4 opacity-20">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="h-16 w-24 rounded-xl bg-white/30" />
          ))}
        </div>
      </section>

      <section className="flex w-full items-center justify-center bg-white p-6 lg:w-[480px] lg:rounded-l-3xl lg:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sinden-sidebar text-white lg:hidden">
              {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo sekolah" className="h-9 w-9 object-contain" /> : <BookOpen className="h-8 w-8" />}
            </div>
            <h2 className="text-2xl font-bold text-sinden-sidebar">Selamat Datang</h2>
            <p className="mt-2 text-sm text-slate-500">Masuk ke akun {settings.appName} Anda</p>
            <p className="mt-1 text-xs text-slate-400">{settings.schoolName}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isSupabaseConfigured && (
              <p className="rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                Supabase belum dikonfigurasi. Isi file .env agar login Supabase Auth berjalan.
              </p>
            )}
            <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@sinden.local" required />
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <Button type="submit" className="h-11 w-full bg-gradient-to-r from-sinden-sidebar to-blue-600">
              Masuk
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400">Role dibaca otomatis dari tabel profiles setelah login.</p>
        </div>
      </section>
    </div>
  );
}
