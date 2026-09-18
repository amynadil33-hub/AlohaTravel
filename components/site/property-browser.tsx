'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { InterestSlug, Property } from '@/lib/types'
import { interests } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PropertyCard } from './property-card'
import { EmptyState } from './empty-state'
import { cn } from '@/lib/utils'

export function PropertyBrowser({
  items,
  initialInterest,
}: {
  items: Property[]
  initialInterest?: InterestSlug
}) {
  const [query, setQuery] = useState('')
  const [atoll, setAtoll] = useState<string>('all')
  const [interest, setInterest] = useState<string>(initialInterest ?? 'all')
  const [sort, setSort] = useState<'featured' | 'az'>('featured')

  const availableAtolls = useMemo(
    () => Array.from(new Set(items.map((p) => p.atoll))).sort(),
    [items],
  )
  const hasVerifiedInterestMappings = items.some((p) => p.interests.length > 0)

  const filtered = useMemo(() => {
    let list = items.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        [p.name, p.island, p.atoll, ...p.tags]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      const matchesAtoll = atoll === 'all' || p.atoll === atoll
      const matchesInterest =
        interest === 'all' || p.interests.includes(interest as InterestSlug)
      return matchesQuery && matchesAtoll && matchesInterest
    })
    list = [...list].sort((a, b) => {
      if (sort === 'az') return a.name.localeCompare(b.name)
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name)
    })
    return list
  }, [items, query, atoll, interest, sort])

  const hasActiveFilters = query !== '' || atoll !== 'all' || interest !== 'all'

  const reset = () => {
    setQuery('')
    setAtoll('all')
    setInterest('all')
  }

  return (
    <div>
      {/* Search + sort bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, island or atoll..."
            aria-label="Search stays"
            className="h-11 rounded-xl pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground sm:inline">Sort</span>
          <div className="flex rounded-xl border border-border bg-background p-1">
            {(
              [
                ['featured', 'Featured'],
                ['az', 'A–Z'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSort(value)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  sort === value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SlidersHorizontal className="size-3.5" /> Atoll
          </span>
          <FilterChip active={atoll === 'all'} onClick={() => setAtoll('all')}>
            All atolls
          </FilterChip>
          {availableAtolls.map((a) => (
            <FilterChip key={a} active={atoll === a} onClick={() => setAtoll(a)}>
              {a}
            </FilterChip>
          ))}
        </div>

        {hasVerifiedInterestMappings && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interest
            </span>
            <FilterChip active={interest === 'all'} onClick={() => setInterest('all')}>
              Anything
            </FilterChip>
            {interests.map((i) => (
              <FilterChip
                key={i.slug}
                active={interest === i.slug}
                onClick={() => setInterest(i.slug)}
              >
                {i.name}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      {/* Results meta */}
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'stay' : 'stays'}
        </p>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
            <X className="size-3.5" /> Clear filters
          </Button>
        )}
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} className="h-full" />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No stays match those filters"
          description="Try widening your search — or clear the filters to see the full collection."
          actionLabel="Clear filters"
          onAction={reset}
        />
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
