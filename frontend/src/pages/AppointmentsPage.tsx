import { CalendarClock, Filter } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { fetchAppointments } from '../features/appointments/appointmentsApi'
import type { AppointmentRecord } from '../features/appointments/types'
import { DataTable, type Column } from '../shared/ui/DataTable'
import { useFilteredList } from '../shared/hooks/useFilteredList'
import { PageHeader } from '../shared/ui/PageHeader'
import { SectionCard } from '../shared/ui/SectionCard'
import { StatusBadge } from '../shared/ui/StatusBadge'

const columns: Column<AppointmentRecord>[] = [
  { key: 'patient', header: 'Patient', render: (r) => r.patientName },
  { key: 'id', header: 'Patient ID', render: (r) => r.patientId },
  { key: 'doctor', header: 'Doctor', render: (r) => r.doctor },
  { key: 'date', header: 'Date', render: (r) => r.date },
  { key: 'time', header: 'Time', render: (r) => r.time },
  { key: 'type', header: 'Type', render: (r) => r.type },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

const statusFilters = ['All', 'Scheduled', 'In Progress', 'Complete', 'Pending', 'Cancelled'] as const

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>('All')
  const { query, setQuery, filtered: searchFiltered } = useFilteredList(appointments, '', (a) =>
    `${a.patientName} ${a.doctor} ${a.type} ${a.status} ${a.date}`,
  )

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return searchFiltered
    return searchFiltered.filter((a) => a.status === statusFilter)
  }, [searchFiltered, statusFilter])

  useEffect(() => {
    void fetchAppointments().then((res) => {
      setAppointments(res.results)
      setLoading(false)
    })
  }, [])

  const today = new Date().toISOString().slice(0, 10)
  const todayCount = appointments.filter((a) => a.date === today).length

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Appointments"
        description="Schedule and track patient visits across departments."
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <MiniStat icon={CalendarClock} label="Total" value={appointments.length} />
        <MiniStat label="Today" value={todayCount} />
        <MiniStat label="Scheduled" value={appointments.filter((a) => a.status === 'Scheduled').length} />
        <MiniStat label="Complete" value={appointments.filter((a) => a.status === 'Complete').length} />
      </div>

      <SectionCard
        title="Appointment schedule"
        subtitle={loading ? 'Loading…' : `${filtered.length} shown`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-muted" />
            {statusFilters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-admin-main text-white'
                    : 'bg-neutral-table-head text-neutral-muted hover:bg-neutral-table-hover dark:bg-dark-bg dark:text-dark-muted'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        }
      >
        <div className="border-b border-neutral-border px-6 py-3 dark:border-dark-border">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search appointments…"
            className="h-10 w-full max-w-sm rounded-input border border-neutral-border bg-neutral-bg px-3 text-sm dark:border-dark-border dark:bg-dark-bg dark:text-dark-text"
          />
        </div>
        {loading ? (
          <p className="px-6 py-8 text-neutral-muted">Loading…</p>
        ) : (
          <DataTable columns={columns} data={filtered} keyExtractor={(r) => r.id} />
        )}
      </SectionCard>
    </>
  )
}

function MiniStat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon?: typeof CalendarClock
}) {
  return (
    <div className="rounded-card border border-neutral-card-border bg-white p-5 shadow-card dark:border-dark-border dark:bg-dark-card">
      {Icon ? (
        <Icon className="mb-2 h-5 w-5 text-admin-main" strokeWidth={1.75} />
      ) : null}
      <div className="text-small text-neutral-muted dark:text-dark-muted">{label}</div>
      <div className="mt-1 text-section-title text-neutral-text dark:text-dark-text">{value}</div>
    </div>
  )
}
