export type AppointmentRecord = {
  id: string
  patientName: string
  patientId: string
  doctor: string
  date: string
  time: string
  type: string
  status: string
}

export type AppointmentListResponse = {
  results: AppointmentRecord[]
  count: number
}
