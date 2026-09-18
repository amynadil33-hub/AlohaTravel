import Image from 'next/image'
import Link from 'next/link'
import {
  Anchor,
  ArrowUpRight,
  Building2,
  Heart,
  House,
  Palmtree,
  Plane,
  Ship,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

const services = [
  { title: 'Luxury Resorts', copy: 'Private-island stays, overwater villas, and refined resort experiences.', image: '/images/resort-baros.png', icon: House, accent: 'bg-emerald-600', href: '/resorts' },
  { title: 'Guesthouses & Hotels', copy: 'Comfortable stays on local islands with a closer connection to island life.', image: '/images/guesthouse-dhigurah.png', icon: Building2, accent: 'bg-accent', href: '/guest-houses' },
  { title: 'Safari Yachts', copy: 'A different way to discover the Maldives across its atolls and lagoons.', image: '/images/exp-sunset-cruise.png', icon: Ship, accent: 'bg-primary' },
  { title: 'Transfers', copy: 'Coordinated connections between the airport, resorts, and local islands.', image: '/images/hero-lagoon.png', icon: Plane, accent: 'bg-secondary' },
  { title: 'Experiences & Excursions', copy: 'Ocean encounters, cruises, fishing, and memorable island adventures.', image: '/images/exp-whaleshark.png', icon: Anchor, accent: 'bg-emerald-600', href: '/experiences' },
  { title: 'Honeymoons', copy: 'Personalised romantic escapes shaped around the way you want to celebrate.', image: '/images/interest-honeymoon.png', icon: Heart, accent: 'bg-rose-500', href: '/explore?interest=honeymoon' },
  { title: 'Family Holidays', copy: 'Island stays and experiences selected with the whole family in mind.', image: '/images/interest-family.png', icon: Users, accent: 'bg-primary', href: '/explore?interest=family' },
  { title: 'Local Island Experiences', copy: 'Discover Maldivian island communities, beaches, and everyday rhythms.', image: '/images/split-localisland.png', icon: Palmtree, accent: 'bg-accent', href: '/guest-houses' },
]

export function InterestsSection() {
  return (
    <section className="bg-[#f7fcfd] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="eyebrow text-secondary">Our services</span>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            Everything You Need for a Perfect Maldives Holiday
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
            Personal planning across stays, journeys, and experiences, backed by local knowledge.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 45}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image src={service.image} alt={service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-full border-2 border-white text-white shadow-md ${service.accent}`}>
          <service.icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-sans text-[0.95rem] font-extrabold text-primary">
          {service.title}
          {service.href && <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{service.copy}</p>
      </div>
    </>
  )

  const className = 'group block h-full overflow-hidden rounded-xl border border-primary/10 bg-white shadow-[0_12px_35px_-28px_rgba(6,42,82,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-26px_rgba(6,42,82,0.55)]'
  return service.href ? <Link href={service.href} className={className}>{content}</Link> : <article className={className}>{content}</article>
}
