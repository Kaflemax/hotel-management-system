import { http } from '../../shared/api/http'
import type { PatientDashboardData } from './types'

const fallback: PatientDashboardData = {
  patientName: 'Rajesh M',
  patientId: '38917',
  age: 32,
  gender: 'Male',
  roomNumber: '102',
  consultingDoctor: 'Dr Sathya',
  condition: 'Heavy fever',
  status: 'Recovering',
  stats: {
    upcomingAppointments: 2,
    activePrescriptions: 3,
    unreadMessages: 2,
    pendingBills: 1,
  },
  appointments: [
    {
      id: '1',
      date: '2026-05-25',
      time: '10:30 AM',
      doctor: 'Dr Sathya',
      department: 'General Medicine',
      status: 'Scheduled',
    },
  ],
  prescriptions: [
    { id: '1', medicine: 'Paracetamol 500mg', doctor: 'Dr Sathya', startDate: '2026-05-20' },
  ],
  vitals: {
    heartRate: 80,
    glucose: 100,
    temperature: 37.2,
    bloodPressure: '120/80',
    recordedAt: '2026-05-24',
  },
  messages: [{ id: '1', from: 'Dr Sathya', preview: 'Rest and hydrate', time: '2h ago' }],
  bills: [
    {
      id: '1',
      description: 'Room & nursing',
      amount: 12500,
      status: 'Pending',
      dueDate: '2026-05-30',
    },
  ],
}

export async function fetchPatientDashboard(
  patientName?: string,
  patientId?: string,
): Promise<PatientDashboardData> {
  try {
    const res = await http.get<PatientDashboardData>('/v1/patient/dashboard/', {
      params: {
        ...(patientName ? { patient: patientName } : {}),
        ...(patientId ? { patient_id: patientId } : {}),
      },
    })
    return res.data
  } catch {
    return { ...fallback, patientName: patientName ?? fallback.patientName }
  }
}
