import { http } from '../../shared/api/http'
import type { LoginResponse, UserRole } from './types'

export async function login(
  username: string,
  password: string,
  portal: UserRole,
): Promise<LoginResponse> {
  const res = await http.post<LoginResponse>('/auth/token/', { username, password, portal })
  return res.data
}
