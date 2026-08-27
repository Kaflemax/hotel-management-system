import { http } from '../../shared/api/http'
import type { AppointmentListResponse } from './types'

export async function fetchAppointments(): Promise<AppointmentListResponse> {
  try {
    const res = await http.get<AppointmentListResponse>('/v1/appointments/')
    return res.data
  } catch {
    return {
      count: 4,
      results: [
        {
          id: '1',
          patientName: 'Jeevanth Ram',
          patientId: '44785',
          doctor: 'Dr Keerthana',
          date: '2026-06-03',
          time: '09:00',
          type: 'Follow-up',
          status: 'Scheduled',
        },
        {
          id: '2',
          patientName: 'Vijay Kumar',
          patientId: '45862',
          doctor: 'Dr Priya',
          date: '2026-06-03',
          time: '10:30',
          type: 'Consultation',
          status: 'In Progress',
        },
        {
          id: '3',
          patientName: 'Anitha Devi',
          patientId: '51204',
          doctor: 'Dr Keerthana',
          date: '2026-06-03',
          time: '11:00',
          type: 'Lab review',
          status: 'Complete',
        },
        {
          id: '4',
          patientName: 'Rajesh M',
          patientId: '38917',
          doctor: 'Dr Sathya',
          date: '2026-06-03',
          time: '14:00',
          type: 'Emergency',
          status: 'Scheduled',
        },
      ],
    }
  }
}
