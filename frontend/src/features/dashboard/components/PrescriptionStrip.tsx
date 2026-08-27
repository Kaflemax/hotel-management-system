import { MoreVertical } from 'lucide-react'

import type { PrescriptionSummary } from '../types'

type PrescriptionStripProps = {
  prescriptions: PrescriptionSummary[]
}

function parseMedicine(medicine: string) {
  const parts = medicine.split(/\s+/)
  return {
    name: parts[0] ?? medicine,
    dosage: parts.slice(1).join(' ') || 'As directed',
  }
}

export function PrescriptionStrip({ prescriptions }: PrescriptionStripProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-thin">
      {prescriptions.map((rx) => {
        const med = parseMedicine(rx.medicine)
        return (
          <article
            key={rx.id}
            className="min-w-[220px] shrink-0 rounded-card bg-teal-prescription p-4 shadow-sm dark:bg-teal-dark/30"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-teal-main shadow-sm">
                  {rx.patientName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-text dark:text-dark-text">
                    {rx.patientName}
                  </p>
                  <p className="text-xs text-neutral-muted dark:text-dark-muted">prescription</p>
                </div>
              </div>
              <button type="button" className="text-neutral-light hover:text-neutral-muted" aria-label="Options">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            <dl className="mt-4 space-y-1.5 text-xs text-neutral-muted dark:text-dark-muted">
              <div className="flex justify-between gap-2">
                <dt>Medication</dt>
                <dd className="font-medium text-neutral-text dark:text-dark-text">{med.name}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Dosage</dt>
                <dd className="font-medium text-neutral-text dark:text-dark-text">{med.dosage}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Doctor</dt>
                <dd className="font-medium text-teal-dark dark:text-teal-light">{rx.doctor}</dd>
              </div>
            </dl>
          </article>
        )
      })}
    </div>
  )
}
