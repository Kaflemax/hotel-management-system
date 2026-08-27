import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { useChartTheme } from './useChartTheme'

const diagnosisData = [
  { condition: 'Fever', value: 96 },
  { condition: 'High BP', value: 77 },
  { condition: 'CSBG', value: 74 },
  { condition: 'Root canal', value: 54 },
  { condition: 'Brain Cancer', value: 10 },
]

export function PatientDiagnosisPanel() {
  const chart = useChartTheme()

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="h-56 flex-1 min-w-0 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={diagnosisData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke={chart.grid} />
            <PolarAngleAxis dataKey="condition" tick={{ fill: chart.axis, fontSize: 10 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Cases"
              dataKey="value"
              stroke="#5BB8CA"
              fill="#2C97AD"
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chart.tooltipBg,
                border: `1px solid ${chart.tooltipBorder}`,
                borderRadius: 12,
                color: chart.tooltipText,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex shrink-0 flex-col gap-3 lg:w-44">
        {diagnosisData.map((item) => (
          <li key={item.condition} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-neutral-muted dark:text-dark-muted">{item.condition}</span>
            <span className="font-semibold text-teal-main dark:text-teal-light">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
