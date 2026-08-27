import type { UserRole } from '../../features/auth/types'

export function homePathForRole(role: UserRole | null): string {
  if (role === 'doctor') return '/doctor'
  if (role === 'patient') return '/patient'
  if (role === 'laboratory') return '/laboratory'
  return '/'
}

export function portalPathPrefix(role: UserRole): string | null {
  if (role === 'doctor') return '/doctor'
  if (role === 'patient') return '/patient'
  if (role === 'laboratory') return '/laboratory'
  return null
}
