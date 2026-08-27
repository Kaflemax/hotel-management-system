import { useState } from 'react'

import { updateLabOrder } from '../labOrdersApi'
import type { LabOrder } from '../types'
import { LAB_STATUS_ADVANCE } from '../types'

type LabWorkflowActionsProps = {
  order: LabOrder
  technicianName: string
  onUpdated: () => void
}

export function LabWorkflowActions({ order, technicianName, onUpdated }: LabWorkflowActionsProps) {
  const [busy, setBusy] = useState(false)
  const [resultSummary, setResultSummary] = useState(order.resultSummary ?? '')
  const [showResultForm, setShowResultForm] = useState(order.status === 'Processing')

  const nextStatus = LAB_STATUS_ADVANCE[order.status]

  async function advanceStatus() {
    if (!nextStatus) return
    setBusy(true)
    try {
      await updateLabOrder(order.id, { status: nextStatus })
      onUpdated()
      if (nextStatus === 'Processing') setShowResultForm(true)
    } finally {
      setBusy(false)
    }
  }

  async function publishResults() {
    if (!resultSummary.trim()) return
    setBusy(true)
    try {
      await updateLabOrder(order.id, {
        status: 'Completed',
        resultSummary: resultSummary.trim(),
        completedBy: technicianName,
      })
      onUpdated()
      setShowResultForm(false)
    } finally {
      setBusy(false)
    }
  }

  if (order.status === 'Completed') {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      {nextStatus ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void advanceStatus()}
          className="h-9 rounded-input bg-lab-main px-3 text-sm font-semibold text-white hover:bg-lab-dark disabled:opacity-60"
        >
          Mark as {nextStatus}
        </button>
      ) : null}

      {(showResultForm || order.status === 'Processing') && order.status !== 'Completed' ? (
        <div className="space-y-2 rounded-input border border-lab-surface bg-lab-surface/30 p-3 dark:border-lab-dark/40">
          <label className="block text-xs font-medium text-neutral-text dark:text-dark-text">
            Result summary (visible to doctor & patient)
          </label>
          <input
            value={resultSummary}
            onChange={(e) => setResultSummary(e.target.value)}
            placeholder="e.g. Hb 14.2 g/dL — Normal"
            className="h-10 w-full rounded-input border border-neutral-border bg-white px-3 text-sm dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
          />
          <button
            type="button"
            disabled={busy || !resultSummary.trim()}
            onClick={() => void publishResults()}
            className="h-9 w-full rounded-input bg-lab-dark px-3 text-sm font-semibold text-white hover:bg-lab-main disabled:opacity-60"
          >
            Publish digital report
          </button>
        </div>
      ) : null}
    </div>
  )
}
