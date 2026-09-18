import { Gem, Headphones, MapPinned, Sparkles } from 'lucide-react'

const values = [
  {
    icon: MapPinned,
    title: 'Local Expertise',
    copy: 'Deep knowledge of Maldives stays, islands, and experiences.',
    accent: 'bg-emerald-600 text-white',
  },
  {
    icon: Sparkles,
    title: 'Personalised Service',
    copy: 'Every holiday shaped around your interests and preferences.',
    accent: 'bg-accent text-white',
  },
  {
    icon: Gem,
    title: 'Best Value',
    copy: 'Carefully considered options aligned with your budget.',
    accent: 'bg-primary text-white',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    copy: 'Aloha support throughout your Maldives journey.',
    accent: 'bg-secondary text-white',
  },
]

export function ValueStrip() {
  return (
    <section className="border-b border-primary/10 bg-white" aria-label="Why travel with Aloha">
      <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <div
            key={value.title}
            className="flex gap-3.5 border-b border-primary/10 px-5 py-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-full shadow-sm ${value.accent}`}>
              <value.icon className="size-[22px]" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-sans text-[0.92rem] font-extrabold text-primary">{value.title}</h2>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{value.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
