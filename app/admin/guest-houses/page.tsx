import { Plus } from 'lucide-react'
import { guestHouses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { PropertyTable } from '@/components/admin/property-table'

export default function AdminGuestHousesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-muted-foreground">
          {guestHouses.length} local island guest houses. Keep descriptions and
          photography fresh.
        </p>
        <Button variant="ocean" size="pill">
          <Plus className="size-4" data-icon="inline-start" aria-hidden="true" />
          New guest house
        </Button>
      </div>
      <PropertyTable properties={guestHouses} />
    </div>
  )
}
