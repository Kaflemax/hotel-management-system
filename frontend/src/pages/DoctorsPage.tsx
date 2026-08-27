import { Mail, Phone, Stethoscope } from 'lucide-react'
import { useEffect, useState } from 'react'

import { fetchDoctors } from '../features/doctors/doctorsApi'
import type { DoctorRecord } from '../features/doctors/types'
import { useFilteredList } from '../shared/hooks/useFilteredList'
import { PageHeader } from '../shared/ui/PageHeader'
import { StatusBadge } from '../shared/ui/StatusBadge'

export function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorRecord[]>([])
  const [loading, setLoading] = useState(true)
  const { query, setQuery, filtered } = useFilteredList(doctors, '', (d) =>
    `${d.name} ${d.specialty} ${d.department} ${d.status}`,
  )

  useEffect(() => {
    void fetchDoctors().then((res) => {
      setDoctors(res.results)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Doctors"
        description="Staff directory, specialties, and availability."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doctors…"
          className="h-11 max-w-md flex-1 rounded-input border border-neutral-border bg-white px-4 text-sm outline-none focus:border-admin-main focus:ring-2 focus:ring-admin-main/25 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
        />
        <p className="text-small text-neutral-muted dark:text-dark-muted">
          {loading ? 'Loading…' : `${filtered.length} doctor(s)`}
        </p>
      </div>

      {loading ? (
        <p className="text-neutral-muted dark:text-dark-muted">Loading doctors…</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doctor) => (
            <article
              key={doctor.id}
              className="rounded-card border border-neutral-card-border bg-white p-6 shadow-card transition-shadow hover:shadow-md dark:border-dark-border dark:bg-dark-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-input bg-admin-surface text-admin-dark dark:bg-admin-main/25 dark:text-admin-light">
                  <Stethoscope className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <StatusBadge status={doctor.status} />
              </div>
              <h3 className="mt-4 text-card-title text-neutral-text dark:text-dark-text">{doctor.name}</h3>
              <p className="text-body text-admin-main dark:text-admin-light">{doctor.specialty}</p>
              <p className="mt-1 text-small text-neutral-muted dark:text-dark-muted">{doctor.department} department</p>
              <div className="mt-4 space-y-2 border-t border-neutral-border pt-4 text-small text-neutral-muted dark:border-dark-border dark:text-dark-muted">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  {doctor.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  {doctor.phone}
                </p>
              </div>
              <p className="mt-4 text-sm font-medium text-neutral-text dark:text-dark-text">
                {doctor.patientsCount} active patients
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
