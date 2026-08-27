import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function DoctorMessagesPage() {
  const { data, loading } = useDoctorDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Messages"
        description="Updates from housekeeping, floor managers, and lab."
      />

      <SectionCard title="Inbox">
        {loading || !data ? (
          <p className="text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border dark:divide-dark-border">
            {data.messages.map((msg) => (
              <li
                key={msg.id}
                className="flex cursor-pointer items-start justify-between gap-4 py-4 transition-colors hover:bg-neutral-table-hover/50 first:pt-0 dark:hover:bg-dark-bg/50"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-text dark:text-dark-text">{msg.from}</p>
                  <p className="mt-1 text-sm text-neutral-muted dark:text-dark-muted">{msg.preview}</p>
                </div>
                <span className="shrink-0 text-xs text-user-dark dark:text-user-light">{msg.time}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
