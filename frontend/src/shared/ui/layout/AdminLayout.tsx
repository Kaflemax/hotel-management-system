import {
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { authActions } from '../../../features/auth/authSlice'
import { themeToggled } from '../../../features/ui/uiSlice'
import {
  departmentIcons,
  departmentNavItems,
  topNavItems,
} from '../../config/nav'

function isDepartmentActive(pathname: string) {
  return departmentNavItems.some((item) => item.path === pathname)
}

export function AdminLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useAppSelector((s) => s.ui.theme)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [deptOpen, setDeptOpen] = useState(() => isDepartmentActive(location.pathname))

  const darkMode = theme === 'dark'

  return (
    <div className="flex min-h-screen bg-neutral-bg transition-colors duration-200 dark:bg-dark-bg">
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-sidebar shrink-0 flex-col bg-teal-sidebar px-4 py-6 text-white transition-transform dark:bg-dark-sidebar md:static md:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-teal-main" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 2C9.5 2 8 4 8 6.5V11H6.5C4 11 2 12.5 2 15s2 4 4 4h12c2 0 4-1.5 4-4s-2-4-4-4H16V6.5C16 4 14.5 2 12 2zm0 18c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"
                />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-widest text-white/90">HMS</span>
          </div>
          <button
            type="button"
            className="absolute right-2 top-2 rounded-lg p-1 text-white/80 hover:bg-white/10 md:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1 text-sm" aria-label="Main">
          {topNavItems.map((item) => {
            const Icon = item.icon
            if (item.label === 'Language') {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors ${
                      isActive ? 'bg-teal-highlight text-white' : 'text-white/90 hover:bg-white/10'
                    }`
                  }
                  onClick={() => setMobileNavOpen(false)}
                >
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                  {item.label}
                </NavLink>
              )
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors ${
                    isActive ? 'bg-teal-highlight text-white' : 'text-white/90 hover:bg-white/10'
                  }`
                }
                onClick={() => setMobileNavOpen(false)}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                {item.label}
              </NavLink>
            )
          })}

          <div>
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 font-medium transition-colors ${
                isDepartmentActive(location.pathname)
                  ? 'bg-teal-highlight text-white'
                  : 'text-white/90 hover:bg-white/10'
              }`}
              onClick={() => setDeptOpen((o) => !o)}
            >
              <span className="flex items-center gap-3">
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${deptOpen ? 'rotate-90' : ''}`}
                />
                Department
              </span>
              <ChevronDown className={`h-4 w-4 opacity-70 ${deptOpen ? 'rotate-180' : ''}`} />
            </button>
            {deptOpen ? (
              <div className="mt-1 space-y-0.5 pl-4">
                {departmentNavItems.map((sub) => {
                  const SubIcon = departmentIcons[sub.label] ?? ChevronRight
                  return (
                    <NavLink
                      key={`${sub.label}-${sub.path}`}
                      to={sub.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-teal-highlight font-medium text-white'
                            : 'text-white/85 hover:bg-white/10'
                        }`
                      }
                      onClick={() => setMobileNavOpen(false)}
                    >
                      <SubIcon className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.75} />
                      {sub.label}
                    </NavLink>
                  )
                })}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="mt-6 space-y-4 border-t border-white/15 pt-6">
          <p className="px-1 text-xs font-medium text-white/70">Appearance</p>
          <label className="flex cursor-pointer items-center justify-between gap-3 px-1">
            <span className="text-sm font-medium text-white/90">Dark mode</span>
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              onClick={() => dispatch(themeToggled())}
              className={`relative h-7 w-12 shrink-0 rounded-pill transition-colors ${
                darkMode ? 'bg-teal-dark' : 'bg-white/25'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  darkMode ? 'left-[22px]' : 'left-0.5'
                }`}
              />
            </button>
          </label>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            onClick={() => {
              dispatch(authActions.loggedOut())
              navigate('/login', { replace: true })
            }}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-topbar shrink-0 items-center gap-3 border-b border-neutral-border/80 bg-white px-4 shadow-sm dark:border-dark-border dark:bg-dark-card md:gap-6 md:px-8">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-muted md:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative mx-auto hidden min-w-0 max-w-xl flex-1 md:block">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-light"
              strokeWidth={1.75}
            />
            <input
              type="search"
              placeholder="Search here"
              aria-label="Search"
              className="h-11 w-full rounded-pill border-0 bg-neutral-bg py-2 pl-12 pr-5 text-sm text-neutral-text shadow-inner outline-none ring-1 ring-neutral-border/60 placeholder:text-neutral-light focus:ring-2 focus:ring-teal-main/30 dark:bg-dark-bg dark:text-dark-text dark:ring-dark-border"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500 transition-colors hover:bg-amber-100 dark:bg-amber-950/40"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 fill-amber-400 text-amber-500" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-surface text-teal-main transition-colors hover:bg-teal-surface/80 dark:bg-teal-dark/40 dark:text-teal-light"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <div className="hidden items-center gap-3 border-l border-neutral-border pl-4 dark:border-dark-border sm:flex">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-teal-light to-teal-main ring-2 ring-teal-surface" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-neutral-text dark:text-dark-text">Jeo</div>
                <div className="truncate text-xs text-neutral-muted dark:text-dark-muted">jeo.admin@gmail.com</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
