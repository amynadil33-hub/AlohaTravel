'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Check, ImagePlus, LoaderCircle, X } from 'lucide-react'
import type { InterestSlug, Property, PropertyType } from '@/lib/types'
import { interests } from '@/lib/data'
import { imageFileToDataUrl, saveAdminProperty } from '@/lib/admin-catalog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function NewPropertyForm({ type }: { type: PropertyType }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<InterestSlug[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const label = type === 'resort' ? 'resort' : 'hotel or guest house'
  const returnPath = type === 'resort' ? '/admin/resorts' : '/admin/guest-houses'
  const generatedSlug = useMemo(() => makeSlug(name), [name])

  async function handlePhotos(files: FileList | null) {
    if (!files?.length) return
    const selected = Array.from(files).slice(0, 12 - photos.length)
    const invalid = selected.find(
      (file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024,
    )
    if (invalid) {
      setError('Please choose JPG, PNG or WebP images under 10 MB each.')
      return
    }

    setProcessing(true)
    setError('')
    try {
      const additions = await Promise.all(selected.map(imageFileToDataUrl))
      setPhotos((current) => [...current, ...additions])
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The photos could not be processed.')
    } finally {
      setProcessing(false)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const finalSlug = makeSlug(String(form.get('slug') || generatedSlug))

    if (!name.trim() || !finalSlug) {
      setError('Add a name and a valid URL slug.')
      return
    }
    if (photos.length < 3) {
      setError('Please upload at least three photos before saving.')
      return
    }

    const property: Property = {
      id: `property-${crypto.randomUUID()}`,
      name: name.trim(),
      slug: finalSlug,
      type,
      shortDescription: String(form.get('shortDescription') || '').trim(),
      description: String(form.get('description') || '').trim(),
      island: String(form.get('island') || '').trim(),
      atoll: String(form.get('atoll') || '').trim(),
      location: [form.get('island'), form.get('atoll')].filter(Boolean).join(', '),
      heroImage: photos[0],
      gallery: photos,
      tags: splitList(String(form.get('tags') || ''), ','),
      interests: selectedInterests,
      experiences: [],
      facilities: splitList(String(form.get('facilities') || ''), '\n'),
      highlights: splitList(String(form.get('highlights') || ''), '\n'),
      roomCategories: [],
      featured,
      published,
    }

    try {
      saveAdminProperty(property)
      router.push(returnPath)
      router.refresh()
    } catch {
      setError('The browser could not save this record. Try smaller photos or remove old drafts.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Panel title="Basics">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <Input
                id="name"
                name="name"
                required
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (!slugTouched) setSlug(makeSlug(event.target.value))
                }}
                placeholder={type === 'resort' ? 'Lagoon Pearl Resort' : 'Island Breeze Hotel'}
              />
            </Field>
            <Field label="URL slug" htmlFor="slug">
              <Input
                id="slug"
                name="slug"
                required
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true)
                  setSlug(event.target.value)
                }}
                onBlur={() => setSlug(makeSlug(slug))}
                placeholder="lagoon-pearl-resort"
              />
            </Field>
            <Field label="Island" htmlFor="island">
              <Input id="island" name="island" required />
            </Field>
            <Field label="Atoll" htmlFor="atoll">
              <Input id="atoll" name="atoll" required />
            </Field>
          </div>
          <Field label="Short description" htmlFor="shortDescription">
            <Input id="shortDescription" name="shortDescription" required />
          </Field>
          <Field label="Full description" htmlFor="description">
            <Textarea id="description" name="description" rows={6} required />
          </Field>
        </Panel>

        <Panel title="Explore categories">
          <p className="text-sm text-muted-foreground">
            Select the categories visitors can use to find this {label}.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {interests.map((interest) => {
              const selected = selectedInterests.includes(interest.slug)
              return (
                <button
                  key={interest.slug}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() =>
                    setSelectedInterests((current) =>
                      selected
                        ? current.filter((value) => value !== interest.slug)
                        : [...current, interest.slug],
                    )
                  }
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                    selected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/40',
                  )}
                >
                  <span className={cn('grid size-5 place-items-center rounded border', selected && 'border-primary bg-primary text-white')}>
                    {selected && <Check className="size-3.5" aria-hidden="true" />}
                  </span>
                  {interest.name}
                </button>
              )
            })}
          </div>
        </Panel>

        <Panel title="Details">
          <Field label="Tags (comma separated)" htmlFor="tags">
            <Input id="tags" name="tags" placeholder="Luxury, House reef, Spa" />
          </Field>
          <Field label="Highlights (one per line)" htmlFor="highlights">
            <Textarea id="highlights" name="highlights" rows={4} />
          </Field>
          <Field label="Facilities (one per line)" htmlFor="facilities">
            <Textarea id="facilities" name="facilities" rows={4} />
          </Field>
        </Panel>

        <Panel title="Photo gallery">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{photos.length} photos · minimum 3</p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary">
              {processing ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
              {processing ? 'Processing…' : 'Upload photos'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="sr-only"
                disabled={processing || photos.length >= 12}
                onChange={(event) => {
                  void handlePhotos(event.target.files)
                  event.target.value = ''
                }}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((photo, index) => (
              <div key={`${photo.slice(-32)}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <Image src={photo} alt={`${name || 'New property'} photo ${index + 1}`} fill unoptimized className="object-cover" />
                {index === 0 && <span className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Hero</span>}
                <button
                  type="button"
                  aria-label={`Remove photo ${index + 1}`}
                  onClick={() => setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index))}
                  className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/65 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <aside className="space-y-6">
        <Panel title="Visibility">
          <Toggle label="Published" checked={published} onChange={setPublished} />
          <Toggle label="Featured" checked={featured} onChange={setFeatured} />
        </Panel>
        {error && <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm font-medium text-destructive">{error}</p>}
        <div className="sticky bottom-4 space-y-3">
          <Button type="submit" variant="ocean" size="lg" className="w-full" disabled={processing}>
            Create {label}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => router.push(returnPath)}>
            Cancel
          </Button>
          <p className="text-center text-xs leading-5 text-muted-foreground">
            Saved securely in this browser until the production database is connected.
          </p>
        </div>
      </aside>
    </form>
  )
}

function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function splitList(value: string, separator: string) {
  return value.split(separator).map((item) => item.trim()).filter(Boolean)
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="space-y-5 rounded-xl border border-border bg-card p-5"><h2 className="font-serif text-lg text-foreground">{title}</h2>{children}</section>
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={htmlFor}>{label}</Label>{children}</div>
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-4 text-left">
      <span className="text-sm font-medium">{label}</span>
      <span className={cn('relative h-6 w-11 rounded-full transition-colors', checked ? 'bg-primary' : 'bg-muted-foreground/30')}>
        <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-[22px]' : 'translate-x-0.5')} />
      </span>
    </button>
  )
}
