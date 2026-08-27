import type { ReactNode } from 'react'

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  emptyMessage?: string
}

export function DataTable<T>({ columns, data, keyExtractor, emptyMessage = 'No records found.' }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-body text-neutral-muted dark:text-dark-muted">{emptyMessage}</div>
    )
  }

  return (
    <div className="overflow-x-auto p-2">
      <table className="min-w-full text-left text-table">
        <thead>
          <tr className="rounded-xl bg-neutral-table-head dark:bg-dark-bg/80">
            {columns.map((col, i) => (
              <th
                key={col.key}
                className={`whitespace-nowrap px-4 py-3 font-medium text-neutral-muted dark:text-dark-muted ${
                  i === 0 ? 'rounded-l-xl' : ''
                } ${i === columns.length - 1 ? 'rounded-r-xl' : ''} ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-border dark:divide-dark-border">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="transition-colors duration-hover hover:bg-neutral-table-hover dark:hover:bg-dark-bg/60"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`whitespace-nowrap px-4 py-3 text-neutral-text dark:text-dark-text ${col.className ?? ''}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
