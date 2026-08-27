import { useEffect, useState } from 'react'

import { useAppSelector } from '../../app/hooks'
import { fetchLaboratoryDashboard } from './laboratoryApi'
import type { LaboratoryDashboardData } from './types'

export function useLaboratoryDashboard() {
  const displayName = useAppSelector((s) => s.auth.displayName)
  const [data, setData] = useState<LaboratoryDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    void fetchLaboratoryDashboard(displayName ?? undefined).then((res) => {
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
