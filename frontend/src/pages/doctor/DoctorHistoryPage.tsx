import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

const historyRows = [
  { date: '2026-05-22', patient: 'Rajesh M', note: 'Fever review — Paracetamol prescribed' },
  { date: '2026-05-20', patient: 'Anitha Devi', note: 'Diabetes follow-up — HbA1c stable' },
  { date: '2026-05-18', patient: 'Vijay Kumar', note: 'Referred to cardiology for BP management' },
]

export function DoctorHistoryPage() {
  const { data } = useDoctorDashboard()
  const doctorName = data?.doctorName ?? 'Doctor'

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="History"
        description={`Clinical notes and visit history for ${doctorName}.`}
      />

      <SectionCard title="Recent visits">
        <ul className="divide-y divide-neutral-border dark:divide-dark-border">
          {historyRows.map((row) => (
            <li key={row.date + row.patient} className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-neutral-text dark:text-dark-text">{row.patient}</p>
                <p className="text-sm text-neutral-muted dark:text-dark-muted">{row.note}</p>
              </div>
              <time className="text-sm text-neutral-light dark:text-dark-muted">{row.date}</time>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  )
}
