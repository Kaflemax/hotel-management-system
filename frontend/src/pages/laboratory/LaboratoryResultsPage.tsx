import { useAppSelector } from '../../app/hooks'
import { LabWorkflowActions } from '../../features/labOrders/components/LabWorkflowActions'
import { useLabOrders } from '../../features/labOrders/useLabOrders'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'

export function LaboratoryResultsPage() {
  const technicianName = useAppSelector((s) => s.auth.displayName) ?? 'Lab staff'
  const { orders, loading, reload } = useLabOrders({ exclude_completed: true })
  const active = orders.filter((o) => o.status !== 'Completed')

  return (
    <>
      <PageHeader
        eyebrow="Laboratory"
        title="Results entry"
        description="Advance each order through sample collection, then publish digital results to the doctor and patient."
      />

      <SectionCard title="Workflow queue">
        {loading ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : active.length === 0 ? (
          <p className="px-6 py-8 text-body text-neutral-muted">No active orders. New requests arrive when doctors order tests.</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {active.map((o) => (
              <li
                key={o.id}
                className="flex flex-col gap-3 py-4 first:pt-2 lg:flex-row lg:items-start lg:justify-between"
              >
                <div>
                  <p className="font-semibold text-neutral-text dark:text-dark-text">
                    {o.orderId} — {o.testName}
                  </p>
                  <p className="text-sm text-neutral-muted dark:text-dark-muted">
                    {o.patientName} (ID {o.patientId}) · {o.orderedBy}
                  </p>
                  <p className="mt-1 text-xs text-neutral-light">{o.requestedAt}</p>
                  <div className="mt-2">
                    <StatusBadge status={o.status} />
                  </div>
                </div>
                <LabWorkflowActions order={o} technicianName={technicianName} onUpdated={() => void reload()} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
