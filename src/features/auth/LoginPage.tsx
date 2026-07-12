import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Eye, EyeOff, GraduationCap, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await login({ email, password });
      await refreshSettings();
      navigate(redirectByRole[user.role], { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_560px]">
        <section className="relative hidden overflow-hidden bg-[linear-gradient(135deg,#15386f_0%,#245bd7_48%,#2e6cf4_100%)] text-white lg:block">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="login-float absolute left-16 top-20 h-28 w-28 rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-sm" />
          <div className="login-float-delayed absolute bottom-20 right-20 h-36 w-36 rounded-[32px] border border-white/15 bg-white/10 backdrop-blur-sm" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between px-16 py-12">
            <div className="login-fade-down flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo sekolah" className="h-8 w-8 object-contain" /> : <GraduationCap className="h-6 w-6" />}
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">{settings.appName}</p>
                <p className="text-xs text-white/60">{settings.schoolName}</p>
              </div>
            </div>

            <div className="login-fade-up max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/80 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Portal akademik sekolah
              </div>
              <h1 className="max-w-xl text-6xl font-bold leading-[1.02] tracking-normal">{settings.appName}</h1>
              <p className="mt-5 max-w-xl text-xl leading-8 text-white/82">{settings.appSubtitle}</p>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["Admin", "Kelola data"],
                  ["Guru", "Tugas & nilai"],
                  ["Siswa", "Belajar aktif"]
                ].map(([title, caption], index) => (
                  <div key={title} className="login-stagger rounded-2xl border border-white/14 bg-white/10 p-4 backdrop-blur" style={{ animationDelay: `${260 + index * 90}ms` }}>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-xs text-white/60">{caption}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="login-fade-up flex items-center gap-3 text-sm text-white/65">
              <ShieldCheck className="h-4 w-4" />
              Akses role otomatis dari profil pengguna.
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center p-5 sm:p-8 lg:bg-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sinden-sidebar via-blue-600 to-indigo-500 lg:hidden" />
          <div className="login-card-in w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white/95 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-8 lg:border-slate-100 lg:shadow-none">
            <div className="mb-8">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sinden-sidebar text-white shadow-lg shadow-blue-900/20">
                  {settings.logoUrl ? <img src={settings.logoUrl} alt="Logo sekolah" className="h-9 w-9 object-contain" /> : <BookOpen className="h-7 w-7" />}
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Secure Login</span>
              </div>
              <h2 className="text-3xl font-bold tracking-normal text-sinden-sidebar">Selamat Datang</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Masuk ke akun {settings.appName} untuk melanjutkan.</p>
              <p className="mt-1 text-xs font-medium text-slate-400">{settings.schoolName}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isSupabaseConfigured && (
                <p className="rounded-xl bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
                  Supabase belum dikonfigurasi. Isi file .env agar login Supabase Auth berjalan.
                </p>
              )}

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-[38px] h-4 w-4 text-slate-400" />
                <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@sinden.local" className="h-12 bg-white pl-10" required />
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password"
                    className="h-12 bg-white pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="login-shake rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl bg-gradient-to-r from-sinden-sidebar to-blue-600 shadow-lg shadow-blue-600/20">
                {isSubmitting ? "Memproses..." : "Masuk"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Role dibaca otomatis dari tabel profiles setelah login.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
