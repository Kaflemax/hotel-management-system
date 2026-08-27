import type { ReactNode } from 'react'

type SectionCardProps = {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export function SectionCard({ title, subtitle, children, action, className = '' }: SectionCardProps) {
  return (
    <section
      className={`overflow-hidden rounded-card border border-neutral-card-border/80 bg-white shadow-card transition-colors dark:border-dark-border dark:bg-dark-card ${className}`}
    >
      <div className="flex flex-col gap-2 border-b border-neutral-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-dark-border">
        <div>
          <h2 className="text-card-title text-neutral-text dark:text-dark-text">{title}</h2>
          {subtitle ? <p className="mt-1 text-small text-neutral-muted dark:text-dark-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
