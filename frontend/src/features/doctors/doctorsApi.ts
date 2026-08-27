import { http } from '../../shared/api/http'
import type { DoctorListResponse } from './types'

export async function fetchDoctors(): Promise<DoctorListResponse> {
  try {
    const res = await http.get<DoctorListResponse>('/v1/doctors/')
    return res.data
  } catch {
    return {
      count: 4,
      results: [
        {
          id: '1',
          name: 'Dr Keerthana',
          specialty: 'Dentistry',
          department: 'Dental',
          email: 'keerthana@hms.local',
          phone: '+91 90001 10001',
          patientsCount: 18,
          status: 'Available',
        },
        {
          id: '2',
          name: 'Dr Sree',
          specialty: 'Neurology',
          department: 'Neurology',
          email: 'sree@hms.local',
          phone: '+91 90001 10002',
          patientsCount: 14,
          status: 'Available',
        },
        {
          id: '3',
          name: 'Dr Priya',
          specialty: 'Cardiology',
          department: 'Cardiology',
          email: 'priya@hms.local',
          phone: '+91 90001 10003',
          patientsCount: 22,
          status: 'In Surgery',
        },
        {
          id: '4',
          name: 'Dr Sathya',
          specialty: 'General Medicine',
          department: 'General',
          email: 'sathya@hms.local',
          phone: '+91 90001 10004',
          patientsCount: 31,
          status: 'Available',
        },
      ],
    }
  }
}
