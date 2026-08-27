import { http } from '../../shared/api/http'
import type { DoctorDashboardData } from './types'

const fallback: DoctorDashboardData = {
  doctorName: 'Dr Sathya',
  stats: { myPatients: 12, appointmentsToday: 8, pendingPrescriptions: 5, messagesUnread: 3 },
  patients: [
    {
      id: '1',
      name: 'Rajesh M',
      patientId: '38917',
      age: 32,
      gender: 'Male',
      roomNumber: '102',
      consultingDoctor: 'Dr Sathya',
      condition: 'Heavy fever',
      status: 'Recovering',
    },
  ],
  prescriptions: [
    { id: '1', patientName: 'Rajesh M', medicine: 'Paracetamol 500mg', doctor: 'Dr Sathya' },
  ],
  vitals: {
    patientName: 'Rajesh',
    age: 32,
    summary: 'Heavy fever — patient feel headache',
    heartRate: 80,
    glucose: 100,
    temperature: 38.5,
  },
  messages: [
    { id: '1', from: 'Dr Sathya', preview: 'Lab results ready for review', time: '5m ago' },
  ],
}

export async function fetchDoctorDashboard(doctorName?: string): Promise<DoctorDashboardData> {
  try {
    const res = await http.get<DoctorDashboardData>('/v1/doctor/dashboard/', {
      params: doctorName ? { doctor: doctorName } : undefined,
    })
    return res.data
  } catch {
    return { ...fallback, doctorName: doctorName ?? fallback.doctorName }
  }
}
