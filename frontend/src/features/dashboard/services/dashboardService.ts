import { http } from '../../../shared/api/http'
import type { DashboardData } from '../types'

const fallbackDashboardData: DashboardData = {
  stats: {
    totalPatients: 128,
    totalDoctors: 24,
    appointmentsToday: 31,
    criticalCases: 5,
  },
  patients: [
    {
      id: '1',
      name: 'Jeevanth Ram',
      patientId: '44785',
      age: 36,
      gender: 'Male',
      consultingDoctor: 'Dr Keerthana',
      condition: 'Root canal',
      status: 'Recovering',
    },
    {
      id: '2',
      name: 'Kathirssan',
      patientId: '32581',
      age: 35,
      gender: 'Male',
      consultingDoctor: 'Dr Sree',
      condition: 'Bell palsy',
      status: 'Stable',
    },
    {
      id: '3',
      name: 'Vijay Kumar',
      patientId: '45862',
      age: 29,
      gender: 'Male',
      consultingDoctor: 'Dr Priya',
      condition: 'High BP',
      status: 'Critical',
    },
  ],
  prescriptions: [
    { id: '1', patientName: 'Vijay Kumar', medicine: 'Aspirin 75mg', doctor: 'Dr Priya' },
    { id: '2', patientName: 'Jeevanth Ram', medicine: 'Metformin', doctor: 'Dr Keerthana' },
    { id: '3', patientName: 'Kathirssan', medicine: 'Vitamin B12', doctor: 'Dr Sree' },
  ],
}

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const response = await http.get('/v1/dashboard/summary/')
    return response.data as DashboardData
  } catch {
    return fallbackDashboardData
  }
}
