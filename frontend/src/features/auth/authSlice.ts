import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { LoginResponse, UserRole } from './types'

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  role: UserRole | null
  username: string | null
  displayName: string | null
  specialty: string | null
  patientId: string | null
  department: string | null
}

function readRole(): UserRole | null {
  const r = localStorage.getItem('hms_role')
  if (r === 'admin' || r === 'doctor' || r === 'patient' || r === 'laboratory') return r
  return null
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('hms_access_token'),
  refreshToken: localStorage.getItem('hms_refresh_token'),
  role: readRole(),
  username: localStorage.getItem('hms_username'),
  displayName: localStorage.getItem('hms_display_name'),
  specialty: localStorage.getItem('hms_specialty'),
  patientId: localStorage.getItem('hms_patient_id'),
  department: localStorage.getItem('hms_department'),
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<LoginResponse>) => {
      state.accessToken = action.payload.access
      state.refreshToken = action.payload.refresh
      state.role = action.payload.role
      state.username = action.payload.username
      state.displayName = action.payload.display_name ?? action.payload.username
      state.specialty = action.payload.specialty ?? null
      state.patientId = action.payload.patient_id ?? null
      state.department = action.payload.department ?? null

      localStorage.setItem('hms_access_token', action.payload.access)
      localStorage.setItem('hms_refresh_token', action.payload.refresh)
      localStorage.setItem('hms_role', action.payload.role)
      localStorage.setItem('hms_username', action.payload.username)
      localStorage.setItem('hms_display_name', state.displayName ?? '')
      if (state.specialty) {
        localStorage.setItem('hms_specialty', state.specialty)
      } else {
        localStorage.removeItem('hms_specialty')
      }
      if (state.patientId) {
        localStorage.setItem('hms_patient_id', state.patientId)
      } else {
        localStorage.removeItem('hms_patient_id')
      }
      if (state.department) {
        localStorage.setItem('hms_department', state.department)
      } else {
        localStorage.removeItem('hms_department')
      }
    },
    accessTokenUpdated: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      localStorage.setItem('hms_access_token', action.payload)
    },
    loggedOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.role = null
      state.username = null
      state.displayName = null
      state.specialty = null
      state.patientId = null
      state.department = null
      localStorage.removeItem('hms_access_token')
      localStorage.removeItem('hms_refresh_token')
      localStorage.removeItem('hms_role')
      localStorage.removeItem('hms_username')
      localStorage.removeItem('hms_display_name')
      localStorage.removeItem('hms_specialty')
      localStorage.removeItem('hms_patient_id')
      localStorage.removeItem('hms_department')
    },
  },
})

export const authActions = slice.actions
export default slice.reducer
