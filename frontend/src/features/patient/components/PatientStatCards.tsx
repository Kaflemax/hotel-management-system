import { Calendar, CreditCard, FileText, FlaskConical, MessageSquare, Pill } from 'lucide-react'

type PatientStats = {
  upcomingAppointments: number
  activePrescriptions: number
  unreadMessages: number
  pendingBills: number
  pendingLabTests?: number
  labReportsReady?: number
}

const cards = [
  {
    key: 'upcomingAppointments' as const,
    label: 'Upcoming visits',
    icon: Calendar,
    color: 'from-blue-300 to-patient-main',
  },
  {
    key: 'activePrescriptions' as const,
    label: 'Active Rx',
    icon: Pill,
    color: 'from-sky-300 to-patient-dark',
  },
  {
    key: 'unreadMessages' as const,
    label: 'Messages',
    icon: MessageSquare,
    color: 'from-indigo-300 to-patient-main',
  },
  {
    key: 'pendingBills' as const,
    label: 'Pending bills',
    icon: CreditCard,
    color: 'from-cyan-300 to-patient-dark',
  },
  {
    key: 'pendingLabTests' as const,
    label: 'Lab tests pending',
    icon: FlaskConical,
    color: 'from-violet-300 to-patient-main',
  },
  {
    key: 'labReportsReady' as const,
    label: 'Reports ready',
    icon: FileText,
    color: 'from-blue-300 to-patient-dark',
  },
]

type PatientStatCardsProps = {
  stats: PatientStats
}

export function PatientStatCards({ stats }: PatientStatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
              <p className="mt-2 text-3xl font-bold text-neutral-text dark:text-dark-text">
                {stats[key] ?? 0}
              </p>
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
