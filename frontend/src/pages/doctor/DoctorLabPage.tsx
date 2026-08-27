import { useState } from 'react'
import { FlaskConical, Plus } from 'lucide-react'

import { useAppSelector } from '../../app/hooks'
import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import { createLabOrder } from '../../features/labOrders/labOrdersApi'
import { LabDigitalReport } from '../../features/labOrders/components/LabDigitalReport'
import { useLabOrders } from '../../features/labOrders/useLabOrders'
import { LAB_TEST_OPTIONS } from '../../features/labOrders/types'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'
import { StatusBadge } from '../../shared/ui/StatusBadge'

export function DoctorLabPage() {
  const doctorName = useAppSelector((s) => s.auth.displayName) ?? 'Doctor'
  const { data: doctorData } = useDoctorDashboard()
  const { orders, loading, reload } = useLabOrders({ ordered_by: doctorName })

  const [showForm, setShowForm] = useState(false)
  const [patientId, setPatientId] = useState('')
  const [patientName, setPatientName] = useState('')
  const [testName, setTestName] = useState<string>(LAB_TEST_OPTIONS[0])
  const [priority, setPriority] = useState('Routine')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const pending = orders.filter((o) => o.status !== 'Completed')
  const completed = orders.filter((o) => o.status === 'Completed')
  const patients = doctorData?.patients ?? []

  function selectPatient(id: string, name: string) {
    setPatientId(id)
    setPatientName(name)
  }

  async function submitOrder(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (!patientId || !patientName || !testName) {
      setFormError('Select a patient and test type')
      return
    }
    setSubmitting(true)
    setFormError(null)
    try {
      await createLabOrder({
        patientId,
        patientName,
        testName,
        orderedBy: doctorName,
        priority,
      })
      setShowForm(false)
      setPatientId('')
      setPatientName('')
      await reload()
    } catch {
      setFormError('Failed to send order to laboratory')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Lab tests"
        description="Order blood tests digitally — results appear in the lab queue, patient chart, and here when ready."
        action={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex h-11 items-center gap-2 rounded-input bg-user-main px-4 text-sm font-semibold text-white hover:bg-user-dark"
          >
            <Plus className="h-4 w-4" />
            Order test
          </button>
        }
      />

      {showForm ? (
        <SectionCard title="New lab order" subtitle="Sent instantly to the laboratory portal">
          <form className="space-y-4 px-2 pb-2" onSubmit={(e) => void submitOrder(e)}>
            <div>
              <label className="text-sm font-medium text-neutral-text dark:text-dark-text">Patient</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {patients.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectPatient(p.patientId, p.name)}
                    className={`rounded-pill px-3 py-1.5 text-sm ${
                      patientId === p.patientId
                        ? 'bg-user-main text-white'
                        : 'bg-neutral-bg text-neutral-text dark:bg-dark-bg dark:text-dark-text'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="testName" className="text-sm font-medium">
                  Test
                </label>
                <select
                  id="testName"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="mt-2 h-11 w-full rounded-input border border-neutral-border bg-white px-3 text-sm dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
                >
                  {LAB_TEST_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-2 h-11 w-full rounded-input border border-neutral-border bg-white px-3 text-sm dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
                >
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            {formError ? <p className="text-sm text-status-danger">{formError}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="h-11 rounded-input bg-user-main px-6 text-sm font-semibold text-white hover:bg-user-dark disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send to laboratory'}
            </button>
          </form>
        </SectionCard>
      ) : null}

      <SectionCard
        title="Pending at lab"
        subtitle={`${pending.length} tests awaiting sample or results`}
      >
        {loading ? (
          <p className="px-6 py-8 text-neutral-muted">Loading…</p>
        ) : pending.length === 0 ? (
          <p className="px-6 py-8 text-neutral-muted">No pending lab orders.</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {pending.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-user-surface text-user-dark">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-text dark:text-dark-text">
                      {o.testName} — {o.patientName}
                    </p>
                    <p className="text-sm text-neutral-muted">
                      {o.orderId} · {o.requestedAt}
                    </p>
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <SectionCard title="Digital lab reports" subtitle="Published results — no paper needed">
        {completed.length === 0 ? (
          <p className="px-6 py-8 text-neutral-muted">Completed reports will appear here when the lab publishes them.</p>
        ) : (
          <div className="space-y-4 px-2 pb-4">
            {completed.map((o) => (
              <LabDigitalReport key={o.id} order={o} />
            ))}
          </div>
        )}
      </SectionCard>
    </>
  )
}
