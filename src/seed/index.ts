// Loaded first: `payload.config.ts` reads DATABASE_URL/PAYLOAD_SECRET at import
// time, and running this file through `tsx` does not read `.env` on its own.
import 'dotenv/config'

import type { Payload } from 'payload'

import { getPayload } from 'payload'

import type { BikeMap } from './data-globals'
import type { MediaMap } from './media'

import config from '../payload.config'
import { seedBikes } from './data-bikes'
import {
  seedCategories,
  seedFaqs,
  seedPages,
  seedPosts,
  seedTestimonials,
  seedUsers,
} from './data-content'
import { seedDealers } from './data-dealers'
import { homepageData, siteSettingsData, vehicleTypesData } from './data-globals'
import { seedMedia } from './media'

/**
 * Collections this script owns end to end. Order matters for the wipe: anything
 * holding relationships goes before what it points at.
 *
 * `users` is deliberately absent: wiping it would delete whoever is running the
 * seed along with the demo accounts. `seedUsersAll` adds the demo logins without
 * removing existing ones instead.
 *
 * `test-ride-bookings` and `reservations` are also absent and must never be
 * added — they hold real customer leads, and the seed has no business deleting
 * or inventing those.
 */
const OWNED = [
  'posts',
  'pages',
  'testimonials',
  'faqs',
  'bikes',
  'dealers',
  'categories',
  'media',
] as const

const forced = process.argv.includes('--force') || process.env.SEED_FORCE === '1'

/**
 * Total documents across the owned collections, used by the --force gate. Users
 * are excluded on purpose: a fresh install where someone has already created the
 * first admin account should still be able to run the plain `seed`.
 */
const countOwned = async (payload: Payload) => {
  let total = 0

  for (const collection of OWNED) {
    const { totalDocs } = await payload.count({ collection })
    total += totalDocs
  }

  return total
}

const wipe = async (payload: Payload) => {
  for (const collection of OWNED) {
    try {
      await payload.delete({ collection, where: {} })
      console.log(`  wiped ${collection}`)
    } catch (error) {
      console.warn(`  could not wipe ${collection}:`, error)
    }
  }
}

/**
 * email → user id, so posts can be attributed to a real author. Existing accounts
 * are kept as-is: an editor who already logs in here keeps their own password, and
 * re-running the seed never locks anyone out.
 */
const seedUsersAll = async (payload: Payload) => {
  const map: Record<string, string> = {}

  for (const user of seedUsers) {
    try {
      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: user.email } },
        limit: 1,
      })

      const found = existing.docs[0]

      if (found) {
        map[user.email] = found.id
        console.log(`  user ${user.email} already exists — left untouched`)
        continue
      }

      const created = await payload.create({
        collection: 'users',
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          roles: user.roles,
        },
      })

      map[user.email] = created.id
      console.log(`  user ${user.email}`)
    } catch (error) {
      console.error(`  user ${user.email} failed:`, error)
    }
  }

  return map
}

/** slug → category id. */
const seedCategoriesAll = async (payload: Payload) => {
  const map: Record<string, string> = {}

  for (const category of seedCategories) {
    try {
      const doc = await payload.create({
        collection: 'categories',
        data: { slug: category.slug, title: category.title.en },
        locale: 'en',
      })

      await payload.update({
        collection: 'categories',
        data: { title: category.title.bn },
        id: doc.id,
        locale: 'bn',
      })

      map[category.slug] = doc.id
      console.log(`  category ${category.slug}`)
    } catch (error) {
      console.error(`  category ${category.slug} failed:`, error)
    }
  }

  return map
}

const seedDealersAll = async (payload: Payload) => {
  let created = 0

  for (const dealer of seedDealers) {
    try {
      const doc = await payload.create({
        collection: 'dealers',
        data: {
          name: dealer.name,
          address: dealer.address.en,
          district: dealer.district,
          division: dealer.division,
          hours: dealer.hours.en,
          location: [dealer.lng, dealer.lat],
          phone: dealer.phone,
          servicesOffered: dealer.services,
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'dealers',
        data: { address: dealer.address.bn, hours: dealer.hours.bn },
        id: doc.id,
        locale: 'bn',
      })

      created += 1
      console.log(`  dealer ${dealer.name}`)
    } catch (error) {
      console.error(`  dealer ${dealer.name} failed:`, error)
    }
  }

  return created
}

/** Absent keys mean that download failed; a short gallery beats a broken upload. */
const galleryRows = (media: MediaMap, keys: string[]) =>
  keys.flatMap((key) => {
    const image = media[key]
    return image ? [{ image }] : []
  })

/**
 * Bikes carry localized text in nested arrays, so each doc is created in English
 * and then updated in Bangla with the row IDs Payload assigned — that keeps the
 * two locales on the same array rows instead of duplicating them. Returns
 * slug → id so testimonials and the home page can point at real models.
 */
const seedBikesAll = async (payload: Payload, media: MediaMap) => {
  const map: BikeMap = {}

  for (const bike of seedBikes) {
    try {
      const gallery = galleryRows(media, bike.gallery)

      const created = await payload.create({
        collection: 'bikes',
        data: {
          name: bike.name.en,
          badge: bike.badge?.en,
          basePrice: bike.basePrice,
          battery: bike.quickSpecs.battery,
          category: bike.category,
          chargeTime: bike.quickSpecs.chargeTime,
          colorSwatches: bike.colorSwatches.map((hex) => ({ hex })),
          description: bike.description.en,
          emiEligible: true,
          featured: bike.featured,
          gallery,
          generateSlug: false,
          metaDescription: bike.description.en,
          metaImage: gallery[0]?.image ?? media['og-default'] ?? null,
          metaTitle: `${bike.name.en} — VoltRide`,
          motor: bike.quickSpecs.motor,
          range: bike.quickSpecs.range,
          slug: bike.slug,
          specs: bike.specs.map((spec) => ({ label: spec.label.en, value: spec.value.en })),
          status: bike.status ?? 'available',
          tagline: bike.tagline.en,
          topSpeed: bike.quickSpecs.topSpeed,
          variants: bike.variants.map((variant) => ({
            colorName: variant.colorName.en,
            inStock: bike.status === 'comingSoon' ? ('preOrder' as const) : ('inStock' as const),
            price: variant.price,
            sku: variant.sku,
          })),
          vehicleType: bike.vehicleType,
          _status: 'published',
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'bikes',
        data: {
          name: bike.name.bn,
          badge: bike.badge?.bn,
          description: bike.description.bn,
          generateSlug: false,
          metaDescription: bike.description.bn,
          metaTitle: `${bike.name.bn} — ভোল্টরাইড`,
          slug: bike.slug,
          specs: (created.specs ?? []).map((row, index) => ({
            id: row.id,
            label: bike.specs[index]?.label.bn ?? row.label,
            value: bike.specs[index]?.value.bn ?? row.value,
          })),
          tagline: bike.tagline.bn,
          variants: (created.variants ?? []).map((row, index) => ({
            ...row,
            colorName: bike.variants[index]?.colorName.bn ?? row.colorName,
          })),
          _status: 'published',
        },
        id: created.id,
        locale: 'bn',
      })

      map[bike.slug] = created.id
      console.log(`  bike ${bike.slug}`)
    } catch (error) {
      console.error(`  bike ${bike.slug} failed:`, error)
    }
  }

  return map
}

const seedTestimonialsAll = async (payload: Payload, bikes: BikeMap) => {
  let created = 0

  for (const testimonial of seedTestimonials) {
    try {
      const doc = await payload.create({
        collection: 'testimonials',
        data: {
          name: testimonial.name,
          modelPurchased: bikes[testimonial.bike] ?? null,
          quote: testimonial.quote.en,
          rating: testimonial.rating,
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'testimonials',
        data: { quote: testimonial.quote.bn },
        id: doc.id,
        locale: 'bn',
      })

      created += 1
      console.log(`  testimonial ${testimonial.name}`)
    } catch (error) {
      console.error(`  testimonial ${testimonial.name} failed:`, error)
    }
  }

  return created
}

const seedFaqsAll = async (payload: Payload) => {
  let created = 0

  for (const faq of seedFaqs) {
    try {
      const doc = await payload.create({
        collection: 'faqs',
        data: {
          answer: faq.answer.en,
          category: faq.category,
          order: faq.order,
          question: faq.question.en,
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'faqs',
        data: { answer: faq.answer.bn, question: faq.question.bn },
        id: doc.id,
        locale: 'bn',
      })

      created += 1
      console.log(`  faq ${faq.category}/${faq.order}`)
    } catch (error) {
      console.error(`  faq ${faq.category}/${faq.order} failed:`, error)
    }
  }

  return created
}

const seedPostsAll = async (
  payload: Payload,
  media: MediaMap,
  categories: Record<string, string>,
  authors: Record<string, string>,
) => {
  let created = 0

  for (const post of seedPosts) {
    try {
      const doc = await payload.create({
        collection: 'posts',
        data: {
          title: post.title.en,
          author: authors[post.authorEmail] ?? null,
          category: categories[post.category] ?? null,
          content: post.content.en,
          coverImage: media[post.cover] ?? null,
          excerpt: post.excerpt.en,
          generateSlug: false,
          publishDate: new Date(`${post.publishDate}T09:00:00.000Z`).toISOString(),
          slug: post.slug,
          tags: post.tags,
          _status: 'published',
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'posts',
        data: {
          title: post.title.bn,
          content: post.content.bn,
          excerpt: post.excerpt.bn,
          generateSlug: false,
          slug: post.slug,
          _status: 'published',
        },
        id: doc.id,
        locale: 'bn',
      })

      created += 1
      console.log(`  post ${post.slug}`)
    } catch (error) {
      console.error(`  post ${post.slug} failed:`, error)
    }
  }

  return created
}

const seedPagesAll = async (payload: Payload, media: MediaMap) => {
  let created = 0

  for (const page of seedPages(media)) {
    try {
      const doc = await payload.create({
        collection: 'pages',
        data: {
          title: page.title.en,
          blocks: page.blocks.en,
          generateSlug: false,
          metaDescription: page.metaDescription.en,
          metaImage: page.metaImage ?? null,
          metaTitle: page.metaTitle.en,
          slug: page.slug,
          _status: 'published',
        },
        locale: 'en',
      })

      await payload.update({
        collection: 'pages',
        data: {
          title: page.title.bn,
          blocks: page.blocks.bn,
          generateSlug: false,
          metaDescription: page.metaDescription.bn,
          metaTitle: page.metaTitle.bn,
          slug: page.slug,
          _status: 'published',
        },
        id: doc.id,
        locale: 'bn',
      })

      created += 1
      console.log(`  page ${page.slug}`)
    } catch (error) {
      console.error(`  page ${page.slug} failed:`, error)
    }
  }

  return created
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Payload identifies array rows by `id`. A row that arrives without one counts
 * as brand new, so the other locale's copy of every localized subfield inside
 * that row is dropped (see `fields/hooks/beforeChange/getExistingRowDoc`). The
 * Bangla global data is authored without ids, so the ids Payload assigned during
 * the English pass are copied across by position — the two halves of every array
 * in `data-globals.ts` are authored in the same order — before the Bangla write.
 */
const withRowIds = <T>(bn: T, en: unknown): T => {
  if (Array.isArray(bn)) {
    if (!Array.isArray(en)) return bn

    return bn.map((row, index) => {
      const source: unknown = en[index]
      if (!isRecord(row) || !isRecord(source)) return row

      const merged = withRowIds(row, source)
      const { id } = source

      return typeof id === 'number' || typeof id === 'string' ? { ...merged, id } : merged
    }) as T
  }

  if (isRecord(bn)) {
    if (!isRecord(en)) return bn

    const out: Record<string, unknown> = { ...bn }
    for (const [key, value] of Object.entries(bn)) out[key] = withRowIds(value, en[key])

    return out as T
  }

  return bn
}

/** Globals are written twice each — English first, then the Bangla mirror. */
const seedGlobalsAll = async (payload: Payload, media: MediaMap, bikes: BikeMap) => {
  const settings = siteSettingsData(media)
  const home = homepageData(media, bikes)
  const types = vehicleTypesData(media)

  let updated = 0

  try {
    const en = await payload.updateGlobal({
      slug: 'site-settings',
      data: settings.en,
      locale: 'en',
    })
    await payload.updateGlobal({
      slug: 'site-settings',
      data: withRowIds(settings.bn, en),
      locale: 'bn',
    })
    updated += 1
    console.log('  global site-settings')
  } catch (error) {
    console.error('  global site-settings failed:', error)
  }

  try {
    const en = await payload.updateGlobal({ slug: 'homepage', data: home.en, locale: 'en' })
    await payload.updateGlobal({
      slug: 'homepage',
      data: withRowIds(home.bn, en),
      locale: 'bn',
    })
    updated += 1
    console.log('  global homepage')
  } catch (error) {
    console.error('  global homepage failed:', error)
  }

  try {
    const en = await payload.updateGlobal({ slug: 'vehicle-types', data: types.en, locale: 'en' })
    await payload.updateGlobal({
      slug: 'vehicle-types',
      data: withRowIds(types.bn, en),
      locale: 'bn',
    })
    updated += 1
    console.log('  global vehicle-types')
  } catch (error) {
    console.error('  global vehicle-types failed:', error)
  }

  return updated
}

const main = async () => {
  const payload = await getPayload({ config })

  if (!forced) {
    const existing = await countOwned(payload)

    if (existing > 0) {
      console.log(
        `This database already contains ${existing} documents — re-run with --force to wipe and reseed.`,
      )
      process.exit(0)
    }
  }

  if (forced) {
    console.log('Wiping seeded collections…')
    await wipe(payload)
  }

  console.log('Seeding users…')
  const users = await seedUsersAll(payload)

  console.log('Seeding categories…')
  const categories = await seedCategoriesAll(payload)

  console.log('Downloading media…')
  const media = await seedMedia(payload)

  console.log('Seeding bikes…')
  const bikes = await seedBikesAll(payload, media)

  console.log('Seeding dealers…')
  const dealers = await seedDealersAll(payload)

  console.log('Seeding testimonials…')
  const testimonials = await seedTestimonialsAll(payload, bikes)

  console.log('Seeding FAQs…')
  const faqs = await seedFaqsAll(payload)

  console.log('Seeding posts…')
  const posts = await seedPostsAll(payload, media, categories, users)

  console.log('Seeding pages…')
  const pages = await seedPagesAll(payload, media)

  console.log('Seeding globals…')
  const globals = await seedGlobalsAll(payload, media, bikes)

  console.log('\nSeed complete:')
  console.log(`  users        ${Object.keys(users).length}`)
  console.log(`  categories   ${Object.keys(categories).length}`)
  console.log(`  media        ${Object.keys(media).length}`)
  console.log(`  bikes        ${Object.keys(bikes).length}`)
  console.log(`  dealers      ${dealers}`)
  console.log(`  testimonials ${testimonials}`)
  console.log(`  faqs         ${faqs}`)
  console.log(`  posts        ${posts}`)
  console.log(`  pages        ${pages}`)
  console.log(`  globals      ${globals}`)

  process.exit(0)
}

main().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
