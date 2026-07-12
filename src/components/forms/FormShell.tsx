import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";

export function FormShell({ type }: { type: "student" | "teacher" | "class" | "subject" | "grade" | "assignment" | "submission" }) {
  const isAssignment = type === "assignment";
  const isSubmission = type === "submission";

  return (
    <form className="space-y-4">
      <Input label={isAssignment ? "Judul Tugas" : isSubmission ? "Catatan" : "Nama"} placeholder="Masukkan data" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Kelas" options={[{ value: "7A", label: "7A" }, { value: "8A", label: "8A" }, { value: "9A", label: "9A" }]} placeholder="Pilih kelas" />
        <Select label="Status" options={[{ value: "active", label: "Aktif" }, { value: "closed", label: "Selesai" }]} placeholder="Pilih status" />
      </div>
      {(isAssignment || isSubmission) && <Input label="File / Link" placeholder="URL atau nama file" />}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary">Batal</Button>
        <Button type="button">Simpan</Button>
      </div>
    </form>
  );
}
