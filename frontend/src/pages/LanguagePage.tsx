import { Globe } from 'lucide-react'

import { PageHeader } from '../shared/ui/PageHeader'
import { SectionCard } from '../shared/ui/SectionCard'

const languages = [
  { code: 'en', label: 'English', active: true },
  { code: 'ne', label: 'Nepali', active: false },
  { code: 'hi', label: 'Hindi', active: false },
]

export function LanguagePage() {
  return (
    <>
      <PageHeader eyebrow="Settings" title="Language" description="Choose your preferred interface language." />
      <SectionCard title="Available languages">
        <ul className="divide-y divide-neutral-border dark:divide-dark-border">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-neutral-table-hover dark:hover:bg-dark-bg/50"
            >
              <span className="flex items-center gap-3 text-neutral-text dark:text-dark-text">
                <Globe className="h-5 w-5 text-teal-main" />
                {lang.label}
              </span>
              {lang.active ? (
                <span className="rounded-full bg-badge-complete-bg px-3 py-1 text-xs font-medium text-badge-complete-text">
                  Active
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-input border border-teal-main/30 px-3 py-1 text-xs font-medium text-teal-main hover:bg-teal-surface"
                >
                  Select
                </button>
              )}
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  )
}
