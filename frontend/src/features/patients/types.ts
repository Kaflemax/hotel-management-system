export type PatientRecord = {
  id: string
  name: string
  patientId: string
  age: number
  gender: string
  roomNumber: string
  consultingDoctor: string
  condition: string
  status: string
  phone: string
  admittedOn: string
}

export type PatientListResponse = {
  results: PatientRecord[]
  count: number
}
