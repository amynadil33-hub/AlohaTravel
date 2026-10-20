import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { EditorialGallery } from '@/components/gallery/editorial-gallery'
import { PageShell } from '@/components/site/page-shell'
import { galleryChapters, galleryHero } from '@/lib/gallery-data'

export const metadata: Metadata = {
  title: 'Maldives Gallery',
  description:
    'A curated collection of island, ocean and travel moments from the Maldives, presented by Aloha Travels.',
}

export default function GalleryPage() {
  return (
    <PageShell>
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        <Image
          src={galleryHero.src}
          alt={galleryHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-deep/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-transparent to-deep/10" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-28 md:px-8 md:pb-16 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1 text-white">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                Gallery
              </li>
            </ol>
          </nav>
          <span className="eyebrow text-secondary">Aloha in pictures</span>
          <h1 className="mt-4 max-w-4xl text-balance font-serif text-5xl font-medium leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Moments from the Maldives
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/82 sm:text-lg">
            Island welcomes, ocean journeys and quiet details — a closer look at
            the places and experiences that shape a Maldives holiday.
          </p>
          <p className="mt-7 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
            {galleryHero.caption} · {galleryHero.context}
          </p>
        </div>
      </section>

      <EditorialGallery chapters={galleryChapters} />
    </PageShell>
  )
}
