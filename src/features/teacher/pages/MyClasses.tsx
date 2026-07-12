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
import { getCurrentTeacherProfile } from "@/services/profileService";

export function MyClasses() {
  const { classes } = useClasses();
  const { students } = useStudents();
  const { subjects } = useSubjects();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [teacherSubjectNames, setTeacherSubjectNames] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedClassId && classes[0]) setSelectedClassId(classes[0].id);
  }, [classes, selectedClassId]);

  useEffect(() => {
    let active = true;
    getCurrentTeacherProfile()
      .then((profile) => {
        if (active) setTeacherSubjectNames(profile.subjectNames);
      })
      .catch(() => {
        if (active) setTeacherSubjectNames([]);
      });

    return () => {
      active = false;
    };
  }, []);

  const selected = classes.find((item) => item.id === selectedClassId);
  const classStudents = useMemo(() => students.filter((item) => item.classId === selectedClassId), [students, selectedClassId]);
  const subjectNames = teacherSubjectNames.length ? teacherSubjectNames : subjects.map((subject) => subject.name);
  const subjectPreview = subjectNames.length ? subjectNames.slice(0, 2).join(", ") : "-";
  const hiddenSubjectCount = Math.max(subjectNames.length - 2, 0);
  const studentCountByClass = useMemo(() => {
    return students.reduce<Record<string, number>>((totals, student) => {
      totals[student.classId] = (totals[student.classId] ?? 0) + 1;
      return totals;
    }, {});
  }, [students]);

  return (
    <div>
      <PageHeader title="Kelas Saya" description="Kelas dan daftar siswa yang diajar." />
      {classes.length === 0 ? (
        <EmptyState title="Belum ada kelas" description="Kelas yang tampil mengikuti relasi guru, kelas, dan mata pelajaran di Supabase." />
      ) : (
        <div className="grid gap-4 2xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="min-w-0 space-y-3">
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
                    <p className="mt-1 font-semibold text-slate-900">{studentCountByClass[classRoom.id] ?? classRoom.studentCount}</p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3">
                    <div className="flex items-center gap-2 text-slate-500"><BookOpen className="h-4 w-4" />Mapel</div>
                    <p className="mt-1 truncate font-semibold text-slate-900">
                      {subjectPreview}{hiddenSubjectCount ? ` +${hiddenSubjectCount}` : ""}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Card className="min-w-0 overflow-hidden">
            <div className="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Daftar siswa</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">Kelas {selected?.name ?? "-"}</h3>
                <p className="mt-1 text-sm text-slate-500">{classStudents.length} siswa terdaftar pada kelas ini.</p>
              </div>
              <div className="flex max-w-full flex-wrap gap-2 lg:max-w-[70%] lg:justify-end">
                {subjectNames.length ? (
                  subjectNames.map((subject) => (
                    <span key={subject} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {subject}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Mapel belum diatur</span>
                )}
              </div>
            </div>
            <StudentTable students={classStudents} showActions={false} />
          </Card>
        </div>
      )}
    </div>
  );
}
