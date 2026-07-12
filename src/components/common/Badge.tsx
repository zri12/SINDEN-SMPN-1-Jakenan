import { getStatusBadge } from "@/utils/getStatusBadge";

export function Badge({ status }: { status: string }) {
  const badge = getStatusBadge(status);

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
      {badge.label}
    </span>
  );
}
