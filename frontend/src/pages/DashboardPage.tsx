import { MoreVertical, Search } from 'lucide-react'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { DashboardAnalytics } from '../features/dashboard/components/DashboardAnalytics'
import { DashboardStatCards } from '../features/dashboard/components/DashboardStatCards'
import { PrescriptionStrip } from '../features/dashboard/components/PrescriptionStrip'
import { fetchDashboardData } from '../features/dashboard/dashboardSlice'
import type { PatientSummary } from '../features/dashboard/types'
import { DataTable, type Column } from '../shared/ui/DataTable'
import { SectionCard } from '../shared/ui/SectionCard'
import { StatusBadge } from '../shared/ui/StatusBadge'
import { displayPatientStatus } from '../shared/utils/patientStatus'

const patientColumns: Column<PatientSummary>[] = [
  { key: 'name', header: 'Patient name', render: (p) => p.name },
  { key: 'patientId', header: 'Patient ID', render: (p) => p.patientId },
  { key: 'age', header: 'Age', render: (p) => p.age },
  { key: 'gender', header: 'Gender', render: (p) => p.gender },
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

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    if (!data && !isLoading) {
      void dispatch(fetchDashboardData())
    }
  }, [data, isLoading, dispatch])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-card bg-white dark:bg-dark-card" />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-80 animate-pulse rounded-card bg-white dark:bg-dark-card" />
          <div className="h-80 animate-pulse rounded-card bg-white dark:bg-dark-card" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-card border border-status-danger/20 bg-badge-cancelled-bg px-4 py-3 text-badge-cancelled-text">
        {error}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      <DashboardStatCards stats={data.stats} />

      <DashboardAnalytics data={data} />

      <SectionCard
        title="Patient details"
        action={
          <button
            type="button"
            className="rounded-full p-2 text-neutral-muted hover:bg-teal-surface dark:hover:bg-teal-dark/30"
            aria-label="Search patients"
          >
            <Search className="h-5 w-5 text-teal-main" strokeWidth={1.75} />
          </button>
        }
      >
        <DataTable columns={patientColumns} data={data.patients} keyExtractor={(p) => p.id} />
      </SectionCard>

      <SectionCard
        title="Prescriptions for patients"
        action={
          <button type="button" className="text-neutral-light hover:text-teal-main" aria-label="More">
            <MoreVertical className="h-5 w-5" />
          </button>
        }
      >
        <div className="px-2 pb-4">
          <PrescriptionStrip prescriptions={data.prescriptions} />
        </div>
      </SectionCard>
    </div>
  )
}
