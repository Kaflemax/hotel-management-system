import { useAppSelector } from '../../app/hooks'
import { LabDigitalReport } from '../../features/labOrders/components/LabDigitalReport'
import { useLabOrders } from '../../features/labOrders/useLabOrders'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'

export function PatientReportsPage() {
  const patientId = useAppSelector((s) => s.auth.patientId) ?? '38917'
  const { orders, loading } = useLabOrders({ patient_id: patientId })

  const pending = orders.filter((o) => o.status !== 'Completed')
  const completed = orders.filter((o) => o.status === 'Completed')

  return (
    <>
      <PageHeader
        eyebrow="Patient"
        title="Lab reports"
        description="Your test orders and digital results from the hospital laboratory."
      />

      {pending.length > 0 ? (
        <SectionCard title="Tests in progress" subtitle="Track status without visiting the lab desk">
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {pending.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-4 py-4 first:pt-2">
                <div>
                  <p className="font-medium text-neutral-text dark:text-dark-text">{o.testName}</p>
                  <p className="text-sm text-neutral-muted dark:text-dark-muted">
                    {o.orderId} · Ordered by {o.orderedBy}
                  </p>
                </div>
                <StatusBadge status={o.status} />
              </li>
            ))}
          </ul>
        </SectionCard>
      ) : null}

      <SectionCard title="Digital reports" subtitle="Ready to view — replaces paper copies">
        {loading ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : completed.length === 0 ? (
          <p className="px-6 py-8 text-body text-neutral-muted">
            No completed reports yet. When your doctor orders a test, results will appear here automatically.
          </p>
        ) : (
          <div className="space-y-4 px-2 pb-4">
            {completed.map((o) => (
              <LabDigitalReport key={o.id} order={o} />
            ))}
          </div>
        )}
      </SectionCard>
    </>
  )
}
