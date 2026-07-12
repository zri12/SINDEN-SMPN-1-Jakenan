export const ROUTES = {
  root: "/",
  login: "/login",
  unauthorized: "/unauthorized",
  admin: {
    dashboard: "/admin/dashboard",
    students: "/admin/siswa",
    teachers: "/admin/guru",
    classes: "/admin/kelas",
    subjects: "/admin/mapel",
    grades: "/admin/nilai",
    assignments: "/admin/tugas",
    recap: "/admin/rekap",
    settings: "/admin/pengaturan",
    profile: "/admin/profile"
  },
  teacher: {
    dashboard: "/guru/dashboard",
    classes: "/guru/kelas",
    assignments: "/guru/tugas",
    submissions: "/guru/pengumpulan",
    recap: "/guru/rekap",
    profile: "/guru/profile"
  },
  student: {
    dashboard: "/siswa/dashboard",
    grades: "/siswa/nilai",
    assignments: "/siswa/tugas",
    information: "/siswa/informasi",
    profile: "/siswa/profile"
  }
} as const;
