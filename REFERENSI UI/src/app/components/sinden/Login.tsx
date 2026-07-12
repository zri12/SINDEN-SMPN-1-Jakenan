import { useState } from "react";
import { BookOpen, Eye, EyeOff, GraduationCap } from "lucide-react";
import type { Role } from "./data";

interface LoginProps {
  onLogin: (role: Role) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<Role>("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #1b3a6b 0%, #2563eb 60%, #1e40af 100%)" }}>
      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-col justify-center items-center flex-1 p-12">
        <div className="text-center text-white">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
            <GraduationCap size={48} color="white" />
          </div>
          <h1 className="text-white mb-2" style={{ fontSize: "2.5rem", fontWeight: 700 }}>SINDEN</h1>
          <p className="mb-1" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem" }}>Sistem Informasi Digital Evaluasi Nilai</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>SMP Negeri 1 Jakenan</p>

          {/* Abstract decoration */}
          <div className="mt-16 grid grid-cols-3 gap-4 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl" style={{ background: "rgba(255,255,255,0.3)", transform: `rotate(${(i % 3 - 1) * 5}deg)` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[480px] p-6 lg:p-12" style={{ background: "white", borderRadius: "24px 0 0 24px" }}>
        {/* Mobile logo */}
        <div className="lg:hidden text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: "#1b3a6b" }}>
            <BookOpen size={32} color="white" />
          </div>
          <h2 style={{ color: "#1b3a6b", fontWeight: 700, fontSize: "1.5rem" }}>SINDEN</h2>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Sistem Informasi Digital Evaluasi Nilai</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="hidden lg:block" style={{ color: "#1b3a6b", fontWeight: 700, fontSize: "1.75rem", marginBottom: "0.5rem" }}>Selamat Datang</h2>
            <p className="hidden lg:block" style={{ color: "#64748b", fontSize: "0.95rem" }}>Masuk ke akun SINDEN Anda</p>
            <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>SMP Negeri 1 Jakenan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>
                Masuk sebagai
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1.5px solid #e2e8f0",
                  background: "#f8fafc",
                  color: "#1e293b",
                  fontSize: "0.95rem",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "18px",
                }}
              >
                <option value="admin">Administrator</option>
                <option value="guru">Guru</option>
                <option value="siswa">Siswa</option>
              </select>
            </div>

            {/* Username */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>
                Username / Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  border: "1.5px solid #e2e8f0",
                  background: "#f8fafc",
                  color: "#1e293b",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: 500, fontSize: "0.875rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  style={{
                    width: "100%",
                    padding: "0.75rem 3rem 0.75rem 1rem",
                    borderRadius: "10px",
                    border: "1.5px solid #e2e8f0",
                    background: "#f8fafc",
                    color: "#1e293b",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1b3a6b 0%, #2563eb 100%)",
                color: "white",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "0.5rem",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Masuk
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#94a3b8", fontSize: "0.8rem" }}>
            Masuk sesuai role pengguna yang telah ditentukan
          </p>
        </div>
      </div>
    </div>
  );
}
