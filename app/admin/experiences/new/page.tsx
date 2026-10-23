import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { properties } from '@/lib/data'
import { NewExperienceForm } from '@/components/admin/new-experience-form'

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/experiences" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All experiences
        </Link>
        <h1 className="mt-2 font-serif text-2xl text-foreground">Add a new experience</h1>
        <p className="mt-1 text-sm text-muted-foreground">Add its description, cover photo, and the stays where it is available.</p>
      </div>
      <NewExperienceForm properties={properties} />
    </div>
  )
}
