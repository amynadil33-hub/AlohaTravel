'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Star } from 'lucide-react'
import type { Experience } from '@/lib/types'
import { getAdminExperiences } from '@/lib/admin-catalog'
import { Button } from '@/components/ui/button'

export function ExperienceManager({ initialExperiences }: { initialExperiences: Experience[] }) {
  const [items, setItems] = useState(initialExperiences)

  useEffect(() => {
    const stored = getAdminExperiences()
    setItems([...stored, ...initialExperiences.filter((item) => !stored.some((saved) => saved.id === item.id))])
  }, [initialExperiences])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-muted-foreground">{items.length} experiences travellers can add to any stay.</p>
        <Button variant="ocean" size="pill" render={<Link href="/admin/experiences/new" />}>
          <Plus className="size-4" data-icon="inline-start" aria-hidden="true" />
          New experience
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((experience) => (
          <article key={experience.id} className="group overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={experience.imageUrl || '/placeholder.svg'} alt={experience.name} fill unoptimized={experience.imageUrl.startsWith('data:')} sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
              {experience.featured && <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground"><Star className="size-3" aria-hidden="true" />Featured</span>}
            </div>
            <div className="space-y-2 p-4">
              <h2 className="font-serif text-lg text-foreground">{experience.name}</h2>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
              <p className="pt-2 text-xs text-muted-foreground">{experience.relatedPropertyIds.length} linked stays</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
