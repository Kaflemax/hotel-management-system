import { Activity, Droplets, Heart, Thermometer } from 'lucide-react'

import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function DoctorVitalsPage() {
  const { data, loading } = useDoctorDashboard()
  const vitals = data?.vitals

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Vital signs"
        description="Latest vitals for patients on your ward."
      />

      {loading || !vitals ? (
        <p className="text-body text-neutral-muted">Loading…</p>
      ) : (
        <SectionCard title={vitals.patientName} subtitle={`Age ${vitals.age} — ${vitals.summary}`}>
          <div className="grid gap-4 sm:grid-cols-3">
            <VitalCard icon={Heart} label="Heart rate" value={`${vitals.heartRate} bpm`} />
            <VitalCard icon={Droplets} label="Glucose" value={`${vitals.glucose} mg/dL`} />
            <VitalCard icon={Thermometer} label="Temperature" value={`${vitals.temperature}°C`} />
            <VitalCard icon={Activity} label="Status" value="Monitoring" className="sm:col-span-3" />
          </div>
        </SectionCard>
      )}
    </>
  )
}

function VitalCard({
  icon: Icon,
  label,
  value,
  className = '',
}: {
  icon: typeof Heart
  label: string
  value: string
  className?: string
}) {
  return (
    <div
      className={`rounded-card border border-user-surface bg-user-surface/50 p-6 dark:border-user-dark/40 dark:bg-user-dark/20 ${className}`}
    >
      <Icon className="h-6 w-6 text-user-main" strokeWidth={1.75} />
      <p className="mt-3 text-sm text-neutral-muted dark:text-dark-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-neutral-text dark:text-dark-text">{value}</p>
    </div>
  )
}
