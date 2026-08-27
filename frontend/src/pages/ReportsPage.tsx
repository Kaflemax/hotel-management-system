import { Download, FileBarChart, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { fetchReports } from '../features/reports/reportsApi'
import type { ReportListResponse, ReportRecord } from '../features/reports/types'
import { useChartTheme } from '../features/dashboard/components/useChartTheme'
import { DataTable, type Column } from '../shared/ui/DataTable'
import { PageHeader } from '../shared/ui/PageHeader'
import { SectionCard } from '../shared/ui/SectionCard'
import { StatusBadge } from '../shared/ui/StatusBadge'

const columns: Column<ReportRecord>[] = [
  { key: 'title', header: 'Report', render: (r) => r.title },
  { key: 'type', header: 'Type', render: (r) => r.type },
  { key: 'date', header: 'Generated', render: (r) => r.generatedAt },
  { key: 'size', header: 'Size', render: (r) => r.size },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'action',
    header: 'Action',
    render: (r) =>
      r.status === 'Ready' ? (
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg bg-admin-surface px-2.5 py-1 text-xs font-medium text-admin-dark hover:bg-admin-main/20 dark:bg-admin-main/20 dark:text-admin-light"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      ) : (
        <span className="text-xs text-neutral-muted">—</span>
      ),
  },
]

export function ReportsPage() {
  const [data, setData] = useState<ReportListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const chart = useChartTheme()

  useEffect(() => {
    void fetchReports().then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const byType =
    data?.results.reduce(
      (acc, r) => {
        acc[r.type] = (acc[r.type] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) ?? {}

  const chartData = Object.entries(byType).map(([type, count]) => ({ type, count }))

  const tooltipStyle = {
    backgroundColor: chart.tooltipBg,
    border: `1px solid ${chart.tooltipBorder}`,
    borderRadius: 12,
    color: chart.tooltipText,
  }

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Reports"
        description="Operational, clinical, and HR reports for hospital leadership."
      />

      {data ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Total reports" value={data.summary.totalReports} icon={FileText} />
          <SummaryCard label="Ready" value={data.summary.readyCount} />
          <SummaryCard label="Processing" value={data.summary.processingCount} />
          <SummaryCard label="Downloads (month)" value={data.summary.downloadsThisMonth} icon={FileBarChart} />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Reports by category" subtitle="Distribution by type" className="lg:col-span-1">
          <div className="h-64 px-2 pb-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                  <XAxis dataKey="type" tick={{ fill: chart.axis, fontSize: 11 }} />
                  <YAxis tick={{ fill: chart.axis, fontSize: 11 }} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill={chart.colors.primary} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="py-12 text-center text-small text-neutral-muted">No data</p>
            )}
          </div>
        </SectionCard>

        <div className="lg:col-span-2">
          <SectionCard title="Report library" subtitle={loading ? 'Loading…' : `${data?.count ?? 0} reports`}>
            {loading ? (
              <p className="px-6 py-8 text-neutral-muted">Loading reports…</p>
            ) : data ? (
              <DataTable columns={columns} data={data.results} keyExtractor={(r) => r.id} />
            ) : null}
          </SectionCard>
        </div>
      </div>
    </>
  )
}

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon?: typeof FileText
}) {
  return (
    <div className="rounded-card border border-neutral-card-border bg-white p-5 shadow-card dark:border-dark-border dark:bg-dark-card">
      {Icon ? <Icon className="mb-2 h-5 w-5 text-admin-main" /> : null}
      <div className="text-small text-neutral-muted dark:text-dark-muted">{label}</div>
      <div className="mt-1 text-section-title text-neutral-text dark:text-dark-text">{value}</div>
    </div>
  )
}
