import { TestTube } from 'lucide-react'

import { useLaboratoryDashboard } from '../../features/laboratory/useLaboratoryDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'

export function LaboratorySamplesPage() {
  const { data, loading } = useLaboratoryDashboard()

  const samples =
    data?.testOrders.map((o) => ({
      ...o,
      sampleStatus:
        o.status === 'Pending collection'
          ? 'Awaiting pickup'
          : o.status === 'Sample collected'
            ? 'At lab bench'
            : 'In analyzer',
    })) ?? []

  return (
    <>
      <PageHeader
        eyebrow="Laboratory"
        title="Samples"
        description="Track collection, transport, and processing status."
      />

      <SectionCard title="Sample pipeline">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {samples.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 py-4 first:pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lab-surface text-lab-main dark:bg-lab-dark/30">
                    <TestTube className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-text dark:text-dark-text">
                      {s.orderId} — {s.patientName}
                    </p>
                    <p className="text-sm text-neutral-muted dark:text-dark-muted">{s.testName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={s.sampleStatus} />
                  <p className="mt-1 text-xs text-neutral-light dark:text-dark-muted">{s.requestedAt}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
