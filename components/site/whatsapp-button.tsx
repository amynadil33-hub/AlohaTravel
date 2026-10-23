'use client'

import { usePathname } from 'next/navigation'
import { WHATSAPP_URL } from './nav-links'

export function WhatsAppButton() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Aloha Travels on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-4 z-40 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-4 text-sm font-bold text-white shadow-[0_12px_35px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1fbd5b] hover:shadow-[0_16px_40px_-8px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4 motion-reduce:transform-none sm:bottom-6 sm:right-6 sm:px-5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/20 [animation-duration:2.5s] motion-reduce:hidden" />
      <WhatsAppIcon />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 shrink-0"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.29-1.54A9.96 9.96 0 1 0 12.04 2Zm0 17.92a8.06 8.06 0 0 1-4.1-1.12l-.3-.18-3.14.92.94-3.06-.2-.31a7.86 7.86 0 1 1 6.8 3.75Zm4.4-5.89c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.2a7.27 7.27 0 0 1-1.34-1.66c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}
