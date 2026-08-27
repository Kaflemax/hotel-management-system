export type PatientAppointment = {
  id: string
  date: string
  time: string
  doctor: string
  department: string
  status: string
}

export type PatientPrescription = {
  id: string
  medicine: string
  doctor: string
  startDate: string
}

export type PatientVitals = {
  heartRate: number
  glucose: number
  temperature: number
  bloodPressure: string
  recordedAt: string
}

export type PatientMessage = {
  id: string
  from: string
  preview: string
  time: string
}

export type PatientBill = {
  id: string
  description: string
  amount: number
  status: string
  dueDate: string
}

export type PatientLabOrder = {
  id: string
  orderId: string
  testName: string
  orderedBy: string
  status: string
  requestedAt: string
  resultSummary?: string | null
}

export type PatientDashboardData = {
  patientName: string
  patientId: string
  age: number
  gender: string
  roomNumber: string
  consultingDoctor: string
  condition: string
  status: string
  stats: {
    upcomingAppointments: number
    activePrescriptions: number
    unreadMessages: number
    pendingBills: number
    pendingLabTests?: number
    labReportsReady?: number
  }
  appointments: PatientAppointment[]
  prescriptions: PatientPrescription[]
  vitals: PatientVitals
  messages: PatientMessage[]
  bills: PatientBill[]
  labOrders?: PatientLabOrder[]
  labReports?: PatientLabOrder[]
}
