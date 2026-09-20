import type { Metadata } from 'next'

import { PageHeader } from '@/components/PageHeader'
import { ReserveForm } from '@/components/ReserveForm'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getBikes } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ model?: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.forms.reserveSub,
    locale,
    path: '/reserve',
    title: dict.forms.reserveHeading,
  })
}

const ReservePage = async ({ params, searchParams }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const { model: modelSlug } = await searchParams
  const bikes = await getBikes({ locale })

  const preselected = modelSlug ? bikes.find((bike) => bike.slug === modelSlug) : undefined
  const variants = preselected?.variants?.map((variant) => variant.colorName)

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.reserve}
        sub={dict.forms.reserveSub}
        title={dict.forms.reserveHeading}
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[720px] px-6">
          {preselected ? (
            <aside className="mb-8 flex flex-wrap items-end justify-between gap-4 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-subtle)] px-6 py-5">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[22px] font-bold">
                  {preselected.name}
                </h2>
                {preselected.tagline ? (
                  <p className="mt-1 text-[13px] text-[var(--muted)]">{preselected.tagline}</p>
                ) : null}
              </div>
              <p className="text-right text-[13px] text-[var(--muted)]">
                {dict.common.priceOnRequest}
              </p>
            </aside>
          ) : null}

          <ReserveForm
            bikes={bikes.map((bike) => ({ id: bike.id, label: bike.name }))}
            defaultModel={preselected?.id}
            locale={locale}
            variants={variants}
          />
        </div>
      </section>
    </>
  )
}

export default ReservePage
