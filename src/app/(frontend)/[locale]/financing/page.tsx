import Link from 'next/link'
import type { Metadata } from 'next'

import { EMICalculator } from '@/components/EMICalculator'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Icon } from '@/components/Icon'
import { PhotoHero } from '@/components/PhotoHero'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { firstGalleryImage } from '@/lib/media'
import { getBikes, getFaqs } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.financing.sub,
    locale,
    path: '/financing',
    title: dict.financing.heading,
  })
}

const FinancingPage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const [bikes, faqs] = await Promise.all([
    getBikes({ locale }),
    getFaqs({ category: 'buying', locale }),
  ])

  const heroImage = firstGalleryImage(bikes[0]?.gallery, 'hero')

  return (
    <>
      <PhotoHero
        ctaHref={localePath(locale, '/reserve')}
        ctaLabel={dict.actions.reserveNow}
        eyebrow={dict.nav.financing}
        media={heroImage}
        sub={dict.financing.sub}
        title={dict.financing.heading}
      />

      <section className="bg-white py-20">
        <div className="shell">
          <h2 className="mb-9 text-center font-[family-name:var(--font-display)] text-[clamp(28px,3.5vw,42px)] leading-[1.1] font-bold">
            {dict.financing.calcHeading}
          </h2>
          <EMICalculator locale={locale} />
        </div>
      </section>

      {faqs.length ? (
        <section className="bg-[var(--bg-subtle)] py-20">
          <div className="mx-auto max-w-[860px] px-6">
            <h2 className="mb-8 font-[family-name:var(--font-display)] text-[28px] font-bold">
              {dict.faq.buying}
            </h2>
            <FAQAccordion
              allLabel={dict.faq.all}
              categoryLabels={{
                battery: dict.faq.battery,
                buying: dict.faq.buying,
                general: dict.faq.general,
                riding: dict.faq.riding,
                warranty: dict.faq.warranty,
              }}
              emptyLabel={dict.faq.empty}
              items={faqs.map((faq) => ({
                answer: faq.answer,
                category: faq.category ?? 'general',
                id: faq.id,
                question: faq.question,
              }))}
              showFilters={false}
            />
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16">
        <p className="mx-auto max-w-[760px] px-6 text-center text-[13px] leading-[1.8] text-[var(--muted)]">
          {dict.financing.disclaimer}
        </p>
      </section>

      <section className="bg-[var(--accent-deep)] px-6 py-16 text-center">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,44px)] leading-[1.1] font-bold text-white">
          {dict.home.revHeading}
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-[15px] leading-[1.75] text-white/75">
          {dict.home.revBody}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="btn btn-light" href={localePath(locale, '/reserve')}>
            {dict.actions.reserveNow}
          </Link>
          <Link className="btn btn-glass" href={localePath(locale, '/models')}>
            {dict.actions.exploreModels}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}

export default FinancingPage
