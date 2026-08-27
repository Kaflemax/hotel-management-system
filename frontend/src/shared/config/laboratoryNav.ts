import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  FileText,
  FlaskConical,
  Globe,
  LayoutDashboard,
  MessageSquare,
  TestTube,
  Upload,
} from 'lucide-react'

export type LaboratoryNavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export const laboratoryNavItems: LaboratoryNavItem[] = [
  { label: 'Dashboard', path: '/laboratory', icon: LayoutDashboard },
  { label: 'Test orders', path: '/laboratory/orders', icon: ClipboardList },
  { label: 'Samples', path: '/laboratory/samples', icon: TestTube },
  { label: 'Results entry', path: '/laboratory/results', icon: Upload },
  { label: 'Completed reports', path: '/laboratory/reports', icon: FileText },
  { label: 'Messages', path: '/laboratory/messages', icon: MessageSquare },
  { label: 'Language', path: '/laboratory/language', icon: Globe },
]

export const laboratoryBrandIcon = FlaskConical
