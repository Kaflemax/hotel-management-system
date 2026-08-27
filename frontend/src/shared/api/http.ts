import axios from 'axios'

import { config } from '../config'
import { store } from '../../app/store'
import { authActions } from '../../features/auth/authSlice'

export const http = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((request) => {
  const token = store.getState().auth.accessToken
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config
    const status = error?.response?.status

    if (status === 401 && originalRequest && !originalRequest.__isRetryRequest) {
      originalRequest.__isRetryRequest = true
      try {
        const refreshToken = store.getState().auth.refreshToken
        if (!refreshToken) {
          store.dispatch(authActions.loggedOut())
          throw error
        }
        const refreshed = await axios.post(
          `${config.apiBaseUrl}/auth/refresh/`,
          { refresh: refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        )
        const access = refreshed.data?.access as string | undefined
        if (!access) {
          store.dispatch(authActions.loggedOut())
          throw error
        }
        store.dispatch(authActions.accessTokenUpdated(access))
        originalRequest.headers.Authorization = `Bearer ${access}`
        return http(originalRequest)
      } catch (e) {
        store.dispatch(authActions.loggedOut())
        throw e
      }
    }

    throw error
  },
)

