import { usePatientDashboard } from '../../features/patient/usePatientDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'

function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    amount,
  )
}

export function PatientBillsPage() {
  const { data, loading } = usePatientDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Patient"
        title="Bills"
        description="Hospital charges and payment status."
      />

      <SectionCard title="Statements">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.bills.map((bill) => (
              <li key={bill.id} className="flex items-center justify-between gap-4 py-4 first:pt-2">
                <div>
                  <p className="font-semibold text-neutral-text dark:text-dark-text">{bill.description}</p>
                  <p className="text-sm text-neutral-muted dark:text-dark-muted">Due {bill.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-text dark:text-dark-text">{formatInr(bill.amount)}</p>
                  <StatusBadge status={bill.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
