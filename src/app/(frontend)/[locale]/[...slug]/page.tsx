import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { PageHeader } from '@/components/PageHeader'
import { RenderBlocks } from '@/components/RenderBlocks'
import { defaultLocale, isLocale } from '@/i18n/config'
import { resolveMedia } from '@/lib/media'
import { getPageBySlug } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string; slug: string[] }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const path = slug.join('/')

  const page = await getPageBySlug({ locale, slug: path })
  if (!page) return {}

  const image = resolveMedia(page.metaImage, 'wide')

  return buildMetadata({
    description: page.metaDescription,
    image: image?.url,
    locale,
    path: `/${path}`,
    title: page.metaTitle ?? page.title,
  })
}

/**
 * CMS-authored pages (PRD §5.3). Static routes in this tree always win, so a
 * page saved with a reserved slug like `models` simply never resolves here.
 */
const CmsPage = async ({ params }: Props) => {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale

  const { isEnabled: draft } = await draftMode()
  const page = await getPageBySlug({ draft, locale, slug: slug.join('/') })

  if (!page) notFound()

  return page.blocks?.length ? (
    <RenderBlocks blocks={page.blocks} locale={locale} />
  ) : (
    <PageHeader title={page.title} />
  )
}

export default CmsPage
