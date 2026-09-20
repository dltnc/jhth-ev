import type { Where } from 'payload'

import type { Locale } from '@/i18n/config'
import type { Bike, Dealer, Faq, Page, Post, Testimonial } from '@/payload-types'

import { getPayloadClient } from './payload'

type BaseArgs = {
  /** Only ever `true` for an authenticated editor in draft mode. */
  draft?: boolean
  locale: Locale
}

/**
 * Published-only constraint for public traffic. Applied explicitly rather than
 * relying on access control, because the Local API bypasses access by default.
 */
const publishedOnly: Where = { _status: { equals: 'published' } }

const listWhere = (draft: boolean | undefined, extra?: Where): Where => {
  const constraints: Where[] = draft ? [] : [publishedOnly]

  if (extra) constraints.push(extra)
  if (!constraints.length) return {}

  return constraints.length === 1 ? constraints[0]! : { and: constraints }
}

export type BikeFilters = {
  category?: Bike['category']
  featured?: boolean
  maxPrice?: number
  vehicleType?: Bike['vehicleType']
}

export const getBikes = async ({
  draft,
  filters,
  limit = 100,
  locale,
}: BaseArgs & { filters?: BikeFilters; limit?: number }): Promise<Bike[]> => {
  const payload = await getPayloadClient()

  const extra: Where[] = []
  if (filters?.category) extra.push({ category: { equals: filters.category } })
  if (filters?.vehicleType) extra.push({ vehicleType: { equals: filters.vehicleType } })
  if (filters?.featured) extra.push({ featured: { equals: true } })
  if (typeof filters?.maxPrice === 'number') {
    extra.push({ basePrice: { less_than_equal: filters.maxPrice } })
  }

  const result = await payload.find({
    collection: 'bikes',
    depth: 1,
    draft: Boolean(draft),
    limit,
    locale,
    overrideAccess: true,
    pagination: false,
    sort: ['-featured', 'basePrice'],
    where: listWhere(draft, extra.length ? { and: extra } : undefined),
  })

  return result.docs
}

export const getBikeBySlug = async ({
  draft,
  locale,
  slug,
}: BaseArgs & { slug: string }): Promise<Bike | null> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'bikes',
    depth: 2,
    draft: Boolean(draft),
    limit: 1,
    locale,
    pagination: false,
    where: listWhere(draft, { slug: { equals: slug } }),
  })

  return result.docs[0] ?? null
}

export const getRelatedBikes = async ({
  category,
  excludeId,
  locale,
}: BaseArgs & { category: Bike['category']; excludeId: string }): Promise<Bike[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'bikes',
    depth: 1,
    limit: 3,
    locale,
    pagination: false,
    where: {
      and: [publishedOnly, { category: { equals: category } }, { id: { not_equals: excludeId } }],
    },
  })

  return result.docs
}

export const getDealers = async ({ locale }: { locale: Locale }): Promise<Dealer[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'dealers',
    depth: 0,
    limit: 200,
    locale,
    pagination: false,
    sort: ['division', 'name'],
  })

  return result.docs
}

export const getFaqs = async ({
  category,
  locale,
}: {
  category?: Faq['category']
  locale: Locale
}): Promise<Faq[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'faqs',
    depth: 0,
    limit: 200,
    locale,
    pagination: false,
    sort: ['category', 'order'],
    where: category && category !== null ? { category: { equals: category } } : {},
  })

  return result.docs
}

export const getTestimonials = async ({
  limit = 6,
  locale,
}: {
  limit?: number
  locale: Locale
}): Promise<Testimonial[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit,
    locale,
    pagination: false,
    sort: '-createdAt',
  })

  return result.docs
}

export const getPosts = async ({
  draft,
  limit = 30,
  locale,
}: BaseArgs & { limit?: number }): Promise<Post[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    draft: Boolean(draft),
    limit,
    locale,
    pagination: false,
    sort: '-publishDate',
    where: listWhere(draft),
  })

  return result.docs
}

export const getPostBySlug = async ({
  draft,
  locale,
  slug,
}: BaseArgs & { slug: string }): Promise<null | Post> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft: Boolean(draft),
    limit: 1,
    locale,
    pagination: false,
    where: listWhere(draft, { slug: { equals: slug } }),
  })

  return result.docs[0] ?? null
}

export const getPages = async ({ locale }: { locale: Locale }): Promise<Page[]> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 200,
    locale,
    pagination: false,
    sort: 'slug',
    where: publishedOnly,
  })

  return result.docs
}

export const getPageBySlug = async ({
  draft,
  locale,
  slug,
}: BaseArgs & { slug: string }): Promise<null | Page> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft: Boolean(draft),
    limit: 1,
    locale,
    pagination: false,
    where: listWhere(draft, { slug: { equals: slug } }),
  })

  return result.docs[0] ?? null
}
