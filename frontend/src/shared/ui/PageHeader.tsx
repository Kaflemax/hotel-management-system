import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-small font-medium text-neutral-muted dark:text-dark-muted">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-page-title text-neutral-text dark:text-dark-text">{title}</h1>
        {description ? (
          <p className="mt-1 text-body text-neutral-muted dark:text-dark-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
