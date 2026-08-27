import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-bg p-6 dark:bg-dark-bg">
          <div className="max-w-md rounded-card border border-neutral-card-border bg-white p-6 shadow-md dark:border-dark-border dark:bg-dark-card">
            <h1 className="text-section-title text-neutral-text dark:text-dark-text">Something went wrong</h1>
            <p className="mt-2 text-body text-neutral-muted dark:text-dark-muted">{this.state.message}</p>
            <button
              type="button"
              className="mt-4 rounded-input bg-admin-main px-4 py-2 text-sm font-medium text-white"
              onClick={() => window.location.assign('/login')}
            >
              Back to login
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
