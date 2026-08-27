export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api',
  /** Show “any credentials” copy when using dev open-access backends (set VITE_OPEN_ACCESS_HINT=false to hide). */
  showOpenAccessHint: import.meta.env.VITE_OPEN_ACCESS_HINT !== 'false',
} as const

