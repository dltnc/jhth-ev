import Link from 'next/link'
import type { Metadata } from 'next'

import { Icon } from '@/components/Icon'
import type { IconName } from '@/components/Icon'
import { PageHeader } from '@/components/PageHeader'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return buildMetadata({
    description: dict.technology.sub,
    locale,
    path: '/technology',
    title: dict.technology.heading,
  })
}

const TechnologyPage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const pillars: { body: string; icon: IconName; title: string }[] = [
    {
      body: dict.technology.batteryBody,
      icon: 'battery',
      title: dict.technology.batteryHeading,
    },
    {
      body: dict.technology.motorBody,
      icon: 'speed',
      title: dict.technology.motorHeading,
    },
    {
      body: dict.technology.smartBody,
      icon: 'globe',
      title: dict.technology.smartHeading,
    },
  ]

  const highlights: { icon: IconName; label: string }[] = [
    { icon: 'charge', label: dict.detail.chargeTime },
    { icon: 'range', label: dict.detail.range },
    { icon: 'warranty', label: dict.faq.warranty },
    { icon: 'eco', label: dict.home.statEmissions },
  ]

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.technology}
        sub={dict.technology.sub}
        title={dict.technology.heading}
      >
        <Link className="btn btn-light" href={localePath(locale, '/models')}>
          {dict.actions.exploreModels}
        </Link>
      </PageHeader>

      <section className="bg-white py-20">
        <div className="shell">
          <p className="eyebrow mb-9 text-center">{dict.home.featuresEyebrow}</p>

          <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {pillars.map((pillar) => (
              <li
                className="rounded-lg border border-[var(--border-soft)] bg-white px-7 py-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                key={pillar.title}
              >
                <span className="mb-5 flex size-12 items-center justify-center rounded-[10px] bg-[var(--accent-tint)] text-[var(--accent)]">
                  <Icon name={pillar.icon} size={24} />
                </span>
                <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-[22px] font-bold">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-[1.75] text-[var(--body)]">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)] py-20">
        <div className="shell">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {highlights.map((item) => (
              <li
                className="flex items-center gap-3.5 rounded-[10px] border border-[var(--border-soft)] bg-white px-5 py-[22px] text-[14px] font-medium"
                key={item.label}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
                  <Icon name={item.icon} size={18} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--accent-deep)] px-6 py-16 text-center">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,44px)] leading-[1.1] font-bold text-white">
          {dict.home.whyHeading}
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-[15px] leading-[1.75] text-white/75">
          {dict.home.whyBody}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="btn btn-light" href={localePath(locale, '/models')}>
            {dict.actions.exploreModels}
            <Icon name="arrowRight" size={18} />
          </Link>
          <Link className="btn btn-glass" href={localePath(locale, '/test-ride')}>
            {dict.actions.bookTestRide}
          </Link>
        </div>
      </section>
    </>
  )
}

export default TechnologyPage
