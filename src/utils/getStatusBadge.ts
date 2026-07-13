export function normalizeStatusLabel(status: string) {
  const map: Record<string, string> = {
    active: "Aktif",
    inactive: "Nonaktif",
    graduated: "Lulus",
    closed: "Selesai",
    late: "Terlambat",
    submitted: "Sudah Mengumpulkan",
    not_submitted: "Belum Mengumpulkan"
  };

  return map[status] ?? status;
}

export function getStatusBadge(status: string) {
  const label = normalizeStatusLabel(status);
  const styles: Record<string, { className: string }> = {
    Tuntas: { className: "bg-green-100 text-green-700" },
    "Belum Tuntas": { className: "bg-red-100 text-red-700" },
    Aktif: { className: "bg-blue-100 text-blue-700" },
    Nonaktif: { className: "bg-slate-100 text-slate-600" },
    Lulus: { className: "bg-blue-100 text-blue-700" },
    Selesai: { className: "bg-green-100 text-green-700" },
    Terlambat: { className: "bg-red-100 text-red-700" },
    "Sudah Mengumpulkan": { className: "bg-green-100 text-green-700" },
    "Belum Mengumpulkan": { className: "bg-red-100 text-red-700" },
    Baru: { className: "bg-blue-100 text-blue-700" },
    Penting: { className: "bg-red-100 text-red-700" },
    Info: { className: "bg-green-100 text-green-700" },
    Peringatan: { className: "bg-yellow-100 text-yellow-700" }
  };

  return {
    label,
    className: styles[label]?.className ?? "bg-slate-100 text-slate-600"
  };
}
