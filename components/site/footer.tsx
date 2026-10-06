import Link from 'next/link'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { WHATSAPP_URL } from './nav-links'

const navigationGroups = [
  {
    title: 'The Maldives',
    links: [
      { label: 'Maldives', href: '/maldives' },
      { label: 'Resorts', href: '/resorts' },
      { label: 'Hotels & Guest Houses', href: '/guest-houses' },
      { label: 'Safari Yachts', href: '/safari-yachts' },
    ],
  },
  {
    title: 'Discover Aloha',
    links: [
      { label: 'Experiences', href: '/experiences' },
      { label: 'Packages', href: '/packages' },
      { label: 'Explore by Interest', href: '/explore' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="overflow-hidden bg-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-20 md:px-8 md:pt-24 lg:pt-28">
        <div className="grid gap-12 pb-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.55fr)] lg:items-end lg:gap-20 lg:pb-20">
          <div className="max-w-3xl">
            <span className="font-serif text-5xl font-medium leading-none tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Aloha Travels<span className="text-secondary">.</span>
            </span>
            <p className="mt-7 max-w-2xl text-pretty font-serif text-2xl leading-snug text-white/90 sm:text-3xl">
              Curated Maldives travel, shaped by local knowledge.
            </p>
            <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-deep-foreground/65 sm:text-base">
              Personalised Maldives holidays built around your interests,
              preferences, and budget.
            </p>
          </div>

          <div className="border-l-2 border-secondary pl-6 sm:pl-8 lg:mb-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Your Maldives, personally planned
            </p>
            <Link
              href="/contact"
              className="group mt-5 inline-flex min-h-12 items-center gap-4 border-b border-white/25 pb-2 font-serif text-2xl text-white transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-deep sm:text-3xl"
            >
              Plan Your Trip
              <ArrowUpRight
                className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="grid gap-9 border-t border-white/12 py-10 sm:grid-cols-2 md:gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-24 lg:py-12"
        >
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <h2 className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-secondary">
                <span>{group.title}</span>
                <span className="h-px w-8 bg-secondary/45" aria-hidden="true" />
              </h2>
              <ul className="mt-5 flex max-w-2xl flex-wrap gap-x-8 gap-y-0 md:mt-6 lg:gap-x-10">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-12 items-center border-b border-transparent text-base leading-6 text-white/80 transition-colors hover:border-secondary/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-deep sm:text-[1.05rem]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <address className="grid gap-x-10 border-t border-white/12 py-6 not-italic sm:grid-cols-2 sm:gap-y-1 lg:py-8 xl:grid-cols-4 xl:gap-x-8">
          <ContactItem icon={MapPin} label="Visit">
            <span>Malé, Maldives</span>
          </ContactItem>
          <ContactItem
            icon={Mail}
            label="Write"
            href="mailto:travels@alohamaldives.com"
          >
            <span>travels@alohamaldives.com</span>
          </ContactItem>
          <ContactItem icon={Phone} label="Call" href="tel:+9607974004">
            <span>+960 797 4004</span>
          </ContactItem>
          <ContactItem
            icon={MessageCircle}
            label="WhatsApp"
            href={WHATSAPP_URL}
            external
          >
            <span>Start a conversation</span>
          </ContactItem>
        </address>

        <div className="flex flex-col gap-2 border-t border-white/[0.08] py-5 text-[0.72rem] tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <span className="text-white/55">Aloha Travels — Maldives</span>
          <span className="text-deep-foreground/35">
            © {new Date().getFullYear()} Aloha Travels. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

function ContactItem({
  icon: Icon,
  label,
  href,
  external = false,
  children,
}: {
  icon: typeof MapPin
  label: string
  href?: string
  external?: boolean
  children: React.ReactNode
}) {
  const content = (
    <>
      <Icon className="mt-1 size-4 shrink-0 text-secondary" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/45">
          {label}
        </span>
        <span className="mt-1.5 block break-words font-serif text-base leading-6 text-white/90 transition-colors group-hover:text-secondary sm:text-[1.05rem]">
          {children}
        </span>
      </span>
    </>
  )

  const className =
    'group flex min-h-20 min-w-0 items-start gap-3 py-4 xl:min-h-0 xl:py-2'

  return href ? (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-deep`}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}
