import type { Property } from '@/lib/types'
import { PropertyCard } from './property-card'
import { EmptyState } from './empty-state'
import { cn } from '@/lib/utils'

export function PropertyGrid({
  properties,
  className,
}: {
  properties: Property[]
  className?: string
}) {
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No stays match those filters"
        description="Try clearing a filter or two — or let us plan something around exactly what you're dreaming of."
      />
    )
  }

  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
