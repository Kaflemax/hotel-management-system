import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { ThemeSync } from './app/ThemeSync'
import { store } from './app/store'
import { router } from './app/router'
import { ErrorBoundary } from './shared/ui/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeSync />
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
