import { Plus, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { fetchPatients } from '../features/patients/patientsApi'
import type { PatientRecord } from '../features/patients/types'
import { DataTable, type Column } from '../shared/ui/DataTable'
import { PageHeader } from '../shared/ui/PageHeader'
import { SectionCard } from '../shared/ui/SectionCard'
import { StatusBadge } from '../shared/ui/StatusBadge'
import { useFilteredList } from '../shared/hooks/useFilteredList'
import { displayPatientStatus } from '../shared/utils/patientStatus'

const columns: Column<PatientRecord>[] = [
  { key: 'name', header: 'Patient name', render: (r) => r.name },
  { key: 'patientId', header: 'Patient ID', render: (r) => r.patientId },
  { key: 'age', header: 'Age', render: (r) => r.age },
  { key: 'gender', header: 'Gender', render: (r) => r.gender },
  { key: 'room', header: 'Room', render: (r) => r.roomNumber },
  { key: 'doctor', header: 'Doctor', render: (r) => r.consultingDoctor },
  { key: 'condition', header: 'Treatment', render: (r) => r.condition },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={displayPatientStatus(r.status)} /> },
  { key: 'admitted', header: 'Admitted', render: (r) => r.admittedOn },
]

export function PatientsPage() {
  const [patients, setPatients] = useState<PatientRecord[]>([])
  const [loading, setLoading] = useState(true)
  const { query, setQuery, filtered } = useFilteredList(patients, '', (p) =>
    `${p.name} ${p.patientId} ${p.consultingDoctor} ${p.condition} ${p.roomNumber}`,
  )

  useEffect(() => {
    void fetchPatients().then((res) => {
      setPatients(res.results)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Patients"
        description="Manage patient records, room assignments, and treatment status."
        action={
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-input bg-admin-main px-4 text-sm font-semibold text-white shadow-sm hover:bg-admin-dark dark:bg-admin-light dark:hover:bg-admin-main"
          >
            <Plus className="h-4 w-4" />
            Add patient
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatMini label="Total patients" value={patients.length} />
        <StatMini
          label="Critical"
          value={patients.filter((p) => p.status === 'Critical').length}
          variant="danger"
        />
        <StatMini
          label="Stable / recovering"
          value={patients.filter((p) => p.status !== 'Critical').length}
          variant="success"
        />
      </div>

      <SectionCard
        title="All patients"
        subtitle={loading ? 'Loading…' : `${filtered.length} record(s)`}
        action={
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients…"
            className="h-10 w-full max-w-xs rounded-input border border-neutral-border bg-neutral-bg px-3 text-sm outline-none focus:border-admin-main focus:ring-2 focus:ring-admin-main/25 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text"
          />
        }
      >
        {loading ? (
          <p className="px-6 py-8 text-neutral-muted dark:text-dark-muted">Loading patients…</p>
        ) : (
          <DataTable columns={columns} data={filtered} keyExtractor={(r) => r.id} />
        )}
      </SectionCard>
    </>
  )
}

function StatMini({
  label,
  value,
  variant = 'default',
}: {
  label: string
  value: number
  variant?: 'default' | 'success' | 'danger'
}) {
  const ring =
    variant === 'danger'
      ? 'border-status-danger/20'
      : variant === 'success'
        ? 'border-status-success/20'
        : 'border-neutral-card-border dark:border-dark-border'

  return (
    <div
      className={`rounded-card border bg-white p-5 shadow-card dark:bg-dark-card ${ring}`}
    >
      <div className="flex items-center gap-2 text-small text-neutral-muted dark:text-dark-muted">
        <UserPlus className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-2 text-section-title text-neutral-text dark:text-dark-text">{value}</div>
    </div>
  )
}
