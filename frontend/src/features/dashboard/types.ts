export type PatientSummary = {
  id: string
  name: string
  patientId: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  consultingDoctor: string
  condition: string
  status: 'Stable' | 'Critical' | 'Recovering'
}

export type PrescriptionSummary = {
  id: string
  patientName: string
  medicine: string
  doctor: string
}

export type DashboardStats = {
  totalPatients: number
  totalDoctors: number
  appointmentsToday: number
  criticalCases: number
}

export type DashboardData = {
  stats: DashboardStats
  patients: PatientSummary[]
  prescriptions: PrescriptionSummary[]
}
