import { Ship } from 'lucide-react'
import { ImageGalleryEditor } from '@/components/admin/image-gallery-editor'

const safariImages = [
  '/images/real-atoll-villa-yacht-exterior.jpg',
  '/images/real-atoll-villa-ocean-lounge.jpg',
  '/images/real-atoll-villa-open-sea.jpeg',
  '/images/real-atoll-villa-sundeck.jpg',
  '/images/real-atoll-villa-island-arrival.jpg',
]

export default function AdminSafariYachtsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Ship className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-serif text-2xl text-foreground">Safari Yachts</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Manage the photography used across the Safari Yachts details page.
            Keep at least three photos published at all times.
          </p>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <ImageGalleryEditor
          initialImages={safariImages}
          name="Safari Yachts"
          minimum={3}
        />
      </section>
    </div>
  )
}
