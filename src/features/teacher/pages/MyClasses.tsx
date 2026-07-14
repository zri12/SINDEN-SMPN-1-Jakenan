import { BookOpen, CalendarDays, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { Loading } from "@/components/common/Loading";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudentTable } from "@/components/tables/StudentTable";
import { useStudents } from "@/hooks/useStudents";
import { getCurrentTeacherTeachingRelations } from "@/services/teacherService";
import type { TeachingRelation } from "@/types/teachingRelation";

export function MyClasses() {
  const { students, isLoading: studentsLoading, error: studentsError } = useStudents();
  const [relations, setRelations] = useState<TeachingRelation[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [isLoadingRelations, setIsLoadingRelations] = useState(true);
  const [relationError, setRelationError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setIsLoadingRelations(true);
    getCurrentTeacherTeachingRelations()
      .then((items) => {
        if (!active) return;
        setRelations(items);
        setSelectedKey(items[0] ? relationKey(items[0]) : "");
      })
      .catch((err) => {
        if (active) setRelationError(err instanceof Error ? err.message : "Relasi mengajar gagal dimuat.");
      })
      .finally(() => {
        if (active) setIsLoadingRelations(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const groupedRelations = useMemo(() => {
    return relations.reduce<TeachingRelation[]>((items, relation) => {
      if (items.some((item) => relationKey(item) === relationKey(relation))) return items;
      items.push(relation);
      return items;
    }, []);
  }, [relations]);

  const selected = groupedRelations.find((item) => relationKey(item) === selectedKey) ?? groupedRelations[0];
  const classStudents = useMemo(() => students.filter((item) => item.classId === selected?.classId), [students, selected?.classId]);
  const isLoading = isLoadingRelations || studentsLoading;
  const error = relationError || studentsError;

  return (
    <div>
      <PageHeader title="Kelas Saya" description="Kelas dan mata pelajaran sesuai relasi mengajar dari admin." />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Card><p className="text-sm text-red-600">{error}</p></Card>
      ) : groupedRelations.length === 0 ? (
        <EmptyState title="Belum ada kelas" description="Data kelas dan mata pelajaran yang diajar belum diatur oleh admin." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-[minmax(280px,420px)_minmax(0,1fr)]">
          <div className="min-w-0 space-y-3">
            {groupedRelations.map((relation) => {
              const active = relationKey(relation) === relationKey(selected);
              return (
                <button
                  key={relationKey(relation)}
                  onClick={() => setSelectedKey(relationKey(relation))}
                  className={`w-full rounded-xl border p-4 text-left shadow-soft transition ${active ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white hover:border-blue-100 hover:bg-slate-50"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-blue-700">{relation.className}</p>
                      <p className="mt-1 text-sm text-slate-500">Kelas {relation.className[0]} - {relation.academicYear}</p>
                    </div>
                    <Badge status="Aktif" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <InfoTile icon={Users} label="Siswa" value={classStudentsFor(students, relation.classId).length} />
                    <InfoTile icon={BookOpen} label="Mapel" value={relation.subjectName} />
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    <span className="capitalize">{relation.semester}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <Card className="min-w-0 overflow-hidden">
            <div className="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Daftar siswa</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">Kelas {selected?.className ?? "-"}</h3>
                <p className="mt-1 text-sm text-slate-500">{classStudents.length} siswa aktif terdaftar pada kelas ini.</p>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {selected?.subjectName ?? "-"}
              </span>
            </div>
            <div className="overflow-x-auto">
              <StudentTable students={classStudents} showActions={false} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function relationKey(relation: TeachingRelation) {
  return `${relation.classId}-${relation.subjectId}-${relation.academicYear}-${relation.semester}`;
}

function classStudentsFor(students: { classId: string }[], classId: string) {
  return students.filter((student) => student.classId === classId);
}

function InfoTile({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
  return (
    <div className="min-w-0 rounded-lg bg-white/70 p-3">
      <div className="flex items-center gap-2 text-sm text-slate-500"><Icon className="h-4 w-4" />{label}</div>
      <p className="mt-1 truncate font-semibold text-slate-900">{value}</p>
    </div>
  );
}
