import { DoctorPrescriptionStrip } from '../../features/doctor/components/DoctorPrescriptionStrip'
import { useDoctorDashboard } from '../../features/doctor/useDoctorDashboard'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SectionCard } from '../../shared/ui/SectionCard'

export function DoctorPrescriptionsPage() {
  const { data, loading } = useDoctorDashboard()

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Prescriptions"
        description="Active and recent medication orders for your patients."
      />

      <SectionCard title="Active prescriptions" subtitle="Tap a card for full details (demo)">
        {loading || !data ? (
          <p className="text-body text-neutral-muted">Loading…</p>
        ) : (
          <DoctorPrescriptionStrip prescriptions={data.prescriptions} />
        )}
      </SectionCard>
    </>
  )
}
