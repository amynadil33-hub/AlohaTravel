-- =============================================================================
-- Aloha Travels — seed data
-- Run AFTER schema.sql. Mirrors lib/data.ts so the live database matches the
-- mock content the app currently renders. Safe to re-run (truncates first).
-- =============================================================================

truncate table
  public.experience_related_properties,
  public.property_experiences,
  public.property_interests,
  public.room_categories,
  public.inquiries,
  public.experiences,
  public.properties,
  public.interests
restart identity cascade;

-- Interests -------------------------------------------------------------------
insert into public.interests (slug, id, name, description, image_url, featured, sort_order) values
  ('diving',       'int-diving',       'Diving',            'World-class channels, thilas and house reefs teeming with life.', '/images/interest-diving.png',      true,  1),
  ('snorkeling',   'int-snorkeling',   'Snorkeling',        'Step off the beach into gardens of coral and turtles.',           '/images/interest-snorkeling.png',  true,  2),
  ('honeymoon',    'int-honeymoon',    'Honeymoon',         'Overwater villas, private dinners and time that slows down.',      '/images/interest-honeymoon.png',   true,  3),
  ('family',       'int-family',       'Family Holidays',   'Shallow lagoons, kids clubs and islands made for play.',           '/images/interest-family.png',      true,  4),
  ('water-sports', 'int-water-sports', 'Water Sports',      'Jet skis, catamarans, kite surfing and lagoon adventures.',        '/images/interest-watersports.png', false, 5),
  ('romantic',     'int-romantic',     'Romantic Getaways', 'Sandbank picnics and sunsets shared just the two of you.',         '/images/interest-romantic.png',    false, 6),
  ('adventure',    'int-adventure',    'Adventure',         'Surf breaks, big fish and islands off the beaten track.',          '/images/interest-adventure.png',   false, 7),
  ('relaxation',   'int-relaxation',   'Relaxation',        'Spas over the water, hammocks and nowhere to be.',                 '/images/interest-relaxation.png',  false, 8);

-- Experiences -----------------------------------------------------------------
insert into public.experiences (slug, id, name, description, image_url, featured, sort_order) values
  ('whale-sharks',     'exp-whale-shark',   'Whale Shark Encounters', 'Swim alongside the gentle giants of South Ari Atoll, where whale sharks roam year round.', '/images/exp-whaleshark.png',    true,  1),
  ('manta-rays',       'exp-manta',         'Manta Ray Adventures',   'Drift over cleaning stations as manta rays glide overhead in perfect formation.',          '/images/exp-manta.png',         true,  2),
  ('scuba-diving',     'exp-scuba',         'Scuba Diving',           'From gentle house reefs to adrenaline channel dives, guided by expert local divers.',      '/images/interest-diving.png',   true,  3),
  ('snorkeling',       'exp-snorkel',       'Reef Snorkeling',        'Explore living coral gardens straight from the beach with turtles and reef fish.',         '/images/interest-snorkeling.png', false, 4),
  ('sunset-cruises',   'exp-sunset-cruise', 'Sunset Cruises',         'Sail a traditional dhoni into the sunset, dolphins often riding the bow.',                 '/images/exp-sunset-cruise.png', true,  5),
  ('sandbank-escapes', 'exp-sandbank',      'Sandbank Escapes',       'A private picnic on a bare ribbon of sand surrounded by turquoise ocean.',                 '/images/exp-sandbank.png',      true,  6),
  ('surfing',          'exp-surfing',       'Surfing',                'World-class reef breaks off local islands, for first-timers to pros.',                     '/images/interest-adventure.png', false, 7),
  ('fishing',          'exp-fishing',       'Local Fishing',          'Head out with island fishermen for handline and big-game fishing at dusk.',                '/images/exp-fishing.png',       false, 8),
  ('dolphin-cruises',  'exp-dolphins',      'Dolphin Cruises',        'Spinner dolphins in their hundreds, playing in the golden evening light.',                 '/images/exp-sunset-cruise.png', false, 9),
  ('local-culture',    'exp-local-culture', 'Local Island Life',      'Wander sandy lanes, taste short eats and meet the communities behind the islands.',        '/images/split-localisland.png', false, 10);

-- Properties ------------------------------------------------------------------
insert into public.properties
  (id, slug, name, type, short_description, description, island, atoll, location, hero_image, gallery, tags, facilities, highlights, featured, published)
values
  ('prop-baros', 'baros-island-retreat', 'Baros Island Retreat', 'resort',
   'An intimate private island with an exceptional house reef, minutes from Malé.',
   'Baros Island Retreat is a jewel of North Malé Atoll — a lush, palm-fringed island small enough to feel entirely your own. A living house reef wraps the shoreline, overwater villas float above a glassy lagoon, and the pace is unmistakably barefoot. It is the Maldives distilled: refined, romantic and close enough for an easy speedboat transfer.',
   'Baros', 'North Malé Atoll', 'North Malé Atoll, Maldives', '/images/resort-baros.png',
   array['/images/resort-baros.png','/images/resort-milaidhoo.png','/images/interest-snorkeling.png','/images/interest-relaxation.png'],
   array['Honeymoon','Diving','House Reef','Luxury'],
   array['Swimming Pool','Spa','Dive Centre','Restaurants','House Reef','Excursions'],
   array['Exceptional house reef straight off the villa deck','Intimate, adults-friendly island atmosphere','Easy 25-minute speedboat transfer from Malé','Outstanding diving on nearby channels'],
   true, true),

  ('prop-velaa-lagoon', 'velaa-lagoon-resort', 'Velaa Lagoon Resort', 'resort',
   'Sweeping overwater villas and a private lagoon built for slow days on the water.',
   'Velaa Lagoon Resort sits on a broad, calm lagoon in South Malé Atoll — a place made for water sports by day and glassy stillness at dusk. Generous overwater villas open onto private decks, while the resort’s dive and watersports centre puts the whole reef within reach. Sunset dhoni cruises leave straight from the jetty.',
   'Velaa', 'South Malé Atoll', 'South Malé Atoll, Maldives', '/images/resort-velaa.png',
   array['/images/resort-velaa.png','/images/interest-watersports.png','/images/exp-sunset-cruise.png','/images/resort-soneva.png'],
   array['Water Sports','Family','Overwater','Lagoon'],
   array['Swimming Pool','Water Sports','Dive Centre','Kids Club','Restaurants','Gym'],
   array['Broad protected lagoon ideal for water sports','Family-friendly with a dedicated kids club','Sunset and dolphin cruises from the resort jetty','Spacious overwater villas with lagoon decks'],
   true, true),

  ('prop-soneva-secret', 'soneva-secret-sands', 'Soneva Secret Sands', 'resort',
   'A remote Baa Atoll hideaway on a UNESCO Biosphere, wrapped in reef and sandbank.',
   'Deep in Baa Atoll — a UNESCO Biosphere Reserve — Soneva Secret Sands is barefoot luxury at its most private. Vast villas sit on a pristine reef edge, sandbanks appear and vanish with the tide, and manta rays gather in the plankton-rich channels each season. This is the Maldives for travellers who want space, silence and true seclusion.',
   'Secret Sands', 'Baa Atoll', 'Baa Atoll, Maldives', '/images/resort-soneva.png',
   array['/images/resort-soneva.png','/images/exp-manta.png','/images/exp-sandbank.png','/images/resort-milaidhoo.png'],
   array['Luxury','Manta Rays','Sandbank','Seclusion'],
   array['Swimming Pool','Spa','Dive Centre','Restaurants','House Reef','Excursions'],
   array['UNESCO Biosphere Reserve setting in Baa Atoll','Seasonal manta ray aggregations nearby','Vast, deeply private reef-edge villas','Private sandbank picnics on request'],
   true, true),

  ('prop-milaidhoo', 'milaidhoo-reef-house', 'Milaidhoo Reef House', 'resort',
   'Boutique overwater villas above one of the atoll’s finest reefs.',
   'Milaidhoo Reef House is a small, design-led resort built around a single spectacular reef. Every villa faces the water, the dive centre is steps from the drop-off, and the kitchen leans into Maldivian flavours. Intimate and unhurried, it is a favourite for couples who want the ocean at the centre of everything.',
   'Milaidhoo', 'Baa Atoll', 'Baa Atoll, Maldives', '/images/resort-milaidhoo.png',
   array['/images/resort-milaidhoo.png','/images/interest-diving.png','/images/interest-honeymoon.png','/images/exp-manta.png'],
   array['Honeymoon','Diving','Boutique','Reef'],
   array['Spa','Dive Centre','Restaurants','House Reef','Excursions'],
   array['One of the finest house reefs in Baa Atoll','Design-led overwater villas, all ocean-facing','Maldivian-inspired dining','Steps-from-your-deck diving and snorkeling'],
   false, true),

  ('prop-vaavu-blue', 'vaavu-blue-resort', 'Vaavu Blue Resort', 'resort',
   'A diver’s island on the edge of Vaavu’s legendary channels and night reefs.',
   'Vaavu Blue Resort is built for the water. Perched on the rim of Vaavu Atoll’s famous channels, it offers some of the most thrilling diving in the country — including nurse sharks gathering after dark. Above the surface, it stays laid-back and unpretentious, with easy beach villas and long days on the boat.',
   'Vaavu Blue', 'Vaavu Atoll', 'Vaavu Atoll, Maldives', '/images/resort-soneva.png',
   array['/images/resort-soneva.png','/images/interest-diving.png','/images/exp-whaleshark.png','/images/interest-adventure.png'],
   array['Diving','Adventure','Channels','Reef'],
   array['Dive Centre','Restaurants','House Reef','Excursions','Gym'],
   array['Front-row access to Vaavu’s channel dives','Famous after-dark nurse shark dives','Relaxed, diver-focused island','Excellent snorkeling on the house reef'],
   false, true),

  ('prop-ari-serenity', 'ari-serenity-island', 'Ari Serenity Island', 'resort',
   'Wellness-led villas and quiet lagoons in the heart of Ari Atoll.',
   'Ari Serenity Island is a calm, wellness-focused escape built around slow mornings and unhurried water. Overwater spa treatments, yoga at sunrise and a gentle lagoon set the tone, while South Ari’s whale sharks are only a short cruise away. It suits travellers who want restoration first, adventure on their own terms.',
   'Serenity', 'Ari Atoll', 'Ari Atoll, Maldives', '/images/interest-relaxation.png',
   array['/images/interest-relaxation.png','/images/resort-milaidhoo.png','/images/exp-whaleshark.png','/images/interest-snorkeling.png'],
   array['Relaxation','Spa','Wellness','Whale Sharks'],
   array['Swimming Pool','Spa','Restaurants','House Reef','Gym'],
   array['Overwater spa and sunrise yoga','Calm, protected swimming lagoon','Short cruise to South Ari whale sharks','Wellness-led dining and programming'],
   false, true),

  ('prop-dhigurah-retreat', 'dhigurah-beach-retreat', 'Dhigurah Beach Retreat', 'guest-house',
   'A friendly beachfront guest house on the island of whale sharks.',
   'Dhigurah is a long, narrow island in South Ari Atoll famous for year-round whale sharks and a bikini beach that stretches for kilometres. Dhigurah Beach Retreat puts you steps from the sand and a short boat ride from the giants offshore. Warm hosts, home-cooked Maldivian food and daily excursions make it an easy, authentic base.',
   'Dhigurah', 'South Ari Atoll', 'Dhigurah, South Ari Atoll', '/images/guesthouse-dhigurah.png',
   array['/images/guesthouse-dhigurah.png','/images/exp-whaleshark.png','/images/story-dhigurah.png','/images/interest-snorkeling.png'],
   array['Whale Sharks','Beach','Snorkeling','Authentic'],
   array['Restaurants','Excursions','House Reef','Dive Centre'],
   array['Year-round whale shark excursions','Kilometre-long bikini beach','Home-cooked Maldivian meals','Daily snorkeling and sandbank trips'],
   true, true),

  ('prop-maafushi-breeze', 'maafushi-breeze', 'Maafushi Breeze', 'guest-house',
   'A lively local-island stay with excursions on tap and easy Malé access.',
   'Maafushi is the Maldives’ best-known local island — buzzing, friendly and packed with things to do. Maafushi Breeze sits close to the bikini beach with an easy public-ferry or speedboat hop from Malé. It is the perfect value base for snorkeling safaris, sandbank trips, fishing and sunset cruises, without ever feeling cheap.',
   'Maafushi', 'South Malé Atoll', 'Maafushi, South Malé Atoll', '/images/guesthouse-maafushi.png',
   array['/images/guesthouse-maafushi.png','/images/exp-sunset-cruise.png','/images/exp-fishing.png','/images/exp-sandbank.png'],
   array['Value','Excursions','Fishing','Family'],
   array['Restaurants','Excursions','Water Sports'],
   array['Easy access from Malé by ferry or speedboat','Huge choice of daily excursions','Close to the bikini beach','Great value for families and groups'],
   true, true),

  ('prop-ukulhas-beach', 'ukulhas-beach-house', 'Ukulhas Beach House', 'guest-house',
   'An eco-minded island stay with one of the finest local beaches in Ari Atoll.',
   'Ukulhas is celebrated for its community-led conservation and a bikini beach of impossibly white sand. Ukulhas Beach House leans into that spirit — relaxed, low-key and steps from the water, with a house reef you can snorkel straight off the beach. It’s local-island living at its most beautiful and unhurried.',
   'Ukulhas', 'Ari Atoll', 'Ukulhas, Ari Atoll', '/images/guesthouse-ukulhas.png',
   array['/images/guesthouse-ukulhas.png','/images/interest-snorkeling.png','/images/interest-relaxation.png','/images/split-localisland.png'],
   array['Beach','Eco','Snorkeling','Quiet'],
   array['Restaurants','Excursions','House Reef'],
   array['One of the whitest bikini beaches in the Maldives','Snorkel straight off the beach','Community-led eco initiatives','Peaceful, uncrowded island pace'],
   false, true),

  ('prop-thulusdhoo-surf', 'thulusdhoo-surf-lodge', 'Thulusdhoo Surf Lodge', 'guest-house',
   'A relaxed surf base beside two of the country’s most famous breaks.',
   'Thulusdhoo is a surf legend, home to the breaks known as Cokes and Chickens. Thulusdhoo Surf Lodge is a friendly base built around dawn patrols and long afternoons in the water. When the surf is flat there is snorkeling, fishing and island life — and Malé is just a short hop away.',
   'Thulusdhoo', 'North Malé Atoll', 'Thulusdhoo, North Malé Atoll', '/images/guesthouse-thulusdhoo.png',
   array['/images/guesthouse-thulusdhoo.png','/images/interest-adventure.png','/images/interest-watersports.png','/images/split-localisland.png'],
   array['Surfing','Adventure','Water Sports','Local'],
   array['Restaurants','Excursions','Water Sports'],
   array['Steps from the Cokes and Chickens breaks','Board hire and guided surf sessions','Quick transfer from Malé','Snorkeling and fishing on flat days'],
   false, true),

  ('prop-fulhadhoo-stay', 'fulhadhoo-island-stay', 'Fulhadhoo Island Stay', 'guest-house',
   'A tiny, tranquil island escape for travellers who want to disappear.',
   'Fulhadhoo in Baa Atoll is the definition of off-the-map — a single sandy lane, a handful of guest houses and a beach that regularly tops lists of the world’s best. Fulhadhoo Island Stay is quiet by design, ideal for slow days, snorkeling the nearby reefs and reconnecting far from the crowds.',
   'Fulhadhoo', 'Baa Atoll', 'Fulhadhoo, Baa Atoll', '/images/guesthouse-ukulhas.png',
   array['/images/guesthouse-ukulhas.png','/images/interest-relaxation.png','/images/exp-fishing.png','/images/interest-snorkeling.png'],
   array['Quiet','Beach','Romantic','Off-grid'],
   array['Restaurants','Excursions','House Reef'],
   array['One of the most beautiful, least-visited beaches','Deeply quiet, off-the-map island','Snorkeling on untouched nearby reefs','Perfect for a barefoot honeymoon on a budget'],
   false, true),

  ('prop-hanifaru-lodge', 'hanifaru-local-lodge', 'Hanifaru Local Lodge', 'guest-house',
   'A Baa Atoll base for the seasonal manta and whale shark spectacle.',
   'Near the world-famous Hanifaru Bay, this local lodge is your seat for one of the ocean’s greatest gatherings — hundreds of manta rays feeding in the plankton bloom each season. Beyond the bay, days are filled with reef snorkeling, island walks and warm Maldivian hospitality on a genuine local island.',
   'Dharavandhoo', 'Baa Atoll', 'Dharavandhoo, Baa Atoll', '/images/guesthouse-maafushi.png',
   array['/images/guesthouse-maafushi.png','/images/exp-manta.png','/images/interest-snorkeling.png','/images/split-localisland.png'],
   array['Manta Rays','Snorkeling','Authentic','Baa Atoll'],
   array['Restaurants','Excursions','House Reef'],
   array['Minutes from Hanifaru Bay manta season','Domestic airport on the island for easy access','Reef snorkeling and island walks','Genuine local-island hospitality'],
   false, true);

-- Room categories (3 per property) --------------------------------------------
insert into public.room_categories
  (property_id, name, description, size, max_occupancy, price_from, photos, sort_order)
values
  -- Baros
  ('prop-baros', 'Beach Villa', 'Direct beach access with a shaded deck under the palms and an outdoor rain shower.', '92 m²', '2 adults + 1 child', 620, array['/images/room-beach-villa.png','/images/resort-velaa.png','/images/interest-relaxation.png'], 1),
  ('prop-baros', 'Water Villa', 'Steps into the lagoon from a private overwater deck with a glass floor panel.', '110 m²', '2 adults', 780, array['/images/room-water-villa.png','/images/resort-milaidhoo.png','/images/interest-snorkeling.png'], 2),
  ('prop-baros', 'Pool Villa', 'A private infinity pool facing the sunset horizon with a spacious lounging deck.', '145 m²', '2 adults', 980, array['/images/room-pool-villa.png','/images/resort-baros.png','/images/interest-honeymoon.png'], 3),
  -- Velaa
  ('prop-velaa-lagoon', 'Lagoon Villa', 'Overwater living with uninterrupted lagoon views and a swim-up deck ladder.', '105 m²', '2 adults', 540, array['/images/room-water-villa.png','/images/resort-velaa.png','/images/interest-watersports.png'], 1),
  ('prop-velaa-lagoon', 'Family Villa', 'Two bedrooms opening onto a private stretch of beach, ideal for families.', '160 m²', '2 adults + 2 children', 720, array['/images/room-family.png','/images/interest-family.png','/images/room-beach-villa.png'], 2),
  ('prop-velaa-lagoon', 'Sunset Pool Villa', 'A west-facing villa with a private pool set up for long golden-hour evenings.', '150 m²', '2 adults', 890, array['/images/room-pool-villa.png','/images/exp-sunset-cruise.png','/images/resort-soneva.png'], 3),
  -- Soneva
  ('prop-soneva-secret', 'Reef Villa', 'A private pool suspended over the house reef with direct water access.', '180 m²', '2 adults', 1450, array['/images/room-water-villa.png','/images/resort-soneva.png','/images/exp-manta.png'], 1),
  ('prop-soneva-secret', 'Ocean Pool Villa', 'Panoramic ocean views with a full-length infinity pool and sun deck.', '220 m²', '2 adults + 1 child', 1780, array['/images/room-pool-villa.png','/images/resort-baros.png','/images/interest-honeymoon.png'], 2),
  ('prop-soneva-secret', 'Two-Bedroom Reserve', 'A vast beachfront reserve with two bedrooms, a private chef and sandbank access.', '380 m²', '4 adults', 2900, array['/images/room-suite.png','/images/exp-sandbank.png','/images/resort-milaidhoo.png'], 3),
  -- Milaidhoo
  ('prop-milaidhoo', 'Water Pool Villa', 'Overwater villa with a private pool and a reef drop-off from your deck.', '135 m²', '2 adults', 860, array['/images/room-water-villa.png','/images/resort-milaidhoo.png','/images/interest-diving.png'], 1),
  ('prop-milaidhoo', 'Beach Pool Villa', 'Beachfront seclusion with a shaded garden and a private plunge pool.', '150 m²', '2 adults + 1 child', 940, array['/images/room-pool-villa.png','/images/resort-velaa.png','/images/room-garden.png'], 2),
  ('prop-milaidhoo', 'Ocean Residence', 'A design-led two-storey residence with a rooftop deck and reef views.', '210 m²', '3 adults', 1350, array['/images/room-suite.png','/images/interest-honeymoon.png','/images/exp-manta.png'], 3),
  -- Vaavu
  ('prop-vaavu-blue', 'Beach Villa', 'Simple, spacious beachfront living close to the dive jetty.', '78 m²', '2 adults', 380, array['/images/room-beach-villa.png','/images/resort-velaa.png','/images/interest-diving.png'], 1),
  ('prop-vaavu-blue', 'Reef View Villa', 'Elevated villa looking straight onto the channel and house reef.', '92 m²', '2 adults + 1 child', 460, array['/images/room-oceanfront.png','/images/resort-soneva.png','/images/interest-snorkeling.png'], 2),
  ('prop-vaavu-blue', 'Divers’ Loft', 'A practical two-level room with gear storage, built for early boat calls.', '105 m²', '3 adults', 520, array['/images/room-deluxe.png','/images/interest-adventure.png','/images/exp-whaleshark.png'], 3),
  -- Ari Serenity
  ('prop-ari-serenity', 'Spa Water Villa', 'Overwater villa with an in-villa treatment space and a meditation deck.', '120 m²', '2 adults', 690, array['/images/room-water-villa.png','/images/interest-relaxation.png','/images/interest-snorkeling.png'], 1),
  ('prop-ari-serenity', 'Garden Pool Villa', 'A private walled garden and plunge pool a short stroll from the beach.', '135 m²', '2 adults + 1 child', 760, array['/images/room-garden.png','/images/room-pool-villa.png','/images/resort-baros.png'], 2),
  ('prop-ari-serenity', 'Wellness Suite', 'A serene suite with a daybed lounge, yoga corner and ocean-facing bath.', '165 m²', '2 adults', 980, array['/images/room-suite.png','/images/interest-relaxation.png','/images/exp-whaleshark.png'], 3),
  -- Dhigurah
  ('prop-dhigurah-retreat', 'Beachfront Room', 'Bright room with a sea breeze and private balcony, steps from the sand.', '28 m²', '2 adults', 120, array['/images/room-oceanfront.png','/images/guesthouse-dhigurah.png','/images/interest-snorkeling.png'], 1),
  ('prop-dhigurah-retreat', 'Garden Room', 'A quiet, shaded room set back among the palms.', '24 m²', '2 adults', 95, array['/images/room-deluxe.png','/images/guesthouse-ukulhas.png','/images/room-garden.png'], 2),
  ('prop-dhigurah-retreat', 'Family Suite', 'A larger room sleeping up to four, perfect for families chasing whale sharks.', '40 m²', '2 adults + 2 children', 165, array['/images/room-family.png','/images/exp-whaleshark.png','/images/story-dhigurah.png'], 3),
  -- Maafushi
  ('prop-maafushi-breeze', 'Standard Double', 'A comfortable, air-conditioned room a short walk from the beach.', '22 m²', '2 adults', 75, array['/images/room-deluxe.png','/images/guesthouse-maafushi.png','/images/exp-fishing.png'], 1),
  ('prop-maafushi-breeze', 'Family Room', 'Extra space for families with connecting-room options.', '34 m²', '2 adults + 2 children', 110, array['/images/room-family.png','/images/interest-family.png','/images/exp-sandbank.png'], 2),
  ('prop-maafushi-breeze', 'Rooftop Sea View', 'A breezy upper room with a private terrace over the harbour.', '30 m²', '2 adults', 130, array['/images/room-oceanfront.png','/images/exp-sunset-cruise.png','/images/split-localisland.png'], 3),
  -- Ukulhas
  ('prop-ukulhas-beach', 'Sea View Room', 'Wake to the lagoon from a breezy upper room with a balcony.', '26 m²', '2 adults', 105, array['/images/room-oceanfront.png','/images/guesthouse-ukulhas.png','/images/interest-snorkeling.png'], 1),
  ('prop-ukulhas-beach', 'Garden Double', 'A calm, shaded room tucked into the greenery near the beach path.', '22 m²', '2 adults', 85, array['/images/room-deluxe.png','/images/room-garden.png','/images/interest-relaxation.png'], 2),
  ('prop-ukulhas-beach', 'Beach Suite', 'The largest room, with a lounge nook and steps to the white-sand beach.', '38 m²', '2 adults + 1 child', 150, array['/images/room-beach-villa.png','/images/split-localisland.png','/images/interest-romantic.png'], 3),
  -- Thulusdhoo
  ('prop-thulusdhoo-surf', 'Surf Room', 'A simple, breezy room with board storage and quick beach access.', '20 m²', '2 adults', 80, array['/images/room-deluxe.png','/images/guesthouse-thulusdhoo.png','/images/interest-adventure.png'], 1),
  ('prop-thulusdhoo-surf', 'Ocean View Room', 'Watch the sets roll in from a private balcony above the break.', '26 m²', '2 adults', 115, array['/images/room-oceanfront.png','/images/interest-watersports.png','/images/split-localisland.png'], 2),
  ('prop-thulusdhoo-surf', 'Crew Loft', 'A four-bed loft for surf crews, with a shared deck and gear racks.', '42 m²', '4 adults', 160, array['/images/room-family.png','/images/interest-adventure.png','/images/guesthouse-thulusdhoo.png'], 3),
  -- Fulhadhoo
  ('prop-fulhadhoo-stay', 'Beach Room', 'A peaceful room steps from an empty stretch of white sand.', '24 m²', '2 adults', 90, array['/images/room-oceanfront.png','/images/guesthouse-ukulhas.png','/images/interest-relaxation.png'], 1),
  ('prop-fulhadhoo-stay', 'Honeymoon Room', 'A romantic room with a private terrace and outdoor shower.', '30 m²', '2 adults', 130, array['/images/room-beach-villa.png','/images/interest-romantic.png','/images/interest-honeymoon.png'], 2),
  ('prop-fulhadhoo-stay', 'Garden Double', 'A quiet, shaded room among the palms a minute from the lagoon.', '22 m²', '2 adults', 78, array['/images/room-garden.png','/images/room-deluxe.png','/images/interest-snorkeling.png'], 3),
  -- Hanifaru
  ('prop-hanifaru-lodge', 'Standard Room', 'A comfortable room close to the harbour and manta boats.', '22 m²', '2 adults', 95, array['/images/room-deluxe.png','/images/guesthouse-maafushi.png','/images/exp-manta.png'], 1),
  ('prop-hanifaru-lodge', 'Sea View Room', 'An upper room with a balcony looking over the reef and channel.', '28 m²', '2 adults + 1 child', 130, array['/images/room-oceanfront.png','/images/interest-snorkeling.png','/images/split-localisland.png'], 2),
  ('prop-hanifaru-lodge', 'Family Room', 'A roomy option for families, minutes from Hanifaru Bay.', '36 m²', '2 adults + 2 children', 165, array['/images/room-family.png','/images/interest-family.png','/images/exp-manta.png'], 3);

-- Property <-> interest --------------------------------------------------------
insert into public.property_interests (property_id, interest_slug) values
  ('prop-baros','honeymoon'),('prop-baros','diving'),('prop-baros','snorkeling'),('prop-baros','romantic'),
  ('prop-velaa-lagoon','water-sports'),('prop-velaa-lagoon','family'),('prop-velaa-lagoon','relaxation'),('prop-velaa-lagoon','snorkeling'),
  ('prop-soneva-secret','honeymoon'),('prop-soneva-secret','romantic'),('prop-soneva-secret','relaxation'),('prop-soneva-secret','diving'),
  ('prop-milaidhoo','honeymoon'),('prop-milaidhoo','diving'),('prop-milaidhoo','romantic'),('prop-milaidhoo','snorkeling'),
  ('prop-vaavu-blue','diving'),('prop-vaavu-blue','adventure'),('prop-vaavu-blue','snorkeling'),('prop-vaavu-blue','water-sports'),
  ('prop-ari-serenity','relaxation'),('prop-ari-serenity','honeymoon'),('prop-ari-serenity','snorkeling'),('prop-ari-serenity','romantic'),
  ('prop-dhigurah-retreat','snorkeling'),('prop-dhigurah-retreat','adventure'),('prop-dhigurah-retreat','diving'),('prop-dhigurah-retreat','relaxation'),
  ('prop-maafushi-breeze','family'),('prop-maafushi-breeze','water-sports'),('prop-maafushi-breeze','snorkeling'),('prop-maafushi-breeze','adventure'),
  ('prop-ukulhas-beach','relaxation'),('prop-ukulhas-beach','snorkeling'),('prop-ukulhas-beach','romantic'),('prop-ukulhas-beach','family'),
  ('prop-thulusdhoo-surf','adventure'),('prop-thulusdhoo-surf','water-sports'),('prop-thulusdhoo-surf','snorkeling'),
  ('prop-fulhadhoo-stay','relaxation'),('prop-fulhadhoo-stay','romantic'),('prop-fulhadhoo-stay','snorkeling'),
  ('prop-hanifaru-lodge','snorkeling'),('prop-hanifaru-lodge','adventure'),('prop-hanifaru-lodge','family'),('prop-hanifaru-lodge','relaxation');

-- Property <-> experiences offered on the island ------------------------------
insert into public.property_experiences (property_id, experience_slug) values
  ('prop-baros','scuba-diving'),('prop-baros','snorkeling'),
  ('prop-velaa-lagoon','sunset-cruises'),('prop-velaa-lagoon','dolphin-cruises'),
  ('prop-soneva-secret','manta-rays'),('prop-soneva-secret','sandbank-escapes'),
  ('prop-milaidhoo','scuba-diving'),('prop-milaidhoo','manta-rays'),('prop-milaidhoo','whale-sharks'),
  ('prop-vaavu-blue','scuba-diving'),('prop-vaavu-blue','snorkeling'),
  ('prop-ari-serenity','whale-sharks'),('prop-ari-serenity','snorkeling'),('prop-ari-serenity','sandbank-escapes'),
  ('prop-dhigurah-retreat','whale-sharks'),('prop-dhigurah-retreat','sandbank-escapes'),('prop-dhigurah-retreat','snorkeling'),
  ('prop-maafushi-breeze','sunset-cruises'),('prop-maafushi-breeze','fishing'),('prop-maafushi-breeze','sandbank-escapes'),('prop-maafushi-breeze','local-culture'),
  ('prop-ukulhas-beach','snorkeling'),('prop-ukulhas-beach','local-culture'),('prop-ukulhas-beach','sandbank-escapes'),
  ('prop-thulusdhoo-surf','surfing'),('prop-thulusdhoo-surf','snorkeling'),('prop-thulusdhoo-surf','local-culture'),
  ('prop-fulhadhoo-stay','snorkeling'),('prop-fulhadhoo-stay','fishing'),('prop-fulhadhoo-stay','sandbank-escapes'),
  ('prop-hanifaru-lodge','manta-rays'),('prop-hanifaru-lodge','snorkeling'),('prop-hanifaru-lodge','local-culture');

-- Experience -> related properties (experiences page) -------------------------
insert into public.experience_related_properties (experience_slug, property_id) values
  ('whale-sharks','prop-dhigurah-retreat'),('whale-sharks','prop-milaidhoo'),
  ('manta-rays','prop-milaidhoo'),('manta-rays','prop-soneva-secret'),
  ('scuba-diving','prop-baros'),('scuba-diving','prop-fulhadhoo-stay'),
  ('snorkeling','prop-ukulhas-beach'),('snorkeling','prop-baros'),
  ('sunset-cruises','prop-velaa-lagoon'),('sunset-cruises','prop-maafushi-breeze'),
  ('sandbank-escapes','prop-soneva-secret'),('sandbank-escapes','prop-dhigurah-retreat'),
  ('surfing','prop-thulusdhoo-surf'),
  ('fishing','prop-maafushi-breeze'),('fishing','prop-fulhadhoo-stay'),
  ('dolphin-cruises','prop-velaa-lagoon'),
  ('local-culture','prop-ukulhas-beach'),('local-culture','prop-maafushi-breeze');

-- Sample inquiries ------------------------------------------------------------
insert into public.inquiries (property_name, name, contact, travel_dates, guests, budget, message, status) values
  ('Baros Island Retreat', 'Amelia Hart', 'amelia@example.com', 'Mar 12 – 19, 2026', '2 adults', '$5k–8k', 'Honeymoon — would love an overwater villa with a house reef.', 'new'),
  ('Soneva Secret Sands', 'Daniel Okafor', 'daniel@example.com', 'Aug 2026', '2 adults', '$10k+', 'Interested in manta season and a private sandbank picnic.', 'contacted'),
  ('Maafushi Breeze', 'The Nguyen Family', 'nguyen@example.com', 'Jul 4 – 11, 2026', '2 adults + 2 children', '$2k–3k', 'Family trip, need excursions and easy transfers from Malé.', 'planning'),
  (null, 'Sofia Rossi', 'sofia@example.com', 'Flexible', '2 adults', 'Not sure yet', 'General enquiry — first time to the Maldives, help us choose an island.', 'new'),
  ('Milaidhoo Reef House', 'James Fletcher', 'james@example.com', 'Feb 2026', '2 adults', '$6k–9k', 'Keen divers, want steps-from-the-deck reef access.', 'confirmed');
