import { useAppSelector } from '../../app/hooks'
import { usePatientDashboard } from '../../features/patient/usePatientDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'
import { displayPatientStatus } from '../../shared/utils/patientStatus'

export function PatientProfilePage() {
  const username = useAppSelector((s) => s.auth.username)
  const patientId = useAppSelector((s) => s.auth.patientId)
  const { data, loading } = usePatientDashboard()

  return (
    <>
      <PageHeader eyebrow="Patient" title="My profile" description="Your hospital registration details." />

      <SectionCard title="Personal information">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <dl className="grid gap-4 px-6 pb-6 sm:grid-cols-2">
            <ProfileField label="Full name" value={data.patientName} />
            <ProfileField label="Patient ID" value={patientId ?? data.patientId} />
            <ProfileField label="Username" value={username ?? '—'} />
            <ProfileField label="Age" value={String(data.age)} />
            <ProfileField label="Gender" value={data.gender} />
            <ProfileField label="Room" value={data.roomNumber} />
            <ProfileField label="Consulting doctor" value={data.consultingDoctor} />
            <ProfileField label="Condition" value={data.condition} />
            <div className="sm:col-span-2">
              <dt className="text-sm text-neutral-muted dark:text-dark-muted">Status</dt>
              <dd className="mt-1">
                <StatusBadge status={displayPatientStatus(data.status)} />
              </dd>
            </div>
          </dl>
        )}
      </SectionCard>
    </>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-neutral-muted dark:text-dark-muted">{label}</dt>
      <dd className="mt-1 font-medium text-neutral-text dark:text-dark-text">{value}</dd>
    </div>
  )
}
