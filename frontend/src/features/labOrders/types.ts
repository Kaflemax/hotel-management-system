export type LabOrderStatus =
  | 'Ordered'
  | 'Pending collection'
  | 'Sample collected'
  | 'Processing'
  | 'Completed'

export type LabOrder = {
  id: string
  orderId: string
  patientId: string
  patientName: string
  testName: string
  orderedBy: string
  priority: string
  status: LabOrderStatus | string
  requestedAt: string
  resultSummary?: string | null
  resultDetails?: Record<string, string> | null
  completedAt?: string | null
  completedBy?: string | null
}

export type LabOrderCreatePayload = {
  patientId: string
  patientName: string
  testName: string
  orderedBy: string
  priority?: string
}

export type LabOrderUpdatePayload = {
  status?: LabOrderStatus | string
  resultSummary?: string
  resultDetails?: Record<string, string>
  completedBy?: string
}

export const LAB_TEST_OPTIONS = [
  'Complete Blood Count (CBC)',
  'Blood glucose',
  'HbA1c',
  'Lipid profile',
  'Liver function test',
  'Renal panel',
  'Urine culture',
  'Thyroid panel',
] as const

export const LAB_STATUS_ADVANCE: Record<string, string | null> = {
  Ordered: 'Pending collection',
  'Pending collection': 'Sample collected',
  'Sample collected': 'Processing',
  Processing: null,
  Completed: null,
}
