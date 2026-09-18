import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Aloha Travels — Curated Maldives Travel',
    template: '%s · Aloha Travels',
  },
  description:
    'Personalised Maldives holidays shaped around your interests, preferences, and budget with Aloha Travels.',
  keywords: [
    'Maldives',
    'Maldives resorts',
    'Maldives guest houses',
    'Maldives travel',
    'island holidays',
    'diving',
    'snorkeling',
    'honeymoon',
  ],
  openGraph: {
    title: 'Aloha Travels — Curated Maldives Travel',
    description:
      'Handpicked island escapes, unforgettable experiences and local expertise — curated by Aloha Travels.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b4f9c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
