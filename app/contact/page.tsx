import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageCircle, Phone, Clock, MapPin } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { InquiryForm } from '@/components/site/inquiry-form'
import { WHATSAPP_URL } from '@/components/site/nav-links'

export const metadata: Metadata = {
  title: 'Contact & Trip Planning',
  description:
    'Start planning your Maldives escape with Alloha Travels & Tours. Send us an inquiry or message us on WhatsApp — we reply within one business day.',
}

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@allohatravels.com',
    href: 'mailto:hello@allohatravels.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+960 331 2000',
    href: 'tel:+9603312000',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with a planner',
    href: WHATSAPP_URL,
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Boduthakurufaanu Magu, Malé, Maldives',
  },
]

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Let's talk"
        title="Plan your Maldives escape"
        description="Share your dates and travel dreams. A real person from our team will reply within one business day — no bots, no booking fees."
        image="/images/contact-beach.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <Reveal className="order-2 lg:order-1">
            <div className="mb-8 space-y-2">
              <span className="eyebrow text-secondary">Send an inquiry</span>
              <h2 className="font-serif text-3xl text-primary md:text-4xl">
                Tell us about your trip
              </h2>
            </div>
            <InquiryForm />
          </Reveal>

          {/* Sidebar */}
          <Reveal className="order-1 lg:order-2">
            <div className="rounded-3xl border border-border bg-secondary/40 p-8">
              <h3 className="font-serif text-2xl text-primary">
                Reach us directly
              </h3>
              <ul className="mt-6 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <d.icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {d.label}
                      </div>
                      {d.href ? (
                        <Link
                          href={d.href}
                          className="text-[0.95rem] font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {d.value}
                        </Link>
                      ) : (
                        <div className="text-[0.95rem] font-medium text-foreground">
                          {d.value}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-start gap-4 border-t border-border pt-6">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="size-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Hours
                  </div>
                  <div className="text-[0.95rem] font-medium text-foreground">
                    Sun–Fri, 9am – 6pm (GMT+5)
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    WhatsApp messages are answered around the clock.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
