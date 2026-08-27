import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  FileText,
  FlaskConical,
  Globe,
  History,
  LayoutDashboard,
  MessageSquare,
  Pill,
  Users,
} from 'lucide-react'

export type DoctorNavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export const doctorNavItems: DoctorNavItem[] = [
  { label: 'Dashboard', path: '/doctor', icon: LayoutDashboard },
  { label: 'Patient details', path: '/doctor/patients', icon: Users },
  { label: 'Prescriptions', path: '/doctor/prescriptions', icon: Pill },
  { label: 'Lab tests', path: '/doctor/lab', icon: FlaskConical },
  { label: 'History', path: '/doctor/history', icon: History },
  { label: 'Vital Signs', path: '/doctor/vitals', icon: Activity },
  { label: 'Message', path: '/doctor/messages', icon: MessageSquare },
  { label: 'Report', path: '/doctor/reports', icon: FileText },
  { label: 'Language', path: '/doctor/language', icon: Globe },
]
