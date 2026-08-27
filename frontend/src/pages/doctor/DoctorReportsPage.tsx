import { Link } from 'react-router-dom'
import { FileText, FlaskConical } from 'lucide-react'

import { useAppSelector } from '../../app/hooks'
import { LabDigitalReport } from '../../features/labOrders/components/LabDigitalReport'
import { useLabOrders } from '../../features/labOrders/useLabOrders'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function DoctorReportsPage() {
  const doctorName = useAppSelector((s) => s.auth.displayName) ?? 'Doctor'
  const { orders, loading } = useLabOrders({ ordered_by: doctorName })
  const completed = orders.filter((o) => o.status === 'Completed')

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Reports"
        description="Digital lab results and clinical documents — no paper handoffs."
        action={
          <Link
            to="/doctor/lab"
            className="inline-flex h-11 items-center gap-2 rounded-input bg-user-main px-4 text-sm font-semibold text-white hover:bg-user-dark"
          >
            <FlaskConical className="h-4 w-4" />
            Order lab test
          </Link>
        }
      />

      <SectionCard title="Lab results" subtitle="Published by the laboratory portal">
        {loading ? (
          <p className="px-6 py-8 text-neutral-muted">Loading…</p>
        ) : completed.length === 0 ? (
          <p className="px-6 py-8 text-neutral-muted">
            No lab reports yet. Order a blood test from{' '}
            <Link to="/doctor/lab" className="font-semibold text-user-dark hover:underline">
              Lab tests
            </Link>{' '}
            and results will appear here when the lab publishes them.
          </p>
        ) : (
          <div className="space-y-4 px-2 pb-4">
            {completed.map((o) => (
              <LabDigitalReport key={o.id} order={o} />
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Other documents">
        <ul className="divide-y divide-neutral-border dark:divide-dark-border">
          {[
            { title: 'Daily ward summary', status: 'Ready', date: '2026-05-24' },
            { title: 'Discharge summary — draft', status: 'Draft', date: '2026-05-22' },
          ].map((r) => (
            <li key={r.title} className="flex items-center justify-between gap-4 px-2 py-4 first:pt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-user-surface text-user-dark">
                  <FileText className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-medium text-neutral-text dark:text-dark-text">{r.title}</p>
                  <p className="text-xs text-neutral-muted dark:text-dark-muted">{r.date}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  r.status === 'Ready'
                    ? 'bg-badge-complete-bg text-badge-complete-text'
                    : 'bg-badge-pending-bg text-badge-pending-text'
                }`}
              >
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  )
}
