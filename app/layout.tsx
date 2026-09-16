import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Alloha Travels & Tours — Curated Maldives Travel',
    template: '%s · Alloha Travels & Tours',
  },
  description:
    'Handpicked Maldives island escapes, unforgettable experiences and local expertise. Curated resorts and authentic guest houses, shaped by local knowledge.',
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
  generator: 'v0.app',
  openGraph: {
    title: 'Alloha Travels & Tours — Curated Maldives Travel',
    description:
      'Handpicked island escapes, unforgettable experiences and local expertise — curated by Alloha Travels & Tours.',
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
