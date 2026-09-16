import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { propertyBySlug, guestHouses } from '@/lib/data'
import { PropertyEditForm } from '@/components/admin/property-edit-form'

export function generateStaticParams() {
  return guestHouses.map((p) => ({ slug: p.slug }))
}

export default async function EditGuestHousePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = propertyBySlug(slug)
  if (!property || property.type !== 'guest-house') notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/guest-houses"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All guest houses
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-foreground">
          Editing: {property.name}
        </h1>
      </div>
      <PropertyEditForm property={property} />
    </div>
  )
}
