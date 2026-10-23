'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ImagePlus, LoaderCircle, X } from 'lucide-react'
import type { Experience, Property } from '@/lib/types'
import { imageFileToDataUrl, saveAdminExperience } from '@/lib/admin-catalog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function NewExperienceForm({ properties }: { properties: Property[] }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [relatedPropertyIds, setRelatedPropertyIds] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  async function handleImage(file?: File) {
    if (!file) return
    if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
      setError('Please choose a JPG, PNG or WebP image under 10 MB.')
      return
    }
    setProcessing(true)
    setError('')
    try {
      setImageUrl(await imageFileToDataUrl(file))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The image could not be processed.')
    } finally {
      setProcessing(false)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const finalSlug = makeSlug(slug || name)
    if (!imageUrl) {
      setError('Please upload a cover image for this experience.')
      return
    }

    const experience: Experience = {
      id: `experience-${crypto.randomUUID()}`,
      name: name.trim(),
      slug: finalSlug,
      description: String(form.get('description') || '').trim(),
      imageUrl,
      featured,
      relatedPropertyIds,
    }

    try {
      saveAdminExperience(experience)
      router.push('/admin/experiences')
      router.refresh()
    } catch {
      setError('The browser could not save this experience. Try a smaller image.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <section className="space-y-5 rounded-xl border border-border bg-card p-5">
          <h2 className="font-serif text-lg">Experience details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <Input id="name" required value={name} onChange={(event) => { setName(event.target.value); setSlug(makeSlug(event.target.value)) }} />
            </Field>
            <Field label="URL slug" htmlFor="slug">
              <Input id="slug" required value={slug} onChange={(event) => setSlug(event.target.value)} onBlur={() => setSlug(makeSlug(slug))} />
            </Field>
          </div>
          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={7} required />
          </Field>
        </section>

        <section className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div>
            <h2 className="font-serif text-lg">Related stays</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose the resorts and hotels where this experience is available.</p>
          </div>
          <div className="grid max-h-96 gap-2 overflow-y-auto sm:grid-cols-2">
            {properties.map((property) => {
              const selected = relatedPropertyIds.includes(property.id)
              return (
                <button
                  key={property.id}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() => setRelatedPropertyIds((current) => selected ? current.filter((id) => id !== property.id) : [...current, property.id])}
                  className={cn('rounded-lg border px-3 py-3 text-left text-sm transition-colors', selected ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40')}
                >
                  <span className="block font-medium">{property.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{property.island} · {property.atoll}</span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="font-serif text-lg">Cover image</h2>
          {imageUrl ? (
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <Image src={imageUrl} alt="Experience cover preview" fill unoptimized className="object-cover" />
              <button type="button" aria-label="Remove cover image" onClick={() => setImageUrl('')} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/65 text-white">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary">
              {processing ? <LoaderCircle className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}
              <span className="mt-2">{processing ? 'Processing…' : 'Upload image'}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={processing} onChange={(event) => { void handleImage(event.target.files?.[0]); event.target.value = '' }} />
            </label>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <button type="button" onClick={() => setFeatured(!featured)} className="flex w-full items-center justify-between gap-4 text-left">
            <span><span className="block text-sm font-medium">Featured</span><span className="block text-xs text-muted-foreground">Highlight this experience</span></span>
            <span className={cn('relative h-6 w-11 rounded-full transition-colors', featured ? 'bg-primary' : 'bg-muted-foreground/30')}><span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform', featured ? 'translate-x-[22px]' : 'translate-x-0.5')} /></span>
          </button>
        </section>

        {error && <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm font-medium text-destructive">{error}</p>}
        <div className="sticky bottom-4 space-y-3">
          <Button type="submit" variant="ocean" size="lg" className="w-full" disabled={processing}>Create experience</Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => router.push('/admin/experiences')}>Cancel</Button>
          <p className="text-center text-xs leading-5 text-muted-foreground">Saved in this browser until the production database is connected.</p>
        </div>
      </aside>
    </form>
  )
}

function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={htmlFor}>{label}</Label>{children}</div>
}
