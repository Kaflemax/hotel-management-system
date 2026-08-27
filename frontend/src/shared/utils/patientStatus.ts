/** Map clinical statuses to mockup-style Pending / Complete badges */
export function displayPatientStatus(status: string): 'Pending' | 'Complete' | string {
  if (status === 'Critical') return 'Pending'
  if (status === 'Stable' || status === 'Recovering') return 'Complete'
  return status
}
