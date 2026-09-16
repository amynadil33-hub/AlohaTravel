'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null)
  const shots = images.slice(0, 5)

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl md:h-[28rem]">
        {shots.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'group relative overflow-hidden',
              i === 0 ? 'col-span-4 row-span-2 md:col-span-2' : 'col-span-2 md:col-span-1',
              'aspect-[4/3] md:aspect-auto',
            )}
          >
            <Image
              src={src || '/placeholder.svg'}
              alt={`${name} — photo ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/10" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-deep/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} gallery`}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <div
            className="relative aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={shots[active] || '/placeholder.svg'}
              alt={`${name} — enlarged photo`}
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  )
}
