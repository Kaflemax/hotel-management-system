import type { LucideIcon } from 'lucide-react'
import { Activity, Calendar, Stethoscope, Users } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

import type { DashboardStats } from '../types'

const sparkPatients = [
  { v: 12 },
  { v: 15 },
  { v: 14 },
  { v: 18 },
  { v: 17 },
  { v: 20 },
  { v: 22 },
]
const sparkAppts = [
  { v: 8 },
  { v: 12 },
  { v: 10 },
  { v: 15 },
  { v: 18 },
  { v: 16 },
  { v: 21 },
]

type DashboardStatCardsProps = {
  stats: DashboardStats
}

export function DashboardStatCards({ stats }: DashboardStatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Patients"
        value={stats.totalPatients}
        trend="+12%"
        icon={Users}
        gradient="from-teal-main to-teal-light"
        spark={sparkPatients}
        sparkColor="#2C97AD"
      />
      <StatCard
        label="Total Doctors"
        value={stats.totalDoctors}
        trend="+3%"
        icon={Stethoscope}
        gradient="from-teal-dark to-teal-main"
        spark={sparkPatients}
        sparkColor="#247A8C"
      />
      <StatCard
        label="Today Appointments"
        value={stats.appointmentsToday}
        trend="+8%"
        icon={Calendar}
        gradient="from-[#3BA3B8] to-[#7EC8D8]"
        spark={sparkAppts}
        sparkColor="#5BB8CA"
      />
      <StatCard
        label="Critical Cases"
        value={stats.criticalCases}
        trend="-2%"
        icon={Activity}
        gradient="from-orange-400 to-orange-300"
        spark={sparkAppts}
        sparkColor="#FB923C"
        trendDown
      />
    </div>
  )
}

type StatCardProps = {
  label: string
  value: number
  trend: string
  icon: LucideIcon
  gradient: string
  spark: { v: number }[]
  sparkColor: string
  trendDown?: boolean
}

function StatCard({
  label,
  value,
  trend,
  icon: Icon,
  gradient,
  spark,
  sparkColor,
  trendDown,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-card bg-white p-5 shadow-card dark:bg-dark-card">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.08]`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-muted dark:text-dark-muted">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-neutral-text dark:text-dark-text">{value}</p>
          <span
            className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
              trendDown
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
            }`}
          >
            {trend} vs last week
          </span>
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
      </div>
      <div className="relative mt-4 h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spark}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparkColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={sparkColor}
              strokeWidth={2}
              fill={`url(#spark-${label})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
