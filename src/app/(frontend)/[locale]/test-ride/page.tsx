import type { Metadata } from 'next'

import { PageHeader } from '@/components/PageHeader'
import { TestRideForm } from '@/components/TestRideForm'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getBikes, getDealers } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { getSiteSettings } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ model?: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.forms.testRideSub,
    locale,
    path: '/test-ride',
    title: dict.forms.testRideHeading,
  })
}

const TestRidePage = async ({ params, searchParams }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const { model: modelSlug } = await searchParams

  const [bikes, dealers, settings] = await Promise.all([
    getBikes({ locale }),
    getDealers({ locale }),
    getSiteSettings(locale),
  ])

  const preselected = modelSlug ? bikes.find((bike) => bike.slug === modelSlug) : undefined

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.testRide}
        sub={dict.forms.testRideSub}
        title={dict.forms.testRideHeading}
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[720px] px-6">
          <TestRideForm
            bikes={bikes.map((bike) => ({ id: bike.id, label: bike.name }))}
            dealers={dealers.map((dealer) => ({
              id: dealer.id,
              label: `${dealer.name} — ${dealer.district}`,
            }))}
            defaultModel={preselected?.id}
            locale={locale}
          />
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)] py-16">
        <aside className="mx-auto max-w-[720px] rounded-lg border border-[var(--border-soft)] bg-white px-7 py-7">
          <h2 className="mb-2 font-[family-name:var(--font-display)] text-[22px] font-bold">
            {dict.dealers.heading}
          </h2>
          <p className="text-sm leading-[1.75] text-[var(--body)]">{dict.home.dealerTeaserBody}</p>

          {settings?.phone ? (
            <p className="mt-5">
              <span className="block text-[11px] tracking-[0.4px] text-[var(--muted)] uppercase">
                {dict.dealers.phone}
              </span>
              <span className="num text-[22px] text-[var(--accent)]">{settings.phone}</span>
            </p>
          ) : null}
        </aside>
      </section>
    </>
  )
}

export default TestRidePage
