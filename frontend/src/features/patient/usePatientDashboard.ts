import { useEffect, useState } from 'react'

import { useAppSelector } from '../../app/hooks'
import { fetchPatientDashboard } from './patientApi'
import type { PatientDashboardData } from './types'

export function usePatientDashboard() {
  const displayName = useAppSelector((s) => s.auth.displayName)
  const patientId = useAppSelector((s) => s.auth.patientId)
  const [data, setData] = useState<PatientDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    void fetchPatientDashboard(displayName ?? undefined, patientId ?? undefined).then((res) => {
      if (!cancelled) {
        setData(res)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [displayName, patientId])

  return { data, loading }
}
