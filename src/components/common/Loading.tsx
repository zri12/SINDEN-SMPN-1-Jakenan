export function Loading({ label = "Memuat data..." }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
      {label}
    </div>
  );
}
