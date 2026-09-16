'use client'

import { useState } from 'react'
import type { Inquiry, InquiryStatus } from '@/lib/types'
import { StatusBadge } from '@/components/admin/admin-ui'
import { cn } from '@/lib/utils'

const filters: { value: InquiryStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'planning', label: 'Planning' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'closed', label: 'Closed' },
]

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [active, setActive] = useState<InquiryStatus | 'all'>('all')

  const filtered =
    active === 'all'
      ? inquiries
      : inquiries.filter((i) => i.status === active)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count =
            f.value === 'all'
              ? inquiries.length
              : inquiries.filter((i) => i.status === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                active === f.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {f.label}
              <span
                className={cn(
                  'text-xs',
                  active === f.value
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground/70',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Interest</th>
                <th className="px-5 py-3 font-medium">Dates &amp; guests</th>
                <th className="px-5 py-3 font-medium">Budget</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inq) => (
                <tr key={inq.id} className="transition-colors hover:bg-muted/40">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-foreground">{inq.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {inq.contact}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-foreground">
                    {inq.propertyName ?? (
                      <span className="text-muted-foreground">General inquiry</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    <div className="text-foreground">{inq.travelDates}</div>
                    <div className="text-xs">{inq.guests}</div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {inq.budget}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {inq.createdAt}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-muted-foreground"
                  >
                    No inquiries with this status.
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
