import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { useAppSelector } from './hooks'
import { PortalGuard } from '../shared/routing/PortalGuard'
import { homePathForRole } from '../shared/routing/portalPaths'
import { ProtectedRoute } from '../shared/routing/ProtectedRoute'
import { AppLayout } from '../shared/ui/layout/AppLayout'
import { AdminLayout } from '../shared/ui/layout/AdminLayout'
import { DoctorLayout } from '../shared/ui/layout/DoctorLayout'
import { PatientLayout } from '../shared/ui/layout/PatientLayout'
import { LaboratoryLayout } from '../shared/ui/layout/LaboratoryLayout'
import { LoginPage } from '../pages/LoginPage'

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const PatientsPage = lazy(() =>
  import('../pages/PatientsPage').then((m) => ({ default: m.PatientsPage })),
)
const DoctorsPage = lazy(() => import('../pages/DoctorsPage').then((m) => ({ default: m.DoctorsPage })))
const AppointmentsPage = lazy(() =>
  import('../pages/AppointmentsPage').then((m) => ({ default: m.AppointmentsPage })),
)
const LanguagePage = lazy(() =>
  import('../pages/LanguagePage').then((m) => ({ default: m.LanguagePage })),
)
const ReportsPage = lazy(() =>
  import('../pages/ReportsPage').then((m) => ({ default: m.ReportsPage })),
)

const DoctorDashboardPage = lazy(() =>
  import('../pages/doctor/DoctorDashboardPage').then((m) => ({ default: m.DoctorDashboardPage })),
)
const DoctorPatientsPage = lazy(() =>
  import('../pages/doctor/DoctorPatientsPage').then((m) => ({ default: m.DoctorPatientsPage })),
)
const DoctorPrescriptionsPage = lazy(() =>
  import('../pages/doctor/DoctorPrescriptionsPage').then((m) => ({ default: m.DoctorPrescriptionsPage })),
)
const DoctorLabPage = lazy(() =>
  import('../pages/doctor/DoctorLabPage').then((m) => ({ default: m.DoctorLabPage })),
)
const DoctorHistoryPage = lazy(() =>
  import('../pages/doctor/DoctorHistoryPage').then((m) => ({ default: m.DoctorHistoryPage })),
)
const DoctorVitalsPage = lazy(() =>
  import('../pages/doctor/DoctorVitalsPage').then((m) => ({ default: m.DoctorVitalsPage })),
)
const DoctorMessagesPage = lazy(() =>
  import('../pages/doctor/DoctorMessagesPage').then((m) => ({ default: m.DoctorMessagesPage })),
)
const DoctorReportsPage = lazy(() =>
  import('../pages/doctor/DoctorReportsPage').then((m) => ({ default: m.DoctorReportsPage })),
)

const PatientDashboardPage = lazy(() =>
  import('../pages/patient/PatientDashboardPage').then((m) => ({ default: m.PatientDashboardPage })),
)
const PatientAppointmentsPage = lazy(() =>
  import('../pages/patient/PatientAppointmentsPage').then((m) => ({ default: m.PatientAppointmentsPage })),
)
const PatientPrescriptionsPage = lazy(() =>
  import('../pages/patient/PatientPrescriptionsPage').then((m) => ({ default: m.PatientPrescriptionsPage })),
)
const PatientHistoryPage = lazy(() =>
  import('../pages/patient/PatientHistoryPage').then((m) => ({ default: m.PatientHistoryPage })),
)
const PatientReportsPage = lazy(() =>
  import('../pages/patient/PatientReportsPage').then((m) => ({ default: m.PatientReportsPage })),
)
const PatientBillsPage = lazy(() =>
  import('../pages/patient/PatientBillsPage').then((m) => ({ default: m.PatientBillsPage })),
)
const PatientMessagesPage = lazy(() =>
  import('../pages/patient/PatientMessagesPage').then((m) => ({ default: m.PatientMessagesPage })),
)
const PatientProfilePage = lazy(() =>
  import('../pages/patient/PatientProfilePage').then((m) => ({ default: m.PatientProfilePage })),
)

const LaboratoryDashboardPage = lazy(() =>
  import('../pages/laboratory/LaboratoryDashboardPage').then((m) => ({
    default: m.LaboratoryDashboardPage,
  })),
)
const LaboratoryOrdersPage = lazy(() =>
  import('../pages/laboratory/LaboratoryOrdersPage').then((m) => ({ default: m.LaboratoryOrdersPage })),
)
const LaboratorySamplesPage = lazy(() =>
  import('../pages/laboratory/LaboratorySamplesPage').then((m) => ({ default: m.LaboratorySamplesPage })),
)
const LaboratoryResultsPage = lazy(() =>
  import('../pages/laboratory/LaboratoryResultsPage').then((m) => ({ default: m.LaboratoryResultsPage })),
)
const LaboratoryReportsPage = lazy(() =>
  import('../pages/laboratory/LaboratoryReportsPage').then((m) => ({ default: m.LaboratoryReportsPage })),
)
const LaboratoryMessagesPage = lazy(() =>
  import('../pages/laboratory/LaboratoryMessagesPage').then((m) => ({ default: m.LaboratoryMessagesPage })),
)

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="text-body text-neutral-muted dark:text-dark-muted">Loading…</p>
    </div>
  )
}

function suspense(page: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{page}</Suspense>
}

function RootRedirect() {
  const token = useAppSelector((s) => s.auth.accessToken)
  const role = useAppSelector((s) => s.auth.role)
  if (!token) return <Navigate to="/login" replace />
  return <Navigate to={homePathForRole(role)} replace />
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <PortalGuard allowedRole="admin" />,
            children: [
              {
                element: <AdminLayout />,
                children: [
                  { path: '/', element: suspense(<DashboardPage />) },
                  { path: '/patients', element: suspense(<PatientsPage />) },
                  { path: '/doctors', element: suspense(<DoctorsPage />) },
                  { path: '/appointments', element: suspense(<AppointmentsPage />) },
                  { path: '/reports', element: suspense(<ReportsPage />) },
                  { path: '/language', element: suspense(<LanguagePage />) },
                ],
              },
            ],
          },
          {
            element: <PortalGuard allowedRole="doctor" />,
            children: [
              {
                element: <DoctorLayout />,
                children: [
                  { path: '/doctor', element: suspense(<DoctorDashboardPage />) },
                  { path: '/doctor/patients', element: suspense(<DoctorPatientsPage />) },
                  { path: '/doctor/prescriptions', element: suspense(<DoctorPrescriptionsPage />) },
                  { path: '/doctor/lab', element: suspense(<DoctorLabPage />) },
                  { path: '/doctor/history', element: suspense(<DoctorHistoryPage />) },
                  { path: '/doctor/vitals', element: suspense(<DoctorVitalsPage />) },
                  { path: '/doctor/messages', element: suspense(<DoctorMessagesPage />) },
                  { path: '/doctor/reports', element: suspense(<DoctorReportsPage />) },
                  { path: '/doctor/language', element: suspense(<LanguagePage />) },
                ],
              },
            ],
          },
          {
            element: <PortalGuard allowedRole="patient" />,
            children: [
              {
                element: <PatientLayout />,
                children: [
                  { path: '/patient', element: suspense(<PatientDashboardPage />) },
                  { path: '/patient/appointments', element: suspense(<PatientAppointmentsPage />) },
                  { path: '/patient/prescriptions', element: suspense(<PatientPrescriptionsPage />) },
                  { path: '/patient/history', element: suspense(<PatientHistoryPage />) },
                  { path: '/patient/reports', element: suspense(<PatientReportsPage />) },
                  { path: '/patient/bills', element: suspense(<PatientBillsPage />) },
                  { path: '/patient/messages', element: suspense(<PatientMessagesPage />) },
                  { path: '/patient/profile', element: suspense(<PatientProfilePage />) },
                  { path: '/patient/language', element: suspense(<LanguagePage />) },
                ],
              },
            ],
          },
          {
            element: <PortalGuard allowedRole="laboratory" />,
            children: [
              {
                element: <LaboratoryLayout />,
                children: [
                  { path: '/laboratory', element: suspense(<LaboratoryDashboardPage />) },
                  { path: '/laboratory/orders', element: suspense(<LaboratoryOrdersPage />) },
                  { path: '/laboratory/samples', element: suspense(<LaboratorySamplesPage />) },
                  { path: '/laboratory/results', element: suspense(<LaboratoryResultsPage />) },
                  { path: '/laboratory/reports', element: suspense(<LaboratoryReportsPage />) },
                  { path: '/laboratory/messages', element: suspense(<LaboratoryMessagesPage />) },
                  { path: '/laboratory/language', element: suspense(<LanguagePage />) },
                ],
              },
            ],
          },
        ],
      },
      { path: '*', element: <RootRedirect /> },
    ],
  },
])
