import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  CreditCard,
  FileText,
  Globe,
  History,
  LayoutDashboard,
  MessageSquare,
  Pill,
  User,
} from 'lucide-react'

export type PatientNavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export const patientNavItems: PatientNavItem[] = [
  { label: 'Dashboard', path: '/patient', icon: LayoutDashboard },
  { label: 'Appointments', path: '/patient/appointments', icon: Calendar },
  { label: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
  { label: 'Medical history', path: '/patient/history', icon: History },
  { label: 'Lab reports', path: '/patient/reports', icon: FileText },
  { label: 'Bills', path: '/patient/bills', icon: CreditCard },
  { label: 'Messages', path: '/patient/messages', icon: MessageSquare },
  { label: 'My profile', path: '/patient/profile', icon: User },
  { label: 'Language', path: '/patient/language', icon: Globe },
]
