'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import type { Property } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PropertyEditForm({ property }: { property: Property }) {
  const [published, setPublished] = useState(property.published)
  const [featured, setFeatured] = useState(property.featured)
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    // In production this would persist to Supabase via a server action.
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Panel title="Basics">
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldGroup label="Name" htmlFor="name">
              <Input id="name" name="name" defaultValue={property.name} />
            </FieldGroup>
            <FieldGroup label="Slug" htmlFor="slug">
              <Input id="slug" name="slug" defaultValue={property.slug} />
            </FieldGroup>
            <FieldGroup label="Island" htmlFor="island">
              <Input id="island" name="island" defaultValue={property.island} />
            </FieldGroup>
            <FieldGroup label="Atoll" htmlFor="atoll">
              <Input id="atoll" name="atoll" defaultValue={property.atoll} />
            </FieldGroup>
          </div>
          <FieldGroup label="Short description" htmlFor="short">
            <Input
              id="short"
              name="short"
              defaultValue={property.shortDescription}
            />
          </FieldGroup>
          <FieldGroup label="Full description" htmlFor="description">
            <Textarea
              id="description"
              name="description"
              rows={6}
              defaultValue={property.description}
            />
          </FieldGroup>
        </Panel>

        <Panel title="Tags &amp; highlights">
          <FieldGroup label="Tags (comma separated)" htmlFor="tags">
            <Input id="tags" name="tags" defaultValue={property.tags.join(', ')} />
          </FieldGroup>
          <FieldGroup label="Highlights (one per line)" htmlFor="highlights">
            <Textarea
              id="highlights"
              name="highlights"
              rows={4}
              defaultValue={property.highlights.join('\n')}
            />
          </FieldGroup>
        </Panel>
      </div>

      <aside className="space-y-6">
        <Panel title="Visibility">
          <Toggle
            label="Published"
            description="Show on the live website"
            checked={published}
            onChange={setPublished}
          />
          <Toggle
            label="Featured"
            description="Highlight on the homepage"
            checked={featured}
            onChange={setFeatured}
          />
        </Panel>

        <Panel title="Hero image">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={property.heroImage || '/placeholder.svg'}
              alt={property.name}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <Button type="button" variant="outline" size="sm" className="w-full">
            Replace image
          </Button>
        </Panel>

        <div className="sticky bottom-4 space-y-2">
          <Button type="submit" variant="ocean" className="w-full" size="lg">
            {saved ? (
              <>
                <Check className="size-4" data-icon="inline-start" aria-hidden="true" />
                Saved
              </>
            ) : (
              'Save changes'
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Changes are simulated in this demo.
          </p>
        </div>
      </aside>
    </form>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-5 rounded-xl border border-border bg-card p-5">
      <h2
        className="font-serif text-lg text-foreground"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {children}
    </section>
  )
}

function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 text-left"
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-muted-foreground/30',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </span>
    </button>
  )
}
