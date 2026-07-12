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
    <div className="overflow-x-auto">
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
  );
}
