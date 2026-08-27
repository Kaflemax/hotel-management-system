import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getDashboardData } from './services/dashboardService'
import type { DashboardData } from './types'

type DashboardState = {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
}

export const fetchDashboardData = createAsyncThunk('dashboard/fetchDashboardData', async () => getDashboardData())

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.isLoading = false
        state.error = 'Unable to load dashboard right now.'
      })
  },
})

export default dashboardSlice.reducer
