import type { Media } from '@/payload-types'

import { serverURL } from './seo'

export type MediaSize = 'card' | 'hero' | 'thumbnail' | 'wide'

export type ResolvedMedia = {
  alt: string
  caption?: string
  height?: number
  mimeType?: string
  url: string
  width?: number
}

const isPopulated = (value: unknown): value is Media =>
  typeof value === 'object' && value !== null && 'id' in value

/**
 * Payload prefixes upload URLs with `serverURL`, which makes `next/image` treat
 * our own files as a remote host and demand a `remotePatterns` entry per
 * environment. Anything served from this deployment is rewritten back to an
 * app-relative path so `images.localPatterns` in `next.config.ts` covers it.
 * URLs on any other origin (external storage) are left untouched.
 */
const localizeUrl = (url: string): string =>
  url.startsWith(`${serverURL}/`) ? url.slice(serverURL.length) : url

/**
 * Upload fields come back as either an ID string (depth 0) or the populated doc.
 * Returns `null` for both the unpopulated and the empty case so callers can
 * branch once instead of null-checking three levels of optional fields.
 */
export const resolveMedia = (value: unknown, size?: MediaSize): null | ResolvedMedia => {
  if (!isPopulated(value)) return null

  const sized = size ? value.sizes?.[size] : undefined
  const url = sized?.url ?? value.url

  if (!url) return null

  return {
    alt: value.alt ?? '',
    caption: value.caption ?? undefined,
    height: sized?.height ?? value.height ?? undefined,
    mimeType: sized?.mimeType ?? value.mimeType ?? undefined,
    url: localizeUrl(url),
    width: sized?.width ?? value.width ?? undefined,
  }
}

/** First gallery image of a bike, used for cards and OG images. */
export const firstGalleryImage = (
  gallery: Array<{ image: Media | string }> | null | undefined,
  size?: MediaSize,
): null | ResolvedMedia => {
  if (!gallery?.length) return null

  for (const entry of gallery) {
    const resolved = resolveMedia(entry.image, size)
    if (resolved) return resolved
  }

  return null
}
