import type { Experience, Property } from '@/lib/types'

const PROPERTY_KEY = 'aloha-admin-properties-v1'
const EXPERIENCE_KEY = 'aloha-admin-experiences-v1'

function readItems<T>(key: string): T[] {
  if (typeof window === 'undefined') return []

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T[]) : []
  } catch {
    return []
  }
}

function writeItems<T extends { id: string }>(key: string, item: T) {
  const current = readItems<T>(key)
  const next = [item, ...current.filter((entry) => entry.id !== item.id)]
  window.localStorage.setItem(key, JSON.stringify(next))
}

export function getAdminProperties() {
  return readItems<Property>(PROPERTY_KEY)
}

export function saveAdminProperty(property: Property) {
  writeItems(PROPERTY_KEY, property)
}

export function getAdminExperiences() {
  return readItems<Experience>(EXPERIENCE_KEY)
}

export function saveAdminExperience(experience: Experience) {
  writeItems(EXPERIENCE_KEY, experience)
}

export async function imageFileToDataUrl(file: File) {
  const source = await createImageBitmap(file)
  const maximum = 1600
  const ratio = Math.min(1, maximum / Math.max(source.width, source.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(source.width * ratio)
  canvas.height = Math.round(source.height * ratio)

  const context = canvas.getContext('2d')
  if (!context) throw new Error('This browser could not process the image.')

  context.drawImage(source, 0, 0, canvas.width, canvas.height)
  source.close()
  return canvas.toDataURL('image/jpeg', 0.78)
}
