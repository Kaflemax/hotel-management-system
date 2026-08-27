type StatusBadgeProps = {
  status: string
}

const styles: Record<string, string> = {
  Pending: 'bg-badge-pending-bg text-badge-pending-text',
  Complete: 'bg-badge-complete-bg text-badge-complete-text',
  Stable: 'bg-badge-complete-bg text-badge-complete-text',
  Recovering: 'bg-badge-complete-bg text-badge-complete-text',
  Critical: 'bg-badge-pending-bg text-badge-pending-text',
  Available: 'bg-badge-complete-bg text-badge-complete-text',
  'On Leave': 'bg-badge-pending-bg text-badge-pending-text',
  'In Surgery': 'bg-badge-scheduled-bg text-badge-scheduled-text',
  Scheduled: 'bg-badge-scheduled-bg text-badge-scheduled-text',
  Cancelled: 'bg-badge-cancelled-bg text-badge-cancelled-text',
  'In Progress': 'bg-badge-inprogress-bg text-badge-inprogress-text',
  Ready: 'bg-badge-complete-bg text-badge-complete-text',
  Processing: 'bg-badge-pending-bg text-badge-pending-text',
  'Sample collected': 'bg-badge-inprogress-bg text-badge-inprogress-text',
  'Pending collection': 'bg-badge-pending-bg text-badge-pending-text',
  'Awaiting pickup': 'bg-badge-pending-bg text-badge-pending-text',
  'At lab bench': 'bg-badge-inprogress-bg text-badge-inprogress-text',
  'In analyzer': 'bg-badge-scheduled-bg text-badge-scheduled-text',
  Urgent: 'bg-badge-pending-bg text-badge-pending-text',
  Routine: 'bg-badge-complete-bg text-badge-complete-text',
  Ordered: 'bg-badge-scheduled-bg text-badge-scheduled-text',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-small font-medium ${
        styles[status] ?? 'bg-neutral-table-head text-neutral-muted dark:bg-dark-bg dark:text-dark-muted'
      }`}
    >
      {status}
    </span>
  )
}
