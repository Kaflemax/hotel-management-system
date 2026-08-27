import { FileText } from 'lucide-react'

import { useLaboratoryDashboard } from '../../features/laboratory/useLaboratoryDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function LaboratoryReportsPage() {
  const { data, loading } = useLaboratoryDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Laboratory"
        title="Completed reports"
        description="Finalized results sent to doctors and patient charts."
      />

      <SectionCard title="Published reports">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.completedReports.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-4 py-4 first:pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lab-surface text-lab-dark dark:bg-lab-dark/30 dark:text-lab-light">
                    <FileText className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-text dark:text-dark-text">
                      {r.orderId} — {r.patientName}
                    </p>
                    <p className="text-sm text-neutral-muted dark:text-dark-muted">{r.testName}</p>
                    <p className="mt-1 text-sm text-lab-dark dark:text-lab-light">{r.resultSummary}</p>
                  </div>
                </div>
                <time className="shrink-0 text-sm text-neutral-light dark:text-dark-muted">{r.completedAt}</time>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
