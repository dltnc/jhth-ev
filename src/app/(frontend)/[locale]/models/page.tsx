import { draftMode } from 'next/headers'
import Link from 'next/link'
import type { Metadata } from 'next'

import { ModelsExplorer } from '@/components/ModelsExplorer'
import { PageHeader } from '@/components/PageHeader'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getBikes } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.models.sub,
    locale,
    path: '/models',
    title: dict.models.heading,
  })
}

const ModelsPage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const { isEnabled: draft } = await draftMode()
  const bikes = await getBikes({ draft, locale })

  return (
    <>
      <PageHeader eyebrow={dict.home.lineupEyebrow} sub={dict.models.sub} title={dict.models.heading}>
        <Link className="btn btn-light" href={localePath(locale, '/models/compare')}>
          {dict.actions.compare}
        </Link>
      </PageHeader>

      <ModelsExplorer bikes={bikes} locale={locale} />
    </>
  )
}

export default ModelsPage
