import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { DashboardData } from '../types'
import { useChartTheme } from './useChartTheme'

const weeklyAppointments = [
  { day: 'Mon', appointments: 18, admissions: 6 },
  { day: 'Tue', appointments: 24, admissions: 9 },
  { day: 'Wed', appointments: 22, admissions: 7 },
  { day: 'Thu', appointments: 31, admissions: 11 },
  { day: 'Fri', appointments: 28, admissions: 8 },
  { day: 'Sat', appointments: 14, admissions: 4 },
  { day: 'Sun', appointments: 9, admissions: 3 },
]

const diagnosisData = [
  { condition: 'Fever', value: 90, fullMark: 100 },
  { condition: 'High BP', value: 77, fullMark: 100 },
  { condition: 'CSBG', value: 74, fullMark: 100 },
  { condition: 'Root canal', value: 54, fullMark: 100 },
  { condition: 'Brain Cancer', value: 10, fullMark: 100 },
]

const departmentLoad = [
  { dept: 'Cardiology', patients: 42 },
  { dept: 'Neurology', patients: 28 },
  { dept: 'Orthopedics', patients: 35 },
  { dept: 'Pediatrics', patients: 31 },
  { dept: 'Emergency', patients: 22 },
]

type DashboardChartsProps = {
  data: DashboardData
}

function ChartCard({
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
    <section
      className={`rounded-card border border-neutral-card-border bg-white p-6 shadow-card transition-colors dark:border-dark-border dark:bg-dark-card ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-card-title text-neutral-text dark:text-dark-text">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-small text-neutral-muted dark:text-dark-muted">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  const chart = useChartTheme()

  const statusCounts = data.patients.reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const statusPie = [
    { name: 'Stable', value: statusCounts.Stable ?? 0, color: chart.colors.secondary },
    { name: 'Recovering', value: statusCounts.Recovering ?? 0, color: chart.colors.primary },
    { name: 'Critical', value: statusCounts.Critical ?? 0, color: chart.colors.danger },
  ].filter((s) => s.value > 0)

  const tooltipStyle = {
    backgroundColor: chart.tooltipBg,
    border: `1px solid ${chart.tooltipBorder}`,
    borderRadius: 12,
    color: chart.tooltipText,
    fontSize: 13,
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Weekly appointments" subtitle="Scheduled visits vs new admissions">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAppointments} barGap={4} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, color: chart.axis }} />
                <Bar dataKey="appointments" name="Appointments" fill={chart.colors.primary} radius={[6, 6, 0, 0]} />
                <Bar dataKey="admissions" name="Admissions" fill={chart.colors.teal} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Patient flow trend" subtitle="Last 7 days — occupancy index">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyAppointments.map((d, i) => ({
                  ...d,
                  occupancy: 62 + i * 3 + (d.appointments % 5),
                }))}
                margin={{ top: 8, right: 16, left: -8, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chart.axis, fontSize: 12 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="occupancy"
                  name="Occupancy %"
                  stroke={chart.colors.secondary}
                  strokeWidth={3}
                  dot={{ fill: chart.colors.secondary, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Patient diagnosis" subtitle="Case mix severity index (%)" className="lg:col-span-1">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={diagnosisData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke={chart.grid} />
                <PolarAngleAxis dataKey="condition" tick={{ fill: chart.axis, fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: chart.axis, fontSize: 10 }} />
                <Radar
                  name="Cases"
                  dataKey="value"
                  stroke={chart.colors.primary}
                  fill={chart.colors.primary}
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Patient status" subtitle="Current active caseload">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={88}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                >
                  {statusPie.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, color: chart.axis }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Department load" subtitle="Patients per department">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentLoad} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: chart.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="dept"
                  width={88}
                  tick={{ fill: chart.axis, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="patients" name="Patients" fill={chart.colors.purple} radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
