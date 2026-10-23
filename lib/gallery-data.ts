export type GalleryImage = {
  src: string
  alt: string
  caption: string
  context: string
  ratio: 'panorama' | 'landscape' | 'portrait' | 'square'
}

export type GalleryChapter = {
  id: string
  number: string
  title: string
  introduction: string
  tone: 'light' | 'deep'
  layout: 'beneath' | 'islands' | 'ocean' | 'stays'
  images: GalleryImage[]
}

export const galleryHero: GalleryImage = {
  src: '/images/real-dhigufaru-snorkelling-reef.jpg',
  alt: 'A snorkeller above a shallow coral reef filled with tropical fish at Dhigufaru Island Resort',
  caption: 'Below the surface',
  context: 'Reef snorkelling at Dhigufaru Island Resort',
  ratio: 'panorama',
}

export const galleryChapters: GalleryChapter[] = [
  {
    id: 'beneath-the-blue',
    number: '01',
    title: 'Beneath the Blue',
    introduction:
      'Light, movement and marine life reveal another Maldives beneath the surface.',
    tone: 'deep',
    layout: 'beneath',
    images: [
      {
        src: '/images/real-dhigufaru-whale-shark-scuba.jpg',
        alt: 'A whale shark swimming above an equipped scuba diver in the Maldives',
        caption: 'In the presence of a gentle giant',
        context: 'Whale shark encounter · Dhigufaru Island Resort',
        ratio: 'panorama',
      },
      {
        src: '/images/real-dhigufaru-scuba-preparation.jpg',
        alt: 'Two equipped scuba divers preparing to enter turquoise water at Dhigufaru Island Resort',
        caption: 'Ready for the descent',
        context: 'Scuba preparation · Dhigufaru Island Resort',
        ratio: 'portrait',
      },
      {
        src: '/images/real-westin-manta-snorkelling.jpg',
        alt: 'Snorkellers observing manta rays beneath clear turquoise water',
        caption: 'Moving with mantas',
        context: 'Manta snorkelling · The Westin Maldives Miriandhoo Resort',
        ratio: 'landscape',
      },
    ],
  },
  {
    id: 'life-on-the-islands',
    number: '02',
    title: 'Life on the Islands',
    introduction:
      'The journey becomes personal in the welcome, the landscape and the rhythm of a local island stay.',
    tone: 'light',
    layout: 'islands',
    images: [
      {
        src: '/images/real-gaadhiffushi-atoll.jpg',
        alt: 'Aerial panorama of the islands and reef geography around Gaadhiffushi in Thaa Atoll',
        caption: 'A chain of islands in the blue',
        context: 'Gaadhiffushi · Thaa Atoll',
        ratio: 'panorama',
      },
      {
        src: '/images/real-gaadhiffushi-welcome.jpg',
        alt: 'Local hosts welcoming guests beside the harbour on Gaadhiffushi',
        caption: 'A welcome by the water',
        context: 'Guest arrival · Gaadhiffushi',
        ratio: 'landscape',
      },
      {
        src: '/images/real-gaadhiffushi-guest-arrival.jpg',
        alt: 'Guests arriving at the entrance of Bambukeyo Villa on Gaadhiffushi',
        caption: 'Arriving as a guest',
        context: 'Bambukeyo Villa · Gaadhiffushi',
        ratio: 'portrait',
      },
      {
        src: '/images/real-gaadhiffushi-guesthouse-entrance.jpg',
        alt: 'White-walled entrance and sign of Bambukeyo Villa on Gaadhiffushi',
        caption: 'A local-island address',
        context: 'Bambukeyo Villa · Gaadhiffushi',
        ratio: 'landscape',
      },
    ],
  },
  {
    id: 'across-the-ocean',
    number: '03',
    title: 'Across the Ocean',
    introduction:
      'Days at sea unfold between open horizons, quiet decks and islands approached from the water.',
    tone: 'deep',
    layout: 'ocean',
    images: [
      {
        src: '/images/real-atoll-villa-island-arrival.jpg',
        alt: 'Atoll Villa yacht anchored beside a white-sand island and turquoise lagoon',
        caption: 'An island on the horizon',
        context: 'Atoll Villa · Maldives by sea',
        ratio: 'panorama',
      },
      {
        src: '/images/real-atoll-villa-open-sea.jpeg',
        alt: 'Atoll Villa yacht cruising across open blue water between reefs',
        caption: 'A course through the atolls',
        context: 'Atoll Villa · Open-water journey',
        ratio: 'landscape',
      },
      {
        src: '/images/real-atoll-villa-sundeck.jpg',
        alt: 'Open sundeck seating aboard Atoll Villa with an uninterrupted ocean view',
        caption: 'Room to watch the horizon',
        context: 'Sundeck aboard Atoll Villa',
        ratio: 'portrait',
      },
      {
        src: '/images/real-atoll-villa-fishing.jpeg',
        alt: 'An angler holding a freshly caught reef fish aboard a boat in the Maldives',
        caption: 'A story from the water',
        context: 'Fishing with Atoll Villa',
        ratio: 'landscape',
      },
    ],
  },
  {
    id: 'somewhere-to-stay',
    number: '04',
    title: 'Somewhere to Stay',
    introduction:
      'From overwater architecture to intimate island hospitality, every stay offers a different perspective.',
    tone: 'light',
    layout: 'stays',
    images: [
      {
        src: '/images/real-westin-overwater-aerial.jpg',
        alt: 'Top-down aerial view of overwater villas above the reef at The Westin Maldives Miriandhoo Resort',
        caption: 'Architecture above the reef',
        context: 'The Westin Maldives Miriandhoo Resort',
        ratio: 'panorama',
      },
      {
        src: '/images/real-h78-terrace-dining.webp',
        alt: 'A long dining table beside the ocean-view mural terrace at h78',
        caption: 'Dinner with an island point of view',
        context: 'h78 · Hulhumalé',
        ratio: 'portrait',
      },
      {
        src: '/images/guest-houses/arena-beach-hotel-exterior.jpg',
        alt: 'Arena Beach Hotel beside the beach and turquoise water on Maafushi',
        caption: 'Where the island meets the beach',
        context: 'Arena Beach Hotel · Maafushi',
        ratio: 'landscape',
      },
      {
        src: '/images/guest-houses/lagoon-villa-thoddoo-exterior.jpg',
        alt: 'Leaf-framed guest-room terrace and garden at Lagoon Villa Thoddoo',
        caption: 'A quiet corner of Thoddoo',
        context: 'Lagoon Villa Thoddoo',
        ratio: 'landscape',
      },
    ],
  },
]

export const galleryImages = galleryChapters.flatMap((chapter) => chapter.images)
