import type { MetadataRoute } from 'next'

import type { Locale } from '@/i18n/config'

import { localePath, locales } from '@/i18n/config'
import { getBikes, getPages, getPosts } from '@/lib/queries'
import { absoluteUrl } from '@/lib/seo'

export const revalidate = 3600

type Frequency = MetadataRoute.Sitemap[number]['changeFrequency']

/** Routes that exist in code for every locale. */
const staticPaths: { changeFrequency: Frequency; path: string; priority: number }[] = [
  { changeFrequency: 'weekly', path: '/', priority: 1 },
  { changeFrequency: 'weekly', path: '/models', priority: 0.9 },
  { changeFrequency: 'weekly', path: '/models/type/e-cycles', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/models/type/e-scooters', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/models/type/e-bikes', priority: 0.8 },
  { changeFrequency: 'monthly', path: '/models/compare', priority: 0.6 },
  { changeFrequency: 'monthly', path: '/technology', priority: 0.7 },
  { changeFrequency: 'monthly', path: '/dealers', priority: 0.7 },
  { changeFrequency: 'monthly', path: '/test-ride', priority: 0.8 },
  { changeFrequency: 'monthly', path: '/reserve', priority: 0.8 },
  { changeFrequency: 'monthly', path: '/financing', priority: 0.6 },
  { changeFrequency: 'monthly', path: '/faq', priority: 0.5 },
  { changeFrequency: 'daily', path: '/blog', priority: 0.7 },
]

type Options = { changeFrequency?: Frequency; lastModified?: string; priority?: number }

/**
 * One entry per locale, each carrying the full hreflang map. Slugs are localized
 * in the CMS, so paths are passed in per locale rather than derived from one.
 */
const entries = (paths: Record<Locale, string>, options: Options = {}): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((code) => [code, absoluteUrl(localePath(code, paths[code]))]),
  )

  return locales.map((locale) => ({
    alternates: { languages },
    changeFrequency: options.changeFrequency,
    lastModified: options.lastModified,
    priority: options.priority,
    url: absoluteUrl(localePath(locale, paths[locale])),
  }))
}

const samePath = (path: string): Record<Locale, string> =>
  Object.fromEntries(locales.map((code) => [code, path])) as Record<Locale, string>

/** Pairs the same document across locales so hreflang links line up. */
const byId = <T extends { id: string; slug: string; updatedAt: string }>(
  docsByLocale: Record<Locale, T[]>,
) => {
  const map = new Map<string, { paths: Partial<Record<Locale, string>>; updatedAt: string }>()

  for (const locale of locales) {
    for (const doc of docsByLocale[locale]) {
      const existing = map.get(doc.id) ?? { paths: {}, updatedAt: doc.updatedAt }
      existing.paths[locale] = doc.slug
      map.set(doc.id, existing)
    }
  }

  return map
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const all: MetadataRoute.Sitemap = staticPaths.flatMap((item) =>
    entries(samePath(item.path), {
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    }),
  )

  try {
    const [enBikes, bnBikes, enPosts, bnPosts, enPages, bnPages] = await Promise.all([
      getBikes({ locale: 'en' }),
      getBikes({ locale: 'bn' }),
      getPosts({ locale: 'en' }),
      getPosts({ locale: 'bn' }),
      getPages({ locale: 'en' }),
      getPages({ locale: 'bn' }),
    ])

    const push = (
      docs: Record<Locale, { id: string; slug: string; updatedAt: string }[]>,
      prefix: string,
      options: Options,
    ) => {
      for (const [, doc] of byId(docs)) {
        const paths = Object.fromEntries(
          locales.map((code) => [code, `${prefix}${doc.paths[code] ?? doc.paths.en ?? ''}`]),
        ) as Record<Locale, string>

        all.push(...entries(paths, { ...options, lastModified: doc.updatedAt }))
      }
    }

    push({ bn: bnBikes, en: enBikes }, '/models/', {
      changeFrequency: 'weekly',
      priority: 0.8,
    })
    push({ bn: bnPosts, en: enPosts }, '/blog/', {
      changeFrequency: 'monthly',
      priority: 0.6,
    })

    const reserved = new Set(staticPaths.map((item) => item.path.replace(/^\//, '')))
    const pageDocs = {
      bn: bnPages.filter((page) => !reserved.has(page.slug)),
      en: enPages.filter((page) => !reserved.has(page.slug)),
    }

    push(pageDocs, '/', { changeFrequency: 'monthly', priority: 0.5 })
  } catch (error) {
    // A missing database must not take the whole sitemap down.
    console.error('[sitemap] could not read collections', error)
  }

  return all
}

export default sitemap
