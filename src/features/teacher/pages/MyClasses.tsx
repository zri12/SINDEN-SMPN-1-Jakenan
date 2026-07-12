import { BookOpen, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentTable } from "@/components/tables/StudentTable";
import { dummyClasses } from "@/data/dummyClasses";
import { dummyStudents } from "@/data/dummyStudents";

export function MyClasses() {
  const teacherClasses = dummyClasses.filter((item) => ["7A", "7B", "8A"].includes(item.name));
  const [selectedClass, setSelectedClass] = useState(teacherClasses[0]?.name ?? "7A");
  const students = useMemo(() => dummyStudents.filter((item) => item.className === selectedClass), [selectedClass]);
  const selected = teacherClasses.find((item) => item.name === selectedClass);

  return (
    <div>
      <PageHeader title="Kelas Saya" description="Kelas dan daftar siswa yang diajar." />
      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <div className="space-y-3">
          {teacherClasses.map((classRoom) => (
            <button
              key={classRoom.id}
              onClick={() => setSelectedClass(classRoom.name)}
              className={`w-full rounded-xl border p-4 text-left shadow-soft transition ${selectedClass === classRoom.name ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white hover:border-blue-100 hover:bg-slate-50"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-blue-700">{classRoom.name}</p>
                  <p className="mt-1 text-sm text-slate-500">Kelas {classRoom.gradeLevel} - {classRoom.academicYear}</p>
                </div>
                <Badge status="Aktif" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-white/70 p-3">
                  <div className="flex items-center gap-2 text-slate-500"><Users className="h-4 w-4" />Siswa</div>
                  <p className="mt-1 font-semibold text-slate-900">{classRoom.studentCount}</p>
                </div>
                <div className="rounded-lg bg-white/70 p-3">
                  <div className="flex items-center gap-2 text-slate-500"><BookOpen className="h-4 w-4" />Mapel</div>
                  <p className="mt-1 font-semibold text-slate-900">Matematika</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <Card>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Daftar Siswa Kelas {selectedClass}</h3>
              <p className="text-sm text-slate-500">{selected?.studentCount ?? students.length} siswa terdaftar pada kelas ini.</p>
            </div>
            <Badge status="Matematika" />
          </div>
          <StudentTable students={students} showActions={false} />
        </Card>
      </div>
    </div>
  );
}
