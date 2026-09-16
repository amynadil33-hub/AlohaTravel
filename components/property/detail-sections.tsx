import { Check, MapPin } from 'lucide-react'

export function InfoStat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-1 border-l border-border pl-4">
      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className="font-serif text-lg leading-tight text-foreground">
        {value}
      </span>
    </div>
  )
}

export function FacilitiesGrid({ facilities }: { facilities: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {facilities.map((f) => (
        <li key={f} className="flex items-center gap-3 text-sm text-foreground">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
          {f}
        </li>
      ))}
    </ul>
  )
}

export function HighlightsList({ highlights }: { highlights: string[] }) {
  return (
    <ul className="space-y-4">
      {highlights.map((h, i) => (
        <li key={h} className="flex items-start gap-4">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-sm">
            {i + 1}
          </span>
          <p className="text-pretty text-[0.95rem] leading-relaxed text-foreground">
            {h}
          </p>
        </li>
      ))}
    </ul>
  )
}

export function LocationNote({ location }: { location: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <MapPin className="size-4 text-primary" aria-hidden="true" />
      {location}
    </div>
  )
}
