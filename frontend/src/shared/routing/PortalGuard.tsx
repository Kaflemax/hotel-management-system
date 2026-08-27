import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import type { UserRole } from '../../features/auth/types'
import { homePathForRole } from './portalPaths'

type PortalGuardProps = {
  allowedRole: UserRole
}

export function PortalGuard({ allowedRole }: PortalGuardProps) {
  const role = useAppSelector((s) => s.auth.role)
  const location = useLocation()

  if (!role) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (role !== allowedRole) {
    return <Navigate to={homePathForRole(role)} replace />
  }

  return <Outlet />
}
