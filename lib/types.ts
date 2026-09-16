// Domain types — mirror the intended Supabase schema so the data layer can be
// swapped from mock data to real queries without changing component contracts.

export type PropertyType = 'resort' | 'guest-house'

export type InterestSlug =
  | 'diving'
  | 'snorkeling'
  | 'honeymoon'
  | 'family'
  | 'water-sports'
  | 'romantic'
  | 'adventure'
  | 'relaxation'

export interface Interest {
  id: string
  name: string
  slug: InterestSlug
  description: string
  imageUrl: string
  featured: boolean
}

export interface Experience {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  featured: boolean
  relatedPropertyIds: string[]
}

export interface RoomCategory {
  name: string
  description: string
  size: string
  maxOccupancy: string
  priceFrom: number
  photos: string[]
}

export interface Property {
  id: string
  name: string
  slug: string
  type: PropertyType
  shortDescription: string
  description: string
  island: string
  atoll: string
  location: string
  heroImage: string
  gallery: string[]
  tags: string[]
  interests: InterestSlug[]
  experiences: string[]
  facilities: string[]
  highlights: string[]
  roomCategories: RoomCategory[]
  featured: boolean
  published: boolean
}

export type InquiryStatus =
  | 'new'
  | 'contacted'
  | 'planning'
  | 'confirmed'
  | 'closed'

export interface Inquiry {
  id: string
  propertyName: string | null
  name: string
  contact: string
  travelDates: string
  guests: string
  budget: string
  status: InquiryStatus
  createdAt: string
}

export interface Mood {
  title: string
  description: string
  imageUrl: string
  href: string
}
