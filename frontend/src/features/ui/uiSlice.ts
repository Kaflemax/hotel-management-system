import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

type UiState = {
  theme: ThemeMode
}

const STORAGE_KEY = 'hms_theme'

function readInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
  return stored === 'dark' ? 'dark' : 'light'
}

const initialState: UiState = {
  theme: readInitialTheme(),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    themeSet: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, action.payload)
      }
    },
    themeToggled: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, state.theme)
      }
    },
  },
})

export const { themeSet, themeToggled } = uiSlice.actions
export default uiSlice.reducer
