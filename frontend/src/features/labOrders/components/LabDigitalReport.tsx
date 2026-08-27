import type { LabOrder } from '../types'

type LabDigitalReportProps = {
  order: LabOrder
}

export function LabDigitalReport({ order }: LabDigitalReportProps) {
  const details = order.resultDetails

  return (
    <div className="rounded-card border border-neutral-card-border bg-neutral-bg/60 p-4 dark:border-dark-border dark:bg-dark-bg">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-neutral-border pb-3 dark:border-dark-border">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-muted dark:text-dark-muted">
            Digital lab report · {order.orderId}
          </p>
          <p className="mt-1 font-semibold text-neutral-text dark:text-dark-text">{order.testName}</p>
          <p className="text-sm text-neutral-muted dark:text-dark-muted">
            {order.patientName} (ID {order.patientId}) · Ordered by {order.orderedBy}
          </p>
        </div>
        {order.completedAt ? (
          <time className="text-sm text-neutral-muted dark:text-dark-muted">{order.completedAt}</time>
        ) : null}
      </div>

      <p className="mt-3 text-lg font-semibold text-neutral-text dark:text-dark-text">
        {order.resultSummary ?? 'Results pending'}
      </p>

      {details && Object.keys(details).length > 0 ? (
        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(details).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg bg-white px-3 py-2 dark:bg-dark-card"
            >
              <dt className="text-xs capitalize text-neutral-muted dark:text-dark-muted">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </dt>
              <dd className="font-medium text-neutral-text dark:text-dark-text">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {order.completedBy ? (
        <p className="mt-3 text-xs text-neutral-muted dark:text-dark-muted">
          Verified by {order.completedBy} — no paper copy required
        </p>
      ) : null}
    </div>
  )
}
