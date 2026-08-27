export type DoctorRecord = {
  id: string
  name: string
  specialty: string
  department: string
  email: string
  phone: string
  patientsCount: number
  status: string
}

export type DoctorListResponse = {
  results: DoctorRecord[]
  count: number
}
