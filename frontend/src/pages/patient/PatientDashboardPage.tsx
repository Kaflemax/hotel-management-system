import { Activity, Calendar, FlaskConical, Heart, Thermometer } from 'lucide-react'
import { Link } from 'react-router-dom'

import { LabDigitalReport } from '../../features/labOrders/components/LabDigitalReport'
import type { LabOrder } from '../../features/labOrders/types'
import { PatientStatCards } from '../../features/patient/components/PatientStatCards'
import { usePatientDashboard } from '../../features/patient/usePatientDashboard'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'
import { displayPatientStatus } from '../../shared/utils/patientStatus'

export function PatientDashboardPage() {
  const { data, loading } = usePatientDashboard()

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

  const { vitals } = data

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-patient-surface bg-gradient-to-r from-patient-surface to-white p-6 dark:border-patient-dark/30 dark:from-patient-dark/20 dark:to-dark-card">
        <p className="text-sm font-medium text-patient-dark dark:text-patient-light">Your care summary</p>
        <h1 className="text-page-title text-neutral-text dark:text-dark-text">{data.patientName}</h1>
        <p className="mt-1 text-body text-neutral-muted dark:text-dark-muted">
          Patient ID {data.patientId} · Room {data.roomNumber} · Under {data.consultingDoctor}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={displayPatientStatus(data.status)} />
          <span className="text-sm text-neutral-muted dark:text-dark-muted">{data.condition}</span>
        </div>
      </div>

      <PatientStatCards stats={data.stats} />

      {(data.labOrders?.length ?? 0) > 0 ? (
        <SectionCard
          title="Lab tests"
          subtitle="Ordered by your doctor — tracked digitally"
          action={
            <Link
              to="/patient/reports"
              className="text-sm font-semibold text-patient-dark hover:underline dark:text-patient-light"
            >
              View all reports
            </Link>
          }
        >
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.labOrders?.slice(0, 3).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-3 first:pt-1">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-patient-main" />
                  <div>
                    <p className="font-medium text-neutral-text dark:text-dark-text">{o.testName}</p>
                    <p className="text-xs text-neutral-muted">{o.orderId} · {o.orderedBy}</p>
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </li>
            ))}
          </ul>
          {data.labReports?.[0] ? (
            <div className="mt-4 px-2 pb-2">
              <LabDigitalReport order={data.labReports[0] as LabOrder} />
            </div>
          ) : null}
        </SectionCard>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Upcoming appointments" subtitle="Next scheduled visits">
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.appointments.map((apt) => (
              <li key={apt.id} className="flex items-center justify-between gap-3 py-4 first:pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-patient-surface text-patient-main dark:bg-patient-dark/30">
                    <Calendar className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-text dark:text-dark-text">{apt.doctor}</p>
                    <p className="text-sm text-neutral-muted dark:text-dark-muted">
                      {apt.department} · {apt.date} at {apt.time}
                    </p>
                  </div>
                </div>
                <StatusBadge status={apt.status} />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Latest vitals" subtitle={`Recorded ${vitals.recordedAt}`}>
          <div className="grid grid-cols-2 gap-4 px-2 pb-2">
            <VitalMini icon={Heart} label="Heart rate" value={`${vitals.heartRate} bpm`} />
            <VitalMini icon={Activity} label="Glucose" value={`${vitals.glucose} mg/dL`} />
            <VitalMini icon={Thermometer} label="Temperature" value={`${vitals.temperature}°C`} />
            <VitalMini icon={Activity} label="Blood pressure" value={vitals.bloodPressure} />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Recent prescriptions" subtitle="Medications from your care team">
        <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
          {data.prescriptions.map((rx) => (
            <li key={rx.id} className="py-4 first:pt-2">
              <p className="font-medium text-neutral-text dark:text-dark-text">{rx.medicine}</p>
              <p className="mt-1 text-sm text-neutral-muted dark:text-dark-muted">
                {rx.doctor} · Started {rx.startDate}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}

function VitalMini({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Heart
  label: string
  value: string
}) {
  return (
    <div className="rounded-card border border-neutral-card-border bg-neutral-bg/80 p-4 dark:border-dark-border dark:bg-dark-bg">
      <Icon className="h-5 w-5 text-patient-main" strokeWidth={1.75} />
      <p className="mt-2 text-xs text-neutral-muted dark:text-dark-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-text dark:text-dark-text">{value}</p>
    </div>
  )
}
