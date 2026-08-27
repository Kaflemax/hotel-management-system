import type { LabTestOrder } from '../types'
import { DataTable, type Column } from '../../../shared/ui/DataTable'
import { StatusBadge } from '../../../shared/ui/StatusBadge'

const columns: Column<LabTestOrder>[] = [
  { key: 'orderId', header: 'Order ID', render: (r) => r.orderId },
  { key: 'patient', header: 'Patient', render: (r) => r.patientName },
  { key: 'patientId', header: 'Patient ID', render: (r) => r.patientId },
  { key: 'test', header: 'Test', render: (r) => r.testName },
  { key: 'doctor', header: 'Ordered by', render: (r) => r.orderedBy },
  {
    key: 'priority',
    header: 'Priority',
    render: (r) => (
      <StatusBadge status={r.priority === 'Urgent' ? 'Critical' : 'Scheduled'} />
    ),
  },
  { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'requested', header: 'Requested', render: (r) => r.requestedAt },
]

type LabTestOrdersTableProps = {
  orders: LabTestOrder[]
}

export function LabTestOrdersTable({ orders }: LabTestOrdersTableProps) {
  return <DataTable columns={columns} data={orders} keyExtractor={(r) => r.id} />
}
