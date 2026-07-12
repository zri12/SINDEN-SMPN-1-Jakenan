interface DetailGridProps {
  items: Array<{ label: string; value: string | number | undefined }>;
}

export function DetailGrid({ items }: DetailGridProps) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{item.value || "-"}</dd>
        </div>
      ))}
    </dl>
  );
}
