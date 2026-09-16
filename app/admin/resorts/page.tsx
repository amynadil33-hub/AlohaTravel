import { Plus } from 'lucide-react'
import { resorts } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { PropertyTable } from '@/components/admin/property-table'

export default function AdminResortsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-muted-foreground">
          {resorts.length} private-island resorts in the collection. Edit
          content, imagery and publishing status.
        </p>
        <Button variant="ocean" size="pill">
          <Plus className="size-4" data-icon="inline-start" aria-hidden="true" />
          New resort
        </Button>
      </div>
      <PropertyTable properties={resorts} />
    </div>
  )
}
