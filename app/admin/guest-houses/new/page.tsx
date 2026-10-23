import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NewPropertyForm } from '@/components/admin/new-property-form'

export default function NewGuestHousePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/guest-houses" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All hotels &amp; guest houses
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-foreground">Add a hotel or guest house</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create the listing, choose its categories, and upload at least three photos.</p>
      </div>
      <NewPropertyForm type="guest-house" />
    </div>
  )
}
