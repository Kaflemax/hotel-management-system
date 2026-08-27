import type { TooltipProps } from 'recharts'

export function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-neutral-border/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-dark-border dark:bg-dark-card/95">
      {label ? <p className="mb-2 text-xs font-medium text-neutral-muted dark:text-dark-muted">{label}</p> : null}
      <ul className="space-y-1">
        {payload.map((entry) => (
          <li key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color ?? '#2C97AD' }}
            />
            <span className="text-neutral-muted dark:text-dark-muted">{entry.name}:</span>
            <span className="font-semibold text-neutral-text dark:text-dark-text">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
