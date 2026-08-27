import { useCallback, useEffect, useState } from 'react'

import { fetchLabOrders } from './labOrdersApi'
import type { LabOrder } from './types'

export function useLabOrders(params?: {
  patient_id?: string
  ordered_by?: string
  status?: string
  exclude_completed?: boolean
}) {
  const [orders, setOrders] = useState<LabOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLabOrders(params)
      setOrders(data)
    } catch {
      setError('Could not load lab orders')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }, [params?.patient_id, params?.ordered_by, params?.status, params?.exclude_completed])

  useEffect(() => {
    void reload()
  }, [reload])

  return { orders, loading, error, reload }
}
