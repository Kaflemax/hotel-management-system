export type DoctorPatient = {
  id: string
  name: string
  patientId: string
  age: number
  gender: string
  roomNumber: string
  consultingDoctor: string
  condition: string
  status: string
}

export type DoctorPrescription = {
  id: string
  patientName: string
  medicine: string
  doctor: string
}

export type DoctorVitals = {
  patientName: string
  age: number
  summary: string
  heartRate: number
  glucose: number
  temperature: number
}

export type DoctorMessage = {
  id: string
  from: string
  preview: string
  time: string
}

export type DoctorDashboardData = {
  doctorName: string
  stats: {
    myPatients: number
    appointmentsToday: number
    pendingPrescriptions: number
    messagesUnread: number
  }
  patients: DoctorPatient[]
  prescriptions: DoctorPrescription[]
  vitals: DoctorVitals
  messages: DoctorMessage[]
}
