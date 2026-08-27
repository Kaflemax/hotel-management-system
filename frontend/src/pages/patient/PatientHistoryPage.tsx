import { usePatientDashboard } from '../../features/patient/usePatientDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

const historyRows = [
  { date: '2026-05-20', title: 'Admission', detail: 'Admitted with high fever — general ward room 102' },
  { date: '2026-05-21', title: 'Lab work', detail: 'Blood count and glucose within normal range' },
  { date: '2026-05-22', title: 'Consultation', detail: 'Dr Sathya adjusted medication plan' },
]

export function PatientHistoryPage() {
  const { data } = usePatientDashboard()
  const name = data?.patientName ?? 'Patient'

  return (
    <>
      <PageHeader
        eyebrow="Patient"
        title="Medical history"
        description={`Visit and treatment timeline for ${name}.`}
      />

      <SectionCard title="Timeline">
        <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
          {historyRows.map((row) => (
            <li key={row.date + row.title} className="py-4 first:pt-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-neutral-text dark:text-dark-text">{row.title}</p>
                  <p className="text-sm text-neutral-muted dark:text-dark-muted">{row.detail}</p>
                </div>
                <time className="text-sm text-patient-dark dark:text-patient-light">{row.date}</time>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  )
}
