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
    <div className="min-w-0">
      <div className="-mx-2 overflow-x-auto px-2 [scrollbar-width:thin] sm:mx-0 sm:px-0">
        <table className="w-full min-w-[680px] border-collapse text-xs sm:min-w-[760px] sm:text-sm">
          <thead>
            <tr className="border-b-2 border-slate-100">
              {columns.map((column) => (
                <th key={column.key} className="whitespace-nowrap px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:px-4 sm:py-3 sm:text-xs">
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
                    <td key={column.key} className="whitespace-nowrap px-3 py-2.5 align-middle text-slate-700 sm:px-4 sm:py-3">
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
