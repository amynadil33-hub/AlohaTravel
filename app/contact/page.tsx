import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { InquiryForm } from '@/components/site/inquiry-form'
import { WHATSAPP_URL } from '@/components/site/nav-links'

export const metadata: Metadata = {
  title: 'Contact & Trip Planning',
  description:
    'Start planning your Maldives escape with Aloha Travels. Send us an enquiry or message us on WhatsApp.',
}

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: 'travels@alohamaldives.com',
    href: 'mailto:travels@alohamaldives.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+960 797 4004',
    href: 'tel:+9607974004',
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
    value: 'Malé, Maldives',
  },
]

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Let's talk"
        title="Plan your Maldives escape"
        description="Share your dates, interests, preferences, and budget with the Aloha Travels team."
        image="/images/contact-beach.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <Reveal className="order-2 lg:order-1">
            <div className="mb-8 space-y-2">
              <span className="eyebrow text-secondary">Send an enquiry</span>
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
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
