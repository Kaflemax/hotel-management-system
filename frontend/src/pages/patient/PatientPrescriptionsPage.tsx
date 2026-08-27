import { usePatientDashboard } from '../../features/patient/usePatientDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function PatientPrescriptionsPage() {
  const { data, loading } = usePatientDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Patient"
        title="Prescriptions"
        description="Medications prescribed during your current stay."
      />

      <SectionCard title="Active medications">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.prescriptions.map((rx) => (
              <li key={rx.id} className="py-4 first:pt-2">
                <p className="font-semibold text-neutral-text dark:text-dark-text">{rx.medicine}</p>
                <p className="mt-1 text-sm text-neutral-muted dark:text-dark-muted">
                  Prescribed by {rx.doctor} · {rx.startDate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
