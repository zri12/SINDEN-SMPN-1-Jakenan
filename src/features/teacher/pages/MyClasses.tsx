import { BookOpen, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentTable } from "@/components/tables/StudentTable";
import { useClasses } from "@/hooks/useClasses";
import { useStudents } from "@/hooks/useStudents";
import { useSubjects } from "@/hooks/useSubjects";

export function MyClasses() {
  const { classes } = useClasses();
  const { students } = useStudents();
  const { subjects } = useSubjects();
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    if (!selectedClassId && classes[0]) setSelectedClassId(classes[0].id);
  }, [classes, selectedClassId]);

  const selected = classes.find((item) => item.id === selectedClassId);
  const classStudents = useMemo(() => students.filter((item) => item.classId === selectedClassId), [students, selectedClassId]);
  const subjectLabel = subjects.length ? subjects.map((subject) => subject.name).join(", ") : "-";

  return (
    <div>
      <PageHeader title="Kelas Saya" description="Kelas dan daftar siswa yang diajar." />
      {classes.length === 0 ? (
        <EmptyState title="Belum ada kelas" description="Kelas yang tampil mengikuti relasi guru, kelas, dan mata pelajaran di Supabase." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
          <div className="space-y-3">
            {classes.map((classRoom) => (
              <button
                key={classRoom.id}
                onClick={() => setSelectedClassId(classRoom.id)}
                className={`w-full rounded-xl border p-4 text-left shadow-soft transition ${selectedClassId === classRoom.id ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white hover:border-blue-100 hover:bg-slate-50"}`}
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
                    <p className="mt-1 font-semibold text-slate-900">{classStudents.length || classRoom.studentCount}</p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3">
                    <div className="flex items-center gap-2 text-slate-500"><BookOpen className="h-4 w-4" />Mapel</div>
                    <p className="mt-1 truncate font-semibold text-slate-900">{subjectLabel}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Card>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Daftar Siswa Kelas {selected?.name ?? "-"}</h3>
                <p className="text-sm text-slate-500">{classStudents.length} siswa terdaftar pada kelas ini.</p>
              </div>
              <Badge status={subjectLabel} />
            </div>
            <StudentTable students={classStudents} showActions={false} />
          </Card>
        </div>
      )}
    </div>
  );
}
