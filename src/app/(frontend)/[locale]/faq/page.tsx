import type { Metadata } from 'next'

import { FAQAccordion } from '@/components/FAQAccordion'
import { PageHeader } from '@/components/PageHeader'
import { StructuredData } from '@/components/StructuredData'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getFaqs } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.faq.sub,
    locale,
    path: '/faq',
    title: dict.faq.heading,
  })
}

const FaqPage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const faqs = await getFaqs({ locale })

  return (
    <>
      <PageHeader eyebrow={dict.nav.faq} sub={dict.faq.sub} title={dict.faq.heading} />

      <section className="bg-[var(--bg-subtle)] py-20">
        <div className="mx-auto max-w-[860px] px-6">
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
          />
        </div>
      </section>

      {faqs.length ? (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              name: faq.question,
            })),
          }}
        />
      ) : null}
    </>
  )
}

export default FaqPage
