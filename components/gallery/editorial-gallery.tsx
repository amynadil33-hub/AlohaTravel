'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  galleryImages,
  type GalleryChapter,
  type GalleryImage,
} from '@/lib/gallery-data'
import { cn } from '@/lib/utils'

const ratioClasses: Record<GalleryImage['ratio'], string> = {
  panorama: 'aspect-[16/9] sm:aspect-[2/1]',
  landscape: 'aspect-[4/3] sm:aspect-[3/2]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
}

export function EditorialGallery({ chapters }: { chapters: GalleryChapter[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const openImage = (image: GalleryImage) => {
    setActiveIndex(galleryImages.findIndex((item) => item.src === image.src))
  }

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) % galleryImages.length,
    )
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length,
    )
  }, [])

  const activeImage = activeIndex === null ? null : galleryImages[activeIndex]
  const displayIndex = activeIndex ?? 0

  return (
    <>
      <div>
        {chapters.map((chapter) => (
          <GalleryChapterSection
            key={chapter.id}
            chapter={chapter}
            onOpen={openImage}
          />
        ))}
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null)
        }}
      >
        {activeImage && (
          <DialogContent
            showCloseButton
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                showPrevious()
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                showNext()
              }
            }}
            className="flex h-auto max-h-[92vh] w-[min(94vw,82rem)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border-white/10 bg-deep p-0 text-white ring-white/10 sm:h-[min(92vh,58rem)] sm:max-w-none [&_[data-slot=dialog-close]]:right-3 [&_[data-slot=dialog-close]]:top-3 [&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:size-11 [&_[data-slot=dialog-close]]:bg-black/45 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-black/65"
          >
            <DialogTitle className="sr-only">{activeImage.caption}</DialogTitle>
            <DialogDescription className="sr-only">
              {activeImage.alt}. Image {displayIndex + 1} of {galleryImages.length}.
            </DialogDescription>

            <div className="relative aspect-[4/3] min-h-0 flex-none bg-black/25 sm:aspect-auto sm:flex-1">
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="94vw"
                className="object-contain"
                priority
              />
              <LightboxControl label="View previous image" side="left" onClick={showPrevious}>
                <ChevronLeft className="size-5" aria-hidden="true" />
              </LightboxControl>
              <LightboxControl label="View next image" side="right" onClick={showNext}>
                <ChevronRight className="size-5" aria-hidden="true" />
              </LightboxControl>
            </div>

            <div className="flex shrink-0 items-end justify-between gap-5 border-t border-white/10 px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <p className="font-serif text-xl text-white sm:text-2xl">
                  {activeImage.caption}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                  {activeImage.context}
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-white/45">
                {String(displayIndex + 1).padStart(2, '0')} /{' '}
                {String(galleryImages.length).padStart(2, '0')}
              </span>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

function GalleryChapterSection({
  chapter,
  onOpen,
}: {
  chapter: GalleryChapter
  onOpen: (image: GalleryImage) => void
}) {
  const dark = chapter.tone === 'deep'

  return (
    <section
      id={chapter.id}
      className={cn(
        'overflow-hidden py-20 sm:py-24 lg:py-32',
        dark ? 'bg-deep text-white' : 'bg-[#f8fbfb] text-foreground',
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[auto_minmax(0,1fr)_minmax(18rem,0.55fr)] md:items-end md:gap-8">
          <span
            className={cn(
              'font-serif text-4xl leading-none',
              dark ? 'text-secondary' : 'text-secondary/80',
            )}
          >
            {chapter.number}
          </span>
          <h2
            className={cn(
              'max-w-3xl text-balance font-serif text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl',
              dark ? 'text-white' : 'text-primary',
            )}
          >
            {chapter.title}
          </h2>
          <p
            className={cn(
              'max-w-xl text-pretty leading-7',
              dark ? 'text-white/65' : 'text-muted-foreground',
            )}
          >
            {chapter.introduction}
          </p>
        </div>

        {chapter.layout === 'beneath' && (
          <div className="space-y-12 lg:space-y-20">
            <GalleryFigure image={chapter.images[0]} onOpen={onOpen} feature dark={dark} />
            <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
              <GalleryFigure image={chapter.images[1]} onOpen={onOpen} dark={dark} className="md:col-span-5 lg:ml-8" />
              <GalleryFigure image={chapter.images[2]} onOpen={onOpen} dark={dark} className="md:col-span-7 md:pb-12" />
            </div>
          </div>
        )}

        {chapter.layout === 'islands' && (
          <div className="space-y-12 lg:space-y-20">
            <GalleryFigure image={chapter.images[0]} onOpen={onOpen} feature dark={dark} className="lg:ml-auto lg:w-[92%]" />
            <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
              <GalleryFigure image={chapter.images[1]} onOpen={onOpen} dark={dark} className="md:col-span-7" />
              <GalleryFigure image={chapter.images[2]} onOpen={onOpen} dark={dark} className="md:col-span-5 md:mt-20" />
              <GalleryFigure image={chapter.images[3]} onOpen={onOpen} dark={dark} className="md:col-span-8 md:col-start-3 lg:mt-4" />
            </div>
          </div>
        )}

        {chapter.layout === 'ocean' && (
          <div className="space-y-12 lg:space-y-20">
            <GalleryFigure image={chapter.images[0]} onOpen={onOpen} feature dark={dark} />
            <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
              <GalleryFigure image={chapter.images[1]} onOpen={onOpen} dark={dark} className="md:col-span-7 md:mt-16" />
              <GalleryFigure image={chapter.images[2]} onOpen={onOpen} dark={dark} className="md:col-span-5" />
              <GalleryFigure image={chapter.images[3]} onOpen={onOpen} dark={dark} className="md:col-span-8 md:col-start-5" />
            </div>
          </div>
        )}

        {chapter.layout === 'stays' && (
          <div className="space-y-12 lg:space-y-20">
            <GalleryFigure image={chapter.images[0]} onOpen={onOpen} feature dark={dark} />
            <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
              <GalleryFigure image={chapter.images[1]} onOpen={onOpen} dark={dark} className="md:col-span-4" />
              <GalleryFigure image={chapter.images[2]} onOpen={onOpen} dark={dark} className="md:col-span-8 md:mt-20" />
              <GalleryFigure image={chapter.images[3]} onOpen={onOpen} dark={dark} className="md:col-span-8 md:col-start-3" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function GalleryFigure({
  image,
  onOpen,
  dark,
  feature = false,
  className,
}: {
  image: GalleryImage
  onOpen: (image: GalleryImage) => void
  dark: boolean
  feature?: boolean
  className?: string
}) {
  return (
    <figure className={cn('group min-w-0', className)}>
      <button
        type="button"
        onClick={() => onOpen(image)}
        aria-label={`Open image: ${image.caption}`}
        className={cn(
          'relative block w-full overflow-hidden bg-muted text-left shadow-[0_24px_65px_-42px_rgba(6,42,82,0.85)] outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4',
          feature ? 'rounded-[1.5rem] sm:rounded-[2rem]' : 'rounded-2xl',
          ratioClasses[image.ratio],
          dark && 'focus-visible:ring-offset-deep',
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={feature ? '100vw' : '(max-width: 768px) 100vw, 60vw'}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-deep/65 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <Expand className="size-4" aria-hidden="true" />
        </span>
      </button>
      <figcaption
        className={cn(
          'pt-4',
          feature && 'sm:flex sm:items-baseline sm:justify-between sm:gap-8',
        )}
      >
        <p className={cn('font-serif text-xl leading-tight sm:text-2xl', dark ? 'text-white' : 'text-primary')}>
          {image.caption}
        </p>
        <p
          className={cn(
            'mt-2 text-xs font-medium uppercase tracking-[0.14em] sm:text-right',
            dark ? 'text-white/50' : 'text-muted-foreground',
          )}
        >
          {image.context}
        </p>
      </figcaption>
    </figure>
  )
}

function LightboxControl({
  label,
  side,
  onClick,
  children,
}: {
  label: string
  side: 'left' | 'right'
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
        side === 'left' ? 'left-3 sm:left-5' : 'right-3 sm:right-5',
      )}
    >
      {children}
    </button>
  )
}
