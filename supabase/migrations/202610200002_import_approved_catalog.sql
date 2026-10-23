-- Aloha Travels approved public catalogue import.
--
-- Insert-only by design: existing records and later admin edits are never
-- updated. Images are added only for properties inserted by this run.
-- Review docs/supabase-approved-catalog-import.md before application.

begin;

-- The Property contract may intentionally use one path as both heroImage and
-- a gallery item. Preserve that distinction while still preventing duplicate
-- paths within the same image role.
alter table public.property_images
  drop constraint if exists property_images_property_id_image_url_key;

create unique index if not exists property_images_unique_role_path_idx
  on public.property_images (property_id, kind, image_url);

create temporary table aloha_imported_property_ids (
  id text primary key
) on commit drop;

with source_properties (
  id, slug, name, type, short_description, description, island, atoll, location,
  tags, interests, experiences, facilities, highlights, room_categories,
  featured, published, sort_order
) as (
  values
    ('prop-constance-halaveli-resort', 'constance-halaveli-resort', 'Constance Halaveli Resort', 'resort', 'A Maldives resort on Halaveli in Alifu Alifu Atoll.', 'Constance Halaveli Resort is located on Halaveli in Alifu Alifu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Halaveli', 'Alifu Alifu', 'Halaveli, Alifu Alifu', array['Resort']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, false, true, 0),
    ('prop-conrad-maldives-rangali-island', 'conrad-maldives-rangali-island', 'Conrad Maldives Rangali Island', 'resort', 'A Maldives resort on Rangalifinolhu in Alifu Dhaalu Atoll.', 'Conrad Maldives Rangali Island is located on Rangalifinolhu in Alifu Dhaalu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Rangalifinolhu', 'Alifu Dhaalu', 'Rangalifinolhu, Alifu Dhaalu', array['Resort']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, false, true, 1),
    ('prop-anantara-kihavah-villas', 'anantara-kihavah-villas', 'Anantara Kihavah Villas', 'resort', 'A Maldives resort on Kihavah Huravalhi in Baa Atoll.', 'Anantara Kihavah Villas is located on Kihavah Huravalhi in Baa Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Kihavah Huravalhi', 'Baa', 'Kihavah Huravalhi, Baa', array['Resort']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, false, true, 2),
    ('prop-the-st-regis-vommuli-resort-maldives', 'the-st-regis-vommuli-resort-maldives', 'The St. Regis Vommuli Resort, Maldives', 'resort', 'A Maldives resort on Vommuli in Dhaalu Atoll.', 'The St. Regis Vommuli Resort, Maldives is located on Vommuli in Dhaalu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Vommuli', 'Dhaalu', 'Vommuli, Dhaalu', array['Resort']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, false, true, 3),
    ('prop-pullman-maldives-maamutaa-resort', 'pullman-maldives-maamutaa-resort', 'Pullman Maldives Maamutaa Resort', 'resort', 'A Maldives resort on Maamutaa in Gaafu Alifu Atoll.', 'Pullman Maldives Maamutaa Resort is located on Maamutaa in Gaafu Alifu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Maamutaa', 'Gaafu Alifu', 'Maamutaa, Gaafu Alifu', array['Resort']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, false, true, 4),
    ('prop-baros-maldives', 'baros-maldives', 'Baros Maldives', 'resort', 'A Maldives resort on Baros in Kaafu Atoll.', 'Baros Maldives is located on Baros in Kaafu Atoll. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Baros', 'Kaafu', 'Baros, Kaafu', array['Resort']::text[], '{}'::text[], '{}'::text[], '{}'::text[], '{}'::text[], '[]'::jsonb, false, true, 5),
    ('prop-the-westin-maldives-miriandhoo-resort', 'the-westin-maldives-miriandhoo-resort', 'The Westin Maldives Miriandhoo Resort', 'resort', 'A beachfront island resort with suites and villas in Baa Atoll.', 'The Westin Maldives Miriandhoo Resort is located on Miriandhoo Island in Baa Atoll, within the UNESCO Biosphere Reserve. The beachfront resort offers suites and villas, restaurants, an outdoor pool, a beach, a spa, a fitness centre, a kids club, snorkelling and scuba diving. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Miriandhoo Island', 'Baa', 'Miriandhoo Island, Baa Atoll', array['Resort', 'Baa Atoll', 'Suites & Villas']::text[], '{}'::text[], '{}'::text[], array['Restaurants', 'Outdoor pool', 'Beach', 'Spa', 'Fitness centre', 'Kids club', 'Snorkelling', 'Scuba diving']::text[], array['Beachfront suites and villas']::text[], '[]'::jsonb, false, true, 6),
    ('prop-dhigufaru-island-resort', 'dhigufaru-island-resort', 'Dhigufaru Island Resort', 'resort', 'An island resort surrounded by the natural beauty of Baa Atoll.', 'Dhigufaru Island Resort is located on Dhigufaru Island in the UNESCO Biosphere Reserve of Baa Atoll. Accommodation includes beach, pool beach, semi-water, water and pool water villas, a two-bedroom family beach villa and the Sangu Suite. The resort offers dining venues, diving and water sports, excursions, recreation facilities, a kids club and Funa Spa. Contact Aloha Travels to plan a personalised Maldives holiday.', 'Dhigufaru Island', 'Baa', 'Dhigufaru Island, Baa Atoll', array['Resort', 'Baa Atoll', 'Beach & Water Villas']::text[], '{}'::text[], '{}'::text[], array['Restaurants and bars', 'Funa Spa', 'Diving and water sports', 'Excursions', 'Kids club', 'Recreation centre', 'Multi-purpose court']::text[], array['Beach, pool beach, semi-water, water and pool water villas', 'Two-bedroom family beach villa and Sangu Suite']::text[], '[]'::jsonb, false, true, 7),
    ('prop-lagoon-villa-thoddoo', 'lagoon-villa-thoddoo', 'Lagoon Villa Thoddoo', 'guest-house', 'A guest-house stay with a garden on the local island of Thoddoo.', 'Lagoon Villa Thoddoo is located on Thoddoo in Alif Alif Atoll. The property has a garden, Wi-Fi, a restaurant and room service. Its air-conditioned rooms include private bathrooms. Contact Aloha Travels to plan a personalised stay.', 'Thoddoo', 'Alif Alif Atoll', 'Thoddoo, Alif Alif Atoll', array['Guest House', 'Garden', 'Restaurant']::text[], '{}'::text[], '{}'::text[], array['Garden', 'Wi-Fi', 'Restaurant', 'Room service', 'Air-conditioned rooms', 'Private bathrooms']::text[], '{}'::text[], '[]'::jsonb, false, true, 8),
    ('prop-belena-maldives', 'belena-maldives', 'Belena Maldives', 'guest-house', 'A local-island stay with a swimming pool on Thoddoo.', 'Belena Maldives is located on Thoddoo in Alif Alif Atoll. The property has a swimming pool and offers a 14 m² Standard Room and a 19 m² Suite Room. Contact Aloha Travels to plan a personalised stay.', 'Thoddoo', 'Alif Alif Atoll', 'Thoddoo, Alif Alif Atoll', array['Guest House', 'Swimming Pool']::text[], '{}'::text[], '{}'::text[], array['Swimming pool']::text[], array['Standard Room · 14 m²', 'Suite Room · 19 m²']::text[], '[]'::jsonb, false, true, 9),
    ('prop-season-paradise', 'season-paradise', 'Season Paradise', 'guest-house', 'A hotel stay with a rooftop infinity pool on Thulusdhoo.', 'Season Paradise is located on Thulusdhoo in Kaafu Atoll. The property has a rooftop infinity pool, dining, Wi-Fi, a spa and a gym. Contact Aloha Travels to plan a personalised stay.', 'Thulusdhoo', 'Kaafu Atoll', 'Thulusdhoo, Kaafu Atoll', array['Hotel', 'Rooftop Pool', 'Spa']::text[], '{}'::text[], '{}'::text[], array['Rooftop infinity pool', 'Dining', 'Wi-Fi', 'Spa', 'Gym']::text[], '{}'::text[], '[]'::jsonb, false, true, 10),
    ('prop-h78', 'h78', 'h78', 'guest-house', 'A beachfront hotel in Hulhumalé with ocean-view dining.', 'h78 is a beachfront hotel in Hulhumalé. It offers rooms and suites, including sea-view accommodation, with dining available on an ocean-view open terrace or indoors. Contact Aloha Travels to plan a personalised stay.', 'Hulhumalé', 'Kaafu Atoll', 'Hulhumalé, Kaafu Atoll', array['Hotel', 'Beachfront', 'Ocean-view dining']::text[], '{}'::text[], '{}'::text[], array['Ocean-view open terrace', 'Indoor dining']::text[], array['Deluxe Suite with Lounge', 'Deluxe Double with Seaview', 'Deluxe Twin Room']::text[], '[]'::jsonb, false, true, 11),
    ('prop-h78-veli', 'h78-veli', 'h78 Veli', 'guest-house', 'A hotel near the beach in Hulhumalé with ocean-view dining.', 'h78 Veli is a hotel in Hulhumalé, close to the beach. It offers renovated rooms with Maldivian design details, including superior rooms and an ocean-view suite, with dining available indoors and on an ocean-view open terrace. Contact Aloha Travels to plan a personalised stay.', 'Hulhumalé', 'Kaafu Atoll', 'Hulhumalé, Kaafu Atoll', array['Hotel', 'Near the beach', 'Ocean-view dining']::text[], '{}'::text[], '{}'::text[], array['High-speed Wi-Fi', 'Air conditioning', 'Electronic safe', 'Coffee machine', 'Smart TV', 'In-room refrigerator', 'Indoor dining', 'Ocean-view open terrace']::text[], array['Superior Twin / Double Room', 'Superior Double Room', 'Ocean View Suite']::text[], '[]'::jsonb, false, true, 12),
    ('prop-h78-iru', 'h78-iru', 'h78 Iru', 'guest-house', 'A Hulhumalé hotel near the beach with modern rooms and café-style dining.', 'h78 Iru is a hotel in Hulhumalé, near the beach and city. It offers modern rooms, including superior rooms and a junior suite, together with café-style dining. Contact Aloha Travels to plan a personalised stay.', 'Hulhumalé', 'Kaafu Atoll', 'Hulhumalé, Kaafu Atoll', array['Hotel', 'Near the beach', 'Café-style dining']::text[], '{}'::text[], '{}'::text[], array['High-speed Wi-Fi', 'Flat-screen TV', 'In-room safe', 'Coffee and tea', 'Café-style dining']::text[], array['Superior Double / Twin Room', 'Superior Double Room', 'Junior Suite']::text[], '[]'::jsonb, false, true, 13),
    ('prop-avanti-vaadhoo', 'avanti-vaadhoo', 'Avanti Vaadhoo', 'guest-house', 'A boutique guest house for a local-island stay on Vaadhoo.', 'Avanti Vaadhoo is a boutique guest house on Vaadhoo in Gaafu Dhaalu Atoll. Its guest rooms provide air conditioning, private bathrooms, Wi-Fi, televisions, daily housekeeping and towels, with guest support and surf or tour guidance available on request. Contact Aloha Travels to plan a personalised stay.', 'Vaadhoo', 'Gaafu Dhaalu Atoll', 'Vaadhoo, Gaafu Dhaalu Atoll', array['Guest House', 'Local Island', 'Boutique Stay']::text[], '{}'::text[], '{}'::text[], array['Air conditioning', 'Private bathrooms', 'Wi-Fi', 'Televisions', 'Daily housekeeping', 'Towels', 'Guest support', 'Surf or tour guidance on request']::text[], '{}'::text[], '[]'::jsonb, false, true, 14),
    ('prop-arena-beach-hotel', 'arena-beach-hotel', 'Arena Beach Hotel', 'guest-house', 'A beachfront hotel with a rooftop infinity pool on Maafushi.', 'Arena Beach Hotel is a beachfront hotel on Maafushi in Kaafu Atoll. The property offers a rooftop infinity pool, dining at Coco Grill and a selection of ocean excursions, including snorkelling and fishing experiences. Contact Aloha Travels to plan a personalised stay.', 'Maafushi', 'Kaafu Atoll', 'Maafushi, Kaafu Atoll', array['Hotel', 'Beachfront', 'Rooftop Pool']::text[], '{}'::text[], '{}'::text[], array['Rooftop infinity pool', 'Coco Grill dining', 'Snorkelling excursions', 'Fishing excursions']::text[], '{}'::text[], '[]'::jsonb, false, true, 15),
    ('prop-bambukeyo-villa', 'bambukeyo-villa', 'Bambukeyo Villa', 'guest-house', 'A local-island guest house with a garden on Gaadhiffushi.', 'Bambukeyo Villa is a guest house on Gaadhiffushi in Thaa Atoll. The property offers a private beach area, water-sports facilities, a garden, an open-air bath and free Wi-Fi. Contact Aloha Travels to plan a personalised stay.', 'Gaadhiffushi', 'Thaa Atoll', 'Gaadhiffushi, Thaa Atoll', array['Guest House', 'Local Island', 'Garden']::text[], '{}'::text[], '{}'::text[], array['Private beach area', 'Water-sports facilities', 'Garden', 'Open-air bath', 'Free Wi-Fi']::text[], '{}'::text[], '[]'::jsonb, false, true, 16)
), inserted as (
  insert into public.properties (
    id, slug, name, type, short_description, description, island, atoll, location,
    tags, interests, experiences, facilities, highlights, room_categories,
    featured, published, sort_order
  )
  select * from source_properties
  on conflict do nothing
  returning id
)
insert into aloha_imported_property_ids (id)
select id from inserted;

with source_images (property_id, image_url, kind, alt_text, sort_order) as (
  values
    ('prop-constance-halaveli-resort', '/images/real-westin-neutral-island.jpg', 'hero', 'Illustrative Maldives destination imagery for Constance Halaveli Resort', 0),
    ('prop-constance-halaveli-resort', '/images/hero-lagoon.png', 'gallery', 'Illustrative Maldives destination imagery for Constance Halaveli Resort', 0),
    ('prop-constance-halaveli-resort', '/images/split-resort.png', 'gallery', 'Illustrative Maldives destination imagery for Constance Halaveli Resort', 1),
    ('prop-constance-halaveli-resort', '/images/cta-ocean.png', 'gallery', 'Illustrative Maldives destination imagery for Constance Halaveli Resort', 2),
    ('prop-constance-halaveli-resort', '/images/made-in-maldives.png', 'gallery', 'Illustrative Maldives destination imagery for Constance Halaveli Resort', 3),
    ('prop-conrad-maldives-rangali-island', '/images/real-dhigufaru-local-island.jpg', 'hero', 'Illustrative Maldives destination imagery for Conrad Maldives Rangali Island', 0),
    ('prop-conrad-maldives-rangali-island', '/images/split-resort.png', 'gallery', 'Illustrative Maldives destination imagery for Conrad Maldives Rangali Island', 0),
    ('prop-conrad-maldives-rangali-island', '/images/hero-lagoon.png', 'gallery', 'Illustrative Maldives destination imagery for Conrad Maldives Rangali Island', 1),
    ('prop-conrad-maldives-rangali-island', '/images/cta-ocean.png', 'gallery', 'Illustrative Maldives destination imagery for Conrad Maldives Rangali Island', 2),
    ('prop-conrad-maldives-rangali-island', '/images/made-in-maldives.png', 'gallery', 'Illustrative Maldives destination imagery for Conrad Maldives Rangali Island', 3),
    ('prop-anantara-kihavah-villas', '/images/real-dhigufaru-sandbank.jpg', 'hero', 'Illustrative Maldives destination imagery for Anantara Kihavah Villas', 0),
    ('prop-anantara-kihavah-villas', '/images/hero-lagoon.png', 'gallery', 'Illustrative Maldives destination imagery for Anantara Kihavah Villas', 0),
    ('prop-anantara-kihavah-villas', '/images/split-resort.png', 'gallery', 'Illustrative Maldives destination imagery for Anantara Kihavah Villas', 1),
    ('prop-anantara-kihavah-villas', '/images/cta-ocean.png', 'gallery', 'Illustrative Maldives destination imagery for Anantara Kihavah Villas', 2),
    ('prop-anantara-kihavah-villas', '/images/made-in-maldives.png', 'gallery', 'Illustrative Maldives destination imagery for Anantara Kihavah Villas', 3),
    ('prop-the-st-regis-vommuli-resort-maldives', '/images/real-gaadhiffushi-atoll.jpg', 'hero', 'Illustrative Maldives destination imagery for The St. Regis Vommuli Resort, Maldives', 0),
    ('prop-the-st-regis-vommuli-resort-maldives', '/images/split-resort.png', 'gallery', 'Illustrative Maldives destination imagery for The St. Regis Vommuli Resort, Maldives', 0),
    ('prop-the-st-regis-vommuli-resort-maldives', '/images/hero-lagoon.png', 'gallery', 'Illustrative Maldives destination imagery for The St. Regis Vommuli Resort, Maldives', 1),
    ('prop-the-st-regis-vommuli-resort-maldives', '/images/cta-ocean.png', 'gallery', 'Illustrative Maldives destination imagery for The St. Regis Vommuli Resort, Maldives', 2),
    ('prop-the-st-regis-vommuli-resort-maldives', '/images/made-in-maldives.png', 'gallery', 'Illustrative Maldives destination imagery for The St. Regis Vommuli Resort, Maldives', 3),
    ('prop-pullman-maldives-maamutaa-resort', '/images/real-westin-kayak-island.jpg', 'hero', 'Illustrative Maldives destination imagery for Pullman Maldives Maamutaa Resort', 0),
    ('prop-pullman-maldives-maamutaa-resort', '/images/hero-lagoon.png', 'gallery', 'Illustrative Maldives destination imagery for Pullman Maldives Maamutaa Resort', 0),
    ('prop-pullman-maldives-maamutaa-resort', '/images/split-resort.png', 'gallery', 'Illustrative Maldives destination imagery for Pullman Maldives Maamutaa Resort', 1),
    ('prop-pullman-maldives-maamutaa-resort', '/images/cta-ocean.png', 'gallery', 'Illustrative Maldives destination imagery for Pullman Maldives Maamutaa Resort', 2),
    ('prop-pullman-maldives-maamutaa-resort', '/images/made-in-maldives.png', 'gallery', 'Illustrative Maldives destination imagery for Pullman Maldives Maamutaa Resort', 3),
    ('prop-baros-maldives', '/images/real-gaadhiffushi-snorkel-beach.jpg', 'hero', 'Illustrative Maldives destination imagery for Baros Maldives', 0),
    ('prop-baros-maldives', '/images/split-resort.png', 'gallery', 'Illustrative Maldives destination imagery for Baros Maldives', 0),
    ('prop-baros-maldives', '/images/hero-lagoon.png', 'gallery', 'Illustrative Maldives destination imagery for Baros Maldives', 1),
    ('prop-baros-maldives', '/images/cta-ocean.png', 'gallery', 'Illustrative Maldives destination imagery for Baros Maldives', 2),
    ('prop-baros-maldives', '/images/made-in-maldives.png', 'gallery', 'Illustrative Maldives destination imagery for Baros Maldives', 3),
    ('prop-the-westin-maldives-miriandhoo-resort', '/images/real-westin-day-aerial.jpg', 'hero', 'The Westin Maldives Miriandhoo Resort', 0),
    ('prop-the-westin-maldives-miriandhoo-resort', '/images/real-westin-day-aerial.jpg', 'gallery', 'The Westin Maldives Miriandhoo Resort gallery image 1', 0),
    ('prop-the-westin-maldives-miriandhoo-resort', '/images/real-westin-hero-aerial.jpg', 'gallery', 'The Westin Maldives Miriandhoo Resort gallery image 2', 1),
    ('prop-the-westin-maldives-miriandhoo-resort', '/images/real-westin-overwater-aerial.jpg', 'gallery', 'The Westin Maldives Miriandhoo Resort gallery image 3', 2),
    ('prop-the-westin-maldives-miriandhoo-resort', '/images/real-westin-arrival-jetty.jpg', 'gallery', 'The Westin Maldives Miriandhoo Resort gallery image 4', 3),
    ('prop-the-westin-maldives-miriandhoo-resort', '/images/real-westin-spa.jpg', 'gallery', 'The Westin Maldives Miriandhoo Resort gallery image 5', 4),
    ('prop-dhigufaru-island-resort', '/images/real-dhigufaru-island-aerial.jpg', 'hero', 'Dhigufaru Island Resort', 0),
    ('prop-dhigufaru-island-resort', '/images/real-dhigufaru-island-aerial.jpg', 'gallery', 'Dhigufaru Island Resort gallery image 1', 0),
    ('prop-dhigufaru-island-resort', '/images/real-dhigufaru-beach.jpg', 'gallery', 'Dhigufaru Island Resort gallery image 2', 1),
    ('prop-dhigufaru-island-resort', '/images/real-dhigufaru-arrival-pavilion.jpg', 'gallery', 'Dhigufaru Island Resort gallery image 3', 2),
    ('prop-dhigufaru-island-resort', '/images/real-dhigufaru-house-reef.jpg', 'gallery', 'Dhigufaru Island Resort gallery image 4', 3),
    ('prop-dhigufaru-island-resort', '/images/real-dhigufaru-spa-pavilion.jpg', 'gallery', 'Dhigufaru Island Resort gallery image 5', 4),
    ('prop-lagoon-villa-thoddoo', '/images/guest-houses/lagoon-villa-thoddoo-exterior.jpg', 'hero', 'Lagoon Villa Thoddoo', 0),
    ('prop-lagoon-villa-thoddoo', '/images/guest-houses/lagoon-villa-thoddoo-exterior.jpg', 'gallery', 'Lagoon Villa Thoddoo gallery image 1', 0),
    ('prop-lagoon-villa-thoddoo', '/images/guest-houses/lagoon-villa-thoddoo-room.jpg', 'gallery', 'Lagoon Villa Thoddoo gallery image 2', 1),
    ('prop-lagoon-villa-thoddoo', '/images/guest-houses/lagoon-villa-thoddoo-terrace.jpg', 'gallery', 'Lagoon Villa Thoddoo gallery image 3', 2),
    ('prop-lagoon-villa-thoddoo', '/images/guest-houses/lagoon-villa-thoddoo-bathroom.jpg', 'gallery', 'Lagoon Villa Thoddoo gallery image 4', 3),
    ('prop-belena-maldives', '/images/guest-houses/belena-maldives-exterior.jpg', 'hero', 'Belena Maldives', 0),
    ('prop-belena-maldives', '/images/guest-houses/belena-maldives-exterior.jpg', 'gallery', 'Belena Maldives gallery image 1', 0),
    ('prop-belena-maldives', '/images/guest-houses/belena-maldives-pool.jpg', 'gallery', 'Belena Maldives gallery image 2', 1),
    ('prop-belena-maldives', '/images/guest-houses/belena-maldives-garden.jpg', 'gallery', 'Belena Maldives gallery image 3', 2),
    ('prop-belena-maldives', '/images/guest-houses/belena-maldives-room.jpg', 'gallery', 'Belena Maldives gallery image 4', 3),
    ('prop-season-paradise', '/images/guest-houses/season-paradise-pool.jpg', 'hero', 'Season Paradise', 0),
    ('prop-season-paradise', '/images/guest-houses/season-paradise-aerial.jpg', 'gallery', 'Season Paradise gallery image 1', 0),
    ('prop-season-paradise', '/images/guest-houses/season-paradise-pool.jpg', 'gallery', 'Season Paradise gallery image 2', 1),
    ('prop-season-paradise', '/images/guest-houses/season-paradise-dining.jpg', 'gallery', 'Season Paradise gallery image 3', 2),
    ('prop-season-paradise', '/images/guest-houses/season-paradise-room-view.jpg', 'gallery', 'Season Paradise gallery image 4', 3),
    ('prop-season-paradise', '/images/guest-houses/season-paradise-spa.jpg', 'gallery', 'Season Paradise gallery image 5', 4),
    ('prop-h78', '/images/real-h78-hotel-exterior.webp', 'hero', 'h78', 0),
    ('prop-h78', '/images/real-h78-hotel-exterior.webp', 'gallery', 'h78 gallery image 1', 0),
    ('prop-h78', '/images/real-h78-ocean-terrace.webp', 'gallery', 'h78 gallery image 2', 1),
    ('prop-h78', '/images/real-h78-seaview-room.webp', 'gallery', 'h78 gallery image 3', 2),
    ('prop-h78', '/images/real-h78-terrace-dining.webp', 'gallery', 'h78 gallery image 4', 3),
    ('prop-h78-veli', '/images/guest-houses/h78-veli-exterior.webp', 'hero', 'h78 Veli', 0),
    ('prop-h78-veli', '/images/guest-houses/h78-veli-exterior.webp', 'gallery', 'h78 Veli gallery image 1', 0),
    ('prop-h78-veli', '/images/guest-houses/h78-veli-double-room.webp', 'gallery', 'h78 Veli gallery image 2', 1),
    ('prop-h78-veli', '/images/guest-houses/h78-veli-twin-room.webp', 'gallery', 'h78 Veli gallery image 3', 2),
    ('prop-h78-veli', '/images/guest-houses/h78-veli-ocean-view-suite.jpg', 'gallery', 'h78 Veli gallery image 4', 3),
    ('prop-h78-veli', '/images/guest-houses/h78-veli-dining.webp', 'gallery', 'h78 Veli gallery image 5', 4),
    ('prop-h78-iru', '/images/guest-houses/h78-iru-reception.webp', 'hero', 'h78 Iru', 0),
    ('prop-h78-iru', '/images/guest-houses/h78-iru-reception.webp', 'gallery', 'h78 Iru gallery image 1', 0),
    ('prop-h78-iru', '/images/real-h78-iru-reception.webp', 'gallery', 'h78 Iru gallery image 2', 1),
    ('prop-h78-iru', '/images/guest-houses/h78-iru-room.webp', 'gallery', 'h78 Iru gallery image 3', 2),
    ('prop-h78-iru', '/images/guest-houses/h78-iru-deluxe-room.webp', 'gallery', 'h78 Iru gallery image 4', 3),
    ('prop-h78-iru', '/images/real-h78-iru-dining.webp', 'gallery', 'h78 Iru gallery image 5', 4),
    ('prop-avanti-vaadhoo', '/images/real-avanti-guesthouse.webp', 'hero', 'Avanti Vaadhoo', 0),
    ('prop-avanti-vaadhoo', '/images/real-avanti-guesthouse.webp', 'gallery', 'Avanti Vaadhoo gallery image 1', 0),
    ('prop-avanti-vaadhoo', '/images/real-avanti-twin-room.png', 'gallery', 'Avanti Vaadhoo gallery image 2', 1),
    ('prop-arena-beach-hotel', '/images/guest-houses/arena-beach-hotel-exterior.jpg', 'hero', 'Arena Beach Hotel', 0),
    ('prop-arena-beach-hotel', '/images/guest-houses/arena-beach-hotel-exterior.jpg', 'gallery', 'Arena Beach Hotel gallery image 1', 0),
    ('prop-arena-beach-hotel', '/images/guest-houses/arena-beach-hotel-pool.jpg', 'gallery', 'Arena Beach Hotel gallery image 2', 1),
    ('prop-arena-beach-hotel', '/images/guest-houses/arena-beach-hotel-room.webp', 'gallery', 'Arena Beach Hotel gallery image 3', 2),
    ('prop-arena-beach-hotel', '/images/guest-houses/arena-beach-hotel-dining.jpg', 'gallery', 'Arena Beach Hotel gallery image 4', 3),
    ('prop-bambukeyo-villa', '/images/real-gaadhiffushi-guesthouse-entrance.jpg', 'hero', 'Bambukeyo Villa', 0),
    ('prop-bambukeyo-villa', '/images/real-gaadhiffushi-guesthouse-entrance.jpg', 'gallery', 'Bambukeyo Villa gallery image 1', 0),
    ('prop-bambukeyo-villa', '/images/real-gaadhiffushi-guest-arrival.jpg', 'gallery', 'Bambukeyo Villa gallery image 2', 1)
)
insert into public.property_images (
  property_id, image_url, kind, alt_text, sort_order
)
select source_images.*
from source_images
join aloha_imported_property_ids imported using (property_id)
order by property_id, case kind when 'hero' then 0 else 1 end, sort_order
on conflict do nothing;

commit;
