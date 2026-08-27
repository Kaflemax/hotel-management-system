import { useLabOrders } from '../../features/labOrders/useLabOrders'
import { LabTestOrdersTable } from '../../features/laboratory/components/LabTestOrdersTable'
import { useFilteredList } from '../../shared/hooks/useFilteredList'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function LaboratoryOrdersPage() {
  const { orders, loading, reload } = useLabOrders({ exclude_completed: true })
  const { query, setQuery, filtered } = useFilteredList(orders, '', (o) =>
    `${o.orderId} ${o.patientName} ${o.testName} ${o.orderedBy}`,
  )

  return (
    <>
      <PageHeader
        eyebrow="Laboratory"
        title="Test orders"
        description="Orders appear here automatically when doctors request blood tests."
        action={
          <button
            type="button"
            onClick={() => void reload()}
            className="text-sm font-semibold text-lab-dark hover:underline dark:text-lab-light"
          >
            Refresh
          </button>
        }
      />

      <SectionCard
        title="Order queue"
        subtitle={`${orders.length} active orders`}
        action={
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders…"
            className="h-10 rounded-input border border-neutral-border bg-white px-3 text-sm outline-none focus:border-lab-main focus:ring-2 focus:ring-lab-main/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
          />
        }
      >
        {loading ? (
          <p className="px-6 py-8 text-body text-neutral-muted">Loading…</p>
        ) : (
          <LabTestOrdersTable orders={filtered} />
        )}
      </SectionCard>
    </>
  )
}
