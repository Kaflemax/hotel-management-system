import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  FileText,
  Globe,
  LayoutDashboard,
  Pill,
  Stethoscope,
  UserCog,
  Users,
} from 'lucide-react'

export type DepartmentNavItem = {
  label: string
  path: string
}

export const departmentNavItems: DepartmentNavItem[] = [
  { label: 'Patient', path: '/patients' },
  { label: 'Doctor', path: '/doctors' },
  { label: 'Nurse', path: '/appointments' },
  { label: 'Pharmacist', path: '/patients' },
  { label: 'FM', path: '/reports' },
]

export type TopNavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export const topNavItems: TopNavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Report', path: '/reports', icon: FileText },
  { label: 'Language', path: '/language', icon: Globe },
]

export const departmentIcons: Record<string, LucideIcon> = {
  Patient: Users,
  Doctor: Stethoscope,
  Nurse: UserCog,
  Pharmacist: Pill,
  FM: Calendar,
}
