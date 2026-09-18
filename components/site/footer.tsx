import Link from 'next/link'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { WHATSAPP_URL } from './nav-links'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Maldives', href: '/maldives' },
      { label: 'Resorts', href: '/resorts' },
      { label: 'Hotels & Guest Houses', href: '/guest-houses' },
      { label: 'Experiences', href: '/experiences' },
    ],
  },
  {
    title: 'Aloha Travels',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Plan Your Trip', href: '/contact' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Safari Yachts', href: '/safari-yachts' },
      { label: 'Packages', href: '/packages' },
      { label: 'Explore by Interest', href: '/explore' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="font-serif text-3xl font-semibold text-white">
              Aloha Travels<span className="text-secondary">.</span>
            </span>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-deep-foreground/70">
              Curated Maldives travel, shaped by local knowledge. Handpicked island
              escapes, unforgettable experiences and personalised planning backed
              by experience and local knowledge.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={WHATSAPP_URL} label="WhatsApp">
                <MessageCircle className="size-4" />
              </SocialLink>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-deep-foreground/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 text-sm text-deep-foreground/70 sm:grid-cols-3">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-secondary" /> Malé, Maldives
          </span>
          <a
            href="mailto:travels@alohamaldives.com"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="size-4 text-secondary" /> travels@alohamaldives.com
          </a>
          <a
            href="tel:+9607974004"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="size-4 text-secondary" /> +960 797 4004
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-8 text-xs text-deep-foreground/60 sm:flex-row">
          <span>Aloha Travels — Maldives</span>
          <span>© {new Date().getFullYear()} Aloha Travels. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-secondary hover:bg-secondary hover:text-white"
    >
      {children}
    </a>
  )
}
