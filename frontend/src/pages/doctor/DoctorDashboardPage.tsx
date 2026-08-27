import { Activity, Heart, MoreVertical, Thermometer } from 'lucide-react'

import { DoctorPrescriptionStrip } from '../../features/doctor/components/DoctorPrescriptionStrip'
import { DoctorStatCards } from '../../features/doctor/components/DoctorStatCards'
import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import type { DoctorPatient } from '../../features/doctor/types'
import { DataTable, type Column } from '../../shared/ui/DataTable'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'
import { displayPatientStatus } from '../../shared/utils/patientStatus'

const patientColumns: Column<DoctorPatient>[] = [
  { key: 'name', header: 'Patient name', render: (p) => p.name },
  { key: 'patientId', header: 'Patient ID', render: (p) => p.patientId },
  { key: 'age', header: 'Age', render: (p) => p.age },
  { key: 'gender', header: 'Gender', render: (p) => p.gender },
  { key: 'room', header: 'Room', render: (p) => p.roomNumber },
  { key: 'doctor', header: 'Doctor consulting', render: (p) => p.consultingDoctor },
  { key: 'condition', header: 'Treatment under', render: (p) => p.condition },
  {
    key: 'status',
    header: 'Status',
    render: (p) => <StatusBadge status={displayPatientStatus(p.status)} />,
  },
  {
    key: 'action',
    header: 'Action',
    render: () => (
      <button
        type="button"
        className="rounded-lg p-1.5 text-neutral-light hover:bg-neutral-table-hover hover:text-neutral-muted dark:hover:bg-dark-bg"
        aria-label="Row actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    ),
  },
]

export function DoctorDashboardPage() {
  const { data, loading } = useDoctorDashboard()

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-white dark:bg-dark-card" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-card bg-white dark:bg-dark-card" />
          ))}
        </div>
      </div>
    )
  }

  const { vitals, messages } = data

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-user-dark dark:text-user-light">Welcome back</p>
        <h1 className="text-page-title text-neutral-text dark:text-dark-text">{data.doctorName}</h1>
        <p className="mt-1 text-body text-neutral-muted dark:text-dark-muted">
          Your patients, prescriptions, and vitals at a glance.
        </p>
      </div>

      <DoctorStatCards stats={data.stats} />

      <SectionCard title="Patient details" subtitle="Assigned to your care">
        <DataTable columns={patientColumns} data={data.patients} keyExtractor={(p) => p.id} />
      </SectionCard>

      <SectionCard title="Prescriptions" subtitle="Recent orders">
        <DoctorPrescriptionStrip prescriptions={data.prescriptions} />
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Vital signs" subtitle={vitals.patientName}>
          <div className="space-y-4">
            <p className="text-sm text-neutral-muted dark:text-dark-muted">
              Age {vitals.age} — {vitals.summary}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <VitalTile
                icon={Heart}
                label="Heart rate"
                value={`${vitals.heartRate} bpm`}
                accent="text-rose-500"
              />
              <VitalTile
                icon={Activity}
                label="Glucose"
                value={`${vitals.glucose} mg/dL`}
                accent="text-user-main"
              />
              <VitalTile
                icon={Thermometer}
                label="Temperature"
                value={`${vitals.temperature}°C`}
                accent="text-amber-500"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Messages" subtitle="Staff & lab updates">
          <ul className="divide-y divide-neutral-border dark:divide-dark-border">
            {messages.map((msg) => (
              <li key={msg.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-text dark:text-dark-text">{msg.from}</p>
                  <p className="truncate text-sm text-neutral-muted dark:text-dark-muted">{msg.preview}</p>
                </div>
                <span className="shrink-0 text-xs text-neutral-light dark:text-dark-muted">{msg.time}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  )
}

function VitalTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Heart
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="rounded-card border border-neutral-card-border bg-neutral-bg/80 p-4 dark:border-dark-border dark:bg-dark-bg">
      <Icon className={`h-5 w-5 ${accent}`} strokeWidth={1.75} />
      <p className="mt-2 text-xs text-neutral-muted dark:text-dark-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-text dark:text-dark-text">{value}</p>
    </div>
  )
}
