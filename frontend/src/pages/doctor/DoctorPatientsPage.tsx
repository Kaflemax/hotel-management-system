import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import type { DoctorPatient } from '../../features/doctor/types'
import { useFilteredList } from '../../shared/hooks/useFilteredList'
import { DataTable, type Column } from '../../shared/ui/DataTable'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'
import { displayPatientStatus } from '../../shared/utils/patientStatus'

const columns: Column<DoctorPatient>[] = [
  { key: 'name', header: 'Patient name', render: (p) => p.name },
  { key: 'patientId', header: 'Patient ID', render: (p) => p.patientId },
  { key: 'age', header: 'Age', render: (p) => p.age },
  { key: 'gender', header: 'Gender', render: (p) => p.gender },
  { key: 'room', header: 'Room', render: (p) => p.roomNumber },
  { key: 'doctor', header: 'Consulting doctor', render: (p) => p.consultingDoctor },
  { key: 'condition', header: 'Condition', render: (p) => p.condition },
  {
    key: 'status',
    header: 'Status',
    render: (p) => <StatusBadge status={displayPatientStatus(p.status)} />,
  },
]

export function DoctorPatientsPage() {
  const { data, loading } = useDoctorDashboard()
  const patients = data?.patients ?? []
  const { query, setQuery, filtered } = useFilteredList(patients, '', (p) =>
    `${p.name} ${p.patientId} ${p.roomNumber} ${p.condition}`,
  )

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Patient details"
        description="Patients under your care and shared consults."
      />

      <SectionCard
        title="All patients"
        subtitle={`${patients.length} records`}
        action={
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients…"
            className="h-10 rounded-input border border-neutral-border bg-white px-3 text-sm outline-none focus:border-user-main focus:ring-2 focus:ring-user-main/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
          />
        }
      >
        {loading ? (
          <p className="text-body text-neutral-muted">Loading…</p>
        ) : (
          <DataTable columns={columns} data={filtered} keyExtractor={(p) => p.id} />
        )}
      </SectionCard>
    </>
  )
}
