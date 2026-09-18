import type {
  Experience,
  Inquiry,
  Interest,
  Mood,
  Property,
} from './types'

// ---------------------------------------------------------------------------
// Interests
// ---------------------------------------------------------------------------
export const interests: Interest[] = [
  {
    id: 'int-diving',
    name: 'Diving',
    slug: 'diving',
    description: 'World-class channels, thilas and house reefs teeming with life.',
    imageUrl: '/images/interest-diving.png',
    featured: true,
  },
  {
    id: 'int-snorkeling',
    name: 'Snorkeling',
    slug: 'snorkeling',
    description: 'Step off the beach into gardens of coral and turtles.',
    imageUrl: '/images/interest-snorkeling.png',
    featured: true,
  },
  {
    id: 'int-honeymoon',
    name: 'Honeymoon',
    slug: 'honeymoon',
    description: 'Overwater villas, private dinners and time that slows down.',
    imageUrl: '/images/interest-honeymoon.png',
    featured: true,
  },
  {
    id: 'int-family',
    name: 'Family Holidays',
    slug: 'family',
    description: 'Shallow lagoons, kids clubs and islands made for play.',
    imageUrl: '/images/interest-family.png',
    featured: true,
  },
  {
    id: 'int-water-sports',
    name: 'Water Sports',
    slug: 'water-sports',
    description: 'Jet skis, catamarans, kite surfing and lagoon adventures.',
    imageUrl: '/images/interest-watersports.png',
    featured: false,
  },
  {
    id: 'int-romantic',
    name: 'Romantic Getaways',
    slug: 'romantic',
    description: 'Sandbank picnics and sunsets shared just the two of you.',
    imageUrl: '/images/interest-romantic.png',
    featured: false,
  },
  {
    id: 'int-adventure',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Surf breaks, big fish and islands off the beaten track.',
    imageUrl: '/images/interest-adventure.png',
    featured: false,
  },
  {
    id: 'int-relaxation',
    name: 'Relaxation',
    slug: 'relaxation',
    description: 'Spas over the water, hammocks and nowhere to be.',
    imageUrl: '/images/interest-relaxation.png',
    featured: false,
  },
]

export const interestBySlug = (slug: string) =>
  interests.find((i) => i.slug === slug)

// ---------------------------------------------------------------------------
// Experiences
// ---------------------------------------------------------------------------
export const experiences: Experience[] = [
  {
    id: 'exp-whale-shark',
    name: 'Whale Shark Encounters',
    slug: 'whale-sharks',
    description:
      'Swim alongside the gentle giants of South Ari Atoll, where whale sharks roam year round.',
    imageUrl: '/images/exp-whaleshark.png',
    featured: true,
    relatedPropertyIds: ['prop-dhigurah-retreat', 'prop-milaidhoo'],
  },
  {
    id: 'exp-manta',
    name: 'Manta Ray Adventures',
    slug: 'manta-rays',
    description:
      'Drift over cleaning stations as manta rays glide overhead in perfect formation.',
    imageUrl: '/images/exp-manta.png',
    featured: true,
    relatedPropertyIds: ['prop-milaidhoo', 'prop-soneva-secret'],
  },
  {
    id: 'exp-scuba',
    name: 'Scuba Diving',
    slug: 'scuba-diving',
    description:
      'From gentle house reefs to adrenaline channel dives, guided by expert local divers.',
    imageUrl: '/images/interest-diving.png',
    featured: true,
    relatedPropertyIds: ['prop-baros', 'prop-fulhadhoo-stay'],
  },
  {
    id: 'exp-snorkel',
    name: 'Reef Snorkeling',
    slug: 'snorkeling',
    description:
      'Explore living coral gardens straight from the beach with turtles and reef fish.',
    imageUrl: '/images/interest-snorkeling.png',
    featured: false,
    relatedPropertyIds: ['prop-ukulhas-beach', 'prop-baros'],
  },
  {
    id: 'exp-sunset-cruise',
    name: 'Sunset Cruises',
    slug: 'sunset-cruises',
    description:
      'Sail a traditional dhoni into the sunset, dolphins often riding the bow.',
    imageUrl: '/images/exp-sunset-cruise.png',
    featured: true,
    relatedPropertyIds: ['prop-velaa-lagoon', 'prop-maafushi-breeze'],
  },
  {
    id: 'exp-sandbank',
    name: 'Sandbank Escapes',
    slug: 'sandbank-escapes',
    description:
      'A private picnic on a bare ribbon of sand surrounded by turquoise ocean.',
    imageUrl: '/images/exp-sandbank.png',
    featured: true,
    relatedPropertyIds: ['prop-soneva-secret', 'prop-dhigurah-retreat'],
  },
  {
    id: 'exp-surfing',
    name: 'Surfing',
    slug: 'surfing',
    description:
      'World-class reef breaks off local islands, for first-timers to pros.',
    imageUrl: '/images/interest-adventure.png',
    featured: false,
    relatedPropertyIds: ['prop-thulusdhoo-surf'],
  },
  {
    id: 'exp-fishing',
    name: 'Local Fishing',
    slug: 'fishing',
    description:
      'Head out with island fishermen for handline and big-game fishing at dusk.',
    imageUrl: '/images/exp-fishing.png',
    featured: false,
    relatedPropertyIds: ['prop-maafushi-breeze', 'prop-fulhadhoo-stay'],
  },
  {
    id: 'exp-dolphins',
    name: 'Dolphin Cruises',
    slug: 'dolphin-cruises',
    description:
      'Spinner dolphins in their hundreds, playing in the golden evening light.',
    imageUrl: '/images/exp-sunset-cruise.png',
    featured: false,
    relatedPropertyIds: ['prop-velaa-lagoon'],
  },
  {
    id: 'exp-local-culture',
    name: 'Local Island Life',
    slug: 'local-culture',
    description:
      'Wander sandy lanes, taste short eats and meet the communities behind the islands.',
    imageUrl: '/images/split-localisland.png',
    featured: false,
    relatedPropertyIds: ['prop-ukulhas-beach', 'prop-maafushi-breeze'],
  },
]

export const experienceBySlug = (slug: string) =>
  experiences.find((e) => e.slug === slug)

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------
export const properties: Property[] = [
  {
    id: 'prop-constance-halaveli-resort',
    name: 'Constance Halaveli Resort',
    slug: 'constance-halaveli-resort',
    type: 'resort',
    shortDescription:
      'A Maldives resort on Halaveli in Alifu Alifu Atoll.',
    description:
      'Constance Halaveli Resort is located on Halaveli in Alifu Alifu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.',
    island: 'Halaveli',
    atoll: 'Alifu Alifu',
    location: 'Halaveli, Alifu Alifu',
    heroImage: '/images/hero-lagoon.png',
    gallery: [
      '/images/hero-lagoon.png',
      '/images/split-resort.png',
      '/images/cta-ocean.png',
      '/images/made-in-maldives.png',
    ],
    tags: ['Resort'],
    interests: [],
    experiences: [],
    facilities: [],
    highlights: [],
    roomCategories: [],
    featured: false,
    published: true,
  },
  {
    id: 'prop-conrad-maldives-rangali-island',
    name: 'Conrad Maldives Rangali Island',
    slug: 'conrad-maldives-rangali-island',
    type: 'resort',
    shortDescription:
      'A Maldives resort on Rangalifinolhu in Alifu Dhaalu Atoll.',
    description:
      'Conrad Maldives Rangali Island is located on Rangalifinolhu in Alifu Dhaalu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.',
    island: 'Rangalifinolhu',
    atoll: 'Alifu Dhaalu',
    location: 'Rangalifinolhu, Alifu Dhaalu',
    heroImage: '/images/split-resort.png',
    gallery: [
      '/images/split-resort.png',
      '/images/hero-lagoon.png',
      '/images/cta-ocean.png',
      '/images/made-in-maldives.png',
    ],
    tags: ['Resort'],
    interests: [],
    experiences: [],
    facilities: [],
    highlights: [],
    roomCategories: [],
    featured: false,
    published: true,
  },
  {
    id: 'prop-anantara-kihavah-villas',
    name: 'Anantara Kihavah Villas',
    slug: 'anantara-kihavah-villas',
    type: 'resort',
    shortDescription:
      'A Maldives resort on Kihavah Huravalhi in Baa Atoll.',
    description:
      'Anantara Kihavah Villas is located on Kihavah Huravalhi in Baa Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.',
    island: 'Kihavah Huravalhi',
    atoll: 'Baa',
    location: 'Kihavah Huravalhi, Baa',
    heroImage: '/images/hero-lagoon.png',
    gallery: [
      '/images/hero-lagoon.png',
      '/images/split-resort.png',
      '/images/cta-ocean.png',
      '/images/made-in-maldives.png',
    ],
    tags: ['Resort'],
    interests: [],
    experiences: [],
    facilities: [],
    highlights: [],
    roomCategories: [],
    featured: false,
    published: true,
  },
  {
    id: 'prop-the-st-regis-vommuli-resort-maldives',
    name: 'The St. Regis Vommuli Resort, Maldives',
    slug: 'the-st-regis-vommuli-resort-maldives',
    type: 'resort',
    shortDescription:
      'A Maldives resort on Vommuli in Dhaalu Atoll.',
    description:
      'The St. Regis Vommuli Resort, Maldives is located on Vommuli in Dhaalu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.',
    island: 'Vommuli',
    atoll: 'Dhaalu',
    location: 'Vommuli, Dhaalu',
    heroImage: '/images/split-resort.png',
    gallery: [
      '/images/split-resort.png',
      '/images/hero-lagoon.png',
      '/images/cta-ocean.png',
      '/images/made-in-maldives.png',
    ],
    tags: ['Resort'],
    interests: [],
    experiences: [],
    facilities: [],
    highlights: [],
    roomCategories: [],
    featured: false,
    published: true,
  },
  {
    id: 'prop-pullman-maldives-maamutaa-resort',
    name: 'Pullman Maldives Maamutaa Resort',
    slug: 'pullman-maldives-maamutaa-resort',
    type: 'resort',
    shortDescription:
      'A Maldives resort on Maamutaa in Gaafu Alifu Atoll.',
    description:
      'Pullman Maldives Maamutaa Resort is located on Maamutaa in Gaafu Alifu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.',
    island: 'Maamutaa',
    atoll: 'Gaafu Alifu',
    location: 'Maamutaa, Gaafu Alifu',
    heroImage: '/images/hero-lagoon.png',
    gallery: [
      '/images/hero-lagoon.png',
      '/images/split-resort.png',
      '/images/cta-ocean.png',
      '/images/made-in-maldives.png',
    ],
    tags: ['Resort'],
    interests: [],
    experiences: [],
    facilities: [],
    highlights: [],
    roomCategories: [],
    featured: false,
    published: true,
  },
  {
    id: 'prop-baros-maldives',
    name: 'Baros Maldives',
    slug: 'baros-maldives',
    type: 'resort',
    shortDescription:
      'A Maldives resort on Baros in Kaafu Atoll.',
    description:
      'Baros Maldives is located on Baros in Kaafu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.',
    island: 'Baros',
    atoll: 'Kaafu',
    location: 'Baros, Kaafu',
    heroImage: '/images/split-resort.png',
    gallery: [
      '/images/split-resort.png',
      '/images/hero-lagoon.png',
      '/images/cta-ocean.png',
      '/images/made-in-maldives.png',
    ],
    tags: ['Resort'],
    interests: [],
    experiences: [],
    facilities: [],
    highlights: [],
    roomCategories: [],
    featured: false,
    published: true,
  },

  // ---- Guest houses ----
  {
    id: 'prop-dhigurah-retreat',
    name: 'Dhigurah Beach Retreat',
    slug: 'dhigurah-beach-retreat',
    type: 'guest-house',
    shortDescription:
      'A friendly beachfront guest house on the island of whale sharks.',
    description:
      'Dhigurah is a long, narrow island in South Ari Atoll famous for year-round whale sharks and a bikini beach that stretches for kilometres. Dhigurah Beach Retreat puts you steps from the sand and a short boat ride from the giants offshore. Warm hosts, home-cooked Maldivian food and daily excursions make it an easy, authentic base.',
    island: 'Dhigurah',
    atoll: 'South Ari Atoll',
    location: 'Dhigurah, South Ari Atoll',
    heroImage: '/images/guesthouse-dhigurah.png',
    gallery: [
      '/images/guesthouse-dhigurah.png',
      '/images/exp-whaleshark.png',
      '/images/story-dhigurah.png',
      '/images/interest-snorkeling.png',
    ],
    tags: ['Whale Sharks', 'Beach', 'Snorkeling', 'Authentic'],
    interests: ['snorkeling', 'adventure', 'diving', 'relaxation'],
    experiences: ['whale-sharks', 'sandbank-escapes', 'snorkeling'],
    facilities: ['Restaurants', 'Excursions', 'House Reef', 'Dive Centre'],
    highlights: [
      'Year-round whale shark excursions',
      'Kilometre-long bikini beach',
      'Home-cooked Maldivian meals',
      'Daily snorkeling and sandbank trips',
    ],
    roomCategories: [
      {
        name: 'Beachfront Room',
        description:
          'Bright room with a sea breeze and private balcony, steps from the sand.',
        size: '28 m²',
        maxOccupancy: '2 adults',
        priceFrom: 120,
        photos: [
          '/images/room-oceanfront.png',
          '/images/guesthouse-dhigurah.png',
          '/images/interest-snorkeling.png',
        ],
      },
      {
        name: 'Garden Room',
        description: 'A quiet, shaded room set back among the palms.',
        size: '24 m²',
        maxOccupancy: '2 adults',
        priceFrom: 95,
        photos: [
          '/images/room-deluxe.png',
          '/images/guesthouse-ukulhas.png',
          '/images/room-garden.png',
        ],
      },
      {
        name: 'Family Suite',
        description:
          'A larger room sleeping up to four, perfect for families chasing whale sharks.',
        size: '40 m²',
        maxOccupancy: '2 adults + 2 children',
        priceFrom: 165,
        photos: [
          '/images/room-family.png',
          '/images/exp-whaleshark.png',
          '/images/story-dhigurah.png',
        ],
      },
    ],
    featured: true,
    published: true,
  },
  {
    id: 'prop-maafushi-breeze',
    name: 'Maafushi Breeze',
    slug: 'maafushi-breeze',
    type: 'guest-house',
    shortDescription:
      'A lively local-island stay with excursions on tap and easy Malé access.',
    description:
      'Maafushi is the Maldives’ best-known local island — buzzing, friendly and packed with things to do. Maafushi Breeze sits close to the bikini beach with an easy public-ferry or speedboat hop from Malé. It is the perfect value base for snorkeling safaris, sandbank trips, fishing and sunset cruises, without ever feeling cheap.',
    island: 'Maafushi',
    atoll: 'South Malé Atoll',
    location: 'Maafushi, South Malé Atoll',
    heroImage: '/images/guesthouse-maafushi.png',
    gallery: [
      '/images/guesthouse-maafushi.png',
      '/images/exp-sunset-cruise.png',
      '/images/exp-fishing.png',
      '/images/exp-sandbank.png',
    ],
    tags: ['Value', 'Excursions', 'Fishing', 'Family'],
    interests: ['family', 'water-sports', 'snorkeling', 'adventure'],
    experiences: ['sunset-cruises', 'fishing', 'sandbank-escapes', 'local-culture'],
    facilities: ['Restaurants', 'Excursions', 'Water Sports'],
    highlights: [
      'Easy access from Malé by ferry or speedboat',
      'Huge choice of daily excursions',
      'Close to the bikini beach',
      'Great value for families and groups',
    ],
    roomCategories: [
      {
        name: 'Standard Double',
        description: 'A comfortable, air-conditioned room a short walk from the beach.',
        size: '22 m²',
        maxOccupancy: '2 adults',
        priceFrom: 75,
        photos: [
          '/images/room-deluxe.png',
          '/images/guesthouse-maafushi.png',
          '/images/exp-fishing.png',
        ],
      },
      {
        name: 'Family Room',
        description: 'Extra space for families with connecting-room options.',
        size: '34 m²',
        maxOccupancy: '2 adults + 2 children',
        priceFrom: 110,
        photos: [
          '/images/room-family.png',
          '/images/interest-family.png',
          '/images/exp-sandbank.png',
        ],
      },
      {
        name: 'Rooftop Sea View',
        description: 'A breezy upper room with a private terrace over the harbour.',
        size: '30 m²',
        maxOccupancy: '2 adults',
        priceFrom: 130,
        photos: [
          '/images/room-oceanfront.png',
          '/images/exp-sunset-cruise.png',
          '/images/split-localisland.png',
        ],
      },
    ],
    featured: true,
    published: true,
  },
  {
    id: 'prop-ukulhas-beach',
    name: 'Ukulhas Beach House',
    slug: 'ukulhas-beach-house',
    type: 'guest-house',
    shortDescription:
      'An eco-minded island stay with one of the finest local beaches in Ari Atoll.',
    description:
      'Ukulhas is celebrated for its community-led conservation and a bikini beach of impossibly white sand. Ukulhas Beach House leans into that spirit — relaxed, low-key and steps from the water, with a house reef you can snorkel straight off the beach. It’s local-island living at its most beautiful and unhurried.',
    island: 'Ukulhas',
    atoll: 'Ari Atoll',
    location: 'Ukulhas, Ari Atoll',
    heroImage: '/images/guesthouse-ukulhas.png',
    gallery: [
      '/images/guesthouse-ukulhas.png',
      '/images/interest-snorkeling.png',
      '/images/interest-relaxation.png',
      '/images/split-localisland.png',
    ],
    tags: ['Beach', 'Eco', 'Snorkeling', 'Quiet'],
    interests: ['relaxation', 'snorkeling', 'romantic', 'family'],
    experiences: ['snorkeling', 'local-culture', 'sandbank-escapes'],
    facilities: ['Restaurants', 'Excursions', 'House Reef'],
    highlights: [
      'One of the whitest bikini beaches in the Maldives',
      'Snorkel straight off the beach',
      'Community-led eco initiatives',
      'Peaceful, uncrowded island pace',
    ],
    roomCategories: [
      {
        name: 'Sea View Room',
        description: 'Wake to the lagoon from a breezy upper room with a balcony.',
        size: '26 m²',
        maxOccupancy: '2 adults',
        priceFrom: 105,
        photos: [
          '/images/room-oceanfront.png',
          '/images/guesthouse-ukulhas.png',
          '/images/interest-snorkeling.png',
        ],
      },
      {
        name: 'Garden Double',
        description: 'A calm, shaded room tucked into the greenery near the beach path.',
        size: '22 m²',
        maxOccupancy: '2 adults',
        priceFrom: 85,
        photos: [
          '/images/room-deluxe.png',
          '/images/room-garden.png',
          '/images/interest-relaxation.png',
        ],
      },
      {
        name: 'Beach Suite',
        description: 'The largest room, with a lounge nook and steps to the white-sand beach.',
        size: '38 m²',
        maxOccupancy: '2 adults + 1 child',
        priceFrom: 150,
        photos: [
          '/images/room-beach-villa.png',
          '/images/split-localisland.png',
          '/images/interest-romantic.png',
        ],
      },
    ],
    featured: false,
    published: true,
  },
  {
    id: 'prop-thulusdhoo-surf',
    name: 'Thulusdhoo Surf Lodge',
    slug: 'thulusdhoo-surf-lodge',
    type: 'guest-house',
    shortDescription:
      'A relaxed surf base beside two of the country’s most famous breaks.',
    description:
      'Thulusdhoo is a surf legend, home to the breaks known as Cokes and Chickens. Thulusdhoo Surf Lodge is a friendly base built around dawn patrols and long afternoons in the water. When the surf is flat there is snorkeling, fishing and island life — and Malé is just a short hop away.',
    island: 'Thulusdhoo',
    atoll: 'North Malé Atoll',
    location: 'Thulusdhoo, North Malé Atoll',
    heroImage: '/images/guesthouse-thulusdhoo.png',
    gallery: [
      '/images/guesthouse-thulusdhoo.png',
      '/images/interest-adventure.png',
      '/images/interest-watersports.png',
      '/images/split-localisland.png',
    ],
    tags: ['Surfing', 'Adventure', 'Water Sports', 'Local'],
    interests: ['adventure', 'water-sports', 'snorkeling'],
    experiences: ['surfing', 'snorkeling', 'local-culture'],
    facilities: ['Restaurants', 'Excursions', 'Water Sports'],
    highlights: [
      'Steps from the Cokes and Chickens breaks',
      'Board hire and guided surf sessions',
      'Quick transfer from Malé',
      'Snorkeling and fishing on flat days',
    ],
    roomCategories: [
      {
        name: 'Surf Room',
        description: 'A simple, breezy room with board storage and quick beach access.',
        size: '20 m²',
        maxOccupancy: '2 adults',
        priceFrom: 80,
        photos: [
          '/images/room-deluxe.png',
          '/images/guesthouse-thulusdhoo.png',
          '/images/interest-adventure.png',
        ],
      },
      {
        name: 'Ocean View Room',
        description: 'Watch the sets roll in from a private balcony above the break.',
        size: '26 m²',
        maxOccupancy: '2 adults',
        priceFrom: 115,
        photos: [
          '/images/room-oceanfront.png',
          '/images/interest-watersports.png',
          '/images/split-localisland.png',
        ],
      },
      {
        name: 'Crew Loft',
        description: 'A four-bed loft for surf crews, with a shared deck and gear racks.',
        size: '42 m²',
        maxOccupancy: '4 adults',
        priceFrom: 160,
        photos: [
          '/images/room-family.png',
          '/images/interest-adventure.png',
          '/images/guesthouse-thulusdhoo.png',
        ],
      },
    ],
    featured: false,
    published: true,
  },
  {
    id: 'prop-fulhadhoo-stay',
    name: 'Fulhadhoo Island Stay',
    slug: 'fulhadhoo-island-stay',
    type: 'guest-house',
    shortDescription:
      'A tiny, tranquil island escape for travellers who want to disappear.',
    description:
      'Fulhadhoo in Baa Atoll is the definition of off-the-map — a single sandy lane, a handful of guest houses and a beach that regularly tops lists of the world’s best. Fulhadhoo Island Stay is quiet by design, ideal for slow days, snorkeling the nearby reefs and reconnecting far from the crowds.',
    island: 'Fulhadhoo',
    atoll: 'Baa Atoll',
    location: 'Fulhadhoo, Baa Atoll',
    heroImage: '/images/guesthouse-ukulhas.png',
    gallery: [
      '/images/guesthouse-ukulhas.png',
      '/images/interest-relaxation.png',
      '/images/exp-fishing.png',
      '/images/interest-snorkeling.png',
    ],
    tags: ['Quiet', 'Beach', 'Romantic', 'Off-grid'],
    interests: ['relaxation', 'romantic', 'snorkeling'],
    experiences: ['snorkeling', 'fishing', 'sandbank-escapes'],
    facilities: ['Restaurants', 'Excursions', 'House Reef'],
    highlights: [
      'One of the most beautiful, least-visited beaches',
      'Deeply quiet, off-the-map island',
      'Snorkeling on untouched nearby reefs',
      'Perfect for a barefoot honeymoon on a budget',
    ],
    roomCategories: [
      {
        name: 'Beach Room',
        description: 'A peaceful room steps from an empty stretch of white sand.',
        size: '24 m²',
        maxOccupancy: '2 adults',
        priceFrom: 90,
        photos: [
          '/images/room-oceanfront.png',
          '/images/guesthouse-ukulhas.png',
          '/images/interest-relaxation.png',
        ],
      },
      {
        name: 'Honeymoon Room',
        description: 'A romantic room with a private terrace and outdoor shower.',
        size: '30 m²',
        maxOccupancy: '2 adults',
        priceFrom: 130,
        photos: [
          '/images/room-beach-villa.png',
          '/images/interest-romantic.png',
          '/images/interest-honeymoon.png',
        ],
      },
      {
        name: 'Garden Double',
        description: 'A quiet, shaded room among the palms a minute from the lagoon.',
        size: '22 m²',
        maxOccupancy: '2 adults',
        priceFrom: 78,
        photos: [
          '/images/room-garden.png',
          '/images/room-deluxe.png',
          '/images/interest-snorkeling.png',
        ],
      },
    ],
    featured: false,
    published: true,
  },
  {
    id: 'prop-hanifaru-lodge',
    name: 'Hanifaru Local Lodge',
    slug: 'hanifaru-local-lodge',
    type: 'guest-house',
    shortDescription:
      'A Baa Atoll base for the seasonal manta and whale shark spectacle.',
    description:
      'Near the world-famous Hanifaru Bay, this local lodge is your seat for one of the ocean’s greatest gatherings — hundreds of manta rays feeding in the plankton bloom each season. Beyond the bay, days are filled with reef snorkeling, island walks and warm Maldivian hospitality on a genuine local island.',
    island: 'Dharavandhoo',
    atoll: 'Baa Atoll',
    location: 'Dharavandhoo, Baa Atoll',
    heroImage: '/images/guesthouse-maafushi.png',
    gallery: [
      '/images/guesthouse-maafushi.png',
      '/images/exp-manta.png',
      '/images/interest-snorkeling.png',
      '/images/split-localisland.png',
    ],
    tags: ['Manta Rays', 'Snorkeling', 'Authentic', 'Baa Atoll'],
    interests: ['snorkeling', 'adventure', 'family', 'relaxation'],
    experiences: ['manta-rays', 'snorkeling', 'local-culture'],
    facilities: ['Restaurants', 'Excursions', 'House Reef'],
    highlights: [
      'Minutes from Hanifaru Bay manta season',
      'Domestic airport on the island for easy access',
      'Reef snorkeling and island walks',
      'Genuine local-island hospitality',
    ],
    roomCategories: [
      {
        name: 'Standard Room',
        description: 'A comfortable room close to the harbour and manta boats.',
        size: '22 m²',
        maxOccupancy: '2 adults',
        priceFrom: 95,
        photos: [
          '/images/room-deluxe.png',
          '/images/guesthouse-maafushi.png',
          '/images/exp-manta.png',
        ],
      },
      {
        name: 'Sea View Room',
        description: 'An upper room with a balcony looking over the reef and channel.',
        size: '28 m²',
        maxOccupancy: '2 adults + 1 child',
        priceFrom: 130,
        photos: [
          '/images/room-oceanfront.png',
          '/images/interest-snorkeling.png',
          '/images/split-localisland.png',
        ],
      },
      {
        name: 'Family Room',
        description: 'A roomy option for families, minutes from Hanifaru Bay.',
        size: '36 m²',
        maxOccupancy: '2 adults + 2 children',
        priceFrom: 165,
        photos: [
          '/images/room-family.png',
          '/images/interest-family.png',
          '/images/exp-manta.png',
        ],
      },
    ],
    featured: false,
    published: true,
  },
]

export const resorts = properties.filter((p) => p.type === 'resort')
export const guestHouses = properties.filter((p) => p.type === 'guest-house')

export const propertyBySlug = (slug: string) =>
  properties.find((p) => p.slug === slug)

export const featuredProperties = properties.filter((p) => p.featured)

export const propertiesByInterest = (slug: string) =>
  properties.filter((p) => p.interests.includes(slug as never))

export const propertiesByExperience = (slug: string) =>
  properties.filter((p) => p.experiences.includes(slug))

// ---------------------------------------------------------------------------
// Moods (emotional discovery)
// ---------------------------------------------------------------------------
export const moods: Mood[] = [
  {
    title: 'Barefoot Luxury',
    description: 'Overwater villas and world-class service.',
    imageUrl: '/images/split-resort.png',
    href: '/resorts',
  },
  {
    title: 'Underwater Adventure',
    description: 'Reefs, channels and giants of the deep.',
    imageUrl: '/images/interest-diving.png',
    href: '/explore?interest=diving',
  },
  {
    title: 'Romantic Escape',
    description: 'Sunsets, sandbanks and time for two.',
    imageUrl: '/images/interest-romantic.png',
    href: '/explore?interest=romantic',
  },
  {
    title: 'Island Life',
    description: 'Local islands, culture and community.',
    imageUrl: '/images/split-localisland.png',
    href: '/guest-houses',
  },
  {
    title: 'Family Time',
    description: 'Shallow lagoons and endless play.',
    imageUrl: '/images/interest-family.png',
    href: '/explore?interest=family',
  },
  {
    title: 'Slow & Peaceful',
    description: 'Hammocks, spas and nowhere to be.',
    imageUrl: '/images/interest-relaxation.png',
    href: '/explore?interest=relaxation',
  },
]

// ---------------------------------------------------------------------------
// Atolls (for filters)
// ---------------------------------------------------------------------------
export const atolls = [
  'North Malé Atoll',
  'South Malé Atoll',
  'South Ari Atoll',
  'Ari Atoll',
  'Baa Atoll',
  'Vaavu Atoll',
]

export const facilities = [
  'Swimming Pool',
  'Spa',
  'Dive Centre',
  'Water Sports',
  'Restaurants',
  'Gym',
  'Kids Club',
  'House Reef',
  'Excursions',
]

// ---------------------------------------------------------------------------
// Inquiries (admin mock)
// ---------------------------------------------------------------------------
export const inquiries: Inquiry[] = [
  {
    id: 'inq-1',
    propertyName: 'Baros Island Retreat',
    name: 'Sofia Andersson',
    contact: 'sofia@example.com',
    travelDates: 'Aug 12 – Aug 20',
    guests: '2 adults',
    budget: '$6,000 – $9,000',
    status: 'new',
    createdAt: '2026-08-18',
  },
  {
    id: 'inq-2',
    propertyName: 'Dhigurah Beach Retreat',
    name: 'James & Priya Menon',
    contact: '+44 7700 900123',
    travelDates: 'Sep 3 – Sep 11',
    guests: '2 adults, 1 child',
    budget: '$2,500 – $4,000',
    status: 'contacted',
    createdAt: '2026-08-17',
  },
  {
    id: 'inq-3',
    propertyName: null,
    name: 'Kenji Watanabe',
    contact: 'kenji@example.com',
    travelDates: 'Not sure yet',
    guests: '2 adults',
    budget: 'Flexible',
    status: 'planning',
    createdAt: '2026-08-16',
  },
  {
    id: 'inq-4',
    propertyName: 'Soneva Secret Sands',
    name: 'Amelia Clarke',
    contact: 'amelia@example.com',
    travelDates: 'Dec 20 – Jan 2',
    guests: '2 adults',
    budget: '$12,000+',
    status: 'confirmed',
    createdAt: '2026-08-14',
  },
  {
    id: 'inq-5',
    propertyName: 'Maafushi Breeze',
    name: 'The Okafor Family',
    contact: '+234 800 000 0000',
    travelDates: 'Oct 10 – Oct 18',
    guests: '2 adults, 2 children',
    budget: '$3,000 – $5,000',
    status: 'new',
    createdAt: '2026-08-19',
  },
]
