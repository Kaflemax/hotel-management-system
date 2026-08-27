export type UserRole = 'admin' | 'doctor' | 'patient' | 'laboratory'

export type LoginResponse = {
  access: string
  refresh: string
  role: UserRole
  username: string
  display_name?: string
  specialty?: string
  patient_id?: string
  department?: string
}
