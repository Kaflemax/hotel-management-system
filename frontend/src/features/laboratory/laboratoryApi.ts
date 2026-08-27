import { http } from '../../shared/api/http'
import type { LaboratoryDashboardData } from './types'

const fallback: LaboratoryDashboardData = {
  technicianName: 'Lab Tech Priya',
  department: 'Central Laboratory',
  stats: { pendingTests: 14, inProgress: 6, completedToday: 22, urgentSamples: 3 },
  testOrders: [
    {
      id: '1',
      orderId: 'LAB-2401',
      patientName: 'Rajesh M',
      patientId: '38917',
      testName: 'Complete Blood Count',
      orderedBy: 'Dr Sathya',
      priority: 'Urgent',
      status: 'Sample collected',
      requestedAt: '2026-05-24 07:30',
    },
  ],
  completedReports: [
    {
      id: '1',
      orderId: 'LAB-2398',
      patientName: 'Jeevanth Ram',
      testName: 'Blood glucose',
      resultSummary: '100 mg/dL — Normal',
      completedAt: '2026-05-24 09:00',
    },
  ],
  messages: [{ id: '1', from: 'Dr Sathya', preview: 'Prioritize CBC room 102', time: '15m ago' }],
}

export async function fetchLaboratoryDashboard(technicianName?: string): Promise<LaboratoryDashboardData> {
  try {
    const res = await http.get<LaboratoryDashboardData>('/v1/laboratory/dashboard/', {
      params: technicianName ? { technician: technicianName } : undefined,
    })
    return res.data
  } catch {
    return { ...fallback, technicianName: technicianName ?? fallback.technicianName }
  }
}
