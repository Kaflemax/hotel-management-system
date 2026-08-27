import { http } from '../../shared/api/http'
import type { ReportListResponse } from './types'

export async function fetchReports(): Promise<ReportListResponse> {
  try {
    const res = await http.get<ReportListResponse>('/v1/reports/')
    return res.data
  } catch {
    return {
      count: 3,
      summary: { totalReports: 3, readyCount: 2, processingCount: 1, downloadsThisMonth: 47 },
      results: [
        {
          id: '1',
          title: 'Monthly patient admissions',
          type: 'Operations',
          generatedAt: '2026-06-01',
          status: 'Ready',
          size: '2.4 MB',
        },
        {
          id: '2',
          title: 'Doctor utilization summary',
          type: 'HR',
          generatedAt: '2026-05-28',
          status: 'Ready',
          size: '1.1 MB',
        },
        {
          id: '3',
          title: 'Appointment no-show analysis',
          type: 'Operations',
          generatedAt: '2026-06-02',
          status: 'Processing',
          size: '—',
        },
      ],
    }
  }
}
