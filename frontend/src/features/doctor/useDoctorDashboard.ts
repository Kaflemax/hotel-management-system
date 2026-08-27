import { useEffect, useState } from 'react'

import { useAppSelector } from '../../app/hooks'
import { fetchDoctorDashboard } from './doctorApi'
import type { DoctorDashboardData } from './types'

export function useDoctorDashboard() {
  const displayName = useAppSelector((s) => s.auth.displayName)
  const [data, setData] = useState<DoctorDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    void fetchDoctorDashboard(displayName ?? undefined).then((res) => {
      if (!cancelled) {
        setData(res)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [displayName])

  return { data, loading }
}
