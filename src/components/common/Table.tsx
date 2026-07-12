import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T, index: number) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyText?: string;
}

export function Table<T>({ columns, data, emptyText = "Tidak ada data" }: TableProps<T>) {
  return (
    <div>
      <div className="space-y-3 sm:hidden">
        {data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
            {emptyText}
          </div>
        ) : (
          data.map((item, index) => (
            <article key={index} className="rounded-xl border border-slate-100 bg-white p-4 shadow-soft">
              <div className="space-y-3">
                {columns.map((column) => (
                  <div key={column.key} className={column.key === "actions" ? "border-t border-slate-100 pt-3" : ""}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{column.header}</p>
                    <div className="text-sm text-slate-700">{column.render(item, index)}</div>
                  </div>
                ))}
              </div>
            </article>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-slate-100">
              {columns.map((column) => (
                <th key={column.key} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-b border-slate-100 transition hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-slate-700">
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
