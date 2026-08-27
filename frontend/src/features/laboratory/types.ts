export type LabTestOrder = {
  id: string
  orderId: string
  patientName: string
  patientId: string
  testName: string
  orderedBy: string
  priority: string
  status: string
  requestedAt: string
}

export type LabCompletedReport = {
  id: string
  orderId: string
  patientName: string
  testName: string
  resultSummary: string
  completedAt: string
}

export type LabMessage = {
  id: string
  from: string
  preview: string
  time: string
}

export type LaboratoryDashboardData = {
  technicianName: string
  department: string
  stats: {
    pendingTests: number
    inProgress: number
    completedToday: number
    urgentSamples: number
  }
  testOrders: LabTestOrder[]
  completedReports: LabCompletedReport[]
  messages: LabMessage[]
}
