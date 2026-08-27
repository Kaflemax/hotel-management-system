import { http } from '../../shared/api/http'
import type { PatientListResponse } from './types'

const fallback: PatientListResponse = {
  count: 3,
  results: [
    {
      id: '1',
      name: 'Jeevanth Ram',
      patientId: '44785',
      age: 36,
      gender: 'Male',
      roomNumber: '101',
      consultingDoctor: 'Dr Keerthana',
      condition: 'Root canal',
      status: 'Recovering',
      phone: '+91 98765 43210',
      admittedOn: '2026-05-18',
    },
    {
      id: '2',
      name: 'Kathirssan',
      patientId: '32581',
      age: 35,
      gender: 'Male',
      roomNumber: '103',
      consultingDoctor: 'Dr Sree',
      condition: 'Bell palsy',
      status: 'Stable',
      phone: '+91 98765 11223',
      admittedOn: '2026-05-20',
    },
    {
      id: '3',
      name: 'Vijay Kumar',
      patientId: '45862',
      age: 29,
      gender: 'Male',
      roomNumber: '304',
      consultingDoctor: 'Dr Priya',
      condition: 'High BP',
      status: 'Critical',
      phone: '+91 98765 99887',
      admittedOn: '2026-05-22',
    },
  ],
}

export async function fetchPatients(): Promise<PatientListResponse> {
  try {
    const res = await http.get<PatientListResponse>('/v1/patients/')
    return res.data
  } catch {
    return fallback
  }
}
