import { LabStatCards } from '../../features/laboratory/components/LabStatCards'
import { LabTestOrdersTable } from '../../features/laboratory/components/LabTestOrdersTable'
import { useLaboratoryDashboard } from '../../features/laboratory/useLaboratoryDashboard'
import { SectionCard } from '../../shared/ui/SectionCard'

export function LaboratoryDashboardPage() {
  const { data, loading } = useLaboratoryDashboard()

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-72 animate-pulse rounded-lg bg-white dark:bg-dark-card" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-card bg-white dark:bg-dark-card" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-lab-surface bg-gradient-to-r from-lab-surface to-white p-6 dark:border-lab-dark/30 dark:from-lab-dark/20 dark:to-dark-card">
        <p className="text-sm font-medium text-lab-dark dark:text-lab-light">{data.department}</p>
        <h1 className="text-page-title text-neutral-text dark:text-dark-text">{data.technicianName}</h1>
        <p className="mt-1 text-body text-neutral-muted dark:text-dark-muted">
          Test queue, sample tracking, and result publishing.
        </p>
      </div>

      <LabStatCards stats={data.stats} />

      <SectionCard title="Active test orders" subtitle="Pending and in-progress work">
        <LabTestOrdersTable orders={data.testOrders} />
      </SectionCard>

      <SectionCard title="Recently completed" subtitle="Published today">
        <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
          {data.completedReports.map((r) => (
            <li key={r.id} className="py-4 first:pt-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-neutral-text dark:text-dark-text">
                    {r.orderId} — {r.patientName}
                  </p>
                  <p className="text-sm text-neutral-muted dark:text-dark-muted">{r.testName}</p>
                  <p className="mt-1 text-sm text-lab-dark dark:text-lab-light">{r.resultSummary}</p>
                </div>
                <time className="text-sm text-neutral-light dark:text-dark-muted">{r.completedAt}</time>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
