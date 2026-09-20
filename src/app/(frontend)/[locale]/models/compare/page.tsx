import type { Metadata } from 'next'

import { CompareTool } from '@/components/CompareTool'
import { PageHeader } from '@/components/PageHeader'
import { defaultLocale, isLocale } from '@/i18n/config'
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
    description: dict.compare.sub,
    locale,
    path: '/models/compare',
    title: dict.compare.heading,
  })
}

const ComparePage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const bikes = await getBikes({ locale })

  return (
    <>
      <PageHeader eyebrow={dict.nav.compare} sub={dict.compare.sub} title={dict.compare.heading} />

      <section className="bg-[var(--bg-subtle)] py-20">
        <div className="shell">
          <p className="mb-8 text-[13px] text-[var(--muted)]">{dict.compare.limit}</p>
          <CompareTool bikes={bikes} locale={locale} />
        </div>
      </section>
    </>
  )
}

export default ComparePage
