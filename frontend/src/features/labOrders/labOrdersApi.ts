import { http } from '../../shared/api/http'
import type { LabOrder, LabOrderCreatePayload, LabOrderUpdatePayload } from './types'

export async function fetchLabOrders(params?: {
  patient_id?: string
  ordered_by?: string
  status?: string
  exclude_completed?: boolean
}): Promise<LabOrder[]> {
  const res = await http.get<{ results: LabOrder[] }>('/v1/lab-orders/', { params })
  return res.data.results
}

export async function createLabOrder(payload: LabOrderCreatePayload): Promise<LabOrder> {
  const res = await http.post<LabOrder>('/v1/lab-orders/', payload)
  return res.data
}

export async function updateLabOrder(
  orderId: string,
  payload: LabOrderUpdatePayload,
): Promise<LabOrder> {
  const res = await http.patch<LabOrder>(`/v1/lab-orders/${orderId}/`, payload)
  return res.data
}
