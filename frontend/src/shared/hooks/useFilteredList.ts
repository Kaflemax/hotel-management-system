import { useMemo, useState } from 'react'

export function useFilteredList<T>(items: T[], search: string, getSearchText: (item: T) => string) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = (search || query).trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => getSearchText(item).toLowerCase().includes(q))
  }, [items, query, search, getSearchText])

  return { query, setQuery, filtered }
}
