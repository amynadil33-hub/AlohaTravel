import Image from 'next/image'
import { Plus, Pencil, Star } from 'lucide-react'
import { experiences } from '@/lib/data'
import { Button } from '@/components/ui/button'

export default function AdminExperiencesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-muted-foreground">
          {experiences.length} experiences travellers can add to any stay.
        </p>
        <Button variant="ocean" size="pill">
          <Plus className="size-4" data-icon="inline-start" aria-hidden="true" />
          New experience
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={exp.imageUrl || '/placeholder.svg'}
                alt={exp.name}
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
              {exp.featured ? (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                  <Star className="size-3" aria-hidden="true" />
                  Featured
                </span>
              ) : null}
            </div>
            <div className="space-y-2 p-4">
              <h2 className="font-serif text-lg text-foreground">{exp.name}</h2>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  {exp.relatedPropertyIds.length} linked stays
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <Pencil className="size-3.5" aria-hidden="true" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
