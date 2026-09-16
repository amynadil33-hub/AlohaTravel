'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize2, Users } from 'lucide-react'
import type { RoomCategory } from '@/lib/types'

export function RoomCategoryCard({ room }: { room: RoomCategory }) {
  const photos = room.photos.length > 0 ? room.photos : ['/placeholder.svg']
  const [active, setActive] = useState(0)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={photos[active] || '/placeholder.svg'}
          alt={`${room.name} — photo ${active + 1}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
          from ${room.priceFrom.toLocaleString()}
          <span className="font-normal text-muted-foreground"> / night</span>
        </span>
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 px-4 pt-4" role="group" aria-label={`${room.name} photos`}>
          {photos.map((p, i) => (
            <button
              key={p + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${room.name} photo ${i + 1}`}
              aria-pressed={i === active}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-2 transition ${
                i === active ? 'ring-primary' : 'ring-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={p || '/placeholder.svg'}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-xl text-foreground">{room.name}</h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {room.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="size-3.5 text-primary" aria-hidden="true" />
            {room.size}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 text-primary" aria-hidden="true" />
            {room.maxOccupancy}
          </span>
        </div>
      </div>
    </div>
  )
}
