'use client'

import Image from 'next/image'
import { ImagePlus, Trash2, Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

interface GalleryImage {
  id: string
  src: string
  name: string
  isUpload: boolean
}

export function ImageGalleryEditor({
  initialImages,
  name,
  minimum = 3,
}: {
  initialImages: string[]
  name: string
  minimum?: number
}) {
  const [images, setImages] = useState<GalleryImage[]>(
    initialImages.map((src, index) => ({
      id: `existing-${index}-${src}`,
      src,
      name: `${name} photo ${index + 1}`,
      isUpload: false,
    })),
  )
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrls = useRef<string[]>([])

  useEffect(() => {
    const urls = objectUrls.current
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  function handleFiles(files: FileList | null) {
    if (!files?.length) return

    const selected = Array.from(files)
    const invalid = selected.find(
      (file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024,
    )

    if (invalid) {
      setError('Please choose JPG, PNG or WebP images smaller than 10 MB each.')
      return
    }

    const available = Math.max(0, 12 - images.length)
    const additions = selected.slice(0, available).map((file) => {
      const src = URL.createObjectURL(file)
      objectUrls.current.push(src)
      return {
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        src,
        name: file.name,
        isUpload: true,
      }
    })

    if (selected.length > available) {
      setError('A gallery can contain up to 12 photos.')
    } else {
      setError('')
    }
    setImages((current) => [...current, ...additions])
    if (inputRef.current) inputRef.current.value = ''
  }

  function removeImage(image: GalleryImage) {
    if (images.length <= minimum) {
      setError(`Keep at least ${minimum} photos in every gallery.`)
      return
    }

    if (image.isUpload) URL.revokeObjectURL(image.src)
    setImages((current) => current.filter((item) => item.id !== image.id))
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            {images.length} photos · minimum {minimum}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            JPG, PNG or WebP · up to 10 MB each
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={images.length >= 12}
        >
          <Upload className="size-4" data-icon="inline-start" aria-hidden="true" />
          Upload photos
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
          aria-label={`Upload photos for ${name}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted"
          >
            <Image
              src={image.src}
              alt={`${name} gallery photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 220px"
              unoptimized={image.isUpload}
              className="object-cover"
            />
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {index + 1}
            </span>
            {image.isUpload && (
              <span className="absolute bottom-2 left-2 max-w-[calc(100%-3.5rem)] truncate rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-foreground">
                New · {image.name}
              </span>
            )}
            <button
              type="button"
              onClick={() => removeImage(image)}
              disabled={images.length <= minimum}
              aria-label={`Remove photo ${index + 1}`}
              className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition hover:bg-destructive group-hover:opacity-100 focus:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        ))}

        {images.length === 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="col-span-full flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground transition hover:border-primary/50 hover:text-primary"
          >
            <ImagePlus className="size-7" aria-hidden="true" />
            <span className="mt-2 text-sm font-medium">Upload at least three photos</span>
          </button>
        )}
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  )
}
