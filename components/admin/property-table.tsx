'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Pencil, ExternalLink } from 'lucide-react'
import type { Property } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { PublishedPill } from '@/components/admin/admin-ui'

export function PropertyTable({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState('')

  const filtered = properties.filter((p) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.atoll.toLowerCase().includes(q) ||
      p.island.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, island or atoll…"
          className="pl-9"
          aria-label="Search properties"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-5 py-3 font-medium">Property</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={p.heroImage || '/placeholder.svg'}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-foreground">
                          {p.name}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          {p.tags.slice(0, 2).join(' · ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <div className="text-foreground">{p.island}</div>
                    <div className="text-xs">{p.atoll}</div>
                  </td>
                  <td className="px-5 py-3">
                    <PublishedPill published={p.published} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/${p.type === 'resort' ? 'resorts' : 'guest-houses'}/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                        Edit
                      </Link>
                      <Link
                        href={`/stays/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        target="_blank"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">View live</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-10 text-center text-sm text-muted-foreground"
                  >
                    No properties match &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
