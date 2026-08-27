import { Calendar, MessageSquare, Pill, Users } from 'lucide-react'

type DoctorStats = {
  myPatients: number
  appointmentsToday: number
  pendingPrescriptions: number
  messagesUnread: number
}

const cards = [
  { key: 'myPatients' as const, label: 'My patients', icon: Users, color: 'from-user-light to-user-main' },
  {
    key: 'appointmentsToday' as const,
    label: 'Appointments today',
    icon: Calendar,
    color: 'from-emerald-400 to-user-dark',
  },
  {
    key: 'pendingPrescriptions' as const,
    label: 'Pending Rx',
    icon: Pill,
    color: 'from-lime-400 to-user-main',
  },
  {
    key: 'messagesUnread' as const,
    label: 'Unread messages',
    icon: MessageSquare,
    color: 'from-green-300 to-user-dark',
  },
]

type DoctorStatCardsProps = {
  stats: DoctorStats
}

export function DoctorStatCards({ stats }: DoctorStatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <article
          key={key}
          className="relative overflow-hidden rounded-card border border-neutral-card-border bg-white p-5 shadow-card dark:border-dark-border dark:bg-dark-card"
        >
          <div
            className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 ${color}`}
            aria-hidden
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-muted dark:text-dark-muted">{label}</p>
              <p className="mt-2 text-3xl font-bold text-neutral-text dark:text-dark-text">{stats[key]}</p>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white ${color}`}>
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
