import { useState } from 'react'
import type { FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Building2, FlaskConical, Heart, Moon, Stethoscope, Sun } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../features/auth/authApi'
import { authActions } from '../features/auth/authSlice'
import type { UserRole } from '../features/auth/types'
import { themeToggled } from '../features/ui/uiSlice'
import { config } from '../shared/config'
import { homePathForRole, portalPathPrefix } from '../shared/routing/portalPaths'

const inputClass =
  'mt-2 h-12 w-full rounded-input border border-neutral-border bg-white px-4 text-body text-neutral-text outline-none transition-shadow duration-200 placeholder:text-neutral-light focus:border-teal-main focus:ring-2 focus:ring-teal-main/25 dark:border-dark-border dark:bg-slate-800/80 dark:text-dark-text dark:placeholder:text-dark-muted dark:focus:border-teal-light dark:focus:ring-teal-light/20'

const labelClass = 'block text-sm font-medium text-neutral-text dark:text-dark-text'

const PORTALS: UserRole[] = ['admin', 'doctor', 'patient', 'laboratory']

const portalMeta: Record<
  UserRole,
  { label: string; loginLabel: string; icon: LucideIcon; iconWrap: string; activeBtn: string; submitBtn: string; placeholder: string }
> = {
  admin: {
    label: 'Admin',
    loginLabel: 'admin portal',
    icon: Building2,
    iconWrap: 'bg-teal-surface text-teal-dark dark:bg-teal-main/30 dark:text-teal-light',
    activeBtn: 'bg-teal-main text-white shadow-sm',
    submitBtn: 'bg-teal-main hover:bg-teal-dark dark:bg-teal-light dark:hover:bg-teal-main',
    placeholder: 'e.g. admin',
  },
  doctor: {
    label: 'Doctor',
    loginLabel: 'doctor portal',
    icon: Stethoscope,
    iconWrap: 'bg-user-surface text-user-dark dark:bg-user-main/30 dark:text-user-light',
    activeBtn: 'bg-user-main text-white shadow-sm',
    submitBtn: 'bg-user-main hover:bg-user-dark dark:bg-user-light dark:hover:bg-user-main',
    placeholder: 'e.g. doctor or drpriya',
  },
  patient: {
    label: 'Patient',
    loginLabel: 'patient portal',
    icon: Heart,
    iconWrap: 'bg-patient-surface text-patient-dark dark:bg-patient-main/30 dark:text-patient-light',
    activeBtn: 'bg-patient-main text-white shadow-sm',
    submitBtn: 'bg-patient-main hover:bg-patient-dark dark:bg-patient-light dark:hover:bg-patient-main',
    placeholder: 'e.g. patient or rajesh',
  },
  laboratory: {
    label: 'Lab',
    loginLabel: 'laboratory portal',
    icon: FlaskConical,
    iconWrap: 'bg-lab-surface text-lab-dark dark:bg-lab-main/30 dark:text-lab-light',
    activeBtn: 'bg-lab-main text-white shadow-sm',
    submitBtn: 'bg-lab-main hover:bg-lab-dark dark:bg-lab-light dark:hover:bg-lab-main',
    placeholder: 'e.g. lab or laboratory',
  },
}

const otherPortalPrefixes = ['/doctor', '/patient', '/laboratory'] as const

function resolveNextPath(role: UserRole, from: string | null): string {
  const home = homePathForRole(role)
  if (!from) return home
  if (role === 'admin') {
    const isOther = otherPortalPrefixes.some((p) => from.startsWith(p))
    if (!isOther) return from
  } else {
    const prefix = portalPathPrefix(role)
    if (prefix && from.startsWith(prefix)) return from
  }
  return home
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useAppSelector((s) => s.ui.theme)

  const [portal, setPortal] = useState<UserRole>('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const meta = portalMeta[portal]
  const PortalIcon = meta.icon

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!username.trim() || !password) {
      setError('Username and password are required')
      return
    }

    setIsLoading(true)

    try {
      const tokens = await login(username.trim(), password, portal)
      dispatch(authActions.loggedIn(tokens))
      const from =
        (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? null
      navigate(resolveNextPath(tokens.role, from), { replace: true })
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { status?: number; data?: { detail?: string } }
      }
      if (!axiosErr.response) {
        setError(
          'Cannot reach the API. Start Django on port 8000 and set VITE_API_BASE_URL=http://127.0.0.1:8000/api in frontend/.env',
        )
      } else if (axiosErr.response.status === 401) {
        setError(
          axiosErr.response.data?.detail ??
            'Invalid username or password. Use your Django superuser credentials.',
        )
      } else {
        setError(
          axiosErr.response.data?.detail ?? 'Login failed. Check Django is running on port 8000.',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-bg via-teal-surface/40 to-neutral-bg px-4 py-12 transition-colors duration-200 dark:from-dark-bg dark:via-slate-900 dark:to-dark-bg">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #1E88E522 0%, transparent 45%), radial-gradient(circle at 80% 20%, #8E24AA18 0%, transparent 40%), radial-gradient(circle at 80% 80%, #43A04718 0%, transparent 40%)',
        }}
      />

      <button
        type="button"
        onClick={() => dispatch(themeToggled())}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-input border border-neutral-border bg-white text-neutral-muted shadow-sm transition-colors duration-hover hover:bg-neutral-table-hover dark:border-dark-border dark:bg-dark-card dark:text-dark-text dark:hover:bg-slate-700"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" strokeWidth={1.75} />
        ) : (
          <Moon className="h-5 w-5" strokeWidth={1.75} />
        )}
      </button>

      <div className="relative z-10 w-full max-w-md rounded-card border border-neutral-card-border bg-white p-6 shadow-lg transition-colors dark:border-dark-border dark:bg-dark-card dark:shadow-xl md:p-8">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-input ${meta.iconWrap}`}>
            <PortalIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </div>

          <div className="min-w-0">
            <h1 className="text-section-title text-neutral-text dark:text-dark-text">
              Hospital Management System
            </h1>
            <p className="mt-0.5 text-body text-neutral-muted dark:text-dark-muted">
              Sign in to {meta.loginLabel}
            </p>

            {config.showOpenAccessHint ? (
              <p className="mt-2 rounded-input border border-teal-surface bg-teal-surface/50 px-3 py-2 text-small text-teal-dark dark:border-teal-main/40 dark:bg-teal-main/15 dark:text-teal-light">
                Dev open access — try <strong>admin</strong>, <strong>doctor</strong>,{' '}
                <strong>patient</strong>, or <strong>lab</strong> (any password).
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-input bg-neutral-bg p-1 dark:bg-dark-bg sm:grid-cols-4">
          {PORTALS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPortal(p)}
              className={`h-10 rounded-[12px] text-xs font-semibold transition-colors sm:text-sm ${
                portal === p
                  ? portalMeta[p].activeBtn
                  : 'text-neutral-muted hover:text-neutral-text dark:text-dark-muted dark:hover:text-dark-text'
              }`}
            >
              {portalMeta[p].label}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              autoComplete="username"
              placeholder={meta.placeholder}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoComplete="current-password"
              placeholder="Enter password"
              required
            />
          </div>

          {error ? (
            <div
              className="rounded-input border border-status-danger/30 bg-badge-cancelled-bg px-4 py-3 text-small text-badge-cancelled-text dark:border-red-500/40 dark:bg-red-950/50 dark:text-red-200"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className={`h-12 w-full rounded-input text-sm font-semibold text-white shadow-sm transition-colors duration-hover disabled:opacity-60 ${meta.submitBtn}`}
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
