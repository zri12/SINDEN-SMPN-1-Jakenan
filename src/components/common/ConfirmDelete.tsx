import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

export function ConfirmDelete({ label, onCancel, onConfirm }: { label: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div>
      <div className="flex gap-3 rounded-xl bg-red-50 p-4 text-red-800">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <p className="text-sm">Hapus <strong>{label}</strong>? Untuk tahap dummy data, data akan hilang dari tampilan sampai halaman di-refresh.</p>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button variant="danger" onClick={onConfirm}>Hapus</Button>
      </div>
    </div>
  );
}
