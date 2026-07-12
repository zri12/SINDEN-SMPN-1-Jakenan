import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { formatDate } from "@/utils/formatDate";

export function StudentInformation() {
  const { announcements, isLoading, error } = useAnnouncements();

  return (
    <div>
      <PageHeader title="Informasi" description="Pengumuman dan notifikasi sederhana." />
      <div className="grid gap-4">
        {isLoading && <Loading />}
        {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
        {!isLoading && !error && announcements.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <Badge status={item.status} />
                </div>
                <p className="text-sm leading-6 text-slate-500">{item.content}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDate(item.createdAt)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
