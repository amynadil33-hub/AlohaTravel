import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { EMAIL_ENQUIRY_URL, PHONE_URL } from './nav-links'

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
      { label: 'Gallery', href: '/gallery' },
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

        <div className="grid gap-14 border-t border-white/12 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)] lg:gap-20 lg:py-14">
          <nav
            aria-label="Footer navigation"
            className="grid gap-10 sm:grid-cols-2 sm:gap-12"
          >
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-serif text-lg text-white">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-[0.95rem] leading-6 text-white/65 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-deep sm:text-base"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <h2 className="font-serif text-lg text-white">Contact Aloha</h2>
            <address className="mt-4 grid gap-x-8 not-italic sm:grid-cols-2">
              <ContactItem icon={MapPin} label="Location">
                <span>Malé, Maldives</span>
              </ContactItem>
              <ContactItem
                icon={Mail}
                label="Email"
                href="mailto:travels@alohamaldives.com"
              >
                <span>travels@alohamaldives.com</span>
              </ContactItem>
              <ContactItem icon={Phone} label="Telephone" href={PHONE_URL}>
                <span>+960 797 4004</span>
              </ContactItem>
              <ContactItem
                icon={Mail}
                label="Enquiries"
                href={EMAIL_ENQUIRY_URL}
              >
                <span>Email our team</span>
              </ContactItem>
            </address>
          </div>
        </div>

        <div className="grid gap-7 border-t border-white/12 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="https://alohamaldives.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Aloha Maldives, our parent company"
              className="inline-flex shrink-0 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-deep"
            >
              <Image
                src="/images/aloha-maldives-logo-v2.png"
                alt="Aloha Maldives"
                width={1653}
                height={530}
                className="h-auto w-[140px] object-contain sm:w-[150px]"
              />
            </a>
            <div>
              <p className="text-sm leading-6 text-white/65">
                Part of Aloha Maldives Pvt. Ltd.
              </p>
              <div className="mt-1 flex items-center gap-1">
                <span className="mr-2 text-xs text-white/40">Follow Aloha Maldives</span>
                <SocialLink
                  href="https://www.facebook.com/alohamaldivespvtltd/"
                  label="Aloha Maldives on Facebook"
                  icon={<FacebookIcon />}
                />
                <SocialLink
                  href="https://www.instagram.com/aloha.maldives/"
                  label="Aloha Maldives on Instagram"
                  icon={<InstagramIcon />}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1 text-xs leading-5 tracking-[0.04em] lg:text-right">
            <p className="text-white/55">Aloha Travels — Maldives</p>
            <p className="text-deep-foreground/35">
              © {new Date().getFullYear()} Aloha Travels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center text-white/70 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-deep"
    >
      {Icon}
    </a>
  )
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-[1.15rem]"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.75l.41-3.17H13.5V7.8c0-.92.26-1.54 1.59-1.54h1.7V3.43a22.8 22.8 0 0 0-2.48-.13c-2.45 0-4.13 1.5-4.13 4.25v2.28H7.4V13h2.78v8h3.32Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.15rem]"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
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
