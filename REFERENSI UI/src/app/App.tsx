import { useState } from "react";
import type { Role, Page } from "./components/sinden/data";
import { Login } from "./components/sinden/Login";
import { Layout } from "./components/sinden/Layout";

// Admin pages
import { AdminDashboard } from "./components/sinden/admin/AdminDashboard";
import { DataSiswa } from "./components/sinden/admin/DataSiswa";
import { DataGuru } from "./components/sinden/admin/DataGuru";
import { DataKelas } from "./components/sinden/admin/DataKelas";
import { MataPelajaran } from "./components/sinden/admin/MataPelajaran";
import { DataNilai } from "./components/sinden/admin/DataNilai";
import { DataTugas } from "./components/sinden/admin/DataTugas";
import { RekapNilai } from "./components/sinden/admin/RekapNilai";
import { Pengaturan } from "./components/sinden/admin/Pengaturan";

// Guru pages
import { GuruDashboard } from "./components/sinden/guru/GuruDashboard";
import { KelasSaya } from "./components/sinden/guru/KelasSaya";
import { InputNilai } from "./components/sinden/guru/InputNilai";
import { GuruTugas } from "./components/sinden/guru/GuruTugas";
import { PengumpulanTugas } from "./components/sinden/guru/PengumpulanTugas";
import { GuruRekapNilai } from "./components/sinden/guru/GuruRekapNilai";

// Siswa pages
import { SiswaDashboard } from "./components/sinden/siswa/SiswaDashboard";
import { NilaiSaya } from "./components/sinden/siswa/NilaiSaya";
import { TugasSaya } from "./components/sinden/siswa/TugasSaya";
import { UploadTugas } from "./components/sinden/siswa/UploadTugas";
import { Informasi } from "./components/sinden/siswa/Informasi";

const pageTitles: Record<Page, string> = {
  "admin-dashboard": "Dashboard Admin",
  "admin-siswa": "Data Siswa",
  "admin-guru": "Data Guru",
  "admin-kelas": "Data Kelas",
  "admin-mapel": "Mata Pelajaran",
  "admin-nilai": "Data Nilai",
  "admin-tugas": "Data Tugas",
  "admin-rekap": "Rekap Nilai",
  "admin-pengaturan": "Pengaturan",
  "guru-dashboard": "Dashboard Guru",
  "guru-kelas": "Kelas Saya",
  "guru-input-nilai": "Input Nilai",
  "guru-tugas": "Tugas",
  "guru-pengumpulan": "Pengumpulan Tugas",
  "guru-rekap": "Rekap Nilai",
  "siswa-dashboard": "Dashboard Siswa",
  "siswa-nilai": "Nilai Saya",
  "siswa-tugas": "Tugas Saya",
  "siswa-upload": "Upload Tugas",
  "siswa-informasi": "Informasi",
};

const defaultPage: Record<Role, Page> = {
  admin: "admin-dashboard",
  guru: "guru-dashboard",
  siswa: "siswa-dashboard",
};

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case "admin-dashboard": return <AdminDashboard />;
    case "admin-siswa": return <DataSiswa />;
    case "admin-guru": return <DataGuru />;
    case "admin-kelas": return <DataKelas />;
    case "admin-mapel": return <MataPelajaran />;
    case "admin-nilai": return <DataNilai />;
    case "admin-tugas": return <DataTugas />;
    case "admin-rekap": return <RekapNilai />;
    case "admin-pengaturan": return <Pengaturan />;
    case "guru-dashboard": return <GuruDashboard />;
    case "guru-kelas": return <KelasSaya />;
    case "guru-input-nilai": return <InputNilai />;
    case "guru-tugas": return <GuruTugas />;
    case "guru-pengumpulan": return <PengumpulanTugas />;
    case "guru-rekap": return <GuruRekapNilai />;
    case "siswa-dashboard": return <SiswaDashboard />;
    case "siswa-nilai": return <NilaiSaya />;
    case "siswa-tugas": return <TugasSaya />;
    case "siswa-upload": return <UploadTugas />;
    case "siswa-informasi": return <Informasi />;
    default: return <div>Halaman tidak ditemukan</div>;
  }
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>("admin-dashboard");

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    setCurrentPage(defaultPage[selectedRole]);
  };

  const handleLogout = () => {
    setRole(null);
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout
      role={role}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
      pageTitle={pageTitles[currentPage]}
    >
      <PageContent page={currentPage} />
    </Layout>
  );
}
