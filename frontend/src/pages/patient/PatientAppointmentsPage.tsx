import { Calendar } from 'lucide-react'

import { usePatientDashboard } from '../../features/patient/usePatientDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'

export function PatientAppointmentsPage() {
  const { data, loading } = usePatientDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Patient"
        title="Appointments"
        description="View and manage your upcoming hospital visits."
      />

      <SectionCard title="Scheduled visits">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.appointments.map((apt) => (
              <li key={apt.id} className="flex items-center justify-between gap-4 py-4 first:pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-patient-surface text-patient-main dark:bg-patient-dark/30">
                    <Calendar className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-text dark:text-dark-text">{apt.doctor}</p>
                    <p className="text-sm text-neutral-muted dark:text-dark-muted">{apt.department}</p>
                    <p className="mt-1 text-sm text-patient-dark dark:text-patient-light">
                      {apt.date} · {apt.time}
                    </p>
                  </div>
                </div>
                <StatusBadge status={apt.status} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
