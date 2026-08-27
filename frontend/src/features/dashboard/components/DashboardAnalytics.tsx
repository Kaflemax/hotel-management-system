import type { ReactNode } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { DashboardData } from '../types'
import { ChartTooltip } from './ChartTooltip'
import { useChartTheme } from './useChartTheme'

const weeklyData = [
  { day: 'Mon', appointments: 18, admissions: 6, completed: 14 },
  { day: 'Tue', appointments: 24, admissions: 9, completed: 20 },
  { day: 'Wed', appointments: 22, admissions: 7, completed: 18 },
  { day: 'Thu', appointments: 31, admissions: 11, completed: 26 },
  { day: 'Fri', appointments: 28, admissions: 8, completed: 24 },
  { day: 'Sat', appointments: 14, admissions: 4, completed: 12 },
  { day: 'Sun', appointments: 9, admissions: 3, completed: 8 },
]

const occupancyData = weeklyData.map((d, i) => ({
  day: d.day,
  occupancy: 58 + i * 4 + (d.appointments % 6),
  capacity: 95,
}))

const diagnosisData = [
  { condition: 'Fever', value: 96 },
  { condition: 'High BP', value: 77 },
  { condition: 'CSBG', value: 74 },
  { condition: 'Root canal', value: 54 },
  { condition: 'Brain Cancer', value: 10 },
]

const departmentData = [
  { dept: 'Cardiology', patients: 42, fill: '#2C97AD' },
  { dept: 'Neurology', patients: 28, fill: '#5BB8CA' },
  { dept: 'Orthopedics', patients: 35, fill: '#247A8C' },
  { dept: 'Pediatrics', patients: 31, fill: '#86EFAC' },
  { dept: 'Emergency', patients: 22, fill: '#FB923C' },
]

function ChartShell({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-neutral-card-border/80 bg-white shadow-card dark:border-dark-border dark:bg-dark-card ${className}`}
    >
      <div className="border-b border-neutral-border/60 bg-gradient-to-r from-teal-surface/30 to-transparent px-5 py-4 dark:border-dark-border dark:from-teal-dark/20">
        <h3 className="text-card-title text-neutral-text dark:text-dark-text">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-small text-neutral-muted dark:text-dark-muted">{subtitle}</p> : null}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

type DashboardAnalyticsProps = {
  data: DashboardData
}

export function DashboardAnalytics({ data }: DashboardAnalyticsProps) {
  const chart = useChartTheme()

  const statusCounts = data.patients.reduce(
    (acc, p) => {
      const key = p.status === 'Critical' ? 'Critical' : p.status === 'Stable' ? 'Stable' : 'Recovering'
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = [
    { name: 'Stable', value: statusCounts.Stable ?? 0, color: '#86EFAC' },
    { name: 'Recovering', value: statusCounts.Recovering ?? 0, color: '#2C97AD' },
    { name: 'Critical', value: statusCounts.Critical ?? 0, color: '#FB923C' },
  ].filter((s) => s.value > 0)

  const totalPie = pieData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartShell title="Weekly hospital activity" subtitle="Appointments, admissions & completed visits">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={2} barCategoryGap="18%" margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradAppt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2C97AD" />
                    <stop offset="100%" stopColor="#5BB8CA" />
                  </linearGradient>
                  <linearGradient id="gradAdm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#247A8C" />
                    <stop offset="100%" stopColor="#3BA3B8" />
                  </linearGradient>
                  <linearGradient id="gradDone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#86EFAC" />
                    <stop offset="100%" stopColor="#4ADE80" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chart.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar dataKey="appointments" name="Scheduled" fill="url(#gradAppt)" radius={[8, 8, 0, 0]} maxBarSize={28} />
                <Bar dataKey="admissions" name="Admissions" fill="url(#gradAdm)" radius={[8, 8, 0, 0]} maxBarSize={28} />
                <Bar dataKey="completed" name="Completed" fill="url(#gradDone)" radius={[8, 8, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartShell>

        <ChartShell title="Bed occupancy trend" subtitle="7-day capacity utilization %">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyData} margin={{ top: 12, right: 12, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2C97AD" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#2C97AD" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: chart.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  name="Occupancy"
                  stroke="#2C97AD"
                  strokeWidth={3}
                  fill="url(#gradOcc)"
                  dot={{ fill: '#2C97AD', strokeWidth: 2, r: 4, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#247A8C' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartShell>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartShell title="Patient diagnosis" subtitle="Severity index by condition">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={diagnosisData} cx="50%" cy="50%" outerRadius="72%">
                <PolarGrid stroke={chart.grid} />
                <PolarAngleAxis dataKey="condition" tick={{ fill: chart.axis, fontSize: 10 }} />
                <Radar
                  name="Severity %"
                  dataKey="value"
                  stroke="#2C97AD"
                  fill="#2C97AD"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <Tooltip content={<ChartTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartShell>

        <ChartShell title="Patient status" subtitle="Active caseload distribution">
          <div className="relative h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold text-neutral-text dark:text-dark-text">{totalPie}</p>
              <p className="text-xs text-neutral-muted dark:text-dark-muted">Patients</p>
            </div>
          </div>
        </ChartShell>

        <ChartShell title="Department workload" subtitle="Patients per department">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: chart.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="dept"
                  width={76}
                  tick={{ fill: chart.axis, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="patients" name="Patients" radius={[0, 8, 8, 0]} barSize={16}>
                  {departmentData.map((entry) => (
                    <Cell key={entry.dept} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartShell>
      </div>
    </div>
  )
}
