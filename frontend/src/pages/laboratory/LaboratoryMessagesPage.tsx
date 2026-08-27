import { useLaboratoryDashboard } from '../../features/laboratory/useLaboratoryDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function LaboratoryMessagesPage() {
  const { data, loading } = useLaboratoryDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Laboratory"
        title="Messages"
        description="Requests from doctors and nursing staff."
      />

      <SectionCard title="Inbox">
        {loading || !data ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <ul className="divide-y divide-neutral-border px-2 dark:divide-dark-border">
            {data.messages.map((msg) => (
              <li
                key={msg.id}
                className="flex cursor-pointer items-start justify-between gap-4 py-4 transition-colors hover:bg-neutral-table-hover/50 first:pt-2 dark:hover:bg-dark-bg/50"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-text dark:text-dark-text">{msg.from}</p>
                  <p className="mt-1 text-sm text-neutral-muted dark:text-dark-muted">{msg.preview}</p>
                </div>
                <span className="shrink-0 text-xs text-lab-dark dark:text-lab-light">{msg.time}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </>
  )
}
